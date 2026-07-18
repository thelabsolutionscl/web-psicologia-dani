import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-arena bg-superficie p-6 shadow-[0_1px_2px_rgba(51,34,42,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}
