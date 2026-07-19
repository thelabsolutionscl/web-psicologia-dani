import { describe, expect, it } from "vitest";
import { celdaCSV, reservasACSV, suscriptoresACSV } from "@/lib/csv";
import type { Suscriptor } from "@/lib/newsletter-db";
import type { Reserva } from "@/lib/reservas-db";

describe("celdaCSV", () => {
  it("deja intactos los valores simples", () => {
    expect(celdaCSV("Daniela")).toBe("Daniela");
  });

  it("entrecomilla cuando hay coma o salto de línea", () => {
    expect(celdaCSV("Pérez, Ana")).toBe('"Pérez, Ana"');
    expect(celdaCSV("línea 1\nlínea 2")).toBe('"línea 1\nlínea 2"');
  });

  it("dobla las comillas internas", () => {
    expect(celdaCSV('dijo "hola"')).toBe('"dijo ""hola"""');
  });

  it("neutraliza la inyección de fórmulas", () => {
    expect(celdaCSV("=1+1")).toBe("'=1+1");
    // Prefijo protector; sin coma no necesita entrecomillado.
    expect(celdaCSV("+56912345678")).toBe("'+56912345678");
    // Con coma sí se entrecomilla, además del prefijo.
    expect(celdaCSV("=HYPERLINK(1,2)")).toBe('"\'=HYPERLINK(1,2)"');
  });

  it("trata null/undefined como cadena vacía", () => {
    expect(celdaCSV(null)).toBe("");
    expect(celdaCSV(undefined)).toBe("");
  });
});

describe("reservasACSV", () => {
  const reserva: Reserva = {
    id: "abc",
    created_at: "2026-07-10T12:00:00Z",
    servicio_id: "psicoterapia",
    servicio_nombre: "Psicoterapia",
    fecha: "2026-07-20",
    bloque: "17:30–18:30",
    nombre: "Ana",
    correo: "ana@example.com",
    telefono: "+56911112222",
    mensaje: "Hola, ¿qué tal?",
    estado: "confirmada",
    expira_at: null,
  };

  it("empieza con BOM y una fila de encabezados", () => {
    const csv = reservasACSV([reserva]);
    expect(csv.startsWith("﻿")).toBe(true);
    const lineas = csv.replace("﻿", "").split("\r\n");
    expect(lineas[0]).toContain("Fecha");
    expect(lineas[0]).toContain("Estado");
  });

  it("emite una fila por reserva con los datos escapados", () => {
    const csv = reservasACSV([reserva]);
    const lineas = csv.replace("﻿", "").split("\r\n");
    expect(lineas).toHaveLength(2);
    expect(lineas[1]).toContain("Psicoterapia");
    // El teléfono empieza por "+" → protegido con prefijo (sin coma, sin comillas).
    expect(lineas[1]).toContain("'+56911112222");
    // El mensaje lleva coma → entrecomillado.
    expect(lineas[1]).toContain('"Hola, ¿qué tal?"');
  });

  it("solo emite el encabezado si no hay reservas", () => {
    const csv = reservasACSV([]);
    const lineas = csv.replace("﻿", "").split("\r\n");
    expect(lineas).toHaveLength(1);
  });
});

describe("suscriptoresACSV", () => {
  const sub: Suscriptor = {
    id: "s1",
    created_at: "2026-07-19T15:00:00Z",
    correo: "ana@example.com",
    origen: "blog",
  };

  it("emite encabezado y una fila por suscriptor", () => {
    const csv = suscriptoresACSV([sub]);
    const lineas = csv.replace("﻿", "").split("\r\n");
    expect(lineas).toHaveLength(2);
    expect(lineas[0]).toBe("Correo,Origen,Fecha de alta");
    expect(lineas[1]).toContain("ana@example.com");
    expect(lineas[1]).toContain("blog");
  });

  it("escapa correos maliciosos (inyección de fórmulas)", () => {
    const csv = suscriptoresACSV([{ ...sub, correo: "=cmd|calc" }]);
    expect(csv).toContain("'=cmd|calc");
  });
});
