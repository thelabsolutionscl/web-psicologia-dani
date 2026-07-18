"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Dispara un evento de analítica una sola vez al montar. Útil para páginas
 * de éxito (p. ej. /gracias tras enviar el formulario) que son Server
 * Components y solo necesitan registrar la conversión en el cliente.
 */
export function TrackOnMount({ evento }: { evento: string }) {
  useEffect(() => {
    track(evento);
  }, [evento]);
  return null;
}
