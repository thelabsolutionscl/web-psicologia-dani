/**
 * Registro de conversiones desde el cliente. Funciona con Plausible o GA4
 * (según NEXT_PUBLIC_ANALYTICS, ver components/Analytics.tsx) sin acoplar
 * los componentes a un proveedor: si no hay analítica cargada, `track` no
 * hace nada y no rompe nada.
 *
 * Uso: track("reserva_enviada", { servicio: "Terapia" }).
 */

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (evento: string, opciones?: { props?: Props }) => void;
    gtag?: (comando: string, evento: string, params?: Props) => void;
  }
}

export function track(evento: string, props?: Props): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.plausible === "function") {
      window.plausible(evento, props ? { props } : undefined);
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", evento, props);
    }
  } catch {
    // La analítica nunca debe interrumpir la experiencia del usuario.
  }
}
