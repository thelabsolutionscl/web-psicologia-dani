import Link from "next/link";
import {
  ADDRESS,
  PHONE_DISPLAY,
  PREVISION,
  REGISTROS,
  SITE_NAME,
  SOCIAL,
  TAGLINE,
  WHATSAPP_MESSAGES,
  whatsappHref,
} from "@/lib/site";

const footerNav = [
  { href: "/evaluaciones", label: "Evaluaciones" },
  { href: "/terapias", label: "Terapias" },
  { href: "/precios", label: "Precios" },
  { href: "/atencion-online", label: "Atención online" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const legalNav = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos y condiciones" },
];

/** Footer con nombre completo, lema, registros y NAP (sección 8). */
export function Footer() {
  return (
    <footer className="border-t border-arena bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-sans text-base font-bold">{SITE_NAME}</p>
          <p className="mt-1 font-sans text-sm text-pacifico">
            Psicóloga · Fonoaudióloga
          </p>
          <p className="mt-3 text-base italic">“{TAGLINE}”</p>
          <ul className="mt-4 space-y-1 font-sans text-sm text-quebrada/80">
            <li>{REGISTROS.superintendencia}</li>
            <li>{REGISTROS.colegioFono}</li>
            <li>{PREVISION}</li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-sm font-bold tracking-wide uppercase">
            Contacto
          </p>
          {/* Enlaces con target táctil ≥ 44 px (sección 8) */}
          <ul className="mt-1 font-sans text-sm text-quebrada/80">
            <li>
              <a
                href={whatsappHref(WHATSAPP_MESSAGES.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-pacifico"
              >
                WhatsApp: {PHONE_DISPLAY}
              </a>
            </li>
            <li className="py-2">
              Atención online en todo Chile.
              <br />
              Jornadas presenciales de evaluación:
              <br />
              {ADDRESS.label}
            </li>
            <li className="flex gap-6">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-pacifico"
              >
                Instagram
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-pacifico"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-sm font-bold tracking-wide uppercase">
            Navegación
          </p>
          <ul className="mt-1 font-sans text-sm">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-pacifico"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-quebrada/70 hover:text-pacifico"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-arena py-4 text-center font-sans text-sm text-quebrada/70">
        © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
