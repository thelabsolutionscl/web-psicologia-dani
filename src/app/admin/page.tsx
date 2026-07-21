import { logoutAdmin } from "@/app/actions/admin";
import { AccionesEstado } from "@/app/admin/AccionesEstado";
import { ContactoRapido } from "@/app/admin/ContactoRapido";
import { ESTADO_INFO, FILTROS } from "@/app/admin/estados";
import { NotaReserva } from "@/app/admin/NotaReserva";
import { ReservaManualForm } from "@/app/admin/ReservaManualForm";
import { requireAdmin } from "@/lib/admin-auth";
import {
  dbConfigured,
  ESTADOS_RESERVA,
  listReservas,
  type EstadoReserva,
  type Reserva,
} from "@/lib/reservas-db";
import { PRECIOS } from "@/lib/site";

export const dynamic = "force-dynamic";

const ACTIVAS: EstadoReserva[] = ["confirmada", "pagada"];
const POR_PAGINA = 20;

const ABONO_CLP = Number(PRECIOS.abonoReserva.replace(/[^\d]/g, "")) || 0;
const clp = (n: number) =>
  n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

function fechaLarga(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

/* ------------------------------------------------------------------ */

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
  const abonosMes = reservas.filter(
    (r) => r.fecha.startsWith(mes) && r.estado === "pagada",
  ).length;

  const tarjetas = [
    { label: "Por confirmar", valor: pendientes, alerta: pendientes > 0 },
    { label: "Confirmadas hoy", valor: hoyCount },
    { label: "Próximos 7 días", valor: semana },
    { label: "Confirmadas este mes", valor: delMes },
    { label: "Abonos recibidos este mes", valor: clp(abonosMes * ABONO_CLP) },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {tarjetas.map((t) => (
        <div
          key={t.label}
          className={`rounded-2xl border bg-superficie p-5 ${
            t.alerta ? "border-pacifico" : "border-arena"
          }`}
        >
          <p className="font-sans text-2xl font-bold tracking-tight text-quebrada tabular-nums lg:text-3xl">
            {t.valor}
          </p>
          <p className="mt-1 font-sans text-sm text-quebrada/70">{t.label}</p>
        </div>
      ))}
    </div>
  );
}

function EstadoBadge({ estado }: { estado: EstadoReserva }) {
  const info = ESTADO_INFO[estado];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 font-sans text-sm font-semibold ${info.badge}`}
    >
      {info.label}
    </span>
  );
}

/** Tarjeta de una reserva: se lee y se toca cómodo también en el celular. */
function ReservaCard({ reserva }: { reserva: Reserva }) {
  const porConfirmar = reserva.estado === "solicitada";
  return (
    <article
      className={`rounded-2xl border bg-superficie p-4 sm:p-5 ${
        porConfirmar ? "border-anahuaca/60" : "border-arena"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-sans text-base font-bold text-quebrada first-letter:uppercase">
            {fechaLarga(reserva.fecha)}
          </p>
          <p className="font-sans text-sm text-quebrada/70">
            {reserva.bloque} h · {reserva.servicio_nombre}
          </p>
        </div>
        <EstadoBadge estado={reserva.estado} />
      </div>

      {reserva.estado === "confirmada" ? (
        <p className="mt-2 font-sans text-sm font-semibold text-anahuaca">
          💳 Abono/saldo pendiente de cobro.
        </p>
      ) : null}

      <div className="mt-3">
        <p className="font-sans text-base font-semibold text-quebrada">
          {reserva.nombre}
        </p>
        <a
          href={`mailto:${reserva.correo}`}
          className="font-sans text-sm text-enlace hover:underline"
        >
          {reserva.correo}
        </a>
        <span className="ml-2 font-sans text-sm text-quebrada/70">
          {reserva.telefono}
        </span>
        <ContactoRapido
          nombre={reserva.nombre}
          correo={reserva.correo}
          telefono={reserva.telefono}
          servicio={reserva.servicio_nombre}
          fecha={reserva.fecha}
          bloque={reserva.bloque}
        />
      </div>

      {reserva.mensaje ? (
        <details className="mt-3">
          <summary className="cursor-pointer font-sans text-sm font-semibold text-enlace">
            Ver comentario del paciente
          </summary>
          <p className="mt-1 font-sans text-sm text-quebrada/90">
            {reserva.mensaje}
          </p>
        </details>
      ) : null}

      <NotaReserva id={reserva.id} notas={reserva.notas} />

      <div className="mt-4">
        <AccionesEstado
          id={reserva.id}
          estado={reserva.estado}
          nombre={reserva.nombre}
        />
      </div>
    </article>
  );
}

function ListaReservas({ reservas }: { reservas: Reserva[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {reservas.map((r) => (
        <ReservaCard key={r.id} reserva={r} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default async function AdminReservasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; p?: string; estado?: string }>;
}) {
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

  const sp = await searchParams;
  const q = sp.q ?? "";
  const consulta = q.trim().toLowerCase();
  const pagina = Math.max(1, Number(sp.p) || 1);
  const estadoFiltro = (ESTADOS_RESERVA as readonly string[]).includes(
    sp.estado ?? "",
  )
    ? (sp.estado as EstadoReserva)
    : "";

  const todas = await listReservas();
  const hoy = new Date().toISOString().slice(0, 10);

  const reservas = todas.filter((r) => {
    if (estadoFiltro && r.estado !== estadoFiltro) return false;
    if (
      consulta &&
      !`${r.nombre} ${r.correo} ${r.telefono} ${r.servicio_nombre}`
        .toLowerCase()
        .includes(consulta)
    )
      return false;
    return true;
  });

  // Agenda de hoy: siempre completa (ignora búsqueda/filtro), para vistazo.
  const agendaHoy = todas
    .filter(
      (r) => r.fecha === hoy && r.estado !== "cancelada" && r.estado !== "no_show",
    )
    .sort((a, b) => a.bloque.localeCompare(b.bloque));

  const pendientes = todas.filter((r) => r.estado === "solicitada").length;

  const proximas = reservas.filter((r) => r.fecha > hoy);
  const pasadasTodas = reservas.filter((r) => r.fecha < hoy).reverse();
  const totalPaginas = Math.max(1, Math.ceil(pasadasTodas.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const pasadas = pasadasTodas.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA,
  );

  const base = (extra: Record<string, string>) => {
    const params = new URLSearchParams();
    if (consulta) params.set("q", q);
    if (estadoFiltro) params.set("estado", estadoFiltro);
    for (const [k, v] of Object.entries(extra)) params.set(k, v);
    const s = params.toString();
    return s ? `/admin?${s}` : "/admin";
  };
  const chipHref = (valor: string) => {
    const params = new URLSearchParams();
    if (consulta) params.set("q", q);
    if (valor) params.set("estado", valor);
    const s = params.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  const btn =
    "inline-flex min-h-11 items-center rounded-full border border-arena px-4 font-sans text-sm font-semibold text-quebrada/80 hover:border-quebrada/40";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Reservas
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <a href="/admin/export" className={btn}>
            Exportar reservas
          </a>
          <a href="/admin/export-boletin" className={btn}>
            Exportar boletín
          </a>
          <a href="/admin/disponibilidad" className={btn}>
            Días y bloqueos
          </a>
          <form action={logoutAdmin}>
            <button type="submit" className={btn}>
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Aviso de lo que necesita acción */}
      {pendientes > 0 ? (
        <a
          href={chipHref("solicitada")}
          className="flex items-center justify-between gap-3 rounded-2xl border border-anahuaca bg-anahuaca/5 px-5 py-4 font-sans hover:bg-anahuaca/10"
        >
          <span className="text-base font-bold text-anahuaca">
            ⚠️ Tienes {pendientes} solicitud{pendientes === 1 ? "" : "es"} por
            confirmar
          </span>
          <span className="shrink-0 text-sm font-semibold text-anahuaca underline">
            Ver ahora
          </span>
        </a>
      ) : null}

      {/* Agenda de hoy */}
      <section>
        <h2 className="mb-3 font-sans text-lg font-bold first-letter:uppercase">
          Hoy — {fechaLarga(hoy)}
        </h2>
        {agendaHoy.length > 0 ? (
          <ListaReservas reservas={agendaHoy} />
        ) : (
          <p className="rounded-2xl border border-arena bg-superficie px-5 py-4 text-base text-quebrada/70">
            No tienes citas para hoy.
          </p>
        )}
      </section>

      <Metricas reservas={todas} />

      <details className="rounded-2xl border border-arena bg-superficie p-5">
        <summary className="cursor-pointer font-sans text-base font-bold text-quebrada">
          + Ingresar reserva manual (hora tomada por WhatsApp o teléfono)
        </summary>
        <ReservaManualForm />
      </details>

      {/* Buscador + filtros rápidos */}
      <div className="space-y-3">
        <form method="get" className="flex flex-wrap gap-2">
          {estadoFiltro ? (
            <input type="hidden" name="estado" value={estadoFiltro} />
          ) : null}
          <label htmlFor="q" className="sr-only">
            Buscar por nombre, correo o servicio
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Buscar por nombre, correo, teléfono o servicio…"
            className="min-h-11 flex-1 rounded-full border border-arena bg-superficie px-4 font-sans text-sm text-quebrada outline-none focus:border-pacifico"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full bg-pacifico px-5 font-sans text-sm font-semibold text-white hover:bg-pacifico/90"
          >
            Buscar
          </button>
          {consulta ? (
            <a href={chipHref(estadoFiltro)} className={btn}>
              Limpiar
            </a>
          ) : null}
        </form>

        <div className="flex flex-wrap gap-2">
          {FILTROS.map((f) => {
            const activo = (estadoFiltro || "") === f.valor;
            return (
              <a
                key={f.valor || "todas"}
                href={chipHref(f.valor)}
                className={`inline-flex min-h-11 items-center rounded-full px-4 font-sans text-sm font-semibold transition-colors ${
                  activo
                    ? "bg-pacifico text-white"
                    : "border border-arena text-quebrada/80 hover:border-pacifico/50"
                }`}
              >
                {f.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Próximas */}
      <section>
        <h2 className="mb-3 font-sans text-lg font-bold">
          Próximas ({proximas.length})
        </h2>
        {proximas.length > 0 ? (
          <ListaReservas reservas={proximas} />
        ) : (
          <p className="text-base text-quebrada/70">
            No hay próximas reservas con este filtro.
          </p>
        )}
      </section>

      {/* Pasadas */}
      <section>
        <h2 className="mb-3 font-sans text-lg font-bold">
          Historial ({pasadasTodas.length})
        </h2>
        {pasadasTodas.length > 0 ? (
          <>
            <ListaReservas reservas={pasadas} />
            {totalPaginas > 1 ? (
              <nav
                aria-label="Paginación del historial"
                className="mt-4 flex items-center justify-between gap-2 font-sans text-sm"
              >
                {paginaActual > 1 ? (
                  <a href={base({ p: String(paginaActual - 1) })} className={btn}>
                    ← Anteriores
                  </a>
                ) : (
                  <span />
                )}
                <span className="text-quebrada/70">
                  Página {paginaActual} de {totalPaginas}
                </span>
                {paginaActual < totalPaginas ? (
                  <a href={base({ p: String(paginaActual + 1) })} className={btn}>
                    Siguientes →
                  </a>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
          </>
        ) : (
          <p className="text-base text-quebrada/70">Sin historial todavía.</p>
        )}
      </section>

      {/* Leyenda de estados */}
      <details className="rounded-2xl border border-arena bg-superficie p-5">
        <summary className="cursor-pointer font-sans text-base font-bold text-quebrada">
          ¿Qué significa cada estado?
        </summary>
        <ul className="mt-3 space-y-2 font-sans text-sm text-quebrada/90">
          <li>
            <EstadoBadge estado="solicitada" /> — llegó por la web y espera que
            la confirmes.
          </li>
          <li>
            <EstadoBadge estado="confirmada" /> — confirmaste la hora; falta
            cobrar el abono/saldo.
          </li>
          <li>
            <EstadoBadge estado="pagada" /> — el abono ya está pagado.
          </li>
          <li>
            <EstadoBadge estado="realizada" /> — la sesión ya se hizo.
          </li>
          <li>
            <EstadoBadge estado="no_show" /> — la persona no llegó a la hora.
          </li>
          <li>
            <EstadoBadge estado="cancelada" /> — se anuló y el cupo quedó libre.
          </li>
        </ul>
      </details>
    </div>
  );
}
