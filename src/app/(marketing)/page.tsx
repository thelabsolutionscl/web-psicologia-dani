import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, Puzzle, Sparkles } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Testimonios } from "@/components/sections/Testimonios";
import { TrustBar } from "@/components/sections/TrustBar";
import { ButtonLink } from "@/components/ui/Button";
import { VoiceLine } from "@/components/VoiceLine";
import { absoluteUrl, ogImages, type FaqItem } from "@/lib/seo";
import {
  PRECIOS,
  SITE_NAME,
  TAGLINE,
  WHATSAPP_MESSAGES,
  whatsappHref,
} from "@/lib/site";

const description =
  "Psicóloga y fonoaudióloga online en todo Chile: evaluaciones de autismo, TDAH y lenguaje, psicoterapia y acompañamiento especializado en duelo.";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — Psicóloga y fonoaudióloga` },
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${SITE_NAME} — Psicóloga y fonoaudióloga`,
    description,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "es_CL",
    type: "website",
    ...ogImages(
      "Evaluación y acompañamiento del neurodesarrollo, online en todo Chile",
    ),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Psicóloga y fonoaudióloga`,
    description,
    ...ogImages(
      "Evaluación y acompañamiento del neurodesarrollo, online en todo Chile",
    ),
  },
};

const services = [
  {
    title: "Evaluaciones diagnósticas",
    description:
      "Autismo, TDAH y lenguaje, con instrumentos estandarizados e informe integral. Entrevistas online y una jornada presencial de evaluación en Arica.",
    href: "/evaluaciones",
    linkLabel: "Ver evaluaciones",
  },
  {
    title: "Psicoterapia",
    description:
      "Atención online para niños, adolescentes y adultos: regulación emocional, ansiedad y acompañamiento en distintas etapas de la vida.",
    href: "/terapias",
    linkLabel: "Ver terapias",
  },
  {
    title: "Acompañamiento en duelo",
    description:
      "Un espacio especializado para transitar pérdidas significativas, con formación específica en duelo (certificaciones 2025).",
    href: "/terapias#duelo",
    linkLabel: "Conocer más",
  },
];

const steps = [
  {
    title: "Agenda online",
    description: `Elige tu hora y resérvala con un abono de ${PRECIOS.abonoReserva}. El saldo se paga antes de la sesión.`,
  },
  {
    title: "Sesiones por videollamada",
    description:
      "Nos encontramos online desde cualquier lugar de Chile. Si tu evaluación lo requiere, coordinamos una jornada presencial en Arica.",
  },
  {
    title: "Devolución e informe online",
    description:
      "Recibes la devolución y el informe en una sesión online, con orientaciones claras para los pasos siguientes.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "¿Atiendes solo online?",
    answer:
      "Las entrevistas, sesiones de terapia y devoluciones son online, para todo Chile. Para las evaluaciones que requieren observación directa (como la de autismo) se coordina una jornada presencial en Arica, en Carlos Dittborn 0118.",
  },
  {
    question: "¿Cómo reservo una hora?",
    answer:
      "Agendas online y reservas con un abono de $5.000; el saldo se paga antes de la sesión. Los cupos son limitados: hay dos horarios diarios, entre 17:30 y 19:30, hora de Chile continental.",
  },
  {
    question: "¿La boleta sirve para reembolso?",
    answer:
      "Sí. Se entrega boleta de honorarios, reembolsable en Isapre y seguros complementarios según tu plan.",
  },
  {
    question: "¿Desde qué edad se puede evaluar?",
    answer:
      "La evaluación diagnóstica de autismo se realiza desde los 2 años, y también en adolescentes y adultos. Si tienes dudas sobre el caso de tu hijo o hija, escríbeme y lo conversamos.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pt-14 pb-16 lg:grid-cols-2 sm:pt-20">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-balance break-words hyphens-auto sm:text-4xl">
            Evaluación y acompañamiento del neurodesarrollo, online en todo
            Chile
          </h1>
          <VoiceLine className="mt-4" />
          <p className="mt-5 text-xl text-pacifico italic">“{TAGLINE}”</p>
          <p className="mt-4 max-w-prose text-lg text-quebrada/90">
            Soy {SITE_NAME}, psicóloga y fonoaudióloga. Acompaño a niños,
            niñas, adolescentes y adultos con una mirada que integra lo
            comunicativo, lo cognitivo y lo emocional.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <BookingCTA />
            <ButtonLink
              href={whatsappHref(WHATSAPP_MESSAGES.default)}
              variant="outline"
            >
              Escríbeme por WhatsApp
            </ButtonLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md min-w-0 lg:max-w-none">
          <Image
            src="/images/daniela-hero.webp"
            alt={`${SITE_NAME}, psicóloga y fonoaudióloga`}
            width={1212}
            height={1297}
            priority
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 28rem, 100vw"
            className="h-auto w-full rounded-2xl border border-arena object-cover"
          />
        </div>
      </section>

      {/* 2. Servicios */}
      <section aria-labelledby="servicios-titulo" className="mx-auto max-w-6xl px-4 py-12">
        <h2
          id="servicios-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          ¿En qué te puedo acompañar?
        </h2>
        <ServiceGrid services={services} />
      </section>

      {/* 3. Diferencial */}
      <section aria-labelledby="diferencial-titulo" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2
            id="diferencial-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Dos especialidades, una sola mirada
          </h2>
          <p className="mt-4 max-w-prose text-lg text-quebrada/90">
            Psicóloga y fonoaudióloga en una misma profesional: eso cambia la
            experiencia de evaluación y tratamiento de tu familia.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex gap-4">
              <Puzzle className="size-8 shrink-0 text-pacifico" aria-hidden="true" />
              <p className="text-base text-quebrada/90">
                <strong className="font-semibold text-quebrada">
                  Evaluación completa sin peregrinar
                </strong>{" "}
                entre especialistas distintos, en un solo proceso coordinado.
              </p>
            </div>
            <div className="flex gap-4">
              <Sparkles className="size-8 shrink-0 text-pacifico" aria-hidden="true" />
              <p className="text-base text-quebrada/90">
                <strong className="font-semibold text-quebrada">
                  Un informe que integra
                </strong>{" "}
                lenguaje, cognición y emoción, útil como insumo para el colegio
                y otros especialistas.
              </p>
            </div>
            <div className="flex gap-4">
              <HeartHandshake
                className="size-8 shrink-0 text-pacifico"
                aria-hidden="true"
              />
              <p className="text-base text-quebrada/90">
                <strong className="font-semibold text-quebrada">
                  Tratamiento coordinado:
                </strong>{" "}
                lo comunicativo y lo emocional se trabajan juntos, no en
                paralelo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cómo funciona */}
      <section aria-labelledby="proceso-titulo" className="mx-auto max-w-6xl px-4 py-14">
        <h2
          id="proceso-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          Cómo funciona
        </h2>
        <ProcessSteps steps={steps} />
      </section>

      {/* 5. TrustBar */}
      <TrustBar />

      {/* 6. Testimonios: se muestra sola cuando haya testimonios reales
          autorizados (regla 10.4); oculta mientras tanto. */}
      <Testimonios />

      {/* 7. FAQ breve + CTA final */}
      <FaqSection items={faqItems} />
      <CtaFinal />
    </>
  );
}
