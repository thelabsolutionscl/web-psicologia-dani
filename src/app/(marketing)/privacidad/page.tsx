import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad",
  description:
    "Cómo se tratan los datos personales que entregas a través de este sitio: formulario de contacto, agenda online y estadísticas de navegación.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <>
      <PageHero title="Política de privacidad" />
      <section className="mx-auto max-w-3xl space-y-8 px-4 pb-16">
        <div className="space-y-4 text-base text-quebrada/90">
          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Responsable
          </h2>
          <p>
            La responsable del tratamiento de los datos entregados a través de
            este sitio es {SITE_NAME}, psicóloga y fonoaudióloga.
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Qué datos se recogen y para qué
          </h2>
          <p>
            <strong className="font-semibold text-quebrada">
              Formulario de contacto:
            </strong>{" "}
            nombre, correo, teléfono (opcional), motivo de consulta y mensaje.
            Se usan exclusivamente para responder tu consulta y coordinar la
            atención.
          </p>
          <p>
            <strong className="font-semibold text-quebrada">
              Agenda online:
            </strong>{" "}
            al reservar una hora se registran tu nombre, correo, teléfono y el
            servicio, la fecha y el bloque elegidos, con el fin de gestionar y
            confirmar tu reserva.
          </p>
          <p>
            En ambos casos los datos se usan solo para esos fines; no se
            comparten con terceros con fines publicitarios. Por favor, no
            incluyas información clínica sensible en estos formularios: esa
            información se conversa en un contexto de atención, protegido por
            el secreto profesional.
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Dónde se alojan y servicios de terceros
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-quebrada">Correo:</strong>{" "}
              los avisos y confirmaciones se envían con Resend.
            </li>
            <li>
              <strong className="font-semibold text-quebrada">
                Base de datos:
              </strong>{" "}
              las reservas se almacenan de forma segura en Supabase.
            </li>
            <li>
              <strong className="font-semibold text-quebrada">Pagos:</strong>{" "}
              el abono se procesa a través de Mercado Pago. Los datos de tu
              medio de pago los maneja directamente Mercado Pago; este sitio no
              los recibe ni los almacena.
            </li>
            <li>
              <strong className="font-semibold text-quebrada">
                Estadísticas:
              </strong>{" "}
              el sitio puede usar Plausible o Google Analytics para entender,
              de forma agregada y anónima, cómo se usa.
            </li>
          </ul>
          <p>
            Cada uno de estos servicios tiene sus propias condiciones y
            políticas de privacidad.
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Tus derechos
          </h2>
          <p>
            Conforme a la Ley N° 19.628 sobre protección de la vida privada,
            puedes solicitar en cualquier momento el acceso, la rectificación
            o la eliminación de tus datos escribiendo a través de los medios
            de contacto de este sitio.
          </p>
        </div>
      </section>
    </>
  );
}
