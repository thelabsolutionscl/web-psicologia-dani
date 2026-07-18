/**
 * Punto único de reporte de errores. Hoy registra en consola (visible en
 * los logs de Vercel). Está listo para conectar Sentry u otro proveedor
 * sin tocar los componentes: cuando exista NEXT_PUBLIC_SENTRY_DSN se
 * instala el SDK y se completa `enviarAProveedor`.
 *
 * Uso desde un Error Boundary:
 *   useEffect(() => reportError(error, { boundary: "app" }), [error]);
 */

type Contexto = Record<string, string | number | boolean | undefined>;

function enviarAProveedor(error: unknown, contexto?: Contexto): void {
  // Gancho para Sentry (u otro). Se activa al configurar el DSN:
  //   1) npm i @sentry/nextjs && npx @sentry/wizard -i nextjs
  //   2) Sentry.captureException(error, { extra: contexto });
  // Mientras no haya DSN, no hacemos nada aquí (el console.error de abajo
  // deja igualmente traza en los logs del servidor).
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  void error;
  void contexto;
}

export function reportError(error: unknown, contexto?: Contexto): void {
  const detalle =
    error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  console.error("[app] error capturado:", detalle, contexto ?? "");
  try {
    enviarAProveedor(error, contexto);
  } catch {
    // El reporte de errores jamás debe lanzar por su cuenta.
  }
}
