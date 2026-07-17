/**
 * Constantes del sitio — única fuente de nombre, lema, NAP, redes,
 * credenciales y precios (regla 10.6: URLs y teléfono siempre por
 * env/site.ts, nunca hardcodeados en componentes).
 */

export const SITE_NAME = "Daniela Alejandra Kaiser Ortiz";

export const TAGLINE = "Cada proceso es único, acompañarlo también.";

export const SITE_DESCRIPTION =
  "Evaluación y acompañamiento del neurodesarrollo, online en todo Chile: evaluaciones de autismo, TDAH y lenguaje, psicoterapia y acompañamiento en duelo.";

/** Dominio pendiente de verificación en NIC Chile (danielakaiser.cl). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://danielakaiser.cl";

/**
 * URL del perfil de Encuadrado (agenda + pago). Pendiente: crear la
 * cuenta y pegar la URL en NEXT_PUBLIC_BOOKING_URL. Mientras no exista,
 * BookingCTA deriva al formulario de contacto.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

/** Línea profesional de WhatsApp (distinta del teléfono personal). */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP || "56966828311";

/** Teléfono profesional en formato legible (NAP del footer). */
export const PHONE_DISPLAY = "+56 9 6682 8311";

/** Sede de jornadas presenciales de evaluación (única dirección publicable). */
export const ADDRESS = {
  street: "Carlos Dittborn 0118",
  city: "Arica",
  region: "Arica y Parinacota",
  country: "CL",
  label: "Carlos Dittborn 0118, Arica",
  role: "Sede de jornadas presenciales de evaluación",
} as const;

export const SOCIAL = {
  linkedin:
    "https://www.linkedin.com/in/daniela-alejandra-kaiser-ortiz-3b8a0968",
  instagram: "https://www.instagram.com/psicofono.danielakaiser",
} as const;

/** Registros visibles en TrustBar y footer. */
export const REGISTROS = {
  superintendencia: "Registro Superintendencia de Salud N° 65811",
  colegioFono: "Colegio de Fonoaudiólogos N° 551",
  mineduc: "Registro MINEDUC N° 6404",
  ivadec: "Evaluadora IVADEC-CIF (MINSAL)",
} as const;

/** Horario de atención (hora de Chile continental). Días pendientes. */
export const HORARIO = {
  bloques: ["17:30–18:30", "18:30–19:30"],
  rango: "17:30 a 19:30 h (hora de Chile continental)",
  dias: "[PLACEHOLDER: confirmar días de la semana]",
} as const;

/** Precios públicos. Las evaluaciones se cobran como proceso completo
 *  (regla 10.3) y su precio sigue pendiente. */
export const PRECIOS = {
  sesionTerapia: "$40.000",
  abonoReserva: "$5.000",
  radiestesia: "[PLACEHOLDER: precio de la sesión de radiestesia]",
  evaluacionProceso:
    "[PLACEHOLDER: precio del proceso completo — lo define Daniela]",
  /** Precio por evaluación (proceso completo). Reemplazar cada
   *  placeholder cuando Daniela defina los valores. */
  evaluaciones: {
    autismo: "[PLACEHOLDER: precio proceso completo — autismo]",
    tdah: "[PLACEHOLDER: precio proceso completo — TDAH]",
    lenguaje: "[PLACEHOLDER: precio proceso completo — lenguaje]",
  },
} as const;

export const PREVISION =
  "Boleta de honorarios reembolsable en Isapre y seguros complementarios";

/** Devuelve `fallback` amable cuando el valor sigue siendo un
 *  `[PLACEHOLDER: ...]` sin definir, para no mostrar el corchete crudo
 *  en las páginas públicas. */
export function siPendiente(valor: string, fallback: string): string {
  return valor.trim().startsWith("[PLACEHOLDER") ? fallback : valor;
}

/** Mensajes precargados del WhatsApp FAB según página (sección 4.2). */
export const WHATSAPP_MESSAGES = {
  autismo: "Hola Daniela, quiero información sobre la evaluación de autismo.",
  tdah: "Hola Daniela, quiero información sobre la evaluación de TDAH.",
  terapias: "Hola Daniela, quiero agendar una hora de terapia.",
  default: "Hola Daniela, quiero agendar una hora.",
} as const;

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Opciones del select "motivo" del formulario de contacto. */
export const MOTIVOS_CONTACTO = [
  "Evaluación de autismo",
  "Evaluación de TDAH",
  "Evaluación de lenguaje",
  "Psicoterapia infanto-juvenil",
  "Psicoterapia de adultos",
  "Acompañamiento en duelo",
  "Otro motivo",
] as const;
