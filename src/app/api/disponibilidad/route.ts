import { NextResponse } from "next/server";
import { BLOQUES, getAvailableDays } from "@/lib/booking";
import {
  getDiasAtencion,
  getSlotsOcupados,
  listBloqueos,
  type SlotOcupado,
} from "@/lib/reservas-db";

/**
 * GET /api/disponibilidad — días ofrecidos + cupos no disponibles.
 * Combina: reservas activas + bloqueos del panel (un bloqueo de día
 * completo ocupa ambos bloques) + días de atención configurados en el
 * dashboard (fallback al valor por defecto del código).
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const diasConfig = await getDiasAtencion();
  const dias = getAvailableDays(new Date(), diasConfig ?? undefined);
  if (dias.length === 0) {
    return NextResponse.json(
      { dias, ocupados: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const desde = dias[0].fecha;
  const hasta = dias[dias.length - 1].fecha;
  const [reservados, bloqueos] = await Promise.all([
    getSlotsOcupados(desde, hasta),
    listBloqueos(desde),
  ]);

  const ocupados: SlotOcupado[] = [
    ...reservados,
    ...bloqueos.flatMap((b) =>
      b.bloque
        ? [{ fecha: b.fecha, bloque: b.bloque }]
        : BLOQUES.map((bloque) => ({ fecha: b.fecha, bloque })),
    ),
  ];

  return NextResponse.json(
    { dias, ocupados },
    { headers: { "Cache-Control": "no-store" } },
  );
}
