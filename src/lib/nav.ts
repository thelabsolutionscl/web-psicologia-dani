/**
 * Navegación del sitio — única fuente de verdad para el menú (Header) y el
 * footer, para que sus secciones siempre coincidan.
 */
export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/evaluaciones", label: "Evaluaciones" },
  { href: "/servicios/perinatal", label: "Materna" },
  { href: "/terapias", label: "Terapias y valores" },
  { href: "/atencion-online", label: "Modalidad de atención" },
  { href: "/agenda", label: "Reserva de horas" },
  { href: "/blog", label: "Blog" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/contacto", label: "Contacto" },
];

/** Enlaces legales (solo en el footer). */
export const LEGAL_LINKS: NavLink[] = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos y condiciones" },
];
