"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { BookingCTA } from "@/components/BookingCTA";

/**
 * CTA de agenda fijo al pie en móvil, visible tras hacer scroll (cuando
 * el CTA del header ya salió del foco de atención). Deja libre la esquina
 * derecha para el FAB de WhatsApp y se oculta en las páginas que ya son
 * de conversión (/agenda, /contacto).
 */
const RUTAS_OCULTA = ["/agenda", "/contacto"];

export function BarraAgendaMovil() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setVisible(window.scrollY > 600);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  if (!visible || RUTAS_OCULTA.some((r) => pathname.startsWith(r))) {
    return null;
  }

  return (
    <div className="barra-cta-movil fixed bottom-4 left-4 right-22 z-40 md:hidden">
      <BookingCTA
        className="w-full shadow-lg"
        onClick={() => track("cta_movil_click", { ruta: pathname })}
      />
    </div>
  );
}
