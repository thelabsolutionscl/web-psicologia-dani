import { NextResponse } from "next/server";
import {
  alertaConflictoPagoADaniela,
  confirmacionPagoPaciente,
  type DatosReserva,
} from "@/lib/email";
import { firmaWebhookValida, verificarPago } from "@/lib/pagos";
import { confirmarReservaPagada, getReservaPorId } from "@/lib/reservas-db";

/**
 * Webhook de Mercado Pago. Recibe la notificación de pago, verifica el
 * estado real contra la API (no confía en el navegador) y, si el abono
 * quedó aprobado, confirma la reserva de forma segura:
 * - solo promueve desde 'solicitada' (idempotente ante reenvíos),
 * - si el cupo ya no está (reserva liberada/reasignada), alerta a Daniela
 *   en vez de confirmar en silencio.
 *
 * MP envía el id del pago de varias formas según la versión; se cubren
 * las habituales: ?type=payment&data.id=... y ?topic=payment&id=...
 */
export const dynamic = "force-dynamic";

async function procesar(paymentId: string | null): Promise<void> {
  if (!paymentId) return;
  const pago = await verificarPago(paymentId);
  if (!pago?.aprobado) return;

  const resultado = await confirmarReservaPagada(pago.reservaId);
  if (resultado !== "confirmada" && resultado !== "conflicto") return;

  const reserva = await getReservaPorId(pago.reservaId);
  if (!reserva) return;
  const datos: DatosReserva = {
    servicioNombre: reserva.servicio_nombre,
    fecha: reserva.fecha,
    bloque: reserva.bloque,
    nombre: reserva.nombre,
    correo: reserva.correo,
    telefono: reserva.telefono,
  };

  if (resultado === "confirmada") {
    await confirmacionPagoPaciente(datos);
  } else {
    // Pago capturado pero sin cupo: avisar a Daniela para reagendar/devolver.
    await alertaConflictoPagoADaniela(datos);
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

  // Defensa en profundidad: si hay MP_WEBHOOK_SECRET, validar la firma.
  const firmaOk = await firmaWebhookValida(
    request.headers.get("x-signature"),
    request.headers.get("x-request-id"),
    paymentId,
  );
  if (!firmaOk) {
    return NextResponse.json({ error: "firma inválida" }, { status: 401 });
  }

  await procesar(paymentId);
  // MP espera 200/201 para no reintentar.
  return NextResponse.json({ ok: true });
}

/** MP a veces hace un GET de validación al registrar la URL. */
export async function GET() {
  return NextResponse.json({ ok: true });
}
