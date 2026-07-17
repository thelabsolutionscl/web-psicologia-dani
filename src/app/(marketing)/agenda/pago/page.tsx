import type { Metadata } from "next";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { VoiceLine } from "@/components/VoiceLine";
import { confirmacionPagoPaciente } from "@/lib/email";
import { verificarPago } from "@/lib/pagos";
import { confirmarReservaPagada, getReservaPorId } from "@/lib/reservas-db";
import { buildMetadata } from "@/lib/seo";
import { PRECIOS, WHATSAPP_MESSAGES, whatsappHref } from "@/lib/site";

// El estado se verifica en el servidor (no se confía en el navegador).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Estado del pago",
    description: "Resultado del pago del abono de tu reserva.",
    path: "/agenda/pago",
  }),
  robots: { index: false, follow: false },
};

type Estado = "aprobado" | "pendiente" | "rechazado";

function clasificarParam(status?: string): Estado {
  if (status === "approved" || status === "success") return "aprobado";
  if (status === "pending" || status === "in_process") return "pendiente";
  return "rechazado";
}

/**
 * Determina el estado real: si viene un payment_id, se consulta el pago
 * contra la API de Mercado Pago (fuente de verdad). Como red de
 * seguridad ante retrasos del webhook, si el pago está aprobado se
 * confirma la reserva aquí también, y si esta página gana la carrera
 * contra el webhook (confirmarReservaPagada devuelve "confirmada"),
 * envía el correo de confirmación al paciente para que no se pierda.
 * Si hay payment_id pero la API falla, se muestra "pendiente" (nunca se
 * confía en el `status` del navegador cuando había un pago que verificar).
 */
async function resolverEstado(
  paymentId: string | undefined,
  statusParam: string | undefined,
): Promise<Estado> {
  if (paymentId) {
    const pago = await verificarPago(paymentId);
    if (pago?.aprobado) {
      const resultado = await confirmarReservaPagada(pago.reservaId);
      // Solo quien gana la transición envía el correo (exactamente uno).
      if (resultado === "confirmada") {
        const reserva = await getReservaPorId(pago.reservaId);
        if (reserva) {
          await confirmacionPagoPaciente({
            servicioNombre: reserva.servicio_nombre,
            fecha: reserva.fecha,
            bloque: reserva.bloque,
            nombre: reserva.nombre,
            correo: reserva.correo,
            telefono: reserva.telefono,
          });
        }
      }
      return "aprobado";
    }
    // Con payment_id, el estado lo manda la API, no el navegador.
    return "pendiente";
  }
  return clasificarParam(statusParam);
}

const CONTENIDO: Record<
  Estado,
  { icon: typeof CheckCircle2; titulo: string; texto: string }
> = {
  aprobado: {
    icon: CheckCircle2,
    titulo: "¡Pago recibido! Tu hora quedó confirmada",
    texto:
      "Recibimos tu abono y tu hora está confirmada. Te enviaré los detalles por correo; el saldo se paga antes de la sesión. Si necesitas reagendar, escríbeme por WhatsApp.",
  },
  pendiente: {
    icon: Clock,
    titulo: "Tu pago está en proceso",
    texto:
      "El pago quedó pendiente de confirmación. En cuanto se acredite, tu hora se confirma automáticamente y te aviso por correo. No necesitas hacer nada más.",
  },
  rechazado: {
    icon: XCircle,
    titulo: "El pago no se concretó",
    texto:
      "No pudimos procesar el abono, así que tu hora aún no está confirmada. Puedes intentar reservar de nuevo o coordinar el pago directamente por WhatsApp.",
  },
};

export default async function PagoPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    collection_status?: string;
    payment_id?: string;
  }>;
}) {
  const params = await searchParams;
  const estado = await resolverEstado(
    params.payment_id,
    params.status ?? params.collection_status,
  );
  const { icon: Icon, titulo, texto } = CONTENIDO[estado];

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <Icon
        className={`size-12 ${estado === "rechazado" ? "text-quebrada" : "text-pacifico"}`}
        aria-hidden="true"
      />
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance">
        {titulo}
      </h1>
      <div className="mt-4 flex justify-center">
        <VoiceLine />
      </div>
      <p className="mt-5 text-lg text-quebrada/90">{texto}</p>
      {estado === "aprobado" ? (
        <p className="mt-2 font-sans text-sm text-quebrada/70">
          Abono pagado: {PRECIOS.abonoReserva}.
        </p>
      ) : null}
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {estado === "rechazado" ? (
          <ButtonLink href="/agenda">Reservar de nuevo</ButtonLink>
        ) : (
          <ButtonLink href="/">Volver al inicio</ButtonLink>
        )}
        <ButtonLink
          href={whatsappHref(WHATSAPP_MESSAGES.default)}
          variant="outline"
        >
          Escríbeme por WhatsApp
        </ButtonLink>
      </div>
    </section>
  );
}
