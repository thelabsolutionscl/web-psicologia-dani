import type { Reserva } from "@/lib/reservas-db";
import { PRECIOS, SITE_URL } from "@/lib/site";

/**
 * Capa de pago del abono de reserva (Fase C). Adaptador actual:
 * Mercado Pago Checkout Pro (checkout hospedado, sin carga PCI para el
 * sitio). Diseñada para degradar: sin MP_ACCESS_TOKEN el flujo de
 * reserva sigue funcionando sin cobro online (confirmación manual).
 *
 * Para cambiar de pasarela (Flow, Khipu) basta con reimplementar
 * crearPreferenciaPago() y verificarPago() con el mismo contrato.
 */

const MP_API = process.env.MP_API_URL || "https://api.mercadopago.com";

/** Monto del abono en CLP (entero, sin decimales). */
const ABONO_CLP = Number(PRECIOS.abonoReserva.replace(/[^\d]/g, "")) || 5000;

export function pagosConfigurados(): boolean {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

function accessToken(): string {
  return process.env.MP_ACCESS_TOKEN ?? "";
}

/**
 * Crea una preferencia de pago para el abono de una reserva y devuelve
 * la URL del checkout. La reserva viaja como external_reference para
 * reconciliarla en el webhook. Devuelve null si no hay pago configurado
 * o si la pasarela falla (el llamador cae al flujo sin cobro).
 */
export async function crearPreferenciaPago(
  reserva: Reserva,
): Promise<string | null> {
  if (!pagosConfigurados()) return null;

  const usarSandbox = process.env.MP_MODE === "sandbox";
  const base = SITE_URL.replace(/\/$/, "");

  try {
    const res = await fetch(`${MP_API}/checkout/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify({
        items: [
          {
            title: `Abono de reserva — ${reserva.servicio_nombre}`,
            description: `${reserva.fecha} · ${reserva.bloque} h (hora de Chile)`,
            quantity: 1,
            unit_price: ABONO_CLP,
            currency_id: "CLP",
          },
        ],
        external_reference: reserva.id,
        payer: { name: reserva.nombre, email: reserva.correo },
        back_urls: {
          success: `${base}/agenda/pago`,
          pending: `${base}/agenda/pago`,
          failure: `${base}/agenda/pago`,
        },
        auto_return: "approved",
        notification_url: `${base}/api/pagos/webhook`,
        statement_descriptor: "RESERVA DANIELA KAISER",
      }),
    });

    if (!res.ok) {
      console.error("[pagos] error creando preferencia:", res.status);
      return null;
    }
    const data = (await res.json()) as {
      init_point?: string;
      sandbox_init_point?: string;
    };
    return (usarSandbox ? data.sandbox_init_point : data.init_point) ?? null;
  } catch (e) {
    console.error("[pagos] excepción creando preferencia:", e);
    return null;
  }
}

/**
 * Valida la firma HMAC del webhook de Mercado Pago (header x-signature).
 * Si no hay MP_WEBHOOK_SECRET configurado, no se verifica y se devuelve
 * true (el spoofing ya está mitigado porque el estado se reconsulta
 * contra la API). Con secreto, rechaza notificaciones no firmadas.
 */
export async function firmaWebhookValida(
  xSignature: string | null,
  xRequestId: string | null,
  dataId: string | null,
): Promise<boolean> {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;
  if (!xSignature || !dataId) return false;

  const partes = Object.fromEntries(
    xSignature.split(",").map((kv) => {
      const [k, v] = kv.split("=");
      return [k?.trim(), v?.trim()];
    }),
  );
  const ts = partes.ts;
  const v1 = partes.v1;
  if (!ts || !v1) return false;

  let manifest = `id:${dataId.toLowerCase()};`;
  if (xRequestId) manifest += `request-id:${xRequestId};`;
  manifest += `ts:${ts};`;

  const { createHmac, timingSafeEqual } = await import("node:crypto");
  const esperado = createHmac("sha256", secret).update(manifest).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(esperado), Buffer.from(v1));
  } catch {
    return false;
  }
}

export type PagoVerificado = {
  reservaId: string;
  aprobado: boolean;
};

/**
 * Consulta el estado real de un pago en la pasarela (nunca se confía en
 * los parámetros del navegador). Devuelve la reserva asociada y si el
 * pago quedó aprobado.
 */
export async function verificarPago(
  paymentId: string,
): Promise<PagoVerificado | null> {
  if (!pagosConfigurados()) return null;
  try {
    const res = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${accessToken()}` },
    });
    if (!res.ok) {
      console.error("[pagos] error verificando pago:", res.status);
      return null;
    }
    const data = (await res.json()) as {
      status?: string;
      external_reference?: string;
    };
    if (!data.external_reference) return null;
    return {
      reservaId: data.external_reference,
      aprobado: data.status === "approved",
    };
  } catch (e) {
    console.error("[pagos] excepción verificando pago:", e);
    return null;
  }
}
