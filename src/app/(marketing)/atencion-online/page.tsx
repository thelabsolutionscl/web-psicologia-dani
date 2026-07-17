import type { Metadata } from "next";
import { Globe, Lock, MonitorSmartphone, Wifi } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";
import { ADDRESS, HORARIO, PRECIOS, siPendiente } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Atención online",
  description:
    "Psicóloga y fonoaudióloga online en Chile: cómo funcionan las sesiones, requisitos técnicos, confidencialidad y atención para chilenos en el extranjero.",
  path: "/atencion-online",
});

const pasos = [
  {
    title: "Agenda y reserva",
    description: `Eliges tu hora online y la reservas con un abono de ${PRECIOS.abonoReserva}. El saldo se paga antes de la sesión.`,
  },
  {
    title: "Recibe el enlace",
    description:
      "La videollamada se gestiona a través de la plataforma de agenda: recibirás el enlace y los recordatorios en tu correo.",
  },
  {
    title: "Nos encontramos online",
    description:
      "Sesiones por videollamada en un espacio confidencial, estés donde estés en Chile o en el extranjero.",
  },
];

export default function AtencionOnlinePage() {
  return (
    <>
      <PageHero
        eyebrow="Atención online"
        title="Atención online, con la honestidad de lo presencial"
        lede="Trabajo online en todo Chile: entrevistas, terapia y devoluciones por videollamada. Y cuando una evaluación necesita observación presencial, lo digo con claridad y lo resolvemos en una sola jornada en Arica."
      >
        <BookingCTA />
      </PageHero>

      <section aria-labelledby="pasos-titulo" className="mx-auto max-w-6xl px-4 pb-12">
        <h2
          id="pasos-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          Cómo funciona, paso a paso
        </h2>
        <ProcessSteps steps={pasos} />
      </section>

      {/* Modelo híbrido */}
      <section aria-labelledby="hibrido-titulo" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2
            id="hibrido-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            ¿Qué es online y qué es presencial?
          </h2>
          <div className="mt-4 space-y-4 text-base text-quebrada/90">
            <p>
              <strong className="font-semibold text-quebrada">Online:</strong>{" "}
              las entrevistas iniciales, las sesiones de psicoterapia, las
              entrevistas de evaluación y las devoluciones con entrega de
              informe. Es decir, casi todo el proceso.
            </p>
            <p>
              <strong className="font-semibold text-quebrada">
                Presencial:
              </strong>{" "}
              la observación directa de algunas evaluaciones — como el ADOS-2
              en la evaluación de autismo — requiere estar en la misma sala.
              Esa parte se concentra en una sola jornada en {ADDRESS.label},
              la sede de jornadas presenciales de evaluación.
            </p>
            <p>
              Este modelo híbrido no es una limitación: es la forma honesta de
              hacer bien una evaluación viviendo en cualquier punto de Chile.
            </p>
          </div>
        </div>
      </section>

      {/* Requisitos y confidencialidad */}
      <section
        aria-labelledby="requisitos-titulo"
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <h2
          id="requisitos-titulo"
          className="mb-8 font-display text-2xl font-bold tracking-tight"
        >
          Lo que necesitas para tu sesión
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <Wifi className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">
              Conexión estable
            </p>
            <p className="mt-1 text-base text-quebrada/90">
              Una conexión a internet que soporte videollamada.
            </p>
          </Card>
          <Card>
            <MonitorSmartphone className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">
              Cámara y micrófono
            </p>
            <p className="mt-1 text-base text-quebrada/90">
              Computador, tablet o celular con cámara y audio.
            </p>
          </Card>
          <Card>
            <Lock className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">
              Espacio tranquilo
            </p>
            <p className="mt-1 text-base text-quebrada/90">
              Un lugar privado y sin interrupciones durante la sesión.
            </p>
          </Card>
          <Card>
            <Globe className="size-6 text-pacifico" aria-hidden="true" />
            <p className="mt-3 font-sans text-base font-bold">Horarios</p>
            <p className="mt-1 text-base text-quebrada/90">
              Atención de {HORARIO.rango}. Días de atención:{" "}
              {siPendiente(HORARIO.dias, "por confirmar")}.
            </p>
          </Card>
        </div>
        <p className="mt-8 max-w-prose text-base text-quebrada/90">
          <strong className="font-semibold text-quebrada">
            Confidencialidad:
          </strong>{" "}
          las sesiones online se rigen por el mismo secreto profesional que
          una consulta presencial. Nada de lo que conversemos se comparte con
          terceros sin tu autorización, salvo las excepciones que establece la
          ley.
        </p>
      </section>

      {/* Chilenos en el extranjero */}
      <section aria-labelledby="extranjero-titulo" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2
            id="extranjero-titulo"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Chilenos en el extranjero
          </h2>
          <div className="mt-4 space-y-4 text-base text-quebrada/90">
            <p>
              Si vives fuera de Chile, también podemos trabajar juntos: las
              sesiones de terapia y las entrevistas se realizan igual que para
              cualquier consultante online.
            </p>
            <p>
              Los horarios de atención ({HORARIO.rango}) se publican en hora
              de Chile continental; al agendar, revisa la equivalencia con tu
              zona horaria — la página de agenda te la muestra al elegir tu
              hora.
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
