import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, Puzzle, Sprout } from "lucide-react";
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
  "Psicóloga y fonoaudióloga clínica y educacional, online en todo Chile: psicoterapia, evaluación del neurodesarrollo, fonoaudiología, orientación familiar y bienestar integral.";

const heroTitle =
  "Evaluación y acompañamiento psicológico y fonoaudiológico, online en todo Chile";

/* LQIP: miniatura 16×17 de daniela-hero.webp para evitar el salto de layout
   y mostrar un desenfoque mientras carga la imagen del hero (LCP). */
const HERO_BLUR =
  "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAABwBACdASoQABEAPu1iqU2ppaOiMAgBMB2JbACdMoRwBqAAaImVuuWCesj6AAD+1GVNKItNTbSIFkSRqwH6DmqAucQlhTvp4wXkdrIVvMfaAwXIngXQVlc79t4Z9Qkrov0ozoe2qJU8PP15jHdLs5APPpqP80oG0cqJvUWWUAAAAA==";

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
    ...ogImages(heroTitle),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Psicóloga y fonoaudióloga`,
    description,
    ...ogImages(heroTitle),
  },
};

const services = [
  {
    title: "🧠 Psicoterapia",
    description:
      "Acompañamiento psicológico para niñas, niños, adolescentes, adultos y familias, orientado al bienestar emocional, la regulación emocional, la ansiedad, el duelo, el trauma, el desarrollo personal y los desafíos de las distintas etapas de la vida, desde un enfoque integrativo basado en evidencia.",
    href: "/terapias",
    linkLabel: "Conocer más",
  },
  {
    title: "🧩 Evaluación Diagnóstica y Neurodesarrollo",
    description:
      "Evaluación integral de autismo, TDAH, dificultades del lenguaje, aprendizaje y otras condiciones del neurodesarrollo mediante entrevistas clínicas, observación e instrumentos estandarizados, favoreciendo un proceso diagnóstico ético, riguroso y respetuoso.",
    href: "/evaluaciones",
    linkLabel: "Conocer evaluaciones",
  },
  {
    title: "💬 Fonoaudiología",
    description:
      "Evaluación e intervención en habla, lenguaje, comunicación y aprendizaje para niñas, niños, adolescentes y adultos, promoviendo el desarrollo de habilidades comunicativas en cada etapa de la vida.",
    href: "/evaluaciones/lenguaje",
    linkLabel: "Conocer más",
  },
  {
    title: "👨‍👩‍👧 Orientación Familiar",
    description:
      "Acompañamiento a madres, padres y cuidadores para fortalecer los vínculos, la parentalidad positiva, el desarrollo infantil y la convivencia familiar.",
    href: "/contacto",
    linkLabel: "Conocer más",
  },
  {
    title: "🤰 Psicología Perinatal y Lactancia",
    description:
      "Acompañamiento durante el embarazo, el posparto, la maternidad, la paternidad y la lactancia, promoviendo el bienestar emocional de la madre, el bebé y la familia.",
    href: "/terapias",
    linkLabel: "Conocer más",
  },
  {
    title: "🌿 Terapia Integral y Desarrollo Personal",
    description:
      "Un espacio para el autoconocimiento y el crecimiento personal que integra herramientas de la Psicología Transpersonal, Terapia Gestalt, Programación Neurolingüística (PNL), Mindfulness, Radiestesia, Armonización de Chacras, Liberación Emocional, EFT Tapping y Flores de Bach, adaptadas a las necesidades y objetivos de cada persona.",
    href: "/terapias",
    linkLabel: "Conocer más",
  },
  {
    title: "🎓 Capacitaciones y Asesorías",
    description:
      "Acompañamiento a equipos educativos y de salud en el desarrollo de prácticas inclusivas y neuroafirmativas, entregando herramientas basadas en evidencia para comprender, acompañar y potenciar el desarrollo de personas neurodivergentes y sus familias.",
    href: "/contacto",
    linkLabel: "Conocer más",
  },
];

const steps = [
  {
    title: "Agenda tu primera sesión",
    description: `Reserva tu hora de manera online mediante un abono de ${PRECIOS.abonoReserva}, que se descontará del valor de la atención. Antes de la sesión recibirás un formulario para conocer el motivo de consulta, tus antecedentes y expectativas. Esto nos permitirá aprovechar mejor nuestro primer encuentro y definir juntos el camino más adecuado para tu proceso.`,
  },
  {
    title: "Evaluación integral y plan personalizado",
    description:
      "Realizaremos una evaluación acorde a tus necesidades, integrando los aspectos emocionales, cognitivos, comunicativos y del neurodesarrollo cuando corresponda. Si es necesario, utilizaremos instrumentos estandarizados, cuestionarios y elaboraremos un plan de intervención personalizado. En aquellos casos que lo requieran, coordinaremos una jornada de evaluación presencial en Arica.",
  },
  {
    title: "Acompañamiento, seguimiento y orientación",
    description:
      "Durante el proceso contarás con un acompañamiento cercano y personalizado. Cuando corresponda, entregaremos retroalimentación, informes y orientaciones para la familia, establecimientos educacionales u otros profesionales. Revisaremos juntos los avances, resolveremos tus dudas y ajustaremos el plan de trabajo según tus necesidades y objetivos.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "¿Las atenciones son solo online?",
    answer:
      "La mayoría de las entrevistas, sesiones de terapia y devoluciones de resultados se realizan en modalidad online, lo que permite atender a personas de todo Chile. Cuando la evaluación requiere observación clínica directa —como en algunos procesos diagnósticos del neurodesarrollo— se coordina una jornada presencial en Arica, en Carlos Dittborn 0118.",
  },
  {
    question: "¿Cómo puedo reservar una hora?",
    answer:
      "Puedes agendar tu atención directamente desde la página web. La reserva se confirma con un abono de $5.000, el cual se descuenta del valor total de la sesión. El saldo debe estar pagado antes de la atención. Las atenciones se realizan en horarios previamente establecidos. Al momento de agendar podrás conocer los horarios disponibles según la agenda vigente.",
  },
  {
    question: "¿Las boletas son reembolsables?",
    answer:
      "Sí. Se emite boleta de honorarios, la cual puede ser utilizada para solicitar reembolso en Isapres y seguros complementarios, de acuerdo con las condiciones y cobertura de tu plan de salud.",
  },
  {
    question: "¿Desde qué edad realizas evaluaciones?",
    answer:
      "Realizo evaluaciones del neurodesarrollo en niñas, niños, adolescentes y adultos, según el motivo de consulta. Si tienes dudas sobre cuál es la evaluación más adecuada para ti o para tu hijo o hija, estaré encantada de orientarte antes de agendar.",
  },
  {
    question: "¿Qué incluye una evaluación diagnóstica?",
    answer:
      "Cada evaluación es personalizada e incluye entrevista clínica, aplicación de instrumentos cuando corresponde, análisis de resultados, devolución de la información y un informe escrito con orientaciones y recomendaciones.",
  },
  {
    question: "¿Qué diferencia tiene mi forma de trabajar?",
    answer:
      "Mi formación como Psicóloga Clínica y Educacional y Fonoaudióloga me permite integrar los aspectos emocionales, cognitivos, comunicativos y del neurodesarrollo en un mismo proceso de evaluación y acompañamiento. Esto favorece una comprensión más amplia de cada persona y un plan de intervención verdaderamente personalizado.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pt-14 pb-16 lg:grid-cols-2 sm:pt-20">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-balance break-words hyphens-auto sm:text-4xl">
            {heroTitle}
          </h1>
          <VoiceLine className="mt-4" />
          <p className="mt-5 text-xl text-enlace italic">“{TAGLINE}”</p>
          <p className="mt-4 max-w-prose text-lg text-quebrada/90">
            Soy {SITE_NAME}, Psicóloga y Fonoaudióloga Clínica y Educacional.
            Creo profundamente que cada persona posee fortalezas y recursos para
            crecer, sanar y desarrollarse cuando encuentra un espacio de escucha,
            comprensión y acompañamiento.
          </p>
          <p className="mt-4 max-w-prose text-lg text-quebrada/90">
            Desde un enfoque integrativo, basado en evidencia y centrado en la
            persona, acompaño a niñas, niños, adolescentes, adultos y familias en
            procesos orientados al bienestar emocional, la comunicación, el
            neurodesarrollo, el aprendizaje y el crecimiento personal.
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
            placeholder="blur"
            blurDataURL={HERO_BLUR}
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
      <section aria-labelledby="diferencial-titulo" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2
            id="diferencial-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Dos especialidades, una sola mirada
          </h2>
          <p className="mt-4 max-w-prose text-lg text-quebrada/90">
            Psicología y Fonoaudiología en una misma profesional para comprender
            a la persona desde una mirada integral y holística, integrando
            aspectos emocionales, cognitivos, comunicativos, relacionales y del
            neurodesarrollo para ofrecer una atención personalizada, basada en
            evidencia y centrada en la persona.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex gap-4">
              <Puzzle className="size-8 shrink-0 text-enlace" aria-hidden="true" />
              <p className="text-base text-quebrada/90">
                <strong className="font-semibold text-quebrada">
                  Evaluación integral:
                </strong>{" "}
                una comprensión global de los aspectos emocionales, cognitivos,
                comunicativos y del neurodesarrollo.
              </p>
            </div>
            <div className="flex gap-4">
              <HeartHandshake
                className="size-8 shrink-0 text-enlace"
                aria-hidden="true"
              />
              <p className="text-base text-quebrada/90">
                <strong className="font-semibold text-quebrada">
                  Atención coordinada:
                </strong>{" "}
                procesos de evaluación e intervención coherentes, con una mirada
                integradora y, cuando es necesario, articulados con otros
                profesionales de la salud y la educación.
              </p>
            </div>
            <div className="flex gap-4">
              <Sprout className="size-8 shrink-0 text-enlace" aria-hidden="true" />
              <p className="text-base text-quebrada/90">
                <strong className="font-semibold text-quebrada">
                  Acompañamiento personalizado:
                </strong>{" "}
                intervenciones adaptadas a cada persona y familia, respetando su
                historia, fortalezas y objetivos de desarrollo.
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
          ¿Cómo será tu proceso de acompañamiento?
        </h2>
        <ProcessSteps steps={steps} />
        <p className="mt-8 max-w-prose text-lg text-quebrada/90">
          Te acompañaré paso a paso, con una atención cercana, personalizada y
          basada en evidencia, para que siempre sepas qué esperar en cada etapa
          del proceso.
        </p>
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
