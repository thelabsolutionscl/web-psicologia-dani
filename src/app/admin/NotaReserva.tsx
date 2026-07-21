import { guardarNotaAction } from "@/app/actions/admin";

/**
 * Nota interna por reserva (privada, no la ve el paciente). Un <details>
 * con un formulario que usa la Server Action: funciona sin JavaScript.
 */
export function NotaReserva({
  id,
  notas,
}: {
  id: string;
  notas?: string | null;
}) {
  const tiene = Boolean(notas && notas.trim());
  return (
    <div className="mt-3">
      {tiene ? (
        <p className="rounded-lg bg-arena/40 px-3 py-2 font-sans text-sm text-quebrada/90">
          📝 {notas}
        </p>
      ) : null}
      <details className="mt-1">
        <summary className="cursor-pointer font-sans text-sm font-semibold text-enlace">
          {tiene ? "Editar nota" : "+ Agregar nota interna"}
        </summary>
        <form action={guardarNotaAction} className="mt-2 flex flex-col gap-2">
          <input type="hidden" name="id" value={id} />
          <textarea
            name="notas"
            rows={3}
            defaultValue={notas ?? ""}
            placeholder="Anota algo para ti sobre esta reserva (no lo ve el paciente)."
            className="w-full rounded-lg border border-arena bg-superficie px-3 py-2 font-sans text-sm text-quebrada outline-none focus:border-pacifico"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 w-fit items-center rounded-full bg-pacifico px-4 font-sans text-sm font-semibold text-white hover:bg-pacifico/90"
          >
            Guardar nota
          </button>
        </form>
      </details>
    </div>
  );
}
