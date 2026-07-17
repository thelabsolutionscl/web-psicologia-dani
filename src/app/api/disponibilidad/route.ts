import { NextResponse } from "next/server";
import { getAvailableDays } from "@/lib/booking";
import { getSlotsOcupados } from "@/lib/reservas-db";

/**
 * GET /api/disponibilidad — contrato de disponibilidad del sistema de
 * reservas: días ofrecidos + cupos ya ocupados. El dashboard (Fase B)
 * gestionará los días reales; la UI de /agenda consume este endpoint.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const dias = getAvailableDays(new Date());
  const ocupados =
    dias.length > 0
      ? await getSlotsOcupados(dias[0].fecha, dias[dias.length - 1].fecha)
      : [];

  return NextResponse.json(
    { dias, ocupados },
    { headers: { "Cache-Control": "no-store" } },
  );
}
