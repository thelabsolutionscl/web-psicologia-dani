import type { Metadata } from "next";
import {
  Clock,
  CreditCard,
  Globe,
  HandHeart,
  Heart,
  Home,
  Lock,
  MonitorSmartphone,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";
import { ADDRESS, HORARIO, PRECIOS, siPendiente } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Modalidad de atención",
  description:
    "Atención online para todo Chile, con evaluaciones presenciales en Arica solo cuando realmente son necesarias. Cómo funciona, requisitos y atención en el extranjero.",
  path: "/atencion-online",
});

const confianza = [
  {
    icon: HandHeart,
    title: "Honestidad",
    text: "Te recomiendo solo lo que realmente necesitas.",
  },
  {
    icon: ShieldCheck,
    title: "Confidencialidad",
    text: "La misma protección y cuidado que en una atención presencial.",
  },
  {
    icon: Users,
    title: "Cercanía",
    text: "Acompañamiento humano, estés donde estés.",
  },
];

const pasos = [
  {
    title: "Agenda tu hora",
    description: `Eliges el día y la hora que mejor se adapta a ti y reservas con un abono de ${PRECIOS.abonoReserva}.`,
  },
  {
    title: "Formulario previo",
    description:
      "Recibirás un formulario para conocer tus antecedentes y el motivo de consulta.",
  },
  {
    title: "Nos conectamos",
    description:
      "Nos reunimos por videollamada en un espacio seguro y confidencial.",
  },
  {
    title: "Evaluación o terapia",
    description:
      "Realizamos el proceso acordado: evaluación, intervención o sesión de seguimiento.",
  },
  {
    title: "Seguimiento",
    description:
      "Te acompaño durante todo el proceso y resolvemos juntos cada etapa.",
  },
];

const requisitos = [
  {
    icon: Wifi,
    title: "Conexión estable",
    text: "Una conexión a internet que soporte videollamada.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cámara y micrófono",
    text: "Computador, tablet o celular con cámara y audio.",
  },
  {
    icon: Lock,
    title: "Espacio tranquilo",
    text: "Un lugar privado y sin interrupciones durante la sesión.",
  },
  {
    icon: Clock,
    title: "Horarios",
    text: `Atención de ${HORARIO.rango}. Días: ${siPendiente(HORARIO.dias, "por confirmar")}.`,
  },
  {
    icon: CreditCard,
    title: "Pago seguro",
    text: `Abono de ${PRECIOS.abonoReserva} para reservar; boleta reembolsable en Isapre y seguros complementarios.`,
  },
];

const beneficios = [
  {
    icon: Clock,
    title: "Ahorro de tiempo",
    text: "Sin traslados ni esperas.",
  },
  {
    icon: Home,
    title: "Desde tu hogar",
    text: "Estés donde estés, puedes recibir acompañamiento profesional.",
  },
  {
    icon: Globe,
    title: "Desde cualquier ciudad",
    text: "En Chile o desde el extranjero.",
  },
  {
    icon: Heart,
    title: "La misma confidencialidad",
    text: "Un espacio seguro y protegido, como en una consulta presencial.",
  },
];

export default function AtencionOnlinePage() {
  return (
    <>
      <PageHero
        eyebrow="Modalidad de atención"
        title="Atención online para todo Chile"
        lede="La mayor parte del proceso —entrevistas, psicoterapia, seguimiento, orientación familiar y devoluciones— se realiza completamente online. Las evaluaciones presenciales se coordinan solo cuando realmente son necesarias."
      >
        <BookingCTA />
      </PageHero>

      {/* Confianza */}
      <section aria-label="Compromisos" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {confianza.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <Icon className="size-6 text-enlace" aria-hidden="true" />
              <p className="mt-3 font-sans text-base font-bold">{title}</p>
              <p className="mt-1 text-base text-quebrada/90">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section aria-labelledby="pasos-titulo" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2
            id="pasos-titulo"
            className="mb-8 font-display text-2xl font-bold tracking-tight"
          >
            Cómo funciona, paso a paso
          </h2>
          <ProcessSteps
            steps={pasos}
            gridClassName="sm:grid-cols-2 lg:grid-cols-5"
          />
        </div>
      </section>

      {/* Modelo híbrido */}
      <section
        aria-labelledby="hibrido-titulo"
        className="mx-auto max-w-3xl px-4 py-14"
      >
        <h2
          id="hibrido-titulo"
          className="font-display text-2xl font-bold tracking-tight"
        >
          ¿Qué es online y qué es presencial?
        </h2>
        <div className="mt-4 space-y-4 text-base text-quebrada/90">
          <p>
            <strong className="font-semibold text-quebrada">Online:</strong>{" "}
            entrevistas iniciales, psicoterapia, orientación familiar, sesiones
            de seguimiento, entrevistas de evaluación y devoluciones con entrega
            de informe. Es decir, casi todo el proceso.
          </p>
          <p>
            <strong className="font-semibold text-quebrada">Presencial:</strong>{" "}
            la observación directa de algunas evaluaciones —como el ADOS-2 en la
            evaluación de autismo— requiere estar en la misma sala. Esa parte se
            concentra en una sola jornada presencial en {ADDRESS.city}; la
            dirección exacta se coordina de forma privada al agendar.
          </p>
          <p>
            Este modelo híbrido no es una limitación: es la forma honesta de
            hacer bien una evaluación viviendo en cualquier punto de Chile.
          </p>
        </div>
      </section>

      {/* Requisitos */}
      <section
        aria-labelledby="requisitos-titulo"
        className="bg-superficie"
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2
            id="requisitos-titulo"
            className="mb-8 font-display text-2xl font-bold tracking-tight"
          >
            Lo que necesitas para tu sesión
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {requisitos.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon className="size-6 text-enlace" aria-hidden="true" />
                <p className="mt-3 font-sans text-base font-bold">{title}</p>
                <p className="mt-1 text-base text-quebrada/90">{text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 max-w-prose text-base text-quebrada/90">
            <strong className="font-semibold text-quebrada">
              Confidencialidad:
            </strong>{" "}
            las sesiones online se rigen por el mismo secreto profesional que una
            consulta presencial. Nada de lo que conversemos se comparte con
            terceros sin tu autorización, salvo las excepciones que establece la
            ley.
          </p>
        </div>
      </section>

      {/* Por qué online */}
      <section
        aria-labelledby="beneficios-titulo"
        className="mx-auto max-w-6xl px-4 py-14"
      >
        <h2
          id="beneficios-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          ¿Por qué elegir atención online?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pacifico/10">
                <Icon className="size-5 text-enlace" aria-hidden="true" />
              </span>
              <div>
                <p className="font-sans text-base font-bold text-quebrada">
                  {title}
                </p>
                <p className="mt-1 text-base text-quebrada/90">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chilenos en el extranjero */}
      <section aria-labelledby="extranjero-titulo" className="bg-superficie">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2
            id="extranjero-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            ¿Vives fuera de Chile?
          </h2>
          <div className="mt-4 space-y-4 text-base text-quebrada/90">
            <p>
              También podemos trabajar juntos: las sesiones de terapia y las
              entrevistas se realizan igual que para cualquier consultante online.
            </p>
            <p>
              Los horarios de atención ({HORARIO.rango}) se publican en hora de
              Chile continental; al agendar, revisa la equivalencia con tu zona
              horaria — la página de agenda te la muestra al elegir tu hora.
            </p>
            <p>
              Medios de pago desde el extranjero: escríbeme por WhatsApp y
              coordinamos la forma de pago que te acomode.
            </p>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
