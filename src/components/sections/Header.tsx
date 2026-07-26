import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SITE_NAME } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/evaluaciones", label: "Evaluaciones" },
  { href: "/servicios/perinatal", label: "Materna" },
  { href: "/terapias", label: "Terapias y valores" },
  { href: "/atencion-online", label: "Modalidad de atención" },
  { href: "/agenda", label: "Reserva de horas" },
  { href: "/blog", label: "Blog" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/contacto", label: "Contacto" },
];

/**
 * Header sticky con CTA persistente (sección 8). En escritorio la
 * navegación es una fila bajo el topbar; en móvil se colapsa en un botón
 * de menú (<MobileNav/>) que despliega la navegación y el CTA.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-arena bg-camanchaca/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          aria-label={`${SITE_NAME} — Psicóloga y fonoaudióloga`}
          className="flex items-center"
        >
          <Image
            src="/images/logo-horizontal.webp"
            alt={`${SITE_NAME} — Psicóloga y fonoaudióloga`}
            width={1596}
            height={530}
            priority
            className="logo-claro h-14 w-auto sm:h-20 lg:h-24"
          />
          <Image
            src="/images/logo-horizontal-dark.webp"
            alt={`${SITE_NAME} — Psicóloga y fonoaudióloga`}
            width={1490}
            height={408}
            className="logo-oscuro h-14 w-auto sm:h-20 lg:h-24"
          />
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {/* CTA visible solo en escritorio; en móvil vive dentro del menú */}
          <div className="hidden sm:block">
            <BookingCTA className="px-4 text-sm sm:px-6 sm:text-base" />
          </div>
          <MobileNav links={navLinks} />
        </div>
      </div>
      {/* Navegación de escritorio (en móvil se usa el botón de menú) */}
      <nav
        aria-label="Navegación principal"
        className="hidden border-t border-arena sm:block"
      >
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2">
          {navLinks.map((link) => (
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
