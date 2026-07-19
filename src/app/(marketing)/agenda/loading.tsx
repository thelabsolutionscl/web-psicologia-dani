/** Skeleton de la agenda (ruta dinámica) mientras responde el servidor. */
export default function AgendaLoading() {
  return (
    <div
      role="status"
      aria-label="Cargando la agenda"
      className="mx-auto max-w-3xl px-4 pt-14 pb-16 sm:pt-20"
    >
      <span className="sr-only">Cargando…</span>
      <div className="mx-auto h-5 w-32 animate-pulse rounded-lg bg-arena/70" />
      <div className="mx-auto mt-4 h-9 w-64 animate-pulse rounded-lg bg-arena/70" />
      <div className="mx-auto mt-6 h-16 w-full max-w-xl animate-pulse rounded-lg bg-arena/50" />
      <div className="mt-10 h-96 animate-pulse rounded-2xl border border-arena bg-superficie" />
    </div>
  );
}
