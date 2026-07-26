import type { Metadata } from "next";
import {
  Award,
  Brain,
  Clock3,
  Compass,
  GraduationCap,
  Heart,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { VoiceDivider } from "@/components/VoiceLine";
import { buildMetadata } from "@/lib/seo";
import { TAGLINE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Sobre mí",
  description:
    "Daniela Alejandra Kaiser Ortiz, psicóloga clínica y educacional y fonoaudióloga con más de 20 años acompañando el neurodesarrollo. Formación, registros y enfoque.",
  path: "/sobre-mi",
});

const formacion = [
  "Psicóloga Clínica y Educacional — Universidad UNIACC (2025)",
  "Fonoaudióloga — Universidad Mayor (2005)",
  "Magíster en Educación — Universidad del Mar",
  "Postítulo en Psicopedagogía — Universidad Andrés Bello",
];

const certificaciones = [
  "ADOS-2 — Evaluación del Espectro Autista",
  "ADI-R — Entrevista para Autismo",
  "WISC-V / WAIS-IV — Evaluación cognitiva",
  "CELF-5 e IDETEL — Evaluación del lenguaje",
  "BRIEF-2 — Funciones ejecutivas",
  "IVADEC-CIF — Calificadora certificada (MINSAL)",
  "Acompañamiento en duelo (CESIST · Clínica del Duelo 2025)",
  "Neurodesarrollo e inclusión educativa",
];

const registros = [
  "Registro Superintendencia de Salud N° 65811",
  "Registro MINEDUC N° 6404",
  "Colegio de Fonoaudiólogos de Chile N° 551",
  "Calificadora certificada IVADEC-CIF (MINSAL / COMPIN)",
];

const enfoques = [
  {
    icon: Brain,
    title: "Terapia Cognitivo Conductual (TCC)",
    puntos: [
      "Estrategias basadas en evidencia.",
      "Regulación emocional y conductual.",
      "Ansiedad, autoestima y habilidades para la vida diaria.",
    ],
  },
  {
    icon: Users,
    title: "Terapia Sistémica",
    puntos: [
      "Comprensión de la persona en el contexto de sus vínculos.",
      "Trabajo con familias y redes de apoyo.",
      "Fortalece la comunicación y las relaciones significativas.",
    ],
  },
  {
    icon: Clock3,
    title: "Terapia Breve",
    puntos: [
      "Intervenciones orientadas a objetivos concretos.",
      "Cambios significativos en el menor tiempo posible.",
      "Herramientas prácticas para situaciones específicas.",
    ],
  },
  {
    icon: Sparkles,
    title: "Psicología Transpersonal",
    puntos: [
      "Integración de mente, cuerpo, emociones y dimensión existencial.",
      "Autoconocimiento, propósito y crecimiento personal.",
      "Mindfulness, Gestalt, PNL y otras herramientas integrativas.",
    ],
  },
];

const compromiso = [
  { icon: ShieldCheck, text: "Enfoque de derechos y neurodiversidad" },
  { icon: Users, text: "Familias que participan y transforman" },
  { icon: Compass, text: "Orientaciones concretas y aplicables" },
  { icon: Heart, text: "Respeto, ética y confidencialidad" },
];

export default function SobreMiPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre mí"
        title="Donde la ciencia, la experiencia y la humanidad se encuentran"
        lede="Soy Daniela Alejandra Kaiser Ortiz, Psicóloga Clínica y Educacional y Fonoaudióloga, con más de 20 años de experiencia acompañando a niñas, niños, adolescentes, adultos, familias e instituciones."
      />

      {/* Bio en primera persona + retrato */}
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-base text-quebrada/90">
          <p>
            Mi camino profesional comenzó como Fonoaudióloga en la Universidad
            Mayor. Durante años acompañé a niñas, niños y sus familias en el
            desarrollo del lenguaje y la comunicación. Fue en ese recorrido donde
            comprendí una convicción que transformó mi forma de ejercer: el
            lenguaje nunca viene solo. Detrás de cada dificultad para comunicarse
            existe también una historia, emociones, vínculos, procesos cognitivos
            y una manera única de comprender el mundo.
          </p>
          <p>
            Esa mirada me llevó a estudiar Psicología en la Universidad UNIACC.
            Quería comprender a las personas de forma integral, uniendo la
            comunicación, el desarrollo, la salud mental y el bienestar en un
            mismo proceso de acompañamiento. Hoy ambas profesiones dialogan en
            cada evaluación y en cada intervención que realizo.
          </p>
          <p>
            Desde 2005 acompaño procesos clínicos de evaluación e intervención
            con niñas, niños, adolescentes y adultos. También he sido docente y
            coordinadora académica universitaria, y actualmente me desempeño como
            Coordinadora Técnica de Inclusión Educativa en Fundación Integra para
            la región de Arica y Parinacota, donde acompaño a equipos educativos
            en el fortalecimiento de prácticas inclusivas y neuroafirmativas.
            Además, participo como referente regional en materias relacionadas
            con el autismo y el neurodesarrollo.
          </p>
          <p className="font-semibold text-quebrada">
            Hoy mi compromiso sigue siendo el mismo: ofrecer una atención cercana,
            ética y basada en evidencia, comprendiendo a cada persona en toda su
            complejidad y respetando la singularidad de su historia.
          </p>
        </div>
        <div className="space-y-4">
          <div
            className="flex aspect-[3/4] items-center justify-center rounded-2xl border-2 border-dashed border-arena bg-superficie p-6 text-center font-sans text-sm text-quebrada/70"
            role="img"
            aria-label="Retrato pendiente de Daniela Alejandra Kaiser Ortiz"
          >
            Foto profesional en camino
          </div>
          <Card className="bg-superficie">
            <p className="text-base text-quebrada/90 italic">
              Cada persona tiene su propia historia, ritmos y recursos. Mi misión
              es caminar a su lado para que pueda descubrir su potencial y vivir
              con más bienestar y propósito.
            </p>
          </Card>
        </div>
      </section>

      {/* Mi formación y acreditaciones */}
      <section aria-labelledby="formacion-titulo" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2
            id="formacion-titulo"
            className="text-center font-display text-2xl font-bold tracking-tight"
          >
            Mi formación y acreditaciones
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <GraduationCap className="size-6 text-enlace" aria-hidden="true" />
                <h3 className="font-sans text-base font-bold tracking-wide uppercase text-quebrada">
                  Formación académica
                </h3>
              </div>
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
                Formación continua y actualización permanente en neurodesarrollo,
                salud mental, educación e inclusión.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <Award className="size-6 text-enlace" aria-hidden="true" />
                <h3 className="font-sans text-base font-bold tracking-wide uppercase text-quebrada">
                  Certificaciones y especializaciones
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-base text-quebrada/90">
                {certificaciones.map((item) => (
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

            <div>
              <div className="flex items-center gap-3">
                <ScrollText className="size-6 text-enlace" aria-hidden="true" />
                <h3 className="font-sans text-base font-bold tracking-wide uppercase text-quebrada">
                  Registros y acreditaciones
                </h3>
              </div>
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
          <p className="mx-auto mt-10 max-w-3xl text-center text-base text-quebrada/90">
            Mi compromiso es ofrecer una atención ética, basada en evidencia
            científica y centrada en la persona, integrando mente, cuerpo y
            espíritu para promover bienestar, desarrollo y calidad de vida.
          </p>
        </div>
      </section>

      {/* Mi enfoque */}
      <section
        aria-labelledby="enfoque-titulo"
        className="mx-auto max-w-6xl px-4 py-14"
      >
        <h2
          id="enfoque-titulo"
          className="font-display text-2xl font-bold tracking-tight"
        >
          Mi enfoque
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4 text-base text-quebrada/90">
            <p>
              Trabajo desde un enfoque de derechos y de respeto por la
              neurodiversidad: evaluar no es etiquetar, es comprender cómo una
              persona percibe, se comunica y siente, para que su entorno pueda
              acompañarla mejor.
            </p>
            <p>
              Las familias son parte del proceso, no espectadoras. Cada devolución
              busca traducir los resultados en orientaciones concretas para la
              casa, el jardín o el colegio.
            </p>
          </div>
          <Card className="bg-pacifico/5">
            <p className="text-base text-quebrada/90">
              Mi compromiso es acompañar con respeto, empatía y profesionalismo,
              integrando <strong className="font-semibold text-quebrada">ciencia, experiencia y humanidad</strong>{" "}
              en cada proceso.
            </p>
          </Card>
        </div>

        <h3 className="mt-10 text-center font-sans text-base font-bold tracking-wide uppercase text-enlace">
          Integro distintos enfoques terapéuticos para una atención personalizada
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {enfoques.map(({ icon: Icon, title, puntos }) => (
            <Card key={title} className="h-full">
              <span className="flex size-11 items-center justify-center rounded-full bg-arena">
                <Icon className="size-5 text-enlace" aria-hidden="true" />
              </span>
              <h4 className="mt-4 font-sans text-base font-bold text-quebrada">
                {title}
              </h4>
              <ul className="mt-3 space-y-2 text-base text-quebrada/90">
                {puntos.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-pacifico"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-arena bg-superficie p-6">
          <p className="max-w-prose text-base text-quebrada/90">
            <strong className="font-semibold text-quebrada">
              No creo en una única forma de hacer terapia.
            </strong>{" "}
            Cada persona es única. Por eso integro distintos enfoques basados en
            evidencia y una mirada integral que me permite adaptar cada proceso a
            las necesidades, fortalezas y objetivos de quien consulta.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {compromiso.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 font-sans text-sm font-semibold text-quebrada"
              >
                <Icon className="size-5 shrink-0 text-enlace" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg text-enlace italic">“{TAGLINE}”</p>
        </div>
      </section>

      <VoiceDivider />

      <div className="flex justify-center py-12">
        <BookingCTA />
      </div>

      <CtaFinal />
    </>
  );
}
