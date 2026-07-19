import { sesionAdminActiva } from "@/lib/admin-auth";
import { suscriptoresACSV } from "@/lib/csv";
import { listSuscriptores } from "@/lib/newsletter-db";

/**
 * Exporta los suscriptores del boletín a CSV, para respaldarlos o
 * cargarlos en la herramienta de campañas que se elija (Mailchimp,
 * Resend Broadcasts, etc.). Vive bajo /admin por el path de la cookie.
 */
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  if (!(await sesionAdminActiva())) {
    return new Response("No autorizado", { status: 401 });
  }

  const csv = suscriptoresACSV(await listSuscriptores());
  const hoy = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="boletin-${hoy}.csv"`,
      "cache-control": "no-store",
    },
  });
}
