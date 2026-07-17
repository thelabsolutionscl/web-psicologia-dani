import type { Metadata } from "next";
import { Receipt, Users, Wallet } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { buildMetadata, type FaqItem, JsonLd, serviceJsonLd } from "@/lib/seo";
import { PRECIOS, PREVISION, siPendiente } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Precios",
  description:
    "Valores de las evaluaciones (proceso completo) y de la sesión de psicoterapia. Reserva con abono de $5.000 y boleta reembolsable en Isapre.",
  path: "/precios",
});

const evaluaciones = [
  {
    nombre: "Evaluación de autismo",
    precio: PRECIOS.evaluaciones.autismo,
    href: "/evaluaciones/autismo",
  },
  {
    nombre: "Evaluación de TDAH",
    precio: PRECIOS.evaluaciones.tdah,
    href: "/evaluaciones/tdah",
  },
  {
    nombre: "Evaluación de lenguaje",
    precio: PRECIOS.evaluaciones.lenguaje,
    href: "/evaluaciones/lenguaje",
  },
];

const terapias = [
  "Psicoterapia infanto-juvenil",
  "Psicoterapia de adultos",
  "Acompañamiento en duelo",
];

const faqItems: FaqItem[] = [
  {
    question: "¿Por qué las evaluaciones no tienen precio por sesión?",
    answer:
      "Porque una evaluación es un proceso cerrado: incluye las entrevistas, la jornada de evaluación, el análisis y el informe con su devolución. Cobrarla por sesiones sueltas no reflejaría el trabajo real ni te daría claridad del costo total.",
  },
  {
    question: "¿Cómo funciona el abono?",
    answer:
      "Reservas tu hora con un abono de $5.000; el saldo se paga antes de la sesión. El abono confirma tu cupo, que es limitado.",
  },
  {
    question: "¿Puedo pedir reembolso a mi Isapre?",
    answer:
      "Sí. Se entrega boleta de honorarios, reembolsable en Isapre y seguros complementarios según las condiciones de tu plan.",
  },
];

export default function PreciosPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Psicoterapia online",
          description:
            "Sesión de psicoterapia online en todo Chile. Las evaluaciones se cobran como proceso completo.",
          path: "/precios",
          offer: { price: PRECIOS.sesionTerapia.replace(/[^\d]/g, "") || "40000" },
        })}
      />
      <PageHero
        eyebrow="Precios"
        title="Valores claros, sin sorpresas"
        lede="Las evaluaciones se cobran como un proceso completo; la psicoterapia, por sesión. Todo con boleta reembolsable en Isapre y reserva con un abono de $5.000."
      >
        <BookingCTA />
      </PageHero>

      {/* Evaluaciones */}
      <section
        aria-labelledby="precios-eval-titulo"
        className="mx-auto max-w-6xl px-4 pb-4"
      >
        <h2
          id="precios-eval-titulo"
          className="mb-2 font-display text-2xl font-bold tracking-tight"
        >
          Evaluaciones diagnósticas
        </h2>
        <p className="mb-6 max-w-prose text-base text-quebrada/90">
          Cada evaluación es un proceso cerrado (entrevistas + jornada +
          análisis + informe con devolución), no una suma de sesiones.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {evaluaciones.map((e) => (
            <Card key={e.href} className="flex flex-col">
              <h3 className="font-sans text-lg font-bold text-quebrada">
                {e.nombre}
              </h3>
              <p className="mt-3 font-sans text-lg font-bold text-pacifico">
                {siPendiente(e.precio, "Valor por confirmar")}
              </p>
              <p className="mt-1 font-sans text-sm text-quebrada/70">
                Proceso completo
              </p>
              <div className="mt-5 flex-1" />
              <ButtonLink href={e.href} variant="outline">
                Ver detalle
              </ButtonLink>
            </Card>
          ))}
        </div>
      </section>

      {/* Terapias */}
      <section
        aria-labelledby="precios-terapia-titulo"
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <Card className="border-pacifico/40">
          <h2
            id="precios-terapia-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Psicoterapia
          </h2>
          <p className="mt-3 font-sans text-2xl font-bold text-quebrada">
            {PRECIOS.sesionTerapia}{" "}
            <span className="font-sans text-base font-normal text-quebrada/70">
              por sesión
            </span>
          </p>
          <ul className="mt-4 space-y-2">
            {terapias.map((t) => (
              <li key={t} className="flex gap-3 text-base text-quebrada/90">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pacifico"
                />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <BookingCTA />
          </div>
        </Card>
      </section>

      {/* Condiciones comunes */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <Wallet className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">
              Abono de {PRECIOS.abonoReserva}
            </p>
            <p className="mt-1 text-base text-quebrada/90">
              Reservas con el abono; el saldo se paga antes de la sesión.
            </p>
          </Card>
          <Card>
            <Receipt className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">
              Boleta reembolsable
            </p>
            <p className="mt-1 text-base text-quebrada/90">{PREVISION}.</p>
          </Card>
          <Card>
            <Users className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">
              Cupos limitados
            </p>
            <p className="mt-1 text-base text-quebrada/90">
              Dos cupos diarios; las horas se confirman con el abono.
            </p>
          </Card>
        </div>
      </section>

      <FaqSection items={faqItems} />
      <CtaFinal />
    </>
  );
}
