import {
  crearBloqueoAction,
  eliminarBloqueoAction,
  guardarDiasAtencion,
} from "@/app/actions/admin";
import { Card } from "@/components/ui/Card";
import { requireAdmin } from "@/lib/admin-auth";
import { BLOQUES, DIAS_ATENCION } from "@/lib/booking";
import {
  dbConfigured,
  getDiasAtencion,
  listBloqueos,
} from "@/lib/reservas-db";

export const dynamic = "force-dynamic";

const NOMBRES_DIAS = [
  { valor: 1, nombre: "Lunes" },
  { valor: 2, nombre: "Martes" },
  { valor: 3, nombre: "Miércoles" },
  { valor: 4, nombre: "Jueves" },
  { valor: 5, nombre: "Viernes" },
  { valor: 6, nombre: "Sábado" },
  { valor: 0, nombre: "Domingo" },
];

export default async function AdminDisponibilidadPage() {
  await requireAdmin();

  if (!dbConfigured()) {
    return (
      <p className="rounded-2xl border border-arena bg-superficie p-6 text-base text-quebrada/90">
        La base de reservas no está configurada: faltan las variables{" "}
        <code className="font-sans">SUPABASE_URL</code> y{" "}
        <code className="font-sans">SUPABASE_SERVICE_ROLE_KEY</code>.
      </p>
    );
  }

  const hoy = new Date().toISOString().slice(0, 10);
  const [diasConfig, bloqueos] = await Promise.all([
    getDiasAtencion(),
    listBloqueos(hoy),
  ]);
  const diasActivos = diasConfig ?? DIAS_ATENCION;

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Disponibilidad
      </h1>

      {/* Días de atención semanales */}
      <Card>
        <h2 className="font-sans text-lg font-bold">Días de atención</h2>
        <p className="mt-2 font-sans text-sm text-quebrada/80">
          Los días marcados aparecen en la agenda pública con los dos bloques
          de siempre ({BLOQUES.join(" y ")} h, hora de Chile continental).
        </p>
        <form action={guardarDiasAtencion} className="mt-4">
          <div className="flex flex-wrap gap-2">
            {NOMBRES_DIAS.map((dia) => (
              <label
                key={dia.valor}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-arena bg-superficie px-4 font-sans text-sm font-semibold has-checked:border-pacifico has-checked:bg-pacifico/10"
              >
                <input
                  type="checkbox"
                  name="dias"
                  value={dia.valor}
                  defaultChecked={diasActivos.includes(dia.valor)}
                  className="accent-pacifico"
                />
                {dia.nombre}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-pacifico px-6 font-sans text-sm font-semibold text-white hover:bg-pacifico/90"
          >
            Guardar días
          </button>
        </form>
      </Card>

      {/* Bloqueos puntuales */}
      <Card>
        <h2 className="font-sans text-lg font-bold">Fechas bloqueadas</h2>
        <p className="mt-2 font-sans text-sm text-quebrada/80">
          Para vacaciones, jornadas presenciales de evaluación en Arica u
          otros compromisos. Un bloqueo de día completo saca ambos cupos de la
          agenda.
        </p>

        <form
          action={crearBloqueoAction}
          className="mt-4 flex flex-wrap items-end gap-3"
        >
          <label className="font-sans text-sm font-semibold">
            Fecha
            <input
              type="date"
              name="fecha"
              required
              min={hoy}
              className="mt-1 block min-h-11 rounded-lg border border-arena bg-superficie px-3 font-sans text-base"
            />
          </label>
          <label className="font-sans text-sm font-semibold">
            Bloque
            <select
              name="bloque"
              className="mt-1 block min-h-11 rounded-lg border border-arena bg-superficie px-3 font-sans text-base"
            >
              <option value="">Día completo</option>
              {BLOQUES.map((b) => (
                <option key={b} value={b}>
                  {b} h
                </option>
              ))}
            </select>
          </label>
          <label className="grow font-sans text-sm font-semibold">
            Motivo (opcional)
            <input
              type="text"
              name="motivo"
              placeholder="Ej: jornada de evaluación en Arica"
              className="mt-1 block min-h-11 w-full rounded-lg border border-arena bg-superficie px-3 font-sans text-base placeholder:text-quebrada/70"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full bg-pacifico px-6 font-sans text-sm font-semibold text-white hover:bg-pacifico/90"
          >
            Bloquear
          </button>
        </form>

        {bloqueos.length > 0 ? (
          <ul className="mt-6 divide-y divide-arena">
            {bloqueos.map((bloqueo) => (
              <li
                key={bloqueo.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3 font-sans text-sm"
              >
                <span>
                  <span className="font-semibold">{bloqueo.fecha}</span> ·{" "}
                  {bloqueo.bloque ? `${bloqueo.bloque} h` : "día completo"}
                  {bloqueo.motivo ? (
                    <span className="text-quebrada/70"> — {bloqueo.motivo}</span>
                  ) : null}
                </span>
                <form action={eliminarBloqueoAction}>
                  <input type="hidden" name="id" value={bloqueo.id} />
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center rounded-full border border-arena px-4 font-semibold text-quebrada/80 hover:border-quebrada/40"
                  >
                    Quitar
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 font-sans text-sm text-quebrada/70">
            No hay fechas bloqueadas desde hoy.
          </p>
        )}
      </Card>
    </div>
  );
}
