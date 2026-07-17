import { Accordion } from "@/components/ui/Accordion";
import { faqJsonLd, JsonLd, type FaqItem } from "@/lib/seo";

/** Sección FAQ: acordeón accesible + JSON-LD FAQPage (sección 7.1). */
export function FaqSection({
  title = "Preguntas frecuentes",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  return (
    <section aria-labelledby="faq-titulo" className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={faqJsonLd(items)} />
      <h2
        id="faq-titulo"
        className="mb-6 font-display text-2xl font-bold tracking-tight"
      >
        {title}
      </h2>
      <Accordion items={items} />
    </section>
  );
}
