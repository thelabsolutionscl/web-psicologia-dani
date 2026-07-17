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

/** Escapa datos de usuario antes de interpolarlos en el HTML del correo. */
function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Plantilla HTML de marca (tabla + estilos inline para compatibilidad
 * con clientes de correo). El texto plano se mantiene como respaldo.
 */
function plantillaHtml(opts: {
  titulo: string;
  parrafos: string[];
  nota?: string;
}): string {
  const p = opts.parrafos
    .map(
      (t) =>
        `<p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#33222a;">${t}</p>`,
    )
    .join("");
  const nota = opts.nota
    ? `<div style="margin-top:18px;padding:12px 14px;background:#f8f2ed;border-left:3px solid #8a2f45;border-radius:0 8px 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#55453f;">${opts.nota}</div>`
    : "";
  return `<!doctype html><html lang="es"><body style="margin:0;padding:0;background:#f8f2ed;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f2ed;padding:28px 12px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ebe0d8;">
<tr><td style="background:#8a2f45;padding:18px 28px;">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;font-weight:700;color:#ffffff;">Daniela Kaiser</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;color:#f0c9d5;text-transform:uppercase;margin-top:3px;">Psicología &amp; Bienestar</div>
</td></tr>
<tr><td style="padding:28px;">
<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.25;color:#33222a;">${opts.titulo}</h1>
${p}${nota}
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #ebe0d8;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#8a7d76;">
Daniela Alejandra Kaiser Ortiz · Psicóloga · Fonoaudióloga<br>WhatsApp ${esc(PHONE_DISPLAY)}
</td></tr>
</table></td></tr></table></body></html>`;
}

type Enviar = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

async function enviar({
  to,
  subject,
  text,
  html,
  replyTo,
}: Enviar): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return false;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: remitente(),
    to,
    subject,
    text,
    ...(html ? { html } : {}),
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
    html: plantillaHtml({
      titulo: "Nueva solicitud de hora",
      parrafos: [
        `<strong>${esc(r.servicioNombre)}</strong><br>${esc(r.fecha)} · ${esc(r.bloque)} h (hora de Chile continental)`,
        `<strong>Nombre:</strong> ${esc(r.nombre)}<br><strong>Correo:</strong> ${esc(r.correo)}<br><strong>Teléfono:</strong> ${esc(r.telefono || "(no indicado)")}`,
        `<strong>Comentario:</strong><br>${esc(r.mensaje?.trim() || "(sin comentario)")}`,
      ],
      nota: `Recuerda confirmar la hora y coordinar el abono de ${esc(PRECIOS.abonoReserva)}.`,
    }),
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
    html: plantillaHtml({
      titulo: "Recibimos tu solicitud de hora",
      parrafos: [
        `Hola ${esc(r.nombre)},`,
        `Recibimos tu solicitud para <strong>${esc(r.servicioNombre)}</strong> el ${esc(r.fecha)}, bloque ${esc(r.bloque)} h (hora de Chile continental).`,
        `Te contactaré personalmente para confirmar la hora y coordinar el abono de ${esc(PRECIOS.abonoReserva)} que la reserva. La hora queda tomada solo con esa confirmación.`,
        `Un abrazo,<br><strong>${esc(SITE_NAME)}</strong><br>Psicóloga · Fonoaudióloga`,
      ],
      nota: `Si tu consulta es urgente, escríbeme por WhatsApp al ${esc(PHONE_DISPLAY)}.`,
    }),
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
    html: plantillaHtml({
      titulo: "¡Tu hora quedó confirmada!",
      parrafos: [
        `Hola ${esc(r.nombre)},`,
        `Recibimos tu abono y tu hora de <strong>${esc(r.servicioNombre)}</strong> quedó confirmada:`,
        `<strong>Fecha:</strong> ${esc(r.fecha)}<br><strong>Horario:</strong> ${esc(r.bloque)} h (hora de Chile continental)`,
        "El saldo se paga antes de la sesión. Si necesitas reagendar, responde este correo o escríbeme por WhatsApp.",
        `Nos vemos,<br><strong>${esc(SITE_NAME)}</strong><br>Psicóloga · Fonoaudióloga`,
      ],
    }),
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
    html: plantillaHtml({
      titulo: "⚠️ Pago recibido sin cupo disponible",
      parrafos: [
        "Un paciente pagó el abono pero su cupo ya no estaba disponible (probablemente el pago llegó después de que la reserva expirara, o el cupo fue tomado por otra persona).",
        `<strong>${esc(r.servicioNombre)}</strong><br>Fecha/bloque solicitado: ${esc(r.fecha)} ${esc(r.bloque)}`,
        `<strong>Nombre:</strong> ${esc(r.nombre)}<br><strong>Correo:</strong> ${esc(r.correo)}<br><strong>Teléfono:</strong> ${esc(r.telefono || "(no indicado)")}`,
      ],
      nota: "Revisa y contáctalo para reagendar o devolver el abono.",
    }),
  });
}
