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

/**
 * Ubicación de las jornadas presenciales de evaluación. Por decisión de
 * Daniela (ajustes 2026) NO se publica la dirección exacta: se comunica
 * solo a nivel de ciudad ("atención presencial en Arica"), y la dirección
 * se coordina de forma privada al agendar.
 */
export const ADDRESS = {
  city: "Arica",
  region: "Arica y Parinacota",
  country: "CL",
  label: "Arica",
  role: "Atención presencial de evaluación en Arica",
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

/** Precios públicos (aranceles definidos por Daniela, ajustes 2026).
 *  Todas las sesiones/primeras entrevistas valen lo mismo; las
 *  evaluaciones y el IVADEC se informan según su proceso. */
export const PRECIOS = {
  /** Valor por sesión de las atenciones clínicas (todas $45.000). */
  sesion: "$45.000",
  /** Alias histórico de `sesion` para no romper componentes previos. */
  sesionTerapia: "$45.000",
  abonoReserva: "$5.000",
  radiestesia: "$45.000",
  /** Primera sesión (entrevista y orientación) de las evaluaciones
   *  diagnósticas del neurodesarrollo; el valor final depende de los
   *  instrumentos que requiera cada caso (se informa previamente). */
  evaluacionPrimeraSesion: "$45.000",
  evaluacionProceso:
    "Primera sesión $45.000 · valor final según el proceso de evaluación",
  /** IVADEC-CIF (Instrumento de Valoración y Desempeño en Comunidad). */
  ivadec: {
    /** Solo evaluación e informe (el consultante lo presenta ante COMPIN). */
    opcion1: "$60.000",
    /** Evaluación + acompañamiento y presentación ante COMPIN. */
    opcion2: "$100.000",
  },
  /** Primera reunión de capacitaciones y asesorías (diagnóstico /
   *  levantamiento de necesidades); las siguientes se ajustan al alcance. */
  capacitacionPrimeraReunion: "$45.000",
  /** Precio por evaluación (primera sesión). Se mantienen las claves por
   *  compatibilidad con las páginas de producto. */
  evaluaciones: {
    autismo: "$45.000",
    tdah: "$45.000",
    lenguaje: "$45.000",
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
  "Fonoaudiología",
  "Orientación familiar",
  "Psicología perinatal y lactancia materna",
  "Terapia integral y desarrollo personal",
  "Primeros auxilios psicológicos",
  "IVADEC-CIF (evaluación de discapacidad)",
  "Capacitaciones y asesorías",
  "Otro motivo",
] as const;
