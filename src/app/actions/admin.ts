"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import {
  adminConfigured,
  cerrarSesionAdmin,
  passwordCorrecta,
  requireAdmin,
  setSesionAdmin,
} from "@/lib/admin-auth";
import { BLOQUES, SERVICIOS } from "@/lib/booking";
import {
  cambiarEstado,
  crearBloqueo,
  crearReservaManual,
  eliminarBloqueo,
  ESTADOS_RESERVA,
  setDiasAtencion,
  type EstadoReserva,
  type Reserva,
} from "@/lib/reservas-db";
import { PRECIOS, SITE_NAME } from "@/lib/site";

export type LoginState = { error?: string };

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!adminConfigured()) {
    return {
      error:
        "El panel no está habilitado: falta configurar ADMIN_PASSWORD en el entorno.",
    };
  }
  const intento = String(formData.get("password") ?? "");
  if (!passwordCorrecta(intento)) {
    return { error: "Contraseña incorrecta." };
  }
  await setSesionAdmin();
  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  await cerrarSesionAdmin();
  redirect("/admin/login");
}

/** Cambia el estado de una reserva; al confirmar avisa al paciente. */
export async function actualizarEstadoReserva(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const estado = String(formData.get("estado") ?? "") as EstadoReserva;
  if (!id || !ESTADOS_RESERVA.includes(estado)) return;

  const reserva = await cambiarEstado(id, estado);
  if (reserva && estado === "confirmada") {
    await avisarConfirmacion(reserva);
  }
  revalidatePath("/admin");
}

export async function crearReservaManualAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const servicioId = String(formData.get("servicioId") ?? "");
  const servicio = SERVICIOS.find((s) => s.id === servicioId);
  const fecha = String(formData.get("fecha") ?? "");
  const bloque = String(formData.get("bloque") ?? "");
  const nombre = String(formData.get("nombre") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const correo = String(formData.get("correo") ?? "").trim();

  if (
    !servicio ||
    !/^\d{4}-\d{2}-\d{2}$/.test(fecha) ||
    !(BLOQUES as readonly string[]).includes(bloque) ||
    nombre.length < 2
  ) {
    return;
  }

  await crearReservaManual({
    servicioId: servicio.id,
    servicioNombre: servicio.nombre,
    fecha,
    bloque,
    nombre,
    correo,
    telefono,
  });
  revalidatePath("/admin");
}

export async function crearBloqueoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const fecha = String(formData.get("fecha") ?? "");
  const bloqueRaw = String(formData.get("bloque") ?? "");
  const motivo = String(formData.get("motivo") ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return;
  const bloque = (BLOQUES as readonly string[]).includes(bloqueRaw)
    ? bloqueRaw
    : null;
  await crearBloqueo(fecha, bloque, motivo);
  revalidatePath("/admin/disponibilidad");
}

export async function eliminarBloqueoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await eliminarBloqueo(id);
  revalidatePath("/admin/disponibilidad");
}

export async function guardarDiasAtencion(formData: FormData): Promise<void> {
  await requireAdmin();
  const dias = formData
    .getAll("dias")
    .map(Number)
    .filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
  if (dias.length === 0) return; // al menos un día de atención
  await setDiasAtencion(dias);
  revalidatePath("/admin/disponibilidad");
}

/** Correo de confirmación al paciente (mejor esfuerzo). */
async function avisarConfirmacion(reserva: Reserva): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "Agenda web <onboarding@resend.dev>",
    to: reserva.correo,
    subject: `Tu hora quedó confirmada — ${reserva.fecha}, ${reserva.bloque}`,
    text: [
      `Hola ${reserva.nombre},`,
      "",
      `Tu hora de ${reserva.servicio_nombre} quedó confirmada:`,
      "",
      `Fecha: ${reserva.fecha}`,
      `Horario: ${reserva.bloque} (hora de Chile continental)`,
      "",
      `Recuerda que la reserva se sostiene con el abono de ${PRECIOS.abonoReserva}; el saldo se paga antes de la sesión. Si necesitas reagendar, responde este correo o escríbeme por WhatsApp.`,
      "",
      "Nos vemos,",
      SITE_NAME,
      "Psicóloga · Fonoaudióloga",
    ].join("\n"),
  });
  if (error) {
    console.error("[admin] error avisando confirmación:", error.message);
  }
}
