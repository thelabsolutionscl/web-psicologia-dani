import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_LINKS } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

/**
 * Header sticky con CTA persistente (sección 8). En escritorio la
 * navegación es una fila bajo el topbar; en móvil se colapsa en un botón
 * de menú (<MobileNav/>) que despliega la navegación y el CTA.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-arena bg-camanchaca">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          aria-label={`${SITE_NAME} — Psicóloga y fonoaudióloga`}
          className="flex items-center"
        >
          {/* Logo oficial: versión clara (texto vino sobre crema) y su
              variante oscura de colores invertidos (texto claro), que se
              alternan según el tema (ver globals.css). */}
          <Image
            src="/images/logo-horizontal.webp"
            alt={`${SITE_NAME} — Psicóloga y fonoaudióloga`}
            width={1546}
            height={480}
            priority
            className="logo-claro h-14 w-auto sm:h-20 lg:h-24"
          />
          <Image
            src="/images/logo-horizontal-dark.webp"
            alt={`${SITE_NAME} — Psicóloga y fonoaudióloga`}
            width={1546}
            height={480}
            className="logo-oscuro h-14 w-auto sm:h-20 lg:h-24"
          />
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {/* CTA visible solo en escritorio; en móvil vive dentro del menú */}
          <div className="hidden sm:block">
            <BookingCTA className="px-4 text-sm sm:px-6 sm:text-base" />
          </div>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
      {/* Navegación de escritorio (en móvil se usa el botón de menú) */}
      <nav
        aria-label="Navegación principal"
        className="hidden border-t border-arena sm:block"
      >
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center px-3 font-sans text-sm font-semibold whitespace-nowrap text-quebrada hover:text-enlace"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
