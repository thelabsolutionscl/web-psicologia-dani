"use server";

import { BLOQUES, SERVICIOS, type BookingRequest } from "@/lib/booking";
import {
  acuseReservaPaciente,
  avisarReservaADaniela,
  emailConfigurado,
  type DatosReserva,
} from "@/lib/email";
import { crearPreferenciaPago, pagosConfigurados } from "@/lib/pagos";
import {
  crearReserva,
  quitarHold,
  slotDisponible,
} from "@/lib/reservas-db";

export type BookingState = {
  /** true cuando la solicitud quedó registrada (en base de datos o correo). */
  ok: boolean;
  /** true cuando no hay base ni correo configurados: confirmar por WhatsApp. */
  soloWhatsapp?: boolean;
  /** true cuando el cupo fue tomado por otra persona: elegir otra hora. */
  conflicto?: boolean;
  /** URL del checkout de pago del abono; si viene, la UI redirige allí. */
  checkoutUrl?: string;
  error?: string;
  fieldErrors?: Partial<Record<"nombre" | "correo" | "telefono", string>>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function datos(req: BookingRequest, servicioNombre: string): DatosReserva {
  return {
    servicioNombre,
    fecha: req.fecha,
    bloque: req.bloque,
    nombre: req.nombre.trim(),
    correo: req.correo.trim(),
    telefono: req.telefono.trim(),
    mensaje: req.mensaje,
  };
}

/**
 * Registra una solicitud de reserva. Valida en el servidor (formato,
 * campos y disponibilidad real del cupo), guarda en la base con bloqueo
 * de doble reserva, y avisa por correo. Con pago activo deriva al
 * checkout del abono. Degrada sin base (correo) y sin correo (WhatsApp).
 */
export async function submitBooking(req: BookingRequest): Promise<BookingState> {
  // Honeypot: si el campo oculto viene relleno, es un bot. Simulamos
  // éxito sin registrar nada (no bloquea cupos ni envía correos).
  if ((req.sitioWeb ?? "").trim() !== "") {
    return { ok: true };
  }

  const servicio = SERVICIOS.find((s) => s.id === req.servicioId);
  if (
    !servicio ||
    !FECHA_REGEX.test(req.fecha) ||
    !(BLOQUES as readonly string[]).includes(req.bloque)
  ) {
    return {
      ok: false,
      error: "La solicitud está incompleta. Vuelve a intentarlo desde el inicio.",
    };
  }

  const fieldErrors: BookingState["fieldErrors"] = {};
  if (req.nombre.trim().length < 2) {
    fieldErrors.nombre = "Escribe tu nombre para poder confirmarte la hora.";
  }
  if (!EMAIL_REGEX.test(req.correo.trim())) {
    fieldErrors.correo = "Revisa tu correo: parece incompleto.";
  }
  if (req.telefono.trim().length < 8) {
    fieldErrors.telefono =
      "Deja un teléfono válido: la confirmación llega por WhatsApp.";
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  // Validación de disponibilidad en el servidor: rechaza fechas pasadas,
  // días fuera de atención y días/bloques bloqueados (los bloqueos son
  // solo filtro visual en el cliente; aquí se aplican de verdad).
  if (await slotDisponible(req.fecha, req.bloque) === false) {
    return {
      ok: false,
      conflicto: true,
      error:
        "Ese día u horario ya no está disponible. Elige otro de la lista.",
    };
  }

  // Base de datos: la inserción compite por el cupo (índice único).
  // Con pago activo, el cupo se retiene temporalmente (expira_at).
  const guardado = await crearReserva(req, pagosConfigurados());
  if (guardado.estado === "ocupada") {
    return {
      ok: false,
      conflicto: true,
      error:
        "Esa hora acaba de ser tomada por otra persona. Elige otro día u otro bloque.",
    };
  }
  if (guardado.estado === "error") {
    return {
      ok: false,
      error:
        "No pudimos registrar tu solicitud. Inténtalo de nuevo o resérvala por WhatsApp.",
    };
  }

  if (guardado.estado === "creada") {
    const d = datos(req, servicio.nombre);
    // Con pago configurado: llevar al checkout del abono. La hora se
    // confirma sola vía webhook cuando el pago quede aprobado.
    if (pagosConfigurados()) {
      const checkoutUrl = await crearPreferenciaPago(guardado.reserva);
      if (checkoutUrl) {
        await avisarReservaADaniela(d);
        return { ok: true, checkoutUrl };
      }
      // Pasarela caída: quitar el hold para que la reserva no se
      // auto-cancele, y seguir por confirmación manual.
      await quitarHold(guardado.reserva.id);
    }
    // Sin pago (o pasarela caída): aviso a Daniela + acuse al paciente.
    await avisarReservaADaniela(d);
    await acuseReservaPaciente(d);
    return { ok: true };
  }

  // Sin base configurada: el correo es el único registro.
  if (!emailConfigurado()) return { ok: false, soloWhatsapp: true };
  const enviado = await avisarReservaADaniela(datos(req, servicio.nombre));
  if (!enviado) {
    return {
      ok: false,
      error:
        "No pudimos registrar tu solicitud. Inténtalo de nuevo o resérvala por WhatsApp.",
    };
  }
  await acuseReservaPaciente(datos(req, servicio.nombre));
  return { ok: true };
}
