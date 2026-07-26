import type { Metadata } from "next";
import {
  BadgeCheck,
  ClipboardCheck,
  FileText,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Card } from "@/components/ui/Card";
import {
  breadcrumbJsonLd,
  buildMetadata,
  type FaqItem,
  JsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { PRECIOS, PREVISION } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "IVADEC-CIF",
  description:
    "Calificadora certificada MINSAL–COMPIN para aplicar el IVADEC-CIF y elaborar el informe técnico del proceso de certificación de discapacidad. Online en todo Chile.",
  path: "/servicios/ivadec",
  ogEyebrow: "Servicios",
});

const claves = [
  {
    icon: BadgeCheck,
    title: "Certificación IVADEC-CIF",
    description: "Instrumento de Valoración y Desempeño en Comunidad (IVADEC-CIF).",
  },
  {
    icon: Landmark,
    title: "MINSAL",
    description: "Ministerio de Salud.",
  },
  {
    icon: Users,
    title: "COMPIN",
    description: "Comisiones de Medicina Preventiva e Invalidez.",
  },
  {
    icon: ShieldCheck,
    title: "Evaluación integral",
    description: "Basada en criterios técnicos, normativos y de derechos.",
  },
];

const incluye = [
  {
    title: "Entrevista inicial",
    description:
      "Revisión de antecedentes, explicación del proceso y resolución de dudas.",
  },
  {
    title: "Aplicación oficial del IVADEC-CIF",
    description:
      "Valoración del desempeño y la participación, conforme a la normativa MINSAL.",
  },
  {
    title: "Análisis integral",
    description:
      "Integración de antecedentes clínicos y funcionales, e interpretación técnica de resultados.",
  },
  {
    title: "Informe profesional",
    description:
      "Elaboración del Informe IVADEC-CIF: un documento claro, completo y confidencial.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "¿Qué es el IVADEC-CIF?",
    answer:
      "Es el Instrumento de Valoración y Desempeño en Comunidad, basado en la CIF, que se usa para valorar el desempeño y la participación de una persona en su vida cotidiana. Es parte del proceso de certificación de discapacidad ante COMPIN.",
  },
  {
    question: "¿Quién decide iniciar el proceso ante COMPIN?",
    answer:
      "La decisión de iniciar el proceso de certificación de discapacidad corresponde siempre a la persona o a su representante legal. El acompañamiento profesional se realiza únicamente con su consentimiento y conforme a la normativa vigente.",
  },
  {
    question: "¿La atención es online?",
    answer:
      "La orientación y las entrevistas se realizan online en todo Chile. La boleta de honorarios es reembolsable en Isapre y seguros complementarios según tu plan.",
  },
];

export default function IvadecPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Evaluación IVADEC-CIF (MINSAL–COMPIN)",
          description:
            "Aplicación del Instrumento de Valoración y Desempeño en Comunidad (IVADEC-CIF) e informe técnico para la certificación de discapacidad.",
          path: "/servicios/ivadec",
          offer: { price: PRECIOS.ivadec.opcion1.replace(/[^\d]/g, "") },
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
          { name: "IVADEC-CIF", path: "/servicios/ivadec" },
        ])}
      />

      <PageHero
        eyebrow="Calificadora Certificada IVADEC-CIF"
        title="IVADEC-CIF · MINSAL – COMPIN"
        lede="Profesional certificada por MINSAL–COMPIN para aplicar el Instrumento de Valoración y Desempeño en Comunidad (IVADEC-CIF) y elaborar el informe técnico, conforme a la normativa vigente."
      >
        <BookingCTA label="Solicitar orientación" />
      </PageHero>

      {/* Qué es */}
      <section aria-labelledby="ivadec-que-titulo" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2
              id="ivadec-que-titulo"
              className="font-display text-2xl font-bold tracking-tight"
            >
              Una evaluación que informa, orienta y acompaña
            </h2>
            <p className="mt-4 text-base text-quebrada/90">
              Realizo una valoración integral del desempeño y la participación de
              la persona en su vida cotidiana, elaborando un informe técnico claro
              para que cada persona pueda decidir, de manera informada, si desea
              continuar el proceso de certificación de discapacidad ante COMPIN o
              utilizar el informe como apoyo para su proceso terapéutico, educativo
              o social.
            </p>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {claves.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <Card className="h-full">
                  <span className="flex size-11 items-center justify-center rounded-full bg-arena">
                    <Icon className="size-5 text-enlace" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-sans text-base font-bold text-quebrada">
                    {title}
                  </h3>
                  <p className="mt-2 text-base text-quebrada/90">{description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qué incluye */}
      <section
        aria-labelledby="ivadec-incluye-titulo"
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <h2
          id="ivadec-incluye-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          ¿Qué incluye este servicio?
        </h2>
        <ProcessSteps
          steps={incluye}
          gridClassName="sm:grid-cols-2 lg:grid-cols-4"
        />
      </section>

      {/* Opciones */}
      <section
        aria-labelledby="ivadec-opciones-titulo"
        className="bg-superficie"
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2
            id="ivadec-opciones-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Tú decides cómo continuar el proceso
          </h2>
          <p className="mt-3 max-w-prose text-base text-quebrada/90">
            El inicio del proceso ante COMPIN es una decisión exclusiva de la
            persona o su representante legal. Puedes elegir entre:
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
              <p className="font-sans text-sm font-semibold tracking-wide text-enlace uppercase">
                Opción 1
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                Solo evaluación e informe
              </h3>
              <p className="mt-2 font-sans text-2xl font-bold text-quebrada">
                {PRECIOS.ivadec.opcion1}{" "}
                <span className="font-sans text-base font-normal text-quebrada/70">
                  valor único
                </span>
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-base text-quebrada/90">
                {[
                  "Entrevista y aplicación del IVADEC-CIF.",
                  "Análisis integral.",
                  "Elaboración del informe profesional de salud (IVADEC-CIF).",
                  "Entrega del informe y orientación sobre el proceso.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <ClipboardCheck
                      className="mt-0.5 size-5 shrink-0 text-enlace"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base text-quebrada/80">
                El consultante decide libremente si presenta el informe ante
                COMPIN. No incluye la presentación ni el seguimiento del proceso.
              </p>
            </Card>

            <Card className="flex flex-col border-pacifico/50 bg-pacifico/5">
              <p className="font-sans text-sm font-semibold tracking-wide text-enlace uppercase">
                Opción 2
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                Evaluación + acompañamiento del proceso
              </h3>
              <p className="mt-2 font-sans text-2xl font-bold text-quebrada">
                {PRECIOS.ivadec.opcion2}{" "}
                <span className="font-sans text-base font-normal text-quebrada/70">
                  valor único
                </span>
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-base text-quebrada/90">
                {[
                  "Revisión de otros informes y antecedentes.",
                  "Entrevista y aplicación del IVADEC-CIF.",
                  "Análisis integral e informe profesional de salud (IVADEC-CIF).",
                  "Presentación del informe y antecedentes ante COMPIN (con autorización).",
                  "Seguimiento del estado de la tramitación.",
                  "Orientación durante todo el proceso hasta su resolución.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <ClipboardCheck
                      className="mt-0.5 size-5 shrink-0 text-enlace"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap items-start gap-3 rounded-2xl border border-arena bg-camanchaca p-5">
            <FileText className="mt-0.5 size-5 shrink-0 text-enlace" aria-hidden="true" />
            <p className="text-base text-quebrada/90">
              <strong className="font-semibold text-quebrada">Importante:</strong>{" "}
              la decisión de iniciar el proceso de certificación de discapacidad
              corresponde siempre a la persona o a su representante legal. El
              acompañamiento profesional se realiza únicamente con su
              consentimiento y conforme a la normativa vigente. {PREVISION}.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BookingCTA label="Solicitar orientación" />
            <span className="inline-flex items-center gap-2 font-sans text-sm text-quebrada/80">
              <MessageCircle className="size-4 text-enlace" aria-hidden="true" />
              Trabajo con enfoque de derechos, respeto y confidencialidad.
            </span>
          </div>
        </div>
      </section>

      <FaqSection items={faqItems} />
      <CtaFinal ctaLabel="Solicitar orientación" />
    </>
  );
}
