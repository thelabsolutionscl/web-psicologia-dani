import { Award, Clock, Receipt, ShieldCheck } from "lucide-react";
import { PREVISION, REGISTROS } from "@/lib/site";

const items = [
  { icon: ShieldCheck, text: REGISTROS.superintendencia },
  { icon: Award, text: REGISTROS.colegioFono },
  { icon: Clock, text: "+20 años de experiencia" },
  { icon: Receipt, text: PREVISION },
];

/** Barra de confianza (sección 6.1, punto 5). Tipografía utilitaria. */
export function TrustBar() {
  return (
    <section
      aria-label="Credenciales y respaldo profesional"
      className="border-y border-arena bg-white"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-3 font-sans text-sm font-semibold text-quebrada"
          >
            <Icon className="size-5 shrink-0 text-pacifico" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
