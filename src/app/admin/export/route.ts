import { sesionAdminActiva } from "@/lib/admin-auth";
import { reservasACSV } from "@/lib/csv";
import { listReservas } from "@/lib/reservas-db";

/**
 * Exporta todas las reservas a CSV para respaldo o contabilidad. Solo
 * accesible con sesión de administradora; la cookie tiene path /admin,
 * por eso esta ruta vive bajo /admin.
 */
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  if (!(await sesionAdminActiva())) {
    return new Response("No autorizado", { status: 401 });
  }

  const csv = reservasACSV(await listReservas());
  const hoy = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="reservas-${hoy}.csv"`,
      "cache-control": "no-store",
    },
  });
}
