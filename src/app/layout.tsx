import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { JsonLd, medicalBusinessJsonLd, personJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/* Tipografía (sección 8): display solo H1/H2, cuerpo serif, utilitaria. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
  // Fuente secundaria (prosa/citas): no bloquear el render inicial con su
  // precarga; la display (bricolage) y la sans (figtree) sí se precargan.
  preload: false,
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Psicóloga y fonoaudióloga`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F2ED" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1418" },
  ],
};

/* Fija el tema antes del primer pintado para evitar el parpadeo (FOUC):
   usa la preferencia guardada o, si no hay, la del sistema. */
const scriptTema = `(function(){try{var t=localStorage.getItem('tema');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CL"
      className={`${bricolage.variable} ${sourceSerif.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-superficie focus:px-4 focus:py-2 focus:font-sans focus:font-semibold"
        >
          Saltar al contenido
        </a>
        <JsonLd data={personJsonLd()} />
        <JsonLd data={medicalBusinessJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
