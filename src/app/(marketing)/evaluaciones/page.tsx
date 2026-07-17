import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TrustBar } from "@/components/sections/TrustBar";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Evaluaciones",
  description:
    "Evaluaciones diagnósticas de autismo, TDAH y lenguaje con instrumentos estandarizados: entrevistas online y jornada presencial de evaluación en Arica.",
  path: "/evaluaciones",
});

const evaluaciones = [
  {
    title: "Evaluación de autismo",
    description:
      "Desde los 2 años y a lo largo de toda la vida, con ADOS-2, ADI-R, AMSE y M-CHAT-R/F. Observación directa en una jornada presencial en Arica.",
    href: "/evaluaciones/autismo",
    linkLabel: "Ver evaluación de autismo",
  },
  {
    title: "Evaluación de TDAH",
    description:
      "Para niños, adolescentes y adultos, con Young DIVA-5, BRIEF-2, Yellow Red y WISC-V. Un perfil claro de atención y funciones ejecutivas.",
    href: "/evaluaciones/tdah",
    linkLabel: "Ver evaluación de TDAH",
  },
  {
    title: "Evaluación de lenguaje",
    description:
      "Con CELF-5 e IDETEL, y la ventaja de una mirada que une fonoaudiología y psicología en una misma profesional.",
    href: "/evaluaciones/lenguaje",
    linkLabel: "Ver evaluación de lenguaje",
  },
];

export default function EvaluacionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Evaluaciones diagnósticas"
        title="Una evaluación seria comienza con los instrumentos correctos"
        lede="Trabajo con instrumentos estandarizados y certificaciones específicas para cada área. Cada proceso integra lo comunicativo, lo cognitivo y lo emocional, porque una sola especialista mira el desarrollo completo."
      >
        <BookingCTA label="Reserva tu evaluación" />
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <ServiceGrid services={evaluaciones} />
      </section>

      <TrustBar />
      <CtaFinal ctaLabel="Reserva tu evaluación" />
    </>
  );
}
