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
      className={`rounded-2xl border border-arena bg-white p-6 shadow-[0_1px_2px_rgba(34,48,43,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}
