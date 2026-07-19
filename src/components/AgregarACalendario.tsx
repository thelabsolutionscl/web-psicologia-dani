"use client";

import { CalendarPlus, Download } from "lucide-react";
import { track } from "@/lib/analytics";
import { eventoICS } from "@/lib/calendario";
import { SITE_NAME } from "@/lib/site";

/**
 * Botones "agregar al calendario" para la pantalla de confirmación de la
 * reserva. El .ics también viaja adjunto en los correos; aquí se ofrece
 * de inmediato para que la hora no dependa de que llegue el correo.
 */
type Props = {
  servicioNombre: string;
  /** YYYY-MM-DD */
  fecha: string;
  /** "17:30–18:30" */
  bloque: string;
};

const DESCRIPCION = (servicio: string) =>
  `${servicio} con ${SITE_NAME}. La hora se confirma personalmente junto con el abono.`;

function urlGoogleCalendar({ servicioNombre, fecha, bloque }: Props): string {
  const [ini, fin] = bloque.split(/[–-]/);
  const f = fecha.replace(/-/g, "");
  const h = (s: string) => `${s.trim().replace(":", "")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${servicioNombre} — ${SITE_NAME}`,
    // Horas locales + ctz: Google las interpreta en la zona de Chile.
    dates: `${f}T${h(ini)}/${f}T${h(fin)}`,
    ctz: "America/Santiago",
    details: DESCRIPCION(servicioNombre),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function descargarICS(p: Props): void {
  const ics = eventoICS({
    fecha: p.fecha,
    bloque: p.bloque,
    titulo: `${p.servicioNombre} — ${SITE_NAME}`,
    descripcion: DESCRIPCION(p.servicioNombre),
  });
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reserva.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const estiloBoton =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-arena px-4 font-sans text-sm font-semibold text-quebrada/90 transition-colors hover:border-pacifico/50 hover:text-enlace";

export function AgregarACalendario(p: Props) {
  return (
    <div className="mt-5">
      <p className="font-sans text-sm font-semibold text-quebrada/80">
        Guarda la hora en tu calendario:
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <a
          href={urlGoogleCalendar(p)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("calendario_agregado", { tipo: "google" })}
          className={estiloBoton}
        >
          <CalendarPlus className="size-4" aria-hidden="true" />
          Google Calendar
        </a>
        <button
          type="button"
          onClick={() => {
            descargarICS(p);
            track("calendario_agregado", { tipo: "ics" });
          }}
          className={estiloBoton}
        >
          <Download className="size-4" aria-hidden="true" />
          Apple / Outlook (.ics)
        </button>
      </div>
    </div>
  );
}
