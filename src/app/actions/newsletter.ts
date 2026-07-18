"use server";

import { Resend } from "resend";
import { guardarSuscriptor } from "@/lib/newsletter-db";
import { permitir } from "@/lib/rate-limit";

export type NewsletterState = {
  ok?: boolean;
  mensaje?: string;
  error?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Suscripción al boletín. Guarda el correo en Supabase; si no hay base
 * configurada, avisa a Daniela por correo (Resend) para no perder el
 * contacto. Con honeypot y rate limit anti-spam. Nunca revela si el
 * correo ya existía (respuesta idéntica), por privacidad.
 */
export async function suscribir(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Honeypot: campo oculto que solo rellenan los bots → éxito simulado.
  if (String(formData.get("sitioWeb") ?? "").trim() !== "") {
    return { ok: true, mensaje: "¡Listo! Te avisaré cuando publique algo nuevo." };
  }

  if (!(await permitir("newsletter", 5, 600))) {
    return {
      error: "Recibimos varias solicitudes desde tu conexión. Prueba en unos minutos.",
    };
  }

  const correo = String(formData.get("correo") ?? "").trim();
  if (!EMAIL_REGEX.test(correo)) {
    return { error: "Revisa tu correo: parece incompleto." };
  }

  const exito = { ok: true, mensaje: "¡Listo! Te avisaré cuando publique algo nuevo." };

  const resultado = await guardarSuscriptor(correo, "blog");
  if (resultado === "guardado" || resultado === "existente") {
    return exito;
  }

  // Sin base o error: intentar avisar por correo para no perder el lead.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "Sitio web <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL || "psicofono.danielakaiser@gmail.com",
        subject: "Nueva suscripción al boletín",
        text: `Correo que quiere suscribirse al boletín: ${correo}`,
      });
      return exito;
    } catch {
      // cae al mensaje de abajo
    }
  }

  return {
    error: "No pudimos registrar tu correo ahora. Inténtalo más tarde.",
  };
}
