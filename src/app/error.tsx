"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { VoiceLine } from "@/components/VoiceLine";
import { reportError } from "@/lib/monitoring";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/site";

/**
 * Error Boundary de segmento (App Router): captura errores de render en
 * las páginas dentro del layout raíz y muestra una salida amable en vez
 * de una pantalla en blanco. Reporta el error al monitoreo central.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { boundary: "app", digest: error.digest });
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-sm font-semibold tracking-wide text-enlace uppercase">
        Algo salió mal
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
        Tuvimos un problema al cargar esto
      </h1>
      <div className="mt-4 flex justify-center">
        <VoiceLine />
      </div>
      <p className="mt-4 max-w-md text-base text-quebrada/90">
        Fue algo de nuestro lado, no tuyo. Puedes reintentar o, si el problema
        sigue, escribirme por WhatsApp y lo vemos.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-anahuaca px-6 py-2.5 font-sans text-base font-semibold text-white hover:bg-anahuaca/90"
        >
          Reintentar
        </button>
        <ButtonLink
          href={whatsappHref(WHATSAPP_MESSAGES.default)}
          variant="outline"
        >
          Escríbeme por WhatsApp
        </ButtonLink>
      </div>
    </main>
  );
}
