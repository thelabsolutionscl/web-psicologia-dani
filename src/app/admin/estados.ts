import type { EstadoReserva } from "@/lib/reservas-db";

/**
 * Configuración de estados para el panel: etiquetas en lenguaje humano
 * (no técnicas), color del badge y transiciones disponibles. Datos puros,
 * usados tanto por el Server Component de la página como por los botones
 * cliente, para no duplicar la lógica.
 */
export const ESTADO_INFO: Record<
  EstadoReserva,
  { label: string; badge: string; requiereAccion?: boolean }
> = {
  solicitada: {
    label: "Por confirmar",
    badge: "bg-anahuaca text-white",
    requiereAccion: true,
  },
  confirmada: { label: "Confirmada", badge: "bg-pacifico text-white" },
  pagada: { label: "Pagada ✓", badge: "bg-[#33222a] text-white" },
  realizada: {
    label: "Atendida",
    badge: "border border-arena text-quebrada/70",
  },
  cancelada: {
    label: "Cancelada",
    badge: "border border-arena text-quebrada/60 line-through",
  },
  no_show: {
    label: "No asistió",
    badge: "border border-anahuaca/50 text-anahuaca",
  },
};

/** Estados que la administradora puede tener “en curso” (para filtros). */
export const FILTROS: { valor: string; label: string }[] = [
  { valor: "", label: "Todas" },
  { valor: "solicitada", label: "Por confirmar" },
  { valor: "confirmada", label: "Confirmadas" },
  { valor: "pagada", label: "Pagadas" },
];

type Transicion = { estado: EstadoReserva; label: string; destructiva?: boolean };

/** Acciones posibles según el estado actual. */
export const TRANSICIONES: Record<EstadoReserva, Transicion[]> = {
  solicitada: [
    { estado: "confirmada", label: "Confirmar" },
    { estado: "cancelada", label: "Cancelar", destructiva: true },
  ],
  confirmada: [
    { estado: "pagada", label: "Marcar pagada" },
    { estado: "no_show", label: "No asistió", destructiva: true },
    { estado: "cancelada", label: "Cancelar", destructiva: true },
  ],
  pagada: [
    { estado: "realizada", label: "Marcar atendida" },
    { estado: "no_show", label: "No asistió", destructiva: true },
  ],
  realizada: [],
  cancelada: [],
  no_show: [],
};

/** Solo dígitos con código país para armar el enlace de WhatsApp. */
export function telANumeroWa(telefono: string): string {
  const d = telefono.replace(/\D/g, "");
  if (d.startsWith("56")) return d;
  // Móvil chileno de 9 dígitos (parte con 9) → anteponer 56.
  if (d.length === 9 && d.startsWith("9")) return "56" + d;
  if (d.length === 8) return "569" + d; // sin el 9 inicial
  return d;
}
