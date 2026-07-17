import { Card } from "@/components/ui/Card";
import { VoiceDivider } from "@/components/VoiceLine";
import { TESTIMONIOS } from "@/lib/testimonios";

/**
 * Sección de testimonios. Se oculta por completo mientras no haya
 * testimonios reales autorizados (sección 6.1). No renderiza nada —ni
 * título ni placeholder visible— hasta que lib/testimonios.ts tenga
 * elementos.
 */
export function Testimonios() {
  if (TESTIMONIOS.length === 0) return null;

  return (
    <section aria-labelledby="testimonios-titulo" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2
          id="testimonios-titulo"
          className="font-display text-2xl font-bold tracking-tight"
        >
          Lo que dicen las familias
        </h2>
        <VoiceDivider />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {TESTIMONIOS.map((t) => (
            <Card key={t.cita}>
              <p className="text-base text-quebrada/90 italic">“{t.cita}”</p>
              <p className="mt-4 font-sans text-sm font-bold text-quebrada">
                {t.autora}
              </p>
              {t.contexto ? (
                <p className="font-sans text-sm text-pacifico">{t.contexto}</p>
              ) : null}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
