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
  tipo: "evaluacion" | "terapia" | "bienestar" | "capacitacion";
  /** Qué se reserva exactamente en este paso. */
  detalle: string;
  /** Información de precio visible. */
  precio: string;
};

const PRECIO_SESION = `${PRECIOS.sesion} por sesión`;
const PRECIO_EVAL = `Primera sesión ${PRECIOS.evaluacionPrimeraSesion} · valor final según el proceso`;

export const SERVICIOS: ServiceOption[] = [
  {
    id: "evaluacion-autismo",
    nombre: "Evaluación de autismo",
    tipo: "evaluacion",
    detalle:
      "Reservas la primera sesión (entrevista y orientación); la jornada presencial de observación se coordina en Arica.",
    precio: PRECIO_EVAL,
  },
  {
    id: "evaluacion-tdah",
    nombre: "Evaluación de TDAH",
    tipo: "evaluacion",
    detalle: "Reservas la primera sesión (entrevista y orientación).",
    precio: PRECIO_EVAL,
  },
  {
    id: "evaluacion-lenguaje",
    nombre: "Evaluación de lenguaje",
    tipo: "evaluacion",
    detalle: "Reservas la primera sesión (entrevista y orientación).",
    precio: PRECIO_EVAL,
  },
  {
    id: "terapia-infanto-juvenil",
    nombre: "Psicoterapia infanto-juvenil",
    tipo: "terapia",
    detalle: "Sesión online de 60 minutos para niños, niñas y adolescentes.",
    precio: PRECIO_SESION,
  },
  {
    id: "terapia-adultos",
    nombre: "Psicoterapia de adultos",
    tipo: "terapia",
    detalle: "Sesión online de 60 minutos.",
    precio: PRECIO_SESION,
  },
  {
    id: "duelo",
    nombre: "Acompañamiento en duelo",
    tipo: "terapia",
    detalle:
      "Sesión online de 60 minutos, para adultos o infanto-juvenil con su familia.",
    precio: PRECIO_SESION,
  },
  {
    id: "fonoaudiologia",
    nombre: "Fonoaudiología",
    tipo: "terapia",
    detalle:
      "Sesión online de habla, lenguaje, comunicación o aprendizaje para niños, adolescentes y adultos.",
    precio: PRECIO_SESION,
  },
  {
    id: "orientacion-familiar",
    nombre: "Orientación familiar",
    tipo: "terapia",
    detalle:
      "Sesión online de acompañamiento a madres, padres y cuidadores en parentalidad y convivencia.",
    precio: PRECIO_SESION,
  },
  {
    id: "perinatal",
    nombre: "Psicología perinatal y lactancia materna",
    tipo: "terapia",
    detalle:
      "Sesión online de acompañamiento en embarazo, posparto, maternidad, paternidad y lactancia.",
    precio: PRECIO_SESION,
  },
  {
    id: "terapia-integral",
    nombre: "Terapia integral y desarrollo personal",
    tipo: "bienestar",
    detalle:
      "Sesión online de acompañamiento complementario de bienestar y crecimiento personal.",
    precio: PRECIO_SESION,
  },
  {
    id: "primeros-auxilios",
    nombre: "Primeros auxilios psicológicos",
    tipo: "terapia",
    detalle:
      "Sesión online de contención y apoyo en situaciones de crisis, duelo o eventos estresantes.",
    precio: PRECIO_SESION,
  },
  {
    id: "ivadec",
    nombre: "IVADEC-CIF (MINSAL–COMPIN)",
    tipo: "evaluacion",
    detalle:
      "Reservas una orientación inicial; el IVADEC-CIF se cobra como valor único según la opción que elijas.",
    precio: `Opción 1 ${PRECIOS.ivadec.opcion1} · Opción 2 ${PRECIOS.ivadec.opcion2} (valor único)`,
  },
  {
    id: "capacitaciones",
    nombre: "Capacitaciones y asesorías",
    tipo: "capacitacion",
    detalle:
      "Reservas la primera reunión (diagnóstico / levantamiento de necesidades) para equipos e instituciones.",
    precio: `Primera reunión ${PRECIOS.capacitacionPrimeraReunion}`,
  },
  {
    id: "radiestesia",
    nombre: "Sesión de radiestesia",
    tipo: "bienestar",
    detalle:
      "Sesión individual de bienestar; una práctica complementaria, distinta del acompañamiento clínico.",
    precio: PRECIO_SESION,
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
