import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  BLOQUES,
  getAvailableDays,
  hoyChileISO,
  type BookingRequest,
} from "@/lib/booking";

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

/** Minutos que una reserva con pago pendiente retiene el cupo antes de
 *  liberarse sola (cubre el tiempo de ir al checkout y volver). */
const HOLD_MINUTOS = 30;

/**
 * Libera las reservas con pago pendiente que vencieron: pasa a
 * 'cancelada' las 'solicitada' cuyo expira_at ya expiró. Es "lazy
 * expiry": se ejecuta antes de leer disponibilidad y antes de insertar,
 * así no hace falta un cron. Las reservas sin expira_at (flujo manual)
 * no se tocan.
 */
async function liberarVencidas(db: SupabaseClient): Promise<void> {
  const { error } = await db
    .from("reservas")
    .update({ estado: "cancelada" })
    .eq("estado", "solicitada")
    .not("expira_at", "is", null)
    .lt("expira_at", new Date().toISOString());
  if (error) console.error("[reservas] error liberando vencidas:", error.message);
}

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

  await liberarVencidas(db);

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
  "no_show",
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
  expira_at: string | null;
  /** Nota interna de Daniela (no visible para el paciente). */
  notas?: string | null;
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

export type ReservaManual = {
  servicioId: string;
  servicioNombre: string;
  fecha: string;
  bloque: string;
  nombre: string;
  correo: string;
  telefono: string;
};

/** Crea una reserva ya confirmada desde el panel (hora tomada por
 *  WhatsApp/teléfono). Compite por el cupo vía el índice único. */
export async function crearReservaManual(
  m: ReservaManual,
): Promise<"creada" | "ocupada" | "error" | "sin-db"> {
  const db = getClient();
  if (!db) return "sin-db";
  await liberarVencidas(db);
  const { error } = await db.from("reservas").insert({
    servicio_id: m.servicioId,
    servicio_nombre: m.servicioNombre,
    fecha: m.fecha,
    bloque: m.bloque,
    nombre: m.nombre.trim(),
    correo: m.correo.trim(),
    telefono: m.telefono.trim(),
    mensaje: "Reserva ingresada manualmente desde el panel.",
    estado: "confirmada",
    expira_at: null,
  });
  if (!error) return "creada";
  if (error.code === "23505") return "ocupada";
  console.error("[admin] error creando reserva manual:", error.message);
  return "error";
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

/** Guarda (o borra) la nota interna de una reserva. */
export async function guardarNotaReserva(
  id: string,
  notas: string,
): Promise<boolean> {
  const db = getClient();
  if (!db) return false;
  const { error } = await db
    .from("reservas")
    .update({ notas: notas.slice(0, 2000) })
    .eq("id", id);
  if (error) {
    console.error("[admin] error guardando nota:", error.message);
    return false;
  }
  return true;
}

/**
 * Rate limit atómico vía función SQL. Devuelve true si la acción está
 * permitida. Sin base configurada degrada a `true` (no limita), igual que
 * el resto del sitio.
 */
export async function checkRateLimit(
  clave: string,
  max: number,
  ventanaSeg: number,
): Promise<boolean> {
  const db = getClient();
  if (!db) return true;
  const { data, error } = await db.rpc("check_rate_limit", {
    p_clave: clave,
    p_max: max,
    p_ventana_seg: ventanaSeg,
  });
  if (error) {
    console.error("[rate-limit] error:", error.message);
    return true; // ante fallo, no bloqueamos a usuarios legítimos
  }
  return data === true;
}

/** Reservas activas cuya sesión es mañana (Chile) y aún sin recordatorio. */
export async function reservasParaRecordar(): Promise<Reserva[]> {
  const db = getClient();
  if (!db) return [];
  const [y, m, d] = hoyChileISO().split("-").map(Number);
  const manana = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
  const { data, error } = await db
    .from("reservas")
    .select("*")
    .eq("fecha", manana)
    .eq("recordado", false)
    .in("estado", ["confirmada", "pagada"]);
  if (error) {
    console.error("[recordatorios] error consultando:", error.message);
    return [];
  }
  return (data as Reserva[]) ?? [];
}

export async function marcarRecordada(id: string): Promise<void> {
  const db = getClient();
  if (!db) return;
  await db.from("reservas").update({ recordado: true }).eq("id", id);
}

export async function getReservaPorId(id: string): Promise<Reserva | null> {
  const db = getClient();
  if (!db) return null;
  const { data, error } = await db
    .from("reservas")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[reservas] error leyendo reserva:", error.message);
    return null;
  }
  return (data as Reserva) ?? null;
}

/** Quita la retención temporal (expira_at) de una reserva: evita que se
 *  auto-cancele si el pago no llegó a iniciarse (pasarela caída). */
export async function quitarHold(id: string): Promise<void> {
  const db = getClient();
  if (!db) return;
  const { error } = await db
    .from("reservas")
    .update({ expira_at: null })
    .eq("id", id);
  if (error) console.error("[reservas] error quitando hold:", error.message);
}

export type ConfirmarPagoResult =
  | "confirmada"
  | "ya-procesada"
  | "conflicto"
  | "error"
  | "sin-db";

/**
 * Confirma una reserva tras el pago del abono, de forma segura:
 * - solo promueve desde 'solicitada' (update guardado con .eq),
 * - idempotente si ya está confirmada/pagada/realizada,
 * - "conflicto" si la reserva fue cancelada/liberada o el cupo ya no está
 *   (pago capturado sin cupo → el webhook alerta a Daniela).
 */
export async function confirmarReservaPagada(
  id: string,
): Promise<ConfirmarPagoResult> {
  const db = getClient();
  if (!db) return "sin-db";

  const actual = await getReservaPorId(id);
  if (!actual) return "conflicto";
  if (
    actual.estado === "confirmada" ||
    actual.estado === "pagada" ||
    actual.estado === "realizada"
  ) {
    return "ya-procesada";
  }
  if (actual.estado === "cancelada") return "conflicto";

  // estado === 'solicitada': confirmar y quitar el vencimiento.
  const { data, error } = await db
    .from("reservas")
    .update({ estado: "confirmada", expira_at: null })
    .eq("id", id)
    .eq("estado", "solicitada")
    .select("*");
  if (error) {
    if (error.code === "23505") return "conflicto";
    console.error("[pagos] error confirmando reserva:", error.message);
    return "error";
  }
  // Si otra transición ganó la carrera, no se actualizó ninguna fila.
  if (!data || data.length === 0) return "conflicto";
  return "confirmada";
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
  // Debe ser un arreglo NO vacío de días válidos (0-6). Un arreglo vacío
  // dejaría la agenda sin días; en ese caso caemos al valor por defecto.
  const valido =
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => typeof v === "number" && v >= 0 && v <= 6);
  return valido ? (value as number[]) : null;
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

/**
 * ¿El slot (fecha, bloque) es realmente reservable ahora? Comprueba que
 * el día esté dentro de la ventana ofrecida y sea día de atención (lo que
 * ya excluye fechas pasadas), que el bloque sea válido y que no exista un
 * bloqueo (de día completo o de ese bloque). No depende de Supabase para
 * lo básico: sin base, todos los días de atención se consideran válidos.
 */
export async function slotDisponible(
  fecha: string,
  bloque: string,
): Promise<boolean> {
  if (!(BLOQUES as readonly string[]).includes(bloque)) return false;

  const diasConfig = await getDiasAtencion();
  const dias = getAvailableDays(diasConfig ?? undefined);
  if (!dias.some((d) => d.fecha === fecha)) return false;

  const bloqueos = await listBloqueos(fecha);
  const bloqueado = bloqueos.some(
    (b) => b.fecha === fecha && (b.bloque === null || b.bloque === bloque),
  );
  return !bloqueado;
}

export type CrearReservaResult =
  | { estado: "creada"; reserva: Reserva }
  | { estado: "ocupada" }
  | { estado: "error" }
  | { estado: "sin-db" };

/** Registra la solicitud. "ocupada" = otra reserva activa ganó el cupo.
 *  `conPago` activa la retención temporal del cupo (expira_at) mientras
 *  el paciente completa el checkout. */
export async function crearReserva(
  req: BookingRequest,
  conPago = false,
): Promise<CrearReservaResult> {
  const db = getClient();
  if (!db) return { estado: "sin-db" };

  // Libera cupos de checkouts abandonados antes de competir por este.
  await liberarVencidas(db);

  const expira_at = conPago
    ? new Date(Date.now() + HOLD_MINUTOS * 60_000).toISOString()
    : null;

  const { data, error } = await db
    .from("reservas")
    .insert({
      servicio_id: req.servicioId,
      servicio_nombre: req.servicioNombre,
      fecha: req.fecha,
      bloque: req.bloque,
      nombre: req.nombre.trim(),
      correo: req.correo.trim(),
      telefono: req.telefono.trim(),
      mensaje: req.mensaje.trim(),
      expira_at,
    })
    .select("*")
    .single();

  if (!error && data) return { estado: "creada", reserva: data as Reserva };
  // 23505 = violación del índice único reservas_slot_activo
  if (error?.code === "23505") return { estado: "ocupada" };
  console.error("[reservas] error creando reserva:", error?.message);
  return { estado: "error" };
}
