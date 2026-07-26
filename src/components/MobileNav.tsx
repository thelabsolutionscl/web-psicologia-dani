"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";

type NavLink = { href: string; label: string };

/**
 * Menú móvil: botón hamburguesa que despliega la navegación y el CTA de
 * agenda. Solo se muestra bajo el breakpoint `sm` (en escritorio la barra
 * de navegación vive bajo el topbar). Cliente porque gestiona el estado
 * abierto/cerrado (regla 10.7: cliente solo donde hay interacción).
 */
export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  // Cerrar con Escape y bloquear el scroll del cuerpo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 inline-flex size-11 items-center justify-center rounded-full text-quebrada hover:text-enlace"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Menu className="size-6" aria-hidden="true" />
        )}
      </button>

      {open ? (
        <>
          {/* Fondo para cerrar al tocar fuera */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-0 z-30 cursor-default bg-quebrada/30"
          />
          <div
            id="menu-movil"
            className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-arena bg-camanchaca shadow-lg"
          >
            <nav aria-label="Navegación móvil">
              <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
                {links.map((link) => (
                  <li key={link.href} className="border-b border-arena/60 last:border-0">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block min-h-11 py-3 font-sans text-base font-semibold text-quebrada hover:text-enlace"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mx-auto max-w-6xl px-4 pt-2 pb-5">
              <BookingCTA
                className="w-full"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
