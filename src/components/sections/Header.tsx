import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { SITE_NAME } from "@/lib/site";

const navLinks = [
  { href: "/evaluaciones", label: "Evaluaciones" },
  { href: "/terapias", label: "Terapias" },
  { href: "/atencion-online", label: "Atención online" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

/**
 * Header sticky con CTA persistente (sección 8). Sin JavaScript de
 * cliente: en móvil la navegación es una fila con scroll horizontal
 * (regla 10.7: Server Components por defecto).
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
            width={1467}
            height={432}
            priority
            className="h-9 w-auto sm:h-12"
          />
        </Link>
        <BookingCTA className="shrink-0 px-4 text-sm sm:px-6 sm:text-base" />
      </div>
      <nav aria-label="Navegación principal" className="border-t border-arena">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center px-3 font-sans text-sm font-semibold whitespace-nowrap text-quebrada hover:text-pacifico"
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
