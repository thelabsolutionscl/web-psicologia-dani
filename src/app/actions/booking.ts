"use server";

import { Resend } from "resend";
import { BLOQUES, SERVICIOS, type BookingRequest } from "@/lib/booking";

export type BookingState = {
  /** true cuando la solicitud quedó registrada (correo enviado). */
  ok: boolean;
  /** true cuando el correo aún no está habilitado: confirmar por WhatsApp. */
  soloWhatsapp?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"nombre" | "correo" | "telefono", string>>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Registra una solicitud de reserva. Hoy: correo a Daniela vía Resend.
 * Con dashboard: reemplazar el envío por un POST del mismo BookingRequest
 * al API del dashboard (el resto de la función no cambia).
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin correo configurado la reserva sigue siendo posible: la UI ofrece
    // enviar la misma solicitud por WhatsApp.
    return { ok: false, soloWhatsapp: true };
  }

  const resend = new Resend(apiKey);
  const to =
    process.env.CONTACT_TO_EMAIL || "psicofono.danielakaiser@gmail.com";

  const { error } = await resend.emails.send({
    from: "Agenda web <onboarding@resend.dev>",
    to,
    replyTo: req.correo.trim(),
    subject: `Solicitud de hora: ${servicio.nombre} — ${req.fecha} ${req.bloque}`,
    text: [
      "Nueva solicitud de hora desde el sitio web",
      "",
      `Servicio: ${servicio.nombre}`,
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
    return {
      ok: false,
      error:
        "No pudimos registrar tu solicitud. Inténtalo de nuevo o resérvala por WhatsApp.",
    };
  }

  return { ok: true };
}
