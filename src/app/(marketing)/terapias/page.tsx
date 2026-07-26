import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ClipboardList,
  Flower2,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { buildMetadata, type FaqItem, JsonLd, serviceJsonLd } from "@/lib/seo";
import { PRECIOS, PREVISION } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terapias y valores",
  description:
    "Aranceles y servicios: psicoterapia, fonoaudiología, orientación familiar, psicología perinatal, transpersonal y primeros auxilios desde $45.000, evaluaciones e IVADEC-CIF.",
  path: "/terapias",
});

const PRECIO_SESION = PRECIOS.sesion.replace(/[^\d]/g, "") || "45000";

const servicios = [
  {
    icon: Brain,
    nombre: "Psicoterapia",
    href: "/servicios/psicoterapia",
    descripcion:
      "Acompañamiento en procesos emocionales, personales y relacionales desde un enfoque integral.",
  },
  {
    icon: MessageCircle,
    nombre: "Fonoaudiología",
    href: "/servicios/fonoaudiologia",
    descripcion:
      "Evaluación e intervención en comunicación, lenguaje, habla y fluidez en niños, adolescentes y adultos.",
  },
  {
    icon: HeartHandshake,
    nombre: "Orientación Familiar",
    href: "/servicios/orientacion-familiar",
    descripcion:
      "Acompañamiento a familias para fortalecer vínculos, comunicación y bienestar familiar.",
  },
  {
    icon: Flower2,
    nombre: "Psicología Perinatal y Lactancia Materna",
    href: "/servicios/perinatal",
    descripcion:
      "Acompañamiento en embarazo, posparto, lactancia y adaptación a la maternidad.",
  },
  {
    icon: Sparkles,
    nombre: "Terapia Integral y Transpersonal",
    href: "/servicios/terapia-integral",
    descripcion:
      "Un espacio de crecimiento y transformación personal desde una mirada integrativa y consciente.",
  },
  {
    icon: Leaf,
    nombre: "Primeros Auxilios Psicológicos",
    href: "/servicios/primeros-auxilios",
    descripcion:
      "Contención emocional y apoyo inmediato en situaciones de crisis, duelo, eventos traumáticos o emergencia psicosocial.",
  },
];

const condiciones = [
  {
    icon: Receipt,
    title: `Abono de ${PRECIOS.abonoReserva}`,
    text: "Reservas con el abono; el saldo se paga antes de la sesión.",
  },
  {
    icon: ShieldCheck,
    title: "Boleta reembolsable",
    text: `${PREVISION}.`,
  },
  {
    icon: Users,
    title: "Presencial y online",
    text: "Modalidad online en todo Chile; evaluaciones presenciales en Arica.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "¿Cuánto cuesta una sesión?",
    answer:
      "Las sesiones de psicoterapia, fonoaudiología, orientación familiar, psicología perinatal, terapia integral y primeros auxilios tienen un valor de $45.000. Reservas con un abono de $5.000 y el saldo se paga antes de la sesión.",
  },
  {
    question: "¿Por qué las evaluaciones no tienen un precio único?",
    answer:
      "La primera sesión de una evaluación (entrevista y orientación) vale $45.000. El valor final depende de las evaluaciones e instrumentos que requiera cada caso y se informa previamente, porque cada proceso es distinto.",
  },
  {
    question: "¿Las boletas son reembolsables?",
    answer:
      "Sí. Se emite boleta de honorarios, reembolsable en Isapre y seguros complementarios según las condiciones y la cobertura de tu plan.",
  },
];

export default function TerapiasPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Psicoterapia online",
          description:
            "Psicoterapia infanto-juvenil, de adultos y acompañamiento en duelo, online en todo Chile.",
          path: "/terapias",
          offer: { price: PRECIO_SESION },
        })}
      />
      <PageHero
        eyebrow="Terapias y valores"
        title="Aranceles y servicios"
        lede="Acompañamiento profesional, integral y personalizado. Cada proceso es único, cada persona merece una atención a su medida."
      >
        <BookingCTA />
      </PageHero>

      {/* Servicios por sesión */}
      <section
        aria-labelledby="valores-sesion-titulo"
        className="mx-auto max-w-6xl px-4 pb-6"
      >
        <div className="mb-8 text-center">
          <h2
            id="valores-sesion-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Valores por sesión
          </h2>
          <p className="mt-2 font-sans text-lg font-semibold text-enlace">
            Todas las atenciones clínicas: {PRECIOS.sesion} por sesión
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => (
            <Card key={s.href} className="flex h-full flex-col">
              <span className="flex size-11 items-center justify-center rounded-full bg-arena">
                <s.icon className="size-5 text-enlace" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-sans text-base font-bold text-quebrada">
                {s.nombre}
              </h3>
              <p className="mt-2 flex-1 text-base text-quebrada/90">
                {s.descripcion}
              </p>
              <p className="mt-4 font-sans text-2xl font-bold text-quebrada">
                {PRECIOS.sesion}
              </p>
              <Link
                href={s.href}
                className="mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-enlace hover:underline"
              >
                Conocer más
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Evaluaciones diagnósticas */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <Card className="border-pacifico/40">
          <div className="flex flex-wrap items-start gap-4">
            <ClipboardList className="size-8 shrink-0 text-enlace" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Evaluaciones diagnósticas del neurodesarrollo
              </h2>
              <p className="mt-2 text-base text-quebrada/90">
                Primera sesión (entrevista y orientación):{" "}
                <strong className="font-semibold text-quebrada">
                  {PRECIOS.evaluacionPrimeraSesion}
                </strong>
                . Las sesiones posteriores se ajustan a las evaluaciones e
                instrumentos que sean requeridos para cada caso (valor informado
                previamente).
              </p>
              <Link
                href="/evaluaciones"
                className="mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-enlace hover:underline"
              >
                Ver las evaluaciones
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* IVADEC */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <Card>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            IVADEC-CIF · Instrumento de Valoración y Desempeño en Comunidad
          </h2>
          <p className="mt-1 font-sans text-sm text-quebrada/70">
            Profesional certificada MINSAL–COMPIN. Tú decides cómo continuar el
            proceso:
          </p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-arena p-5">
              <p className="font-sans text-sm font-semibold tracking-wide text-enlace uppercase">
                Opción 1 · Solo evaluación e informe
              </p>
              <p className="mt-2 font-sans text-2xl font-bold text-quebrada">
                {PRECIOS.ivadec.opcion1}{" "}
                <span className="font-sans text-base font-normal text-quebrada/70">
                  valor único
                </span>
              </p>
              <p className="mt-2 text-base text-quebrada/90">
                Evaluación e informe para que el consultante lo presente ante
                COMPIN si lo desea.
              </p>
            </div>
            <div className="rounded-2xl border border-pacifico/50 bg-pacifico/5 p-5">
              <p className="font-sans text-sm font-semibold tracking-wide text-enlace uppercase">
                Opción 2 · Evaluación + acompañamiento
              </p>
              <p className="mt-2 font-sans text-2xl font-bold text-quebrada">
                {PRECIOS.ivadec.opcion2}{" "}
                <span className="font-sans text-base font-normal text-quebrada/70">
                  valor único
                </span>
              </p>
              <p className="mt-2 text-base text-quebrada/90">
                Incluye acompañamiento en la presentación y seguimiento ante
                COMPIN.
              </p>
            </div>
          </div>
          <Link
            href="/servicios/ivadec"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-enlace hover:underline"
          >
            Conocer el detalle del IVADEC-CIF
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Card>
      </section>

      {/* Capacitaciones */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <Card>
          <div className="flex flex-wrap items-start gap-4">
            <Users className="size-8 shrink-0 text-enlace" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Capacitaciones y asesorías
              </h2>
              <p className="mt-2 text-base text-quebrada/90">
                Primera reunión (diagnóstico / levantamiento de necesidades):{" "}
                <strong className="font-semibold text-quebrada">
                  {PRECIOS.capacitacionPrimeraReunion}
                </strong>
                . Las sesiones posteriores se ajustan a la duración, el alcance y
                los objetivos del servicio requerido.
              </p>
              <Link
                href="/servicios/capacitaciones"
                className="mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-enlace hover:underline"
              >
                Conocer capacitaciones
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Condiciones comunes */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {condiciones.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <Icon className="size-6 text-enlace" aria-hidden="true" />
              <p className="mt-3 font-sans text-base font-bold">{title}</p>
              <p className="mt-1 text-base text-quebrada/90">{text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-center font-sans text-sm text-quebrada/70">
          *Revisa con tu Isapre la cobertura de tu plan.
        </p>
      </section>

      <FaqSection items={faqItems} />
      <CtaFinal />
    </>
  );
}
