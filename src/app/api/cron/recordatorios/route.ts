import { NextResponse } from "next/server";
import { recordatorioPaciente } from "@/lib/email";
import {
  marcarRecordada,
  reservasParaRecordar,
} from "@/lib/reservas-db";

/**
 * Cron diario: envía el recordatorio a las reservas cuya sesión es
 * mañana (hora de Chile) y aún no fueron avisadas. Lo dispara Vercel Cron
 * (ver vercel.json) con el header Authorization: Bearer <CRON_SECRET>.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "no autorizado" }, { status: 401 });
    }
  }

  const reservas = await reservasParaRecordar();
  let enviados = 0;
  for (const r of reservas) {
    const ok = await recordatorioPaciente({
      servicioNombre: r.servicio_nombre,
      fecha: r.fecha,
      bloque: r.bloque,
      nombre: r.nombre,
      correo: r.correo,
      telefono: r.telefono,
    });
    // Se marca aunque el correo falle, para no reintentar en bucle al día
    // siguiente; el registro queda igualmente visible en el panel.
    await marcarRecordada(r.id);
    if (ok) enviados++;
  }

  return NextResponse.json({ ok: true, candidatas: reservas.length, enviados });
}
