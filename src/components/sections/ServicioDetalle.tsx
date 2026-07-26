import type { LucideIcon } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { VoiceLine } from "@/components/VoiceLine";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  breadcrumbJsonLd,
  JsonLd,
  serviceJsonLd,
  type FaqItem,
} from "@/lib/seo";
import { PRECIOS, PREVISION } from "@/lib/site";

export type ServicioItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServicioConfig = {
  /** Segmento bajo /servicios (p. ej. "fonoaudiologia"). */
  slug: string;
  emoji?: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Párrafo introductorio opcional bajo el hero. */
  intro?: string;
  /** Título del bloque de áreas. Por defecto "¿En qué puedo acompañarte?". */
  areasTitulo?: string;
  areas: ServicioItem[];
  /** Columnas del grid de áreas (Tailwind). */
  areasCols?: string;
  /** Título del bloque de pilares/enfoque. Por defecto "Mi enfoque". */
  enfoqueTitulo?: string;
  pilares: ServicioItem[];
  /** Bloque destacado opcional (p. ej. duelo). */
  destacado?: { title: string; description: string; badges?: string[] };
  /** Valor por sesión. Por defecto PRECIOS.sesion ($45.000). */
  precio?: string;
  /** Etiqueta bajo el precio (p. ej. "por sesión", "primera reunión"). */
  precioNota?: string;
  /** Descripción breve de la modalidad (online / presencial). */
  modalidad: string;
  /** Nota de encuadre responsable opcional (servicios complementarios). */
  aviso?: string;
  faq?: FaqItem[];
  serviceName: string;
  serviceDescription: string;
  ctaLabel?: string;
};

/**
 * Página de detalle de servicio, con un patrón común: hero + áreas de
 * acompañamiento + enfoque + (destacado) + precio + FAQ. Data-driven desde
 * `lib/servicios` para no repetir maquetación en cada servicio.
 */
export function ServicioDetalle({ config }: { config: ServicioConfig }) {
  const precio = config.precio ?? PRECIOS.sesion;
  const cta = config.ctaLabel ?? "Agenda tu hora";
  const areasCols = config.areasCols ?? "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: config.serviceName,
          description: config.serviceDescription,
          path: `/servicios/${config.slug}`,
          offer: { price: precio.replace(/[^\d]/g, "") || "45000" },
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
          { name: config.serviceName, path: `/servicios/${config.slug}` },
        ])}
      />

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-4 pt-14 pb-10 text-center sm:pt-20">
        {config.emoji ? (
          <div
            aria-hidden="true"
            className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-arena text-3xl"
          >
            {config.emoji}
          </div>
        ) : null}
        <p className="mb-3 font-sans text-sm font-semibold tracking-wide text-enlace uppercase">
          {config.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-balance break-words hyphens-auto sm:text-4xl">
          {config.title}
        </h1>
        <div className="mt-4 flex justify-center">
          <VoiceLine />
        </div>
        <p className="mt-5 text-lg text-quebrada/90 text-pretty">{config.lede}</p>
        {config.intro ? (
          <p className="mt-4 text-base text-quebrada/80 text-pretty">
            {config.intro}
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <BookingCTA label={cta} />
        </div>
      </header>

      {/* Áreas de acompañamiento */}
      <section aria-labelledby="areas-titulo" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2
            id="areas-titulo"
            className="mb-8 text-center font-display text-2xl font-bold tracking-tight"
          >
            {config.areasTitulo ?? "¿En qué puedo acompañarte?"}
          </h2>
          <ul className={`grid gap-6 ${areasCols}`}>
            {config.areas.map(({ icon: Icon, title, description }) => (
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

      {/* Enfoque / pilares */}
      <section
        aria-labelledby="enfoque-titulo"
        className="mx-auto max-w-6xl px-4 py-14"
      >
        <h2
          id="enfoque-titulo"
          className="mb-8 text-center font-display text-2xl font-bold tracking-tight"
        >
          {config.enfoqueTitulo ?? "Mi enfoque"}
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.pilares.map(({ icon: Icon, title, description }) => (
            <li key={title} className="text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-pacifico/10">
                <Icon className="size-6 text-enlace" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-sans text-base font-bold text-quebrada">
                {title}
              </h3>
              <p className="mt-1 text-base text-quebrada/90">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Destacado (opcional) */}
      {config.destacado ? (
        <section className="mx-auto max-w-3xl px-4 pb-6">
          <Card className="border-pacifico/50 bg-pacifico/5">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              {config.destacado.title}
            </h2>
            <p className="mt-3 text-base text-quebrada/90">
              {config.destacado.description}
            </p>
            {config.destacado.badges?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {config.destacado.badges.map((b) => (
                  <Badge key={b}>{b}</Badge>
                ))}
              </div>
            ) : null}
          </Card>
        </section>
      ) : null}

      {/* Precio + modalidad */}
      <section aria-labelledby="precio-titulo" className="mx-auto max-w-3xl px-4 py-12">
        <Card className="border-pacifico/40">
          <h2
            id="precio-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Valor y modalidad
          </h2>
          <p className="mt-3 font-sans text-2xl font-bold text-quebrada">
            {precio}{" "}
            <span className="font-sans text-base font-normal text-quebrada/70">
              {config.precioNota ?? "por sesión"}
            </span>
          </p>
          <p className="mt-3 text-base text-quebrada/90">{config.modalidad}</p>
          <ul className="mt-4 space-y-2 text-base text-quebrada/90">
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pacifico"
              />
              Reservas con un abono de {PRECIOS.abonoReserva}; el saldo se paga
              antes de la sesión.
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pacifico"
              />
              {PREVISION}.
            </li>
          </ul>
          <div className="mt-6">
            <BookingCTA label={cta} />
          </div>
          {config.aviso ? (
            <p className="mt-5 border-t border-arena pt-4 font-sans text-sm text-quebrada/70">
              {config.aviso}
            </p>
          ) : null}
        </Card>
      </section>

      {config.faq?.length ? <FaqSection items={config.faq} /> : null}

      <CtaFinal ctaLabel={cta} />
    </>
  );
}
