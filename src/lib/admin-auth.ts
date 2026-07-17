import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Autenticación del panel /admin (Fase B): una sola administradora,
 * contraseña en ADMIN_PASSWORD y sesión en cookie httpOnly firmada con
 * HMAC. Sin dependencias nuevas; si más adelante se necesitan varios
 * usuarios, migrar a Supabase Auth.
 */

const COOKIE_NAME = "admin_session";
const SESION_DIAS = 7;

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function firmar(payload: string): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function passwordCorrecta(intento: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  // Comparación en tiempo constante sobre hashes de largo fijo.
  const a = createHash("sha256").update(intento).digest();
  const b = createHash("sha256").update(real).digest();
  return timingSafeEqual(a, b);
}

export function crearTokenSesion(): string {
  const exp = Date.now() + SESION_DIAS * 24 * 60 * 60 * 1000;
  return `${exp}.${firmar(`admin:${exp}`)}`;
}

export function tokenValido(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const [expStr, firma] = token.split(".");
  const exp = Number(expStr);
  if (!exp || exp < Date.now() || !firma) return false;
  const esperada = firmar(`admin:${exp}`);
  if (firma.length !== esperada.length) return false;
  return timingSafeEqual(Buffer.from(firma), Buffer.from(esperada));
}

export async function setSesionAdmin(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, crearTokenSesion(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESION_DIAS * 24 * 60 * 60,
  });
}

export async function cerrarSesionAdmin(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export async function sesionAdminActiva(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return tokenValido(token);
}

/** Llamar al inicio de cada página o acción del panel. */
export async function requireAdmin(): Promise<void> {
  if (!(await sesionAdminActiva())) redirect("/admin/login");
}
