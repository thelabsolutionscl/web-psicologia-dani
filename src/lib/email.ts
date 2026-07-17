import { Resend } from "resend";
import { PHONE_DISPLAY, PRECIOS, SITE_NAME } from "@/lib/site";

/**
 * Capa única de envío de correo (Resend). Centraliza transporte,
 * remitente y destinatario para no duplicarlos por acción. Todo es
 * "mejor esfuerzo": devuelve boolean y nunca lanza.
 */

export function emailConfigurado(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function remitente(): string {
  return process.env.RESEND_FROM || "Agenda web <onboarding@resend.dev>";
}

function correoDaniela(): string {
  return process.env.CONTACT_TO_EMAIL || "psicofono.danielakaiser@gmail.com";
}

type Enviar = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

async function enviar({ to, subject, text, replyTo }: Enviar): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return false;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: remitente(),
    to,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  });
  if (error) {
    console.error("[email] error enviando:", error.message);
    return false;
  }
  return true;
}

export type DatosReserva = {
  servicioNombre: string;
  fecha: string;
  bloque: string;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje?: string;
};

/** Aviso de nueva solicitud a Daniela. */
export function avisarReservaADaniela(r: DatosReserva): Promise<boolean> {
  return enviar({
    to: correoDaniela(),
    replyTo: r.correo,
    subject: `Solicitud de hora: ${r.servicioNombre} — ${r.fecha} ${r.bloque}`,
    text: [
      "Nueva solicitud de hora desde el sitio web",
      "",
      `Servicio: ${r.servicioNombre}`,
      `Fecha solicitada: ${r.fecha}`,
      `Bloque: ${r.bloque} (hora de Chile continental)`,
      "",
      `Nombre: ${r.nombre}`,
      `Correo: ${r.correo}`,
      `Teléfono: ${r.telefono || "(no indicado)"}`,
      "",
      "Comentario:",
      r.mensaje?.trim() || "(sin comentario)",
      "",
      `Recuerda confirmar la hora y coordinar el abono de ${PRECIOS.abonoReserva}.`,
    ].join("\n"),
  });
}

/** Acuse de recibo al paciente (flujo sin pago online). */
export function acuseReservaPaciente(r: DatosReserva): Promise<boolean> {
  return enviar({
    to: r.correo,
    subject: `Recibimos tu solicitud de hora — ${r.fecha}, ${r.bloque}`,
    text: [
      `Hola ${r.nombre},`,
      "",
      `Recibimos tu solicitud de hora para ${r.servicioNombre} el ${r.fecha}, bloque ${r.bloque} (hora de Chile continental).`,
      "",
      `Te contactaré personalmente para confirmar la hora y coordinar el abono de ${PRECIOS.abonoReserva} que la reserva. La hora queda tomada solo con esa confirmación.`,
      "",
      `Si tu consulta es urgente, escríbeme por WhatsApp al ${PHONE_DISPLAY}.`,
      "",
      "Un abrazo,",
      SITE_NAME,
      "Psicóloga · Fonoaudióloga",
    ].join("\n"),
  });
}

/** Confirmación al paciente cuando el abono se pagó online. */
export function confirmacionPagoPaciente(r: DatosReserva): Promise<boolean> {
  return enviar({
    to: r.correo,
    subject: `Tu hora quedó confirmada — ${r.fecha}, ${r.bloque}`,
    text: [
      `Hola ${r.nombre},`,
      "",
      `Recibimos tu abono y tu hora de ${r.servicioNombre} quedó confirmada:`,
      "",
      `Fecha: ${r.fecha}`,
      `Horario: ${r.bloque} (hora de Chile continental)`,
      "",
      "El saldo se paga antes de la sesión. Si necesitas reagendar, responde este correo o escríbeme por WhatsApp.",
      "",
      "Nos vemos,",
      SITE_NAME,
      "Psicóloga · Fonoaudióloga",
    ].join("\n"),
  });
}

/** Alerta a Daniela: se pagó un abono pero el cupo ya no está disponible. */
export function alertaConflictoPagoADaniela(r: DatosReserva): Promise<boolean> {
  return enviar({
    to: correoDaniela(),
    replyTo: r.correo,
    subject: `⚠️ Pago recibido sin cupo disponible — ${r.fecha} ${r.bloque}`,
    text: [
      "Atención: un paciente pagó el abono pero su cupo ya no estaba disponible",
      "(probablemente el pago llegó después de que la reserva expirara o el cupo",
      "fue tomado por otra persona). Revisa y contáctalo para reagendar o devolver.",
      "",
      `Servicio: ${r.servicioNombre}`,
      `Fecha/bloque solicitado: ${r.fecha} ${r.bloque}`,
      `Nombre: ${r.nombre}`,
      `Correo: ${r.correo}`,
      `Teléfono: ${r.telefono || "(no indicado)"}`,
    ].join("\n"),
  });
}
