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

/* ------------------------------------------------------------------ */
/* Fase B: operaciones del panel de administración                     */
/* ------------------------------------------------------------------ */

export const ESTADOS_RESERVA = [
  "solicitada",
  "confirmada",
  "pagada",
  "realizada",
  "cancelada",
] as const;

export type EstadoReserva = (typeof ESTADOS_RESERVA)[number];

export type Reserva = {
  id: string;
  created_at: string;
  servicio_id: string;
  servicio_nombre: string;
  fecha: string;
  bloque: string;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  estado: EstadoReserva;
};

export async function listReservas(): Promise<Reserva[]> {
  const db = getClient();
  if (!db) return [];
  const { data, error } = await db
    .from("reservas")
    .select("*")
    .order("fecha", { ascending: true })
    .order("bloque", { ascending: true });
  if (error) {
    console.error("[admin] error listando reservas:", error.message);
    return [];
  }
  return (data ?? []) as Reserva[];
}

export async function cambiarEstado(
  id: string,
  estado: EstadoReserva,
): Promise<Reserva | null> {
  const db = getClient();
  if (!db) return null;
  const { data, error } = await db
    .from("reservas")
    .update({ estado })
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    console.error("[admin] error cambiando estado:", error.message);
    return null;
  }
  return data as Reserva;
}

export type Bloqueo = {
  id: string;
  fecha: string;
  /** null = día completo. */
  bloque: string | null;
  motivo: string;
};

export async function listBloqueos(desde: string): Promise<Bloqueo[]> {
  const db = getClient();
  if (!db) return [];
  const { data, error } = await db
    .from("bloqueos")
    .select("id,fecha,bloque,motivo")
    .gte("fecha", desde)
    .order("fecha", { ascending: true });
  if (error) {
    console.error("[admin] error listando bloqueos:", error.message);
    return [];
  }
  return (data ?? []) as Bloqueo[];
}

export async function crearBloqueo(
  fecha: string,
  bloque: string | null,
  motivo: string,
): Promise<boolean> {
  const db = getClient();
  if (!db) return false;
  const { error } = await db.from("bloqueos").insert({ fecha, bloque, motivo });
  if (error) {
    console.error("[admin] error creando bloqueo:", error.message);
    return false;
  }
  return true;
}

export async function eliminarBloqueo(id: string): Promise<boolean> {
  const db = getClient();
  if (!db) return false;
  const { error } = await db.from("bloqueos").delete().eq("id", id);
  if (error) {
    console.error("[admin] error eliminando bloqueo:", error.message);
    return false;
  }
  return true;
}

/** Días de atención (0=domingo … 6=sábado) desde config; null = usar
 *  el valor por defecto del código. */
export async function getDiasAtencion(): Promise<number[] | null> {
  const db = getClient();
  if (!db) return null;
  const { data, error } = await db
    .from("config")
    .select("value")
    .eq("key", "dias_atencion")
    .maybeSingle();
  if (error || !data) return null;
  const value = data.value as unknown;
  return Array.isArray(value) && value.every((v) => typeof v === "number")
    ? (value as number[])
    : null;
}

export async function setDiasAtencion(dias: number[]): Promise<boolean> {
  const db = getClient();
  if (!db) return false;
  const { error } = await db
    .from("config")
    .upsert({ key: "dias_atencion", value: dias });
  if (error) {
    console.error("[admin] error guardando días:", error.message);
    return false;
  }
  return true;
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
