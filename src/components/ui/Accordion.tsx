"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

/** Acordeón FAQ accesible: botones con aria-expanded/aria-controls y
 *  paneles con role="region" (sección 8). */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-arena rounded-2xl border border-arena bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-boton-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-semibold text-quebrada"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 text-pacifico transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5"
            >
              <p className="text-base text-quebrada/90">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
