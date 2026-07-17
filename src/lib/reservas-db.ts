import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { BookingRequest } from "@/lib/booking";

/**
 * Acceso a la base de reservas (Supabase, Fase A). Solo se usa desde el
 * servidor (Server Actions y route handlers) con la service role key;
 * la tabla tiene RLS sin políticas públicas (ver supabase/schema.sql).
 *
 * Sin las variables SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY el sitio
 * degrada al comportamiento anterior: toda la agenda visible y solicitud
 * por correo/WhatsApp sin bloqueo de cupos.
 */

/** Estados que ocupan el cupo (una cancelada o realizada lo libera). */
const ESTADOS_ACTIVOS = ["solicitada", "confirmada", "pagada"];

export type SlotOcupado = { fecha: string; bloque: string };

function getClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function dbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Cupos ocupados en un rango de fechas (YYYY-MM-DD, inclusivo). */
export async function getSlotsOcupados(
  desde: string,
  hasta: string,
): Promise<SlotOcupado[]> {
  const db = getClient();
  if (!db) return [];

  const { data, error } = await db
    .from("reservas")
    .select("fecha,bloque")
    .gte("fecha", desde)
    .lte("fecha", hasta)
    .in("estado", ESTADOS_ACTIVOS);

  if (error) {
    // Ante un error de lectura se muestra la agenda completa: el índice
    // único de la base sigue impidiendo la doble reserva al insertar.
    console.error("[reservas] error leyendo disponibilidad:", error.message);
    return [];
  }
  return (data ?? []).map((r) => ({ fecha: r.fecha, bloque: r.bloque }));
}

export type CrearReservaResult = "creada" | "ocupada" | "error" | "sin-db";

/** Registra la solicitud. "ocupada" = otra reserva activa ganó el cupo. */
export async function crearReserva(
  req: BookingRequest,
): Promise<CrearReservaResult> {
  const db = getClient();
  if (!db) return "sin-db";

  const { error } = await db.from("reservas").insert({
    servicio_id: req.servicioId,
    servicio_nombre: req.servicioNombre,
    fecha: req.fecha,
    bloque: req.bloque,
    nombre: req.nombre.trim(),
    correo: req.correo.trim(),
    telefono: req.telefono.trim(),
    mensaje: req.mensaje.trim(),
  });

  if (!error) return "creada";
  // 23505 = violación del índice único reservas_slot_activo
  if (error.code === "23505") return "ocupada";
  console.error("[reservas] error creando reserva:", error.message);
  return "error";
}
