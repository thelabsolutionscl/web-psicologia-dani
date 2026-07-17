import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/reservas-db";

/**
 * Rate limiting por acción + IP. Lee la IP del cliente desde las
 * cabeceras del proxy (Vercel). Devuelve true si la acción está
 * permitida. Sin base de datos, no limita (degradación).
 */
export async function permitir(
  accion: string,
  max: number,
  ventanaSeg: number,
): Promise<boolean> {
  const h = await headers();
  const ip =
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "desconocida";
  return checkRateLimit(`${accion}:${ip}`, max, ventanaSeg);
}
