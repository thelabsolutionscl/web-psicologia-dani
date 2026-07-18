import { BadgeCheck } from "lucide-react";
import type { ReactNode } from "react";

/** Badge de certificación/instrumento (ADOS-2, ADI-R, WISC-V…). */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-arena bg-superficie px-3 py-1.5 font-sans text-sm font-semibold text-quebrada">
      <BadgeCheck className="size-4 text-enlace" aria-hidden="true" />
      {children}
    </span>
  );
}
