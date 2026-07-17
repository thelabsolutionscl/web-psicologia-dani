"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { MOTIVOS_CONTACTO } from "@/lib/site";

export type ContactFields = {
  nombre: string;
  correo: string;
  telefono: string;
  motivo: string;
  mensaje: string;
};

export type ContactFormState = {
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFields, string>>;
  values?: Partial<ContactFields>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Server Action del formulario de contacto (sección 6.6): valida,
 *  envía por Resend a CONTACT_TO_EMAIL y redirige a /gracias. */
export async function sendContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot antispam: si el campo oculto viene lleno, se simula éxito.
  if (String(formData.get("empresa") ?? "").trim() !== "") {
    redirect("/gracias");
  }

  const values: ContactFields = {
    nombre: String(formData.get("nombre") ?? "").trim(),
    correo: String(formData.get("correo") ?? "").trim(),
    telefono: String(formData.get("telefono") ?? "").trim(),
    motivo: String(formData.get("motivo") ?? "").trim(),
    mensaje: String(formData.get("mensaje") ?? "").trim(),
  };

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (values.nombre.length < 2) {
    fieldErrors.nombre = "Escribe tu nombre para poder responderte.";
  }
  if (!EMAIL_REGEX.test(values.correo)) {
    fieldErrors.correo = "Revisa tu correo: parece incompleto.";
  }
  if (!(MOTIVOS_CONTACTO as readonly string[]).includes(values.motivo)) {
    fieldErrors.motivo = "Selecciona el motivo de tu consulta.";
  }
  if (values.mensaje.length < 10) {
    fieldErrors.mensaje =
      "Cuéntame brevemente tu consulta (al menos unas palabras).";
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      error:
        "El formulario aún no está habilitado. Mientras tanto, escríbeme directamente por WhatsApp.",
      values,
    };
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || "psicofono.danielakaiser@gmail.com";

  const { error } = await resend.emails.send({
    // Remitente por defecto de Resend hasta verificar el dominio propio.
    from: "Sitio web <onboarding@resend.dev>",
    to,
    replyTo: values.correo,
    subject: `Nueva consulta web: ${values.motivo} — ${values.nombre}`,
    text: [
      `Nombre: ${values.nombre}`,
      `Correo: ${values.correo}`,
      `Teléfono: ${values.telefono || "(no indicado)"}`,
      `Motivo: ${values.motivo}`,
      "",
      "Mensaje:",
      values.mensaje,
    ].join("\n"),
  });

  if (error) {
    return {
      error:
        "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbeme por WhatsApp.",
      values,
    };
  }

  redirect("/gracias");
}
