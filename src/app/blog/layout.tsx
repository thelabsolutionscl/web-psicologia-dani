import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

/* El blog vive fuera del grupo (marketing) según la estructura de
   CLAUDE.md, pero comparte el mismo marco de navegación. */
export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
