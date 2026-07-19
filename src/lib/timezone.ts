/**
 * Conversión de los bloques (hora de Chile continental) a la zona
 * horaria de quien visita. Cumple lo prometido en /atencion-online:
 * "la página de agenda te la muestra al elegir tu hora".
 *
 * Sin dependencias: el offset de America/Santiago (incluido su horario
 * de verano) se resuelve con Intl por aproximación iterativa.
 */

const TZ_CHILE = "America/Santiago";

/** Instante (Date UTC) que corresponde a `fecha hh:mm` en Chile. */
export function instanteChile(fecha: string, hhmm: string): Date {
  const [y, m, d] = fecha.split("-").map(Number);
  const [hh, mm] = hhmm.trim().split(":").map(Number);
  const objetivo = Date.UTC(y, m - 1, d, hh, mm);

  // Primera aproximación: tratar la hora local como si fuera UTC y
  // corregir con el offset observado. Dos pasadas bastan incluso si el
  // instante cae junto a un cambio de horario de verano.
  let t = objetivo;
  for (let i = 0; i < 2; i++) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ_CHILE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(t));
    const val = (tipo: string) =>
      Number(parts.find((p) => p.type === tipo)?.value);
    const observado = Date.UTC(
      val("year"),
      val("month") - 1,
      val("day"),
      val("hour"),
      val("minute"),
    );
    t += objetivo - observado;
  }
  return new Date(t);
}

/** Nombre corto y legible de una zona IANA: "Europe/Madrid" → "Madrid". */
export function ciudadDeZona(tz: string): string {
  return (tz.split("/").pop() ?? tz).replace(/_/g, " ");
}

/**
 * Texto "en tu hora local" para un bloque chileno, o null si quien mira
 * ya está en la zona de Chile (no aporta nada repetirla).
 */
export function rangoEnZonaLocal(
  fecha: string,
  bloque: string,
  tzLocal: string,
): string | null {
  if (!tzLocal || tzLocal === TZ_CHILE) return null;
  const [ini, fin] = bloque.split(/[–-]/);
  const desde = instanteChile(fecha, ini);
  const hasta = instanteChile(fecha, fin);

  const hora = (d: Date) =>
    d.toLocaleTimeString("es", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: tzLocal,
    });
  const dia = (d: Date) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: tzLocal,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);

  let texto = `${hora(desde)}–${hora(hasta)}`;
  // Si en la zona local cae en otra fecha calendario, se aclara el día.
  if (dia(desde) !== fecha) {
    const etiqueta = desde.toLocaleDateString("es", {
      weekday: "long",
      day: "numeric",
      timeZone: tzLocal,
    });
    texto = `${etiqueta}, ${texto}`;
  }
  return `${texto} (${ciudadDeZona(tzLocal)})`;
}
