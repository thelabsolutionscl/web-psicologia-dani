import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { VoiceLine } from "@/components/VoiceLine";
import { buildMetadata } from "@/lib/seo";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mensaje enviado",
  description:
    "Tu mensaje fue enviado correctamente. Te responderé a la brevedad; si tu consulta es urgente, escríbeme directamente por WhatsApp.",
  path: "/gracias",
  noIndex: true,
});

export default function GraciasPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <CheckCircle2 className="size-12 text-pacifico" aria-hidden="true" />
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
        Gracias por tu mensaje
      </h1>
      <div className="mt-4 flex justify-center">
        <VoiceLine />
      </div>
      <p className="mt-5 text-lg text-quebrada/90">
        Recibí tu consulta y te responderé a la brevedad. Si prefieres una
        respuesta más rápida, escríbeme directamente por WhatsApp.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <ButtonLink href={whatsappHref(WHATSAPP_MESSAGES.default)}>
          Escríbeme por WhatsApp
        </ButtonLink>
        <ButtonLink href="/" variant="outline">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
