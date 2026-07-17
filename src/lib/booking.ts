/**
 * Capa de datos del sistema de reserva de horas.
 *
 * HOY (solo frontend): la disponibilidad se genera desde la configuración
 * local (dos bloques diarios, días hábiles) y la solicitud se envía por
 * correo vía Server Action, con respaldo por WhatsApp.
 *
 * MAÑANA (dashboard): reemplazar `getAvailableDays`/`isSlotAvailable` por
 * un GET al API del dashboard (que descuente horas ya tomadas) y el envío
 * de `submitBooking` por un POST con el mismo `BookingRequest`. La UI no
 * necesita cambios: consume solo estos tipos y funciones.
 */

import { HORARIO, PRECIOS, whatsappHref } from "@/lib/site";

export type ServiceOption = {
  id: string;
  nombre: string;
  tipo: "evaluacion" | "terapia";
  /** Qué se reserva exactamente en este paso. */
  detalle: string;
  /** Información de precio visible (regla 10.3: evaluaciones como proceso). */
  precio: string;
};

export const SERVICIOS: ServiceOption[] = [
  {
    id: "evaluacion-autismo",
    nombre: "Evaluación de autismo",
    tipo: "evaluacion",
    detalle:
      "Reservas la primera entrevista online del proceso completo (3 a 4 sesiones + jornada presencial en Arica).",
    precio: "Proceso completo — valor por confirmar",
  },
  {
    id: "evaluacion-tdah",
    nombre: "Evaluación de TDAH",
    tipo: "evaluacion",
    detalle:
      "Reservas la primera entrevista online del proceso completo (3 a 4 sesiones).",
    precio: "Proceso completo — valor por confirmar",
  },
  {
    id: "evaluacion-lenguaje",
    nombre: "Evaluación de lenguaje",
    tipo: "evaluacion",
    detalle:
      "Reservas la primera entrevista online del proceso completo (3 a 4 sesiones).",
    precio: "Proceso completo — valor por confirmar",
  },
  {
    id: "terapia-infanto-juvenil",
    nombre: "Psicoterapia infanto-juvenil",
    tipo: "terapia",
    detalle: "Sesión online de 60 minutos para niños, niñas y adolescentes.",
    precio: `${PRECIOS.sesionTerapia} por sesión`,
  },
  {
    id: "terapia-adultos",
    nombre: "Psicoterapia de adultos",
    tipo: "terapia",
    detalle: "Sesión online de 60 minutos.",
    precio: `${PRECIOS.sesionTerapia} por sesión`,
  },
  {
    id: "duelo",
    nombre: "Acompañamiento en duelo",
    tipo: "terapia",
    detalle:
      "Sesión online de 60 minutos, para adultos o infanto-juvenil con su familia.",
    precio: `${PRECIOS.sesionTerapia} por sesión`,
  },
];

/** Bloques horarios diarios (hora de Chile continental). */
export const BLOQUES = HORARIO.bloques;

/**
 * Días de atención: 1 = lunes … 5 = viernes.
 * [PLACEHOLDER: confirmar días de la semana con Daniela — mientras tanto
 * se ofrecen días hábiles y toda solicitud se confirma manualmente].
 */
export const DIAS_ATENCION = [1, 2, 3, 4, 5];

/** Cuántas semanas hacia adelante se ofrecen horas. */
export const SEMANAS_VISIBLES = 3;

export type DayOption = {
  /** YYYY-MM-DD */
  fecha: string;
  /** "lunes 20 de julio" */
  etiqueta: string;
};

/** Fecha de "hoy" en Chile continental (America/Santiago), como YYYY-MM-DD.
 *  Evita el off-by-one de usar la hora del servidor (UTC en Vercel). */
export function hoyChileISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** "Hoy" en Chile como Date anclado a medianoche UTC de esa fecha
 *  calendario, para hacer aritmética de días con métodos UTC. */
function hoyChileUTC(): Date {
  const [y, m, d] = hoyChileISO().split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/**
 * Días reservables desde mañana (hora de Chile). `diasAtencion` permite
 * al dashboard definir los días reales (0=domingo … 6=sábado); sin él se
 * usa el valor por defecto DIAS_ATENCION.
 */
export function getAvailableDays(
  diasAtencion: number[] = DIAS_ATENCION,
): DayOption[] {
  const dias: DayOption[] = [];
  const hoy = hoyChileUTC();
  const cursor = new Date(hoy);
  cursor.setUTCDate(cursor.getUTCDate() + 1);
  const fin = new Date(hoy);
  fin.setUTCDate(fin.getUTCDate() + SEMANAS_VISIBLES * 7);

  while (cursor <= fin) {
    if (diasAtencion.includes(cursor.getUTCDay())) {
      dias.push({
        fecha: cursor.toISOString().slice(0, 10),
        etiqueta: cursor.toLocaleDateString("es-CL", {
          weekday: "long",
          day: "numeric",
          month: "long",
          timeZone: "UTC",
        }),
      });
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dias;
}

/** Solicitud de reserva: el mismo JSON que recibirá el dashboard. */
export type BookingRequest = {
  servicioId: string;
  servicioNombre: string;
  fecha: string;
  bloque: string;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  /** Honeypot anti-spam: campo oculto que solo un bot rellena. */
  sitioWeb?: string;
};

/** Mensaje de WhatsApp con la solicitud, como respaldo/confirmación. */
export function bookingWhatsappHref(req: BookingRequest): string {
  return whatsappHref(
    `Hola Daniela, quiero reservar una hora de ${req.servicioNombre} para el ${req.fecha}, bloque ${req.bloque} (hora de Chile). Mi nombre es ${req.nombre}.`,
  );
}
