"use client";

import { actualizarEstadoReserva } from "@/app/actions/admin";
import type { EstadoReserva } from "@/lib/reservas-db";
import { TRANSICIONES } from "./estados";

/**
 * Botones de acción de una reserva. Las acciones destructivas (cancelar,
 * marcar "no asistió") piden confirmación para evitar toques accidentales
 * que liberen un cupo por error.
 */
export function AccionesEstado({
  id,
  estado,
  nombre,
}: {
  id: string;
  estado: EstadoReserva;
  nombre: string;
}) {
  const transiciones = TRANSICIONES[estado] ?? [];
  if (transiciones.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {transiciones.map((t) => (
        <form
          key={t.estado}
          action={actualizarEstadoReserva}
          onSubmit={(e) => {
            if (
              t.destructiva &&
              !window.confirm(
                `¿Seguro que quieres marcar la reserva de ${nombre} como “${t.label}”? Esta acción libera el cupo.`,
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="estado" value={t.estado} />
          <button
            type="submit"
            className={`inline-flex min-h-11 items-center rounded-full px-4 font-sans text-sm font-semibold transition-colors ${
              t.destructiva
                ? "border border-arena text-quebrada/80 hover:border-quebrada/40"
                : "bg-pacifico text-white hover:bg-pacifico/90"
            }`}
          >
            {t.label}
          </button>
        </form>
      ))}
    </div>
  );
}
