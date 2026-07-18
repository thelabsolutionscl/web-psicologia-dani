import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { VoiceDivider } from "@/components/VoiceLine";
import { buildMetadata } from "@/lib/seo";
import { REGISTROS, TAGLINE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Sobre mí",
  description:
    "Soy Daniela Alejandra Kaiser Ortiz, psicóloga y fonoaudióloga con más de 20 años acompañando el neurodesarrollo. Conoce mi formación, registros y enfoque.",
  path: "/sobre-mi",
});

const formacion = [
  "Fonoaudióloga, Universidad Mayor (2005)",
  "Psicóloga, Universidad UNIACC (2025)",
  "Postítulo en Psicopedagogía, Universidad Andrés Bello",
  "Magíster en Educación, Universidad del Mar",
];

const registros = [
  REGISTROS.superintendencia,
  REGISTROS.colegioFono,
  REGISTROS.mineduc,
  REGISTROS.ivadec,
];

const certificaciones = [
  "ADOS-2",
  "ADI-R",
  "M-CHAT-R/F",
  "AMSE",
  "WISC-V",
  "WAIS-IV",
  "BANFE-3",
  "BRIEF-2",
  "ABAS-II",
  "Yellow Red (CEDETI UC)",
  "Young DIVA-5",
  "CELF-5",
  "IDETEL",
  "PROMPT Nivel I",
  "IVADEC-CIF (MINSAL)",
];

export default function SobreMiPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre mí"
        title="Dos títulos, veinte años y una misma convicción"
        lede="Soy Daniela Alejandra Kaiser Ortiz, psicóloga y fonoaudióloga. Llevo más de 20 años acompañando el desarrollo de niños, niñas, adolescentes y adultos, y sigo creyendo lo mismo que el primer día: cada proceso es único, acompañarlo también."
      />

      {/* Bio en primera persona + retrato */}
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-base text-quebrada/90">
          <p>
            Me formé primero como fonoaudióloga, en la Universidad Mayor, y
            durante años trabajé con niños y familias en el desarrollo del
            lenguaje y la comunicación. En ese camino entendí algo que marcó
            todo lo que vino después: el lenguaje nunca viene solo. Detrás de
            cada niño que &ldquo;habla poco&rdquo; hay también un mundo
            cognitivo y emocional que merece ser mirado completo.
          </p>
          <p>
            Por eso me formé también como psicóloga, en la Universidad UNIACC.
            Hoy integro ambas miradas en cada evaluación y cada terapia: lo
            comunicativo, lo cognitivo y lo emocional, sin que las familias
            tengan que peregrinar entre especialistas.
          </p>
          <p>
            He atendido de manera particular desde 2005, fui docente y
            coordinadora académica de la carrera de Fonoaudiología entre 2011
            y 2023, y trabajé en programas de SENADIS y Fundación Integra en
            el norte de Chile.
          </p>
          <p className="font-semibold text-quebrada">
            Referente de Autismo, región de Arica y Parinacota — Fundación
            INTEGRA.
          </p>
        </div>
        <div
          className="flex aspect-[3/4] items-center justify-center rounded-2xl border-2 border-dashed border-arena bg-superficie p-6 text-center font-sans text-sm text-quebrada/70"
          role="img"
          aria-label="Retrato pendiente de Daniela Alejandra Kaiser Ortiz"
        >
          Foto profesional en camino
        </div>
      </section>

      {/* Formación y registros */}
      <section aria-labelledby="formacion-titulo" className="bg-superficie">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
          <div>
            <h2
              id="formacion-titulo"
              className="font-display text-2xl font-bold tracking-tight"
            >
              Formación
            </h2>
            <ul className="mt-4 space-y-2 text-base text-quebrada/90">
              {formacion.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pacifico"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-base text-quebrada/70">
              En formación continua y actualización permanente.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Registros profesionales
            </h2>
            <ul className="mt-4 space-y-2 text-base text-quebrada/90">
              {registros.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pacifico"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Certificaciones en instrumentos */}
      <section
        aria-labelledby="certificaciones-titulo"
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <h2
          id="certificaciones-titulo"
          className="font-display text-2xl font-bold tracking-tight"
        >
          Certificaciones en instrumentos de evaluación
        </h2>
        <p className="mt-3 max-w-prose text-base text-quebrada/90">
          Una evaluación vale lo que valen sus instrumentos. Estas son las
          certificaciones con las que trabajo:
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {certificaciones.map((cert) => (
            <Badge key={cert}>{cert}</Badge>
          ))}
        </div>
      </section>

      {/* Enfoque */}
      <section aria-labelledby="enfoque-titulo" className="bg-superficie">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2
            id="enfoque-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Mi enfoque
          </h2>
          <div className="mt-4 space-y-4 text-base text-quebrada/90">
            <p>
              Trabajo desde un enfoque de derechos y de respeto por la
              neurodiversidad: evaluar no es etiquetar, es comprender cómo una
              persona percibe, se comunica y siente, para que su entorno pueda
              acompañarla mejor.
            </p>
            <p>
              Las familias son parte del proceso, no espectadoras. Cada
              devolución busca traducir los resultados en orientaciones
              concretas para la casa, el jardín o el colegio.
            </p>
            <p className="text-lg text-enlace italic">“{TAGLINE}”</p>
          </div>
        </div>
      </section>

      <VoiceDivider />

      {/* Enfoques complementarios: bloque propio, separado de las
          evaluaciones diagnósticas (sección 6.5, confirmado por Daniela) */}
      <section
        aria-labelledby="complementarios-titulo"
        className="mx-auto max-w-3xl px-4 py-12"
      >
        <Card>
          <h2
            id="complementarios-titulo"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Enfoques complementarios
          </h2>
          <p className="mt-3 text-base text-quebrada/90">
            De forma separada de mi trabajo clínico de evaluación y
            psicoterapia, ofrezco también acompañamiento con terapia floral y
            una mirada transpersonal, para quienes lo buscan como apoyo
            complementario y opcional. Estos enfoques no forman parte de las
            evaluaciones diagnósticas ni las reemplazan.
          </p>
        </Card>
      </section>

      <div className="flex justify-center pb-14">
        <BookingCTA />
      </div>

      <CtaFinal />
    </>
  );
}
