import type { Metadata } from "next";
import { HeartHandshake, Info, Sparkles } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Card } from "@/components/ui/Card";
import { buildMetadata, type FaqItem, JsonLd, serviceJsonLd } from "@/lib/seo";
import { PRECIOS, siPendiente } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Radiestesia",
  description:
    "Sesiones de radiestesia como práctica complementaria de bienestar, distinta del acompañamiento psicológico y fonoaudiológico. Online, en todo Chile.",
  path: "/radiestesia",
  ogEyebrow: "Bienestar",
});

const pasos = [
  {
    title: "Agenda tu sesión",
    description: `Eliges tu hora online y la reservas con un abono de ${PRECIOS.abonoReserva}. El saldo se paga antes de la sesión.`,
  },
  {
    title: "Conversamos cómo llegas",
    description:
      "Nos tomamos un momento para escuchar cómo te sientes y qué te gustaría cuidar en este espacio.",
  },
  {
    title: "Vivimos la sesión",
    description:
      "Un espacio tranquilo, a tu ritmo. Si quieres conocer los detalles antes de reservar, escríbeme por WhatsApp.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "¿La radiestesia reemplaza la terapia psicológica?",
    answer:
      "No. Es una práctica complementaria orientada al bienestar y no sustituye el diagnóstico ni el tratamiento psicológico, fonoaudiológico o médico. Si necesitas apoyo clínico, lo trabajamos desde la psicoterapia.",
  },
  {
    question: "¿Es online o presencial?",
    answer:
      "Coordinamos la modalidad según lo que necesites. Escríbeme por WhatsApp y lo vemos juntos.",
  },
  {
    question: "¿Cuánto dura y cuánto cuesta?",
    answer: `El valor de la sesión es ${siPendiente(PRECIOS.radiestesia, "a confirmar")}. Para la duración y la disponibilidad, escríbeme por WhatsApp y coordinamos.`,
  },
];

export default function RadiestesiaPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Sesión de radiestesia",
          description:
            "Práctica complementaria de bienestar, distinta del acompañamiento psicológico.",
          path: "/radiestesia",
        })}
      />

      <PageHero
        eyebrow="Bienestar"
        title="Sesiones de radiestesia"
        lede="Un espacio suave para detenerte, respirar y volver a tu centro. La radiestesia es un acompañamiento complementario —distinto del trabajo psicológico y fonoaudiológico— para cuidar tu bienestar cuando necesitas hacer una pausa contigo."
      >
        <BookingCTA />
      </PageHero>

      {/* Qué es */}
      <section aria-labelledby="que-es-titulo" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2
            id="que-es-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            ¿Qué es una sesión de radiestesia?
          </h2>
          <div className="mt-4 space-y-4 text-base text-quebrada/90">
            <p>
              La radiestesia es una práctica complementaria orientada al
              bienestar y la calma. En este espacio te acompaño para hacer una
              pausa y dedicarte un tiempo de cuidado, con la misma escucha y
              cercanía con la que trabajo cada proceso.
            </p>
            <p>
              Lo pienso como un momento de calma para quienes quieren dedicarse
              un tiempo de cuidado, con la misma escucha y cercanía con la que
              acompaño cada proceso. No reemplaza ningún tratamiento clínico: lo
              acompaña.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo es la sesión */}
      <section aria-labelledby="pasos-titulo" className="mx-auto max-w-6xl px-4 py-12">
        <h2
          id="pasos-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          Cómo es la sesión, paso a paso
        </h2>
        <ProcessSteps steps={pasos} />
      </section>

      {/* Lo que aporta */}
      <section
        aria-labelledby="aporta-titulo"
        className="mx-auto max-w-6xl px-4 pb-6"
      >
        <h2
          id="aporta-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          Lo que puedes esperar
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <Sparkles className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">Un momento de calma</p>
            <p className="mt-1 text-base text-quebrada/90">
              Un espacio tranquilo para hacer una pausa y bajar el ritmo.
            </p>
          </Card>
          <Card>
            <HeartHandshake className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">
              Acompañamiento cercano
            </p>
            <p className="mt-1 text-base text-quebrada/90">
              La misma calidez y escucha con la que trabajo cada proceso.
            </p>
          </Card>
          <Card>
            <Info className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">Complementario</p>
            <p className="mt-1 text-base text-quebrada/90">
              Convive con tu proceso, pero no reemplaza la atención clínica.
            </p>
          </Card>
        </div>
      </section>

      {/* Nota / encuadre responsable */}
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <div className="rounded-2xl border border-arena bg-white p-6">
          <p className="font-sans text-sm text-quebrada/80">
            La radiestesia es una práctica complementaria orientada al
            bienestar. No constituye un diagnóstico ni un tratamiento
            psicológico, fonoaudiológico o médico, y no reemplaza la atención
            profesional que cada uno de esos ámbitos requiere. Valor de la
            sesión: {siPendiente(PRECIOS.radiestesia, "por confirmar")}.
          </p>
        </div>
      </section>

      <FaqSection items={faqItems} />
      <CtaFinal />
    </>
  );
}
