import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { PRECIOS, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio y del servicio de agenda online: reservas, abono, pagos, boleta de honorarios y alcance de la información publicada.",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <>
      <PageHero title="Términos y condiciones" />
      <section className="mx-auto max-w-3xl space-y-8 px-4 pb-16">
        <div className="space-y-4 text-base text-quebrada/90">
          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Alcance de este sitio
          </h2>
          <p>
            Este sitio presenta los servicios profesionales de {SITE_NAME},
            psicóloga y fonoaudióloga. Su contenido es informativo y no
            reemplaza una evaluación ni una atención profesional. Ningún
            contenido de este sitio constituye un diagnóstico ni una promesa
            de resultados.
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Reservas y pagos
          </h2>
          <p>
            Las horas se agendan y pagan a través de una plataforma externa de
            agenda online. La reserva se confirma con un abono de{" "}
            {PRECIOS.abonoReserva}; el saldo se paga antes de la sesión. Por
            cada atención se emite boleta de honorarios, reembolsable en
            Isapre y seguros complementarios según las condiciones de cada
            plan.
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Cancelaciones y reagendamientos
          </h2>
          <p>
            [PLACEHOLDER: política de cancelación y reagendamiento — pendiente
            de definición por Daniela]
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Propiedad intelectual
          </h2>
          <p>
            Los contenidos de este sitio (textos, marca y elementos gráficos)
            pertenecen a {SITE_NAME} y no pueden reproducirse sin
            autorización.
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Legislación aplicable
          </h2>
          <p>Estos términos se rigen por la legislación chilena.</p>

          <p className="text-quebrada/70">
            [PLACEHOLDER: revisión legal de estos términos antes del
            lanzamiento]
          </p>
        </div>
      </section>
    </>
  );
}
