"use client";

import { Check, Copy, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { telANumeroWa } from "./estados";

/**
 * Acciones de contacto de un toque para cada reserva: escribir por
 * WhatsApp (mensaje ya armado), llamar y copiar el correo. Pensado para
 * usar el panel desde el celular.
 */
export function ContactoRapido({
  nombre,
  correo,
  telefono,
  servicio,
  fecha,
  bloque,
}: {
  nombre: string;
  correo: string;
  telefono: string;
  servicio: string;
  fecha: string;
  bloque: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const mensaje = `Hola ${nombre.split(" ")[0]}, te escribo de parte de Daniela Kaiser 🌿 para coordinar tu hora de ${servicio} el ${fecha} a las ${bloque} h. ¿La confirmamos?`;
  const wa = telefono
    ? `https://wa.me/${telANumeroWa(telefono)}?text=${encodeURIComponent(mensaje)}`
    : null;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(correo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin portapapeles: queda el enlace mailto */
    }
  }

  const chip =
    "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-arena px-3 font-sans text-sm font-semibold text-quebrada/80 transition-colors hover:border-pacifico/50 hover:text-enlace";

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={chip}>
          <MessageCircle className="size-4 text-enlace" aria-hidden="true" />
          WhatsApp
        </a>
      ) : null}
      {telefono ? (
        <a href={`tel:${telefono.replace(/\s/g, "")}`} className={chip}>
          <Phone className="size-4" aria-hidden="true" />
          Llamar
        </a>
      ) : null}
      {correo ? (
        <button type="button" onClick={copiar} className={chip}>
          {copiado ? (
            <Check className="size-4 text-enlace" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copiado ? "¡Copiado!" : "Copiar correo"}
        </button>
      ) : null}
    </div>
  );
}
