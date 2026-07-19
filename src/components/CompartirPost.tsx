"use client";

import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Compartir un artículo: share nativo del sistema si existe (móvil),
 * y siempre WhatsApp + copiar enlace. Sin SDKs de terceros.
 */
export function CompartirPost({ titulo, url }: { titulo: string; url: string }) {
  const [copiado, setCopiado] = useState(false);
  const [tieneShare, setTieneShare] = useState(false);

  // navigator solo existe en el cliente; detectarlo tras montar evita
  // desajustes de hidratación (el botón nativo aparece solo si existe).
  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setTieneShare(true);
    }
  }, []);

  const estiloBoton =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-arena px-4 font-sans text-sm font-semibold text-quebrada/90 transition-colors hover:border-pacifico/50 hover:text-enlace";

  async function compartirNativo() {
    try {
      await navigator.share({ title: titulo, url });
      track("post_compartido", { via: "nativo" });
    } catch {
      // La persona cerró el diálogo: no es un error.
    }
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      track("post_compartido", { via: "enlace" });
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Sin permiso de portapapeles: queda el resto de opciones.
    }
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="font-sans text-sm font-semibold text-quebrada/70">
        Compartir:
      </span>
      {tieneShare ? (
        <button type="button" onClick={compartirNativo} className={estiloBoton}>
          <Share2 className="size-4" aria-hidden="true" />
          Compartir
        </button>
      ) : null}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${titulo} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("post_compartido", { via: "whatsapp" })}
        className={estiloBoton}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        WhatsApp
      </a>
      <button type="button" onClick={copiar} className={estiloBoton}>
        {copiado ? (
          <Check className="size-4 text-enlace" aria-hidden="true" />
        ) : (
          <Link2 className="size-4" aria-hidden="true" />
        )}
        {copiado ? "¡Copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
}
