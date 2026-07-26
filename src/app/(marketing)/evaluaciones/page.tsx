import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Baby,
  Brain,
  ClipboardList,
  Compass,
  Heart,
  MessageCircle,
  Puzzle,
  Users,
} from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Evaluaciones",
  description:
    "Evaluación del neurodesarrollo para niños, adolescentes y adultos: psicológica, neuropsicológica, de autismo, TDAH y lenguaje, con instrumentos estandarizados.",
  path: "/evaluaciones",
});

const pilares = [
  {
    icon: Brain,
    title: "Integral",
    description: "Abordo las áreas comunicativa, cognitiva, emocional y conductual.",
  },
  {
    icon: Baby,
    title: "Para todas las edades",
    description: "Niños, niñas, adolescentes y adultos.",
  },
  {
    icon: ClipboardList,
    title: "Instrumentos estandarizados",
    description: "Uso pruebas confiables y actualizadas.",
  },
  {
    icon: Award,
    title: "Certificaciones específicas",
    description: "Formación continua y certificaciones en cada área.",
  },
  {
    icon: Heart,
    title: "Enfoque respetuoso",
    description: "Mirada humana, ética y basada en la neurodiversidad.",
  },
  {
    icon: Compass,
    title: "Orientaciones concretas",
    description: "Entrego estrategias útiles para la casa, el jardín y el colegio.",
  },
];

const evaluaciones = [
  {
    icon: Brain,
    title: "Evaluación Psicológica",
    subtitle: "Comprender la historia detrás de las emociones, pensamientos y conductas.",
    evalua:
      "Estado emocional, ansiedad, autoestima, personalidad, relaciones, adaptación y funcionamiento escolar o laboral.",
    dirigida: "Niños, niñas, adolescentes y adultos.",
    instrumentos:
      "Entrevista clínica, pruebas psicométricas, escalas clínicas, cuestionarios y observación.",
    recibiras:
      "Informe profesional, hipótesis diagnósticas, orientaciones y recomendaciones personalizadas.",
  },
  {
    icon: Puzzle,
    title: "Evaluación de Neurodesarrollo y Neuropsicológica",
    subtitle: "Comprender el desarrollo para acompañar mejor.",
    evalua:
      "Autismo, TDAH, desarrollo cognitivo, atención, memoria, funciones ejecutivas, aprendizaje, lenguaje y procesamiento sensorial.",
    dirigida: "Niños, niñas, adolescentes y adultos.",
    instrumentos:
      "ADOS-2, ADI-R, WISC-V, WAIS-IV, CELF-5, BRIEF-2, Yellow Red, Young DIVA-5 y más.",
    recibiras:
      "Perfil neuropsicológico, informe integral, orientaciones para familia y colegio, y plan de intervención.",
    enlaces: [
      { label: "Evaluación de autismo", href: "/evaluaciones/autismo" },
      { label: "Evaluación de TDAH", href: "/evaluaciones/tdah" },
    ],
  },
  {
    icon: MessageCircle,
    title: "Evaluación del Habla y del Lenguaje",
    subtitle: "El lenguaje es mucho más que hablar.",
    evalua:
      "Habla, lenguaje comprensivo y expresivo, pragmática, fonología, comunicación social y aprendizaje.",
    dirigida: "Niños, niñas, adolescentes y adultos.",
    instrumentos:
      "CELF-5, IDETEL, TECAL, TEPROSIF, screening fonoaudiológico, pruebas específicas y observación.",
    recibiras:
      "Perfil comunicativo, informe, orientaciones y plan de trabajo personalizado.",
    enlaces: [
      { label: "Evaluación de lenguaje", href: "/evaluaciones/lenguaje" },
    ],
  },
];

export default function EvaluacionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Evaluaciones diagnósticas"
        title="Evaluación del neurodesarrollo, con los instrumentos correctos"
        lede="Evalúo a niños, niñas, adolescentes y adultos con instrumentos estandarizados y certificaciones específicas para cada área. Cada proceso integra lo comunicativo, lo cognitivo y lo emocional, porque una sola especialista mira el desarrollo completo."
      >
        <BookingCTA label="Reserva tu evaluación" />
      </PageHero>

      {/* Pilares */}
      <section aria-labelledby="pilares-titulo" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 id="pilares-titulo" className="sr-only">
            Por qué evaluar conmigo
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pilares.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pacifico/10">
                  <Icon className="size-5 text-enlace" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold text-quebrada">
                    {title}
                  </h3>
                  <p className="mt-1 text-base text-quebrada/90">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tipos de evaluación */}
      <section
        aria-labelledby="tipos-titulo"
        className="mx-auto max-w-6xl px-4 py-14"
      >
        <h2
          id="tipos-titulo"
          className="mb-8 text-center font-display text-2xl font-bold tracking-tight"
        >
          Áreas de evaluación
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {evaluaciones.map((e) => (
            <Card key={e.title} className="flex h-full flex-col">
              <span className="flex size-12 items-center justify-center rounded-full bg-arena">
                <e.icon className="size-6 text-enlace" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                {e.title}
              </h3>
              <p className="mt-2 text-base text-enlace">{e.subtitle}</p>
              <dl className="mt-4 space-y-3 text-base text-quebrada/90">
                <div>
                  <dt className="font-sans text-sm font-bold text-quebrada">
                    Evalúa
                  </dt>
                  <dd className="mt-0.5">{e.evalua}</dd>
                </div>
                <div>
                  <dt className="font-sans text-sm font-bold text-quebrada">
                    A quién va dirigida
                  </dt>
                  <dd className="mt-0.5">{e.dirigida}</dd>
                </div>
                <div>
                  <dt className="font-sans text-sm font-bold text-quebrada">
                    Instrumentos
                  </dt>
                  <dd className="mt-0.5">{e.instrumentos}</dd>
                </div>
                <div>
                  <dt className="font-sans text-sm font-bold text-quebrada">
                    Recibirás
                  </dt>
                  <dd className="mt-0.5">{e.recibiras}</dd>
                </div>
              </dl>
              {e.enlaces?.length ? (
                <ul className="mt-4 space-y-1">
                  {e.enlaces.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-enlace hover:underline"
                      >
                        {l.label}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 flex-1" />
              )}
            </Card>
          ))}
        </div>

        {/* Cierre integrador */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-arena bg-superficie p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <Users className="size-8 shrink-0 text-enlace" aria-hidden="true" />
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">
                Una evaluación, una profesional, una mirada integral
              </p>
              <p className="mt-1 text-base text-quebrada/90">
                Integro la Psicología y la Fonoaudiología para comprender a la
                persona en todas sus dimensiones.
              </p>
            </div>
          </div>
          <BookingCTA label="Reserva tu evaluación" />
        </div>
      </section>

      <TrustBar />
      <CtaFinal ctaLabel="Reserva tu evaluación" />
    </>
  );
}
