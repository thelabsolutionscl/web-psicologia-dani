import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";
import {
  ADDRESS,
  HORARIO,
  siPendiente,
  WHATSAPP_MESSAGES,
  whatsappHref,
} from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Escríbeme por el formulario o directamente por WhatsApp para agendar tu hora o resolver dudas sobre evaluaciones, terapia o acompañamiento en duelo.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos"
        lede="Si tienes dudas antes de agendar, escríbeme: te responderé con calma y sin compromiso. La vía más rápida es WhatsApp."
      >
        <ButtonLink href={whatsappHref(WHATSAPP_MESSAGES.default)}>
          Escríbeme por WhatsApp
        </ButtonLink>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 lg:grid-cols-[3fr_2fr]">
        <Card>
          <h2 className="mb-5 font-display text-xl font-semibold tracking-tight">
            O envíame un mensaje por aquí
          </h2>
          <ContactForm />
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Jornadas presenciales
            </h2>
            <p className="mt-3 flex gap-3 text-base text-quebrada/90">
              <MapPin className="mt-1 size-5 shrink-0 text-enlace" aria-hidden="true" />
              Las jornadas presenciales de evaluación se realizan en{" "}
              {ADDRESS.label}. Todo el resto del proceso — entrevistas,
              terapia y devoluciones — es online.
            </p>
          </Card>
          <Card>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Horarios
            </h2>
            <p className="mt-3 text-base text-quebrada/90">
              Atención de {HORARIO.rango}, con dos cupos diarios. Días de
              atención: {siPendiente(HORARIO.dias, "por confirmar")}.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
