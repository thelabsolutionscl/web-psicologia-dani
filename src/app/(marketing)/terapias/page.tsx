import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { buildMetadata, type FaqItem } from "@/lib/seo";
import { PRECIOS, PREVISION } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terapias",
  description:
    "Psicoterapia online para niños, adolescentes y adultos, y acompañamiento especializado en duelo. Sesiones de $40.000 con boleta reembolsable en Isapre.",
  path: "/terapias",
});

const faqItems: FaqItem[] = [
  {
    question: "¿Cuánto cuesta una sesión de terapia?",
    answer:
      "Cada sesión de psicoterapia tiene un valor de $40.000. Reservas con un abono de $5.000 y el saldo se paga antes de la sesión. Se entrega boleta de honorarios reembolsable en Isapre y seguros complementarios.",
  },
  {
    question: "¿Cómo son las sesiones online?",
    answer:
      "Nos encontramos por videollamada, en un espacio confidencial y sin traslados. Solo necesitas una conexión estable y un lugar tranquilo. Los horarios disponibles son entre 17:30 y 19:30, hora de Chile continental.",
  },
  {
    question: "¿La terapia infantil funciona online?",
    answer:
      "Sí, con un encuadre adaptado a la edad y un trabajo cercano con la familia: parte del proceso es con el niño o la niña y parte con los adultos que lo acompañan.",
  },
];

function TerapiaSeccion({
  id,
  title,
  paraQuien,
  comoSeTrabaja,
  destacada = false,
  extra,
}: {
  id: string;
  title: string;
  paraQuien: string;
  comoSeTrabaja: string;
  destacada?: boolean;
  extra?: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28">
      <Card className={destacada ? "border-pacifico/50 bg-pacifico/5" : ""}>
        <h2
          id={`${id}-titulo`}
          className="font-display text-2xl font-bold tracking-tight"
        >
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-base text-quebrada/90">
          <p>
            <strong className="font-semibold text-quebrada">
              ¿Para quién?
            </strong>{" "}
            {paraQuien}
          </p>
          <p>
            <strong className="font-semibold text-quebrada">
              ¿Cómo se trabaja online?
            </strong>{" "}
            {comoSeTrabaja}
          </p>
        </div>
        {extra}
        <p className="mt-5 font-sans text-lg font-bold text-quebrada">
          Sesión: {PRECIOS.sesionTerapia}
          <span className="block font-sans text-sm font-normal text-quebrada/70">
            {PREVISION}.
          </span>
        </p>
        <div className="mt-5">
          <BookingCTA />
        </div>
      </Card>
    </section>
  );
}

export default function TerapiasPage() {
  return (
    <>
      <PageHero
        eyebrow="Psicoterapia online"
        title="Terapia para niños, adolescentes y adultos"
        lede="Un espacio protegido para entender lo que está pasando y construir herramientas propias. Online, en todo Chile, con horarios de tarde y cupos limitados."
      >
        <BookingCTA />
      </PageHero>

      <div className="mx-auto max-w-3xl space-y-8 px-4 pb-14">
        <TerapiaSeccion
          id="infanto-juvenil"
          title="Psicoterapia infanto-juvenil"
          paraQuien="Niños, niñas y adolescentes que necesitan apoyo en regulación emocional, conducta, autoestima o acompañamiento escolar; también familias que quieren entender mejor lo que le pasa a su hijo o hija."
          comoSeTrabaja="Sesiones por videollamada adaptadas a la edad, con participación activa de la familia: parte del trabajo es con el niño o la niña y parte con los adultos que lo acompañan en el día a día."
        />

        <TerapiaSeccion
          id="adultos"
          title="Psicoterapia de adultos"
          paraQuien="Adultos que atraviesan ansiedad, dificultades de regulación emocional o momentos de cambio que piden un espacio propio para mirarse con calma."
          comoSeTrabaja="Terapia online con enfoques basados en evidencia — ACT, terapia cognitivo-conductual y terapia breve — orientada a objetivos concretos y herramientas aplicables a tu vida diaria."
        />

        <TerapiaSeccion
          id="duelo"
          title="Acompañamiento especializado en duelo"
          destacada
          paraQuien="Adultos, niños y adolescentes que viven la pérdida de una persona significativa, y familias que quieren acompañar bien un duelo infantil."
          comoSeTrabaja="Un acompañamiento respetuoso del ritmo de cada persona — cada duelo es único —, en sesiones online que dan lugar al dolor y también a la reconstrucción."
          extra={
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Certificación CESIST 2025</Badge>
              <Badge>Clínica del Duelo 2025</Badge>
            </div>
          }
        />
      </div>

      <FaqSection items={faqItems} />
      <CtaFinal />
    </>
  );
}
