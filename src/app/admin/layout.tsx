import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Panel de reservas",
  robots: { index: false, follow: false },
};

/* Panel interno: sin header/footer públicos ni WhatsApp FAB. */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-arena bg-superficie">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="font-sans text-base font-bold">
            Panel de reservas
            <span className="block font-sans text-sm font-normal text-enlace">
              {SITE_NAME}
            </span>
          </p>
          <nav className="flex gap-1 font-sans text-sm font-semibold">
            <Link
              href="/admin"
              className="inline-flex min-h-11 items-center px-3 hover:text-enlace"
            >
              Reservas
            </Link>
            <Link
              href="/admin/disponibilidad"
              className="inline-flex min-h-11 items-center px-3 hover:text-enlace"
            >
              Disponibilidad
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center px-3 text-quebrada/70 hover:text-enlace"
            >
              Ver sitio
            </Link>
          </nav>
        </div>
      </header>
      <main id="contenido" className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
