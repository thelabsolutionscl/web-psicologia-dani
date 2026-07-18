import { SITE_NAME } from "@/lib/site";

/**
 * Genera un evento de calendario (.ics) para adjuntar a los correos de
 * confirmación, de modo que el paciente pueda agregar la hora a Google
 * Calendar, Apple Calendar u Outlook con un clic.
 *
 * Se usa TZID=America/Santiago con la hora local: los clientes de
 * calendario resuelven la zona desde su base de datos horaria, sin
 * necesidad de un VTIMEZONE embebido.
 */

type EventoICS = {
  /** YYYY-MM-DD */
  fecha: string;
  /** "17:30–18:30" (acepta guion normal o en-dash) */
  bloque: string;
  titulo: string;
  descripcion: string;
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** "17:30" → "173000" */
function horaICS(hhmm: string): string {
  const [h, m] = hhmm.trim().split(":");
  return `${pad(Number(h))}${pad(Number(m))}00`;
}

export function eventoICS(e: EventoICS): string {
  const [ini, fin] = e.bloque.split(/[–-]/);
  const fechaICS = e.fecha.replace(/-/g, ""); // YYYYMMDD
  const dtStart = `${fechaICS}T${horaICS(ini)}`;
  const dtEnd = `${fechaICS}T${horaICS(fin)}`;
  // UID estable por fecha+bloque; DTSTAMP fijo (no hay necesidad de "ahora").
  const uid = `${fechaICS}-${horaICS(ini)}@danielakaiser.cl`;
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Daniela Kaiser//Agenda//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStart}`,
    `DTSTART;TZID=America/Santiago:${dtStart}`,
    `DTEND;TZID=America/Santiago:${dtEnd}`,
    `SUMMARY:${escape(e.titulo)}`,
    `DESCRIPTION:${escape(e.descripcion)}`,
    `ORGANIZER;CN=${escape(SITE_NAME)}:mailto:contacto@danielakaiser.cl`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escape(e.titulo)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
