import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { pagosConfigurados } from "@/lib/pagos";
import { buildMetadata } from "@/lib/seo";
import { HORARIO, PRECIOS } from "@/lib/site";
import { BookingWizard } from "./BookingWizard";

export const metadata: Metadata = buildMetadata({
  title: "Agenda tu hora",
  description:
    "Reserva online tu evaluación o tu sesión de terapia: elige servicio, fecha y bloque horario, y confirma con un abono de $5.000. Cupos limitados.",
  path: "/agenda",
});

// Dinámica para que el estado del pago (MP_ACCESS_TOKEN) se lea en cada
// request y no quede fijado en build.
export const dynamic = "force-dynamic";

export default function AgendaPage() {
  return (
    <>
      <PageHero
        eyebrow="Agenda online"
        title="Agenda tu hora"
        lede={`Elige el servicio, la fecha y el bloque que te acomode. Son dos cupos diarios (${HORARIO.rango}) y cada hora se confirma personalmente junto con el abono de ${PRECIOS.abonoReserva}.`}
      />
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <BookingWizard pagoActivo={pagosConfigurados()} />
        <p className="mt-6 text-center font-sans text-sm text-quebrada/80">
          ¿Vives fuera de Chile? Los bloques están en hora de Chile
          continental: revisa la equivalencia con tu zona horaria antes de
          reservar.
        </p>
      </section>
    </>
  );
}
