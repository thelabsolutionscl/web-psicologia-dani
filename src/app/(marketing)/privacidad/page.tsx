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
            El formulario de contacto solicita tu nombre, correo, teléfono
            (opcional), motivo de consulta y mensaje. Estos datos se usan
            exclusivamente para responder tu consulta y coordinar la
            atención; no se comparten con terceros ni se usan con fines
            publicitarios.
          </p>
          <p>
            Por favor, no incluyas información clínica sensible en el
            formulario: esa información se conversa en un contexto de
            atención, protegido por el secreto profesional.
          </p>

          <h2 className="font-display text-xl font-semibold tracking-tight text-quebrada">
            Servicios de terceros
          </h2>
          <p>
            El envío del formulario utiliza el servicio de correo Resend. La
            agenda y el pago se gestionan en la plataforma externa Encuadrado,
            que tiene sus propias condiciones y políticas de privacidad. El
            sitio puede usar herramientas de estadísticas de navegación
            (Plausible o Google Analytics) para entender de forma agregada
            cómo se usa.
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

          <p className="text-quebrada/70">
            [PLACEHOLDER: revisión legal de esta política antes del
            lanzamiento]
          </p>
        </div>
      </section>
    </>
  );
}
