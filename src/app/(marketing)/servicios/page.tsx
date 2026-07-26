import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TrustBar } from "@/components/sections/TrustBar";
import { buildMetadata } from "@/lib/seo";
import { SERVICIOS_INDEX } from "@/lib/servicios";

export const metadata: Metadata = buildMetadata({
  title: "Servicios",
  description:
    "Psicoterapia, evaluación del neurodesarrollo, fonoaudiología, orientación familiar, psicología perinatal, IVADEC-CIF, primeros auxilios psicológicos y capacitaciones.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Un acompañamiento para cada etapa y necesidad"
        lede="Psicología, fonoaudiología y bienestar en una misma profesional, con una mirada integral que reúne lo emocional, lo cognitivo, lo comunicativo y el neurodesarrollo."
      >
        <BookingCTA />
      </PageHero>

      <section
        aria-labelledby="servicios-titulo"
        className="mx-auto max-w-6xl px-4 pb-14"
      >
        <h2 id="servicios-titulo" className="sr-only">
          Listado de servicios
        </h2>
        <ServiceGrid services={SERVICIOS_INDEX} />
      </section>

      <TrustBar />
      <CtaFinal />
    </>
  );
}
