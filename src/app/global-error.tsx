"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/monitoring";

/**
 * Error Boundary raíz: se muestra solo si falla el propio layout raíz.
 * Reemplaza todo el documento, así que lleva su <html>/<body> y estilos
 * en línea (no puede depender de la hoja de estilos global).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { boundary: "global", digest: error.digest });
  }, [error]);

  return (
    <html lang="es-CL">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#f8f2ed",
          color: "#33222a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
          Tuvimos un problema
        </h1>
        <p style={{ maxWidth: "28rem", margin: 0, lineHeight: 1.6 }}>
          Ocurrió un error inesperado. Vuelve a intentarlo en un momento.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            minHeight: "44px",
            padding: "0 1.5rem",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "#8a2f45",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
