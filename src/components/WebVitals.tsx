"use client";

import { useReportWebVitals } from "next/web-vitals";
import { track } from "@/lib/analytics";

/**
 * Envía las Core Web Vitals de usuarios reales (campo) a la analítica,
 * vía el mismo track() de conversiones. Solo las tres que definen la
 * experiencia (LCP, INP, CLS); si no hay analítica cargada, no hace nada.
 */
const METRICAS = new Set(["LCP", "INP", "CLS"]);

export function WebVitals() {
  useReportWebVitals((m) => {
    if (!METRICAS.has(m.name)) return;
    track("web_vitals", {
      metrica: m.name,
      // CLS es un índice (~0–1): se multiplica para conservar precisión
      // como entero; LCP/INP van en milisegundos redondeados.
      valor: Math.round(m.name === "CLS" ? m.value * 1000 : m.value),
      rating: (m as { rating?: string }).rating ?? "desconocido",
    });
  });
  return null;
}
