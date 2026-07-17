import type { ReactNode } from "react";
import { VoiceLine } from "@/components/VoiceLine";

/** Encabezado estándar de páginas interiores. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pt-14 pb-10 text-center sm:pt-20">
      {eyebrow ? (
        <p className="mb-3 font-sans text-sm font-semibold tracking-wide text-pacifico uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <div className="mt-4 flex justify-center">
        <VoiceLine />
      </div>
      {lede ? (
        <p className="mt-5 text-lg text-quebrada/90 text-pretty">{lede}</p>
      ) : null}
      {children ? (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div>
      ) : null}
    </header>
  );
}
