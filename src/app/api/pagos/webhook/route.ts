import { NextResponse } from "next/server";
import { verificarPago } from "@/lib/pagos";
import { cambiarEstado } from "@/lib/reservas-db";

/**
 * Webhook de Mercado Pago. Recibe la notificación de pago, verifica el
 * estado real contra la API (no confía en el navegador) y, si el abono
 * quedó aprobado, confirma la reserva asociada.
 *
 * MP envía el id del pago de varias formas según la versión; se cubren
 * las habituales: ?type=payment&data.id=... y ?topic=payment&id=...
 */
export const dynamic = "force-dynamic";

async function procesar(paymentId: string | null): Promise<void> {
  if (!paymentId) return;
  const pago = await verificarPago(paymentId);
  if (pago?.aprobado) {
    // Abono pagado = hora confirmada (reemplaza la confirmación manual).
    await cambiarEstado(pago.reservaId, "confirmada");
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  let paymentId =
    url.searchParams.get("data.id") || url.searchParams.get("id");
  const tipo =
    url.searchParams.get("type") || url.searchParams.get("topic");

  // Algunas versiones mandan el detalle en el cuerpo.
  if (!paymentId) {
    try {
      const body = (await request.json()) as {
        data?: { id?: string };
        type?: string;
      };
      paymentId = body?.data?.id ?? null;
    } catch {
      /* cuerpo vacío o no-JSON: se ignora */
    }
  }

  if (tipo && tipo !== "payment") {
    // Notificaciones que no son de pago (p. ej. merchant_order) se ignoran.
    return NextResponse.json({ ok: true });
  }

  await procesar(paymentId);
  // MP espera 200/201 para no reintentar.
  return NextResponse.json({ ok: true });
}

/** MP a veces hace un GET de validación al registrar la URL. */
export async function GET() {
  return NextResponse.json({ ok: true });
}
