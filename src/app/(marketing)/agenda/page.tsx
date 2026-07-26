import type { Metadata } from "next";
import {
  CalendarClock,
  ClipboardList,
  CreditCard,
  Globe,
  Lock,
  MailCheck,
  MonitorSmartphone,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { pagosConfigurados } from "@/lib/pagos";
import { buildMetadata } from "@/lib/seo";
import { HORARIO, PRECIOS } from "@/lib/site";
import { BookingWizard } from "./BookingWizard";

export const metadata: Metadata = buildMetadata({
  title: "Reserva de horas",
  description:
    "Comencemos tu proceso: elige servicio, fecha y bloque horario, y confirma con un abono de $5.000. Atención online para todo Chile. Cupos limitados.",
  path: "/agenda",
});

// Dinámica para que el estado del pago (MP_ACCESS_TOKEN) se lea en cada
// request y no quede fijado en build.
export const dynamic = "force-dynamic";

const pasos = [
  {
    icon: CalendarClock,
    title: "Reserva tu hora",
    text: "Elige el servicio y el horario que más te acomode.",
  },
  {
    icon: ClipboardList,
    title: "Completa el formulario previo",
    text: "Te enviaremos un formulario para conocer tus antecedentes.",
  },
  {
    icon: MailCheck,
    title: "Recibe la confirmación",
    text: "Confirmaremos tu hora y te enviaremos los detalles.",
  },
  {
    icon: MonitorSmartphone,
    title: "Nos encontramos online",
    text: "Sesión por videollamada en un espacio seguro y confidencial.",
  },
];

const info = [
  {
    icon: Globe,
    title: "Atención para todo Chile y el extranjero",
    text: "Sesiones online con la misma calidad y confidencialidad.",
  },
  {
    icon: CalendarClock,
    title: "Horarios de atención",
    text: `${HORARIO.rango}. Dos cupos diarios.`,
  },
  {
    icon: CreditCard,
    title: "Reserva tu hora",
    text: `Con abono de ${PRECIOS.abonoReserva}. El saldo se paga antes de la sesión.`,
  },
  {
    icon: Lock,
    title: "Pago seguro",
    text: "Boleta de honorarios reembolsable en Isapre y seguros complementarios.",
  },
];

export default function AgendaPage() {
  return (
    <>
      <PageHero
        eyebrow="Agenda online"
        title="Comencemos tu proceso"
        lede={`El primer paso para comprender, orientar y acompañar tu proceso. Elige el servicio, la fecha y el bloque que te acomode; son dos cupos diarios (${HORARIO.rango}) y cada hora se confirma junto con el abono de ${PRECIOS.abonoReserva}.`}
      />

      {/* Cómo funciona */}
      <section
        aria-labelledby="agenda-pasos-titulo"
        className="mx-auto max-w-6xl px-4 pb-12"
      >
        <h2 id="agenda-pasos-titulo" className="sr-only">
          Cómo funciona la reserva
        </h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="rounded-2xl border border-arena bg-superficie p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full bg-pacifico font-sans text-base font-bold text-white"
                >
                  {i + 1}
                </span>
                <Icon className="size-5 text-enlace" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-sans text-base font-bold text-quebrada">
                {title}
              </h3>
              <p className="mt-1 text-base text-quebrada/90">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Reserva */}
      <section aria-labelledby="agenda-form-titulo" className="mx-auto max-w-3xl px-4 pb-14">
        <h2
          id="agenda-form-titulo"
          className="mb-6 font-display text-2xl font-bold tracking-tight"
        >
          Reserva tu hora
        </h2>
        <BookingWizard pagoActivo={pagosConfigurados()} />
        <p className="mt-6 text-center font-sans text-sm text-quebrada/80">
          ¿Vives fuera de Chile? Los bloques están en hora de Chile continental:
          al elegir fecha y bloque verás automáticamente la equivalencia con tu
          zona horaria.
        </p>
      </section>

      {/* Info */}
      <section aria-label="Información de reserva" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {info.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon className="size-6 text-enlace" aria-hidden="true" />
                <p className="mt-3 font-sans text-base font-bold">{title}</p>
                <p className="mt-1 text-base text-quebrada/90">{text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 max-w-prose text-base text-quebrada/90">
            <strong className="font-semibold text-quebrada">
              Confidencialidad garantizada:
            </strong>{" "}
            las sesiones online se rigen por el mismo secreto profesional que una
            consulta presencial. Tu información está protegida y no se comparte
            con terceros, salvo las excepciones legales.
          </p>
        </div>
      </section>
    </>
  );
}
