"use client";

import { useActionState } from "react";
import {
  crearReservaManualAction,
  type ReservaManualState,
} from "@/app/actions/admin";
import { BLOQUES, SERVICIOS } from "@/lib/booking";

const campo =
  "mt-1 block min-h-11 w-full rounded-lg border border-arena bg-superficie px-3 font-sans text-base";

/**
 * Formulario de reserva manual con feedback: usa useActionState para
 * mostrar si la reserva se agregó o si el cupo ya estaba tomado (antes
 * fallaba en silencio).
 */
export function ReservaManualForm() {
  const [estado, formAction, enviando] = useActionState<
    ReservaManualState,
    FormData
  >(crearReservaManualAction, null);

  return (
    <form action={formAction} className="mt-4 grid gap-3 sm:grid-cols-2">
      <label className="font-sans text-sm font-semibold">
        Servicio
        <select name="servicioId" required className={campo}>
          {SERVICIOS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </label>
      <label className="font-sans text-sm font-semibold">
        Fecha
        <input type="date" name="fecha" required className={campo} />
      </label>
      <label className="font-sans text-sm font-semibold">
        Bloque
        <select name="bloque" required className={campo}>
          {BLOQUES.map((b) => (
            <option key={b} value={b}>
              {b} h
            </option>
          ))}
        </select>
      </label>
      <label className="font-sans text-sm font-semibold">
        Nombre del paciente
        <input type="text" name="nombre" required className={campo} />
      </label>
      <label className="font-sans text-sm font-semibold">
        Teléfono
        <input type="tel" name="telefono" className={campo} />
      </label>
      <label className="font-sans text-sm font-semibold">
        Correo (opcional)
        <input type="email" name="correo" className={campo} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={enviando}
          className="inline-flex min-h-11 items-center rounded-full bg-pacifico px-6 font-sans text-sm font-semibold text-white hover:bg-pacifico/90 disabled:opacity-60"
        >
          {enviando ? "Guardando…" : "Agregar como confirmada"}
        </button>
      </div>
      {estado ? (
        <p
          role="alert"
          className={`sm:col-span-2 rounded-lg px-4 py-2 font-sans text-sm font-semibold ${
            estado.ok
              ? "bg-pacifico/10 text-enlace"
              : "bg-quebrada/10 text-quebrada"
          }`}
        >
          {estado.mensaje}
        </p>
      ) : null}
    </form>
  );
}
