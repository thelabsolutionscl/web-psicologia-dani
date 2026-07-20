import { JsonLd, reviewsJsonLd } from "@/lib/seo";
import { Card } from "@/components/ui/Card";
import { VoiceDivider } from "@/components/VoiceLine";
import { TESTIMONIOS } from "@/lib/testimonios";

/**
 * Sección de testimonios. Se oculta por completo mientras no haya
 * testimonios reales autorizados (sección 6.1). El layout se adapta:
 * un testimonio se muestra destacado y centrado; varios, en grilla.
 */
export function Testimonios() {
  if (TESTIMONIOS.length === 0) return null;
  const destacado = TESTIMONIOS.length === 1;

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-titulo"
      className="scroll-mt-24 bg-superficie"
    >
      <JsonLd data={reviewsJsonLd(TESTIMONIOS)} />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="testimonios-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Historias de quienes confiaron en este proceso
          </h2>
          <div className="mt-3 flex justify-center">
            <VoiceDivider />
          </div>
          <p className="mt-4 text-base text-quebrada/90">
            Cada proceso es único y cada experiencia también. Estos testimonios
            fueron compartidos voluntariamente por personas que decidieron
            compartir parte de su camino, con el propósito de acompañar a quienes
            hoy buscan apoyo profesional.
          </p>
        </div>

        <div
          className={
            destacado
              ? "mx-auto mt-8 max-w-2xl"
              : "mt-8 flex flex-wrap justify-center gap-6"
          }
        >
          {TESTIMONIOS.map((t) => (
            <Card
              key={t.cita}
              className={destacado ? "px-8 py-8" : "w-full sm:w-[22rem]"}
            >
              <p
                aria-hidden="true"
                className="font-display text-4xl leading-none text-enlace/50"
              >
                “
              </p>
              <p
                className={`mt-1 text-quebrada/90 italic ${destacado ? "text-lg" : "text-base"}`}
              >
                {t.cita}
              </p>
              <p className="mt-5 font-sans text-sm font-bold text-quebrada">
                {t.autora}
              </p>
              {t.contexto ? (
                <p className="font-sans text-sm text-enlace">{t.contexto}</p>
              ) : null}
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center font-display text-lg font-semibold text-quebrada italic">
          La confianza de quienes acompaño es uno de los pilares de mi trabajo.
          Gracias a cada persona que ha permitido compartir una parte de su
          historia para acompañar a otras en el inicio de su propio camino.
        </p>
      </div>
    </section>
  );
}
