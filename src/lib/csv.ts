import type { Reserva } from "@/lib/reservas-db";

/**
 * Serialización CSV de reservas para el panel (respaldo/contabilidad).
 * Separada del route handler para poder probarla sin el runtime de Next.
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

/** CSV completo con encabezado y BOM (Excel abre en UTF-8). */
export function reservasACSV(reservas: Reserva[]): string {
  const filas = [
    COLUMNAS.map((c) => c.titulo).join(","),
    ...reservas.map((r) => COLUMNAS.map((c) => celdaCSV(r[c.clave])).join(",")),
  ];
  return "﻿" + filas.join("\r\n");
}
