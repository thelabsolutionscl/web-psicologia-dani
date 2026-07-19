/** Skeleton del panel mientras se consultan las reservas en la base. */
export default function AdminLoading() {
  return (
    <div role="status" aria-label="Cargando el panel" className="space-y-10">
      <span className="sr-only">Cargando…</span>
      <div className="h-8 w-40 animate-pulse rounded-lg bg-arena/70" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl border border-arena bg-superficie"
          />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-2xl border border-arena bg-superficie" />
    </div>
  );
}
