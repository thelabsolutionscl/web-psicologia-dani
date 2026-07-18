import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Persistencia de suscriptores del boletín. Igual que reservas-db, solo
 * corre en el servidor con la service role key y degrada sin las
 * variables de Supabase (en ese caso la Server Action recurre al correo).
 */

function getClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function newsletterDbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Guarda un correo. Devuelve "guardado" (nuevo), "existente" (ya estaba,
 * idempotente), "sin-db" o "error". El correo duplicado no es un fallo:
 * la persona simplemente ya estaba suscrita.
 */
export async function guardarSuscriptor(
  correo: string,
  origen: string,
): Promise<"guardado" | "existente" | "sin-db" | "error"> {
  const db = getClient();
  if (!db) return "sin-db";
  const { error } = await db
    .from("suscriptores")
    .insert({ correo: correo.toLowerCase(), origen });
  if (!error) return "guardado";
  // 23505 = violación de unicidad → ya estaba suscrito.
  if (error.code === "23505") return "existente";
  console.error("[newsletter] error guardando suscriptor:", error.message);
  return "error";
}
