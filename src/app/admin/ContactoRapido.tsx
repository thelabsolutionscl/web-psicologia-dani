"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { telANumeroWa } from "./estados";

/**
 * Acciones de contacto de un toque para cada reserva: escribir por
 * WhatsApp (mensaje ya armado), llamar y enviar un correo (abre el cliente
 * de correo con asunto y cuerpo prellenados vía mailto:). Pensado para
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
  const primerNombre = nombre.split(" ")[0];

  const mensaje = `Hola ${primerNombre}, te escribo de parte de Daniela Kaiser 🌿 para coordinar tu hora de ${servicio} el ${fecha} a las ${bloque} h. ¿La confirmamos?`;
  const wa = telefono
    ? `https://wa.me/${telANumeroWa(telefono)}?text=${encodeURIComponent(mensaje)}`
    : null;

  const asuntoCorreo = `Tu hora de ${servicio} — Daniela Kaiser`;
  const cuerpoCorreo = `Hola ${primerNombre}:\n\nTe escribo de parte de Daniela Kaiser para coordinar tu hora de ${servicio} el ${fecha} a las ${bloque} h. ¿La confirmamos?\n\nUn saludo,\nDaniela`;
  const mailto = `mailto:${correo}?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;

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
        <a href={mailto} className={chip}>
          <Mail className="size-4" aria-hidden="true" />
          Enviar correo
        </a>
      ) : null}
    </div>
  );
}
