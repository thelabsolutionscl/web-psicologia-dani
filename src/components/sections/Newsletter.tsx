"use client";

import { useActionState } from "react";
import { suscribir, type NewsletterState } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/Button";

const initial: NewsletterState = {};

/**
 * Captación al boletín. Discreta y honesta: un solo campo (correo),
 * consentimiento explícito y sin promesas de frecuencia. La Server Action
 * degrada sin base de datos (avisa por correo).
 */
export function Newsletter() {
  const [state, formAction, isPending] = useActionState(suscribir, initial);

  return (
    <section aria-labelledby="boletin-titulo" className="bg-superficie">
      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="rounded-2xl border border-arena bg-camanchaca p-6 sm:p-8">
          <h2
            id="boletin-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Recibe los artículos nuevos
          </h2>
          <p className="mt-2 max-w-prose text-base text-quebrada/90">
            Un correo ocasional cuando publico algo sobre neurodesarrollo,
            crianza o procesos emocionales. Sin spam; te puedes dar de baja
            cuando quieras.
          </p>

          {state.ok ? (
            <p
              role="status"
              className="mt-5 rounded-lg border border-pacifico/40 bg-superficie px-4 py-3 font-sans text-sm font-semibold text-quebrada"
            >
              {state.mensaje}
            </p>
          ) : (
            <form
              action={formAction}
              noValidate
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="sitioWeb">Sitio web</label>
                <input
                  id="sitioWeb"
                  name="sitioWeb"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="boletin-correo" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="boletin-correo"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="tu@correo.cl"
                  className="min-h-11 w-full rounded-xl border border-arena bg-superficie px-4 font-sans text-base text-quebrada outline-none focus:border-pacifico"
                />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Enviando…" : "Suscribirme"}
              </Button>
            </form>
          )}

          {state.error ? (
            <p
              role="alert"
              className="mt-3 font-sans text-sm font-semibold text-anahuaca"
            >
              {state.error}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
