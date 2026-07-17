import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

export default function MarketingLayout({
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
