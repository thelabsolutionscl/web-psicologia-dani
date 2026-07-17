import { CalendarClock, Receipt, Users } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps, type ProcessStep } from "@/components/sections/ProcessSteps";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd, serviceJsonLd, type FaqItem } from "@/lib/seo";
import { PRECIOS, PREVISION } from "@/lib/site";

export type EvaluacionConfig = {
  path: string;
  serviceName: string;
  serviceDescription: string;
  h1: string;
  lede: string;
  paraQuien: {
    intro: string;
    señales: string[];
    cierre: string;
  };
  instrumentos: {
    badges: string[];
    texto: string;
  };
  proceso: ProcessStep[];
  faq: FaqItem[];
};

/**
 * Patrón común de las páginas de producto de evaluación (sección 6.2:
 * autismo es el patrón para tdah y lenguaje). El precio se presenta
 * como proceso completo, nunca por sesión (regla 10.3).
 */
export function EvaluacionDetalle({ config }: { config: EvaluacionConfig }) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: config.serviceName,
          description: config.serviceDescription,
          path: config.path,
        })}
      />

      <PageHero eyebrow="Evaluación diagnóstica" title={config.h1} lede={config.lede}>
        <BookingCTA label="Reserva tu evaluación" />
      </PageHero>

      {/* Para quién */}
      <section aria-labelledby="para-quien-titulo" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2
            id="para-quien-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            ¿Para quién es esta evaluación?
          </h2>
          <p className="mt-4 text-lg text-quebrada/90">{config.paraQuien.intro}</p>
          <ul className="mt-5 space-y-2">
            {config.paraQuien.señales.map((señal) => (
              <li key={señal} className="flex gap-3 text-base text-quebrada/90">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pacifico"
                />
                {señal}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base text-quebrada/90">{config.paraQuien.cierre}</p>
        </div>
      </section>

      {/* Instrumentos y respaldo */}
      <section
        aria-labelledby="instrumentos-titulo"
        className="mx-auto max-w-3xl px-4 py-12"
      >
        <h2
          id="instrumentos-titulo"
          className="font-display text-2xl font-bold tracking-tight"
        >
          Instrumentos y respaldo
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {config.instrumentos.badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
        <p className="mt-5 text-base text-quebrada/90">{config.instrumentos.texto}</p>
      </section>

      {/* Proceso */}
      <section aria-labelledby="proceso-eval-titulo" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2
            id="proceso-eval-titulo"
            className="mb-8 font-display text-2xl font-bold tracking-tight"
          >
            Cómo es el proceso
          </h2>
          <ProcessSteps
            steps={config.proceso}
            gridClassName="sm:grid-cols-2 lg:grid-cols-4"
          />
        </div>
      </section>

      {/* Precio del proceso completo */}
      <section
        aria-labelledby="precio-titulo"
        className="mx-auto max-w-3xl px-4 py-12"
      >
        <Card className="border-pacifico/40">
          <h2
            id="precio-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Valor del proceso completo
          </h2>
          <p className="mt-3 font-sans text-lg font-semibold text-quebrada">
            {PRECIOS.evaluacionProceso}
          </p>
          <p className="mt-2 text-base text-quebrada/90">
            La evaluación se cobra como un proceso cerrado, que incluye las
            entrevistas, la jornada de evaluación, el análisis y el informe
            integral con su devolución. No se cobra por sesiones sueltas.
          </p>
          <ul className="mt-5 space-y-3 font-sans text-sm font-semibold text-quebrada">
            <li className="flex items-center gap-3">
              <CalendarClock className="size-5 shrink-0 text-pacifico" aria-hidden="true" />
              Reservas con un abono de {PRECIOS.abonoReserva}; el saldo se paga
              antes de comenzar.
            </li>
            <li className="flex items-center gap-3">
              <Receipt className="size-5 shrink-0 text-pacifico" aria-hidden="true" />
              {PREVISION}.
            </li>
            <li className="flex items-center gap-3">
              <Users className="size-5 shrink-0 text-pacifico" aria-hidden="true" />
              Cupos limitados por mes.
            </li>
          </ul>
          <div className="mt-6">
            <BookingCTA label="Reserva tu evaluación" />
          </div>
        </Card>
      </section>

      {/* FAQ propia */}
      <FaqSection items={config.faq} />

      <CtaFinal ctaLabel="Reserva tu evaluación" />
    </>
  );
}
