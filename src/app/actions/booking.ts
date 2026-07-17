"use server";

import { Resend } from "resend";
import { BLOQUES, SERVICIOS, type BookingRequest } from "@/lib/booking";
import { crearPreferenciaPago, pagosConfigurados } from "@/lib/pagos";
import { crearReserva } from "@/lib/reservas-db";

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

/**
 * Registra una solicitud de reserva (Fase A): guarda en la base con
 * bloqueo de doble reserva y avisa por correo (mejor esfuerzo). Sin base
 * configurada degrada a correo; sin correo, a WhatsApp.
 */
export async function submitBooking(req: BookingRequest): Promise<BookingState> {
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

  // 1. Base de datos: la inserción compite por el cupo (índice único).
  const guardado = await crearReserva(req);
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
    // 2a. Con pago configurado: llevar al checkout del abono. La hora se
    //     confirma sola vía webhook cuando el pago quede aprobado.
    if (pagosConfigurados()) {
      const checkoutUrl = await crearPreferenciaPago(guardado.reserva);
      if (checkoutUrl) {
        void enviarAviso(req, servicio.nombre);
        return { ok: true, checkoutUrl };
      }
      // Si la pasarela falla, no bloqueamos la reserva: se sigue por
      // confirmación manual (la reserva ya está guardada).
    }
    // 2b. Sin pago: aviso a Daniela y confirmación manual.
    await enviarAviso(req, servicio.nombre);
    // La base es la fuente de verdad: la reserva existe aunque el correo falle.
    return { ok: true };
  }

  // 3. Sin base configurada: el correo es el único registro.
  const emailOk = await enviarAviso(req, servicio.nombre);
  if (emailOk === "sin-correo") return { ok: false, soloWhatsapp: true };
  if (emailOk === "error") {
    return {
      ok: false,
      error:
        "No pudimos registrar tu solicitud. Inténtalo de nuevo o resérvala por WhatsApp.",
    };
  }
  return { ok: true };
}

async function enviarAviso(
  req: BookingRequest,
  servicioNombre: string,
): Promise<"enviado" | "sin-correo" | "error"> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "sin-correo";

  const resend = new Resend(apiKey);
  const to =
    process.env.CONTACT_TO_EMAIL || "psicofono.danielakaiser@gmail.com";

  const { error } = await resend.emails.send({
    from: "Agenda web <onboarding@resend.dev>",
    to,
    replyTo: req.correo.trim(),
    subject: `Solicitud de hora: ${servicioNombre} — ${req.fecha} ${req.bloque}`,
    text: [
      "Nueva solicitud de hora desde el sitio web",
      "",
      `Servicio: ${servicioNombre}`,
      `Fecha solicitada: ${req.fecha}`,
      `Bloque: ${req.bloque} (hora de Chile continental)`,
      "",
      `Nombre: ${req.nombre.trim()}`,
      `Correo: ${req.correo.trim()}`,
      `Teléfono: ${req.telefono.trim()}`,
      "",
      "Comentario:",
      req.mensaje.trim() || "(sin comentario)",
      "",
      "Recuerda confirmar la hora y coordinar el abono de $5.000.",
    ].join("\n"),
  });

  if (error) {
    console.error("[reservas] error enviando aviso:", error.message);
    return "error";
  }
  return "enviado";
}
