import { BookingCTA } from "@/components/BookingCTA";
import { VoiceLine } from "@/components/VoiceLine";
import { TAGLINE } from "@/lib/site";

/** CTA de cierre con el lema textual (sección 2: no parafrasearlo). */
export function CtaFinal({
  title = "Demos el primer paso",
  ctaLabel = "Agenda tu hora",
}: {
  title?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="bg-quebrada">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-3 text-lg text-arena italic">“{TAGLINE}”</p>
        <div className="mt-4 flex justify-center text-arena/70">
          <VoiceLine className="max-w-[10rem]" />
        </div>
        <div className="mt-6 flex justify-center">
          <BookingCTA label={ctaLabel} variant="invertido" />
        </div>
      </div>
    </section>
  );
}
