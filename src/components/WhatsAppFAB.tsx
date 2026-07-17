"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/site";

function messageForPath(pathname: string): string {
  if (pathname.startsWith("/evaluaciones/autismo")) {
    return WHATSAPP_MESSAGES.autismo;
  }
  if (pathname.startsWith("/evaluaciones/tdah")) {
    return WHATSAPP_MESSAGES.tdah;
  }
  if (pathname.startsWith("/terapias")) {
    return WHATSAPP_MESSAGES.terapias;
  }
  return WHATSAPP_MESSAGES.default;
}

/**
 * Único FAB de WhatsApp del sitio (regla 10.6), presente en todas las
 * páginas vía el layout. El mensaje precargado depende de la página
 * (sección 4.2); `message` permite forzarlo si algún uso lo necesita.
 */
export function WhatsAppFAB({ message }: { message?: string }) {
  const pathname = usePathname();
  const text = message ?? messageForPath(pathname);

  return (
    <a
      href={whatsappHref(text)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-pacifico text-white shadow-lg transition-transform hover:scale-105 md:right-6 md:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
      <span className="sr-only">Escríbeme por WhatsApp</span>
    </a>
  );
}
