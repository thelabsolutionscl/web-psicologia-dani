import type { Suscriptor } from "@/lib/newsletter-db";
import type { Reserva } from "@/lib/reservas-db";

/**
 * Serialización CSV para los exports del panel (respaldo/contabilidad).
 * Separada de los route handlers para poder probarla sin el runtime de
 * Next.
 */

const COLUMNAS: { clave: keyof Reserva; titulo: string }[] = [
  { clave: "fecha", titulo: "Fecha" },
  { clave: "bloque", titulo: "Bloque" },
  { clave: "servicio_nombre", titulo: "Servicio" },
  { clave: "nombre", titulo: "Nombre" },
  { clave: "correo", titulo: "Correo" },
  { clave: "telefono", titulo: "Teléfono" },
  { clave: "estado", titulo: "Estado" },
  { clave: "mensaje", titulo: "Comentario" },
  { clave: "created_at", titulo: "Creada" },
];

/**
 * Escapa un campo CSV (RFC 4180): dobla las comillas y entrecomilla el
 * campo si contiene coma, comilla o salto de línea. Además protege contra
 * inyección de fórmulas en Excel/Sheets prefijando con comilla simple los
 * valores que empiezan por = + - @.
 */
export function celdaCSV(valor: unknown): string {
  let texto = String(valor ?? "");
  if (/^[=+\-@]/.test(texto)) {
    texto = `'${texto}`;
  }
  if (/[",\n\r]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

/** Une encabezado + filas con BOM inicial (Excel abre en UTF-8). */
function componer(encabezado: string[], filas: string[][]): string {
  const lineas = [
    encabezado.map(celdaCSV).join(","),
    ...filas.map((f) => f.map(celdaCSV).join(",")),
  ];
  return "﻿" + lineas.join("\r\n");
}

/** CSV completo de reservas. */
export function reservasACSV(reservas: Reserva[]): string {
  return componer(
    COLUMNAS.map((c) => c.titulo),
    reservas.map((r) => COLUMNAS.map((c) => String(r[c.clave] ?? ""))),
  );
}

/** CSV de suscriptores del boletín (para migrar a Mailchimp/Resend). */
export function suscriptoresACSV(subs: Suscriptor[]): string {
  return componer(
    ["Correo", "Origen", "Fecha de alta"],
    subs.map((s) => [s.correo, s.origen, s.created_at]),
  );
}
