import { actualizarEstadoReserva, logoutAdmin } from "@/app/actions/admin";
import { ReservaManualForm } from "@/app/admin/ReservaManualForm";
import { requireAdmin } from "@/lib/admin-auth";
import {
  dbConfigured,
  listReservas,
  type EstadoReserva,
  type Reserva,
} from "@/lib/reservas-db";

export const dynamic = "force-dynamic";

const ACTIVAS: EstadoReserva[] = ["confirmada", "pagada"];

function Metricas({ reservas }: { reservas: Reserva[] }) {
  const hoy = new Date().toISOString().slice(0, 10);
  const en7 = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  const mes = hoy.slice(0, 7);

  const pendientes = reservas.filter((r) => r.estado === "solicitada").length;
  const hoyCount = reservas.filter(
    (r) => r.fecha === hoy && ACTIVAS.includes(r.estado),
  ).length;
  const semana = reservas.filter(
    (r) => r.fecha >= hoy && r.fecha <= en7 && ACTIVAS.includes(r.estado),
  ).length;
  const delMes = reservas.filter(
    (r) => r.fecha.startsWith(mes) && ACTIVAS.includes(r.estado),
  ).length;

  const tarjetas = [
    { label: "Solicitudes por confirmar", valor: pendientes, alerta: pendientes > 0 },
    { label: "Confirmadas hoy", valor: hoyCount },
    { label: "Próximos 7 días", valor: semana },
    { label: "Confirmadas este mes", valor: delMes },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {tarjetas.map((t) => (
        <div
          key={t.label}
          className={`rounded-2xl border bg-superficie p-5 ${
            t.alerta ? "border-pacifico" : "border-arena"
          }`}
        >
          <p className="font-sans text-3xl font-bold text-quebrada">{t.valor}</p>
          <p className="mt-1 font-sans text-sm text-quebrada/70">{t.label}</p>
        </div>
      ))}
    </div>
  );
}

function NuevaReservaManual() {
  return (
    <details className="rounded-2xl border border-arena bg-superficie p-5">
      <summary className="cursor-pointer font-sans text-base font-bold text-quebrada">
        + Ingresar reserva manual (hora tomada por WhatsApp o teléfono)
      </summary>
      <ReservaManualForm />
    </details>
  );
}

const badgeEstado: Record<EstadoReserva, string> = {
  solicitada: "bg-arena text-quebrada",
  confirmada: "bg-pacifico text-white",
  pagada: "bg-[#33222a] text-white",
  realizada: "border border-arena text-quebrada/70",
  cancelada: "border border-arena text-quebrada/70 line-through",
};

/** Transiciones disponibles por estado. */
const transiciones: Record<EstadoReserva, { estado: EstadoReserva; label: string }[]> = {
  solicitada: [
    { estado: "confirmada", label: "Confirmar" },
    { estado: "cancelada", label: "Cancelar" },
  ],
  confirmada: [
    { estado: "pagada", label: "Marcar pagada" },
    { estado: "cancelada", label: "Cancelar" },
  ],
  pagada: [
    { estado: "realizada", label: "Marcar realizada" },
    { estado: "cancelada", label: "Cancelar" },
  ],
  realizada: [],
  cancelada: [],
};

function FilaReserva({ reserva }: { reserva: Reserva }) {
  return (
    <tr className="border-t border-arena align-top">
      <td className="px-3 py-3 font-sans text-sm whitespace-nowrap">
        <span className="font-semibold">{reserva.fecha}</span>
        <span className="block text-quebrada/70">{reserva.bloque} h</span>
      </td>
      <td className="px-3 py-3 font-sans text-sm">{reserva.servicio_nombre}</td>
      <td className="px-3 py-3 font-sans text-sm">
        <span className="font-semibold">{reserva.nombre}</span>
        <a
          href={`mailto:${reserva.correo}`}
          className="block text-enlace hover:underline"
        >
          {reserva.correo}
        </a>
        <span className="block text-quebrada/70">{reserva.telefono}</span>
        {reserva.mensaje ? (
          <details className="mt-1">
            <summary className="cursor-pointer text-enlace">
              Ver comentario
            </summary>
            <p className="mt-1 max-w-xs text-quebrada/90">{reserva.mensaje}</p>
          </details>
        ) : null}
      </td>
      <td className="px-3 py-3">
        <span
          className={`inline-block rounded-full px-3 py-1 font-sans text-sm font-semibold ${
            badgeEstado[reserva.estado] ?? "bg-arena text-quebrada"
          }`}
        >
          {reserva.estado}
        </span>
      </td>
      <td className="px-3 py-3">
        <div className="flex flex-wrap gap-2">
          {(transiciones[reserva.estado] ?? []).map((t) => (
            <form key={t.estado} action={actualizarEstadoReserva}>
              <input type="hidden" name="id" value={reserva.id} />
              <input type="hidden" name="estado" value={t.estado} />
              <button
                type="submit"
                className={`inline-flex min-h-11 items-center rounded-full px-4 font-sans text-sm font-semibold transition-colors ${
                  t.estado === "cancelada"
                    ? "border border-arena text-quebrada/80 hover:border-quebrada/40"
                    : "bg-pacifico text-white hover:bg-pacifico/90"
                }`}
              >
                {t.label}
              </button>
            </form>
          ))}
        </div>
      </td>
    </tr>
  );
}

function TablaReservas({ reservas }: { reservas: Reserva[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-arena bg-superficie">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="font-sans text-sm text-quebrada/70">
            <th className="px-3 py-3 font-semibold">Fecha</th>
            <th className="px-3 py-3 font-semibold">Servicio</th>
            <th className="px-3 py-3 font-semibold">Contacto</th>
            <th className="px-3 py-3 font-semibold">Estado</th>
            <th className="px-3 py-3 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <FilaReserva key={reserva.id} reserva={reserva} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminReservasPage() {
  await requireAdmin();

  if (!dbConfigured()) {
    return (
      <p className="rounded-2xl border border-arena bg-superficie p-6 text-base text-quebrada/90">
        La base de reservas no está configurada: faltan las variables{" "}
        <code className="font-sans">SUPABASE_URL</code> y{" "}
        <code className="font-sans">SUPABASE_SERVICE_ROLE_KEY</code> (ver
        README).
      </p>
    );
  }

  const reservas = await listReservas();
  const hoy = new Date().toISOString().slice(0, 10);
  const proximas = reservas.filter((r) => r.fecha >= hoy);
  const pasadas = reservas.filter((r) => r.fecha < hoy).reverse();

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Reservas
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/admin/export"
            className="inline-flex min-h-11 items-center rounded-full border border-arena px-4 font-sans text-sm font-semibold text-quebrada/80 hover:border-quebrada/40"
          >
            Exportar reservas (CSV)
          </a>
          <a
            href="/admin/export-boletin"
            className="inline-flex min-h-11 items-center rounded-full border border-arena px-4 font-sans text-sm font-semibold text-quebrada/80 hover:border-quebrada/40"
          >
            Exportar boletín (CSV)
          </a>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-full border border-arena px-4 font-sans text-sm font-semibold text-quebrada/80 hover:border-quebrada/40"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      <Metricas reservas={reservas} />
      <NuevaReservaManual />

      <section>
        <h2 className="mb-3 font-sans text-lg font-bold">
          Próximas ({proximas.length})
        </h2>
        {proximas.length > 0 ? (
          <TablaReservas reservas={proximas} />
        ) : (
          <p className="text-base text-quebrada/70">
            No hay reservas próximas.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-sans text-lg font-bold">
          Pasadas ({pasadas.length})
        </h2>
        {pasadas.length > 0 ? (
          <TablaReservas reservas={pasadas} />
        ) : (
          <p className="text-base text-quebrada/70">Sin historial todavía.</p>
        )}
      </section>
    </div>
  );
}
