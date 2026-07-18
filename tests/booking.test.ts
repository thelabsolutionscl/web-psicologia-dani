import { describe, expect, it } from "vitest";
import {
  BLOQUES,
  getAvailableDays,
  hoyChileISO,
  SERVICIOS,
} from "@/lib/booking";

describe("hoyChileISO", () => {
  it("devuelve una fecha en formato YYYY-MM-DD", () => {
    expect(hoyChileISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("getAvailableDays", () => {
  it("solo ofrece días futuros (nunca hoy ni ayer)", () => {
    const hoy = hoyChileISO();
    for (const d of getAvailableDays()) {
      expect(d.fecha > hoy).toBe(true);
    }
  });

  it("respeta los días de atención indicados", () => {
    // 6 = sábado: todas las fechas devueltas deben caer en sábado.
    const soloSabados = getAvailableDays([6]);
    expect(soloSabados.length).toBeGreaterThan(0);
    for (const d of soloSabados) {
      const dow = new Date(`${d.fecha}T00:00:00Z`).getUTCDay();
      expect(dow).toBe(6);
    }
  });

  it("no ofrece nada si no hay días de atención", () => {
    expect(getAvailableDays([])).toEqual([]);
  });

  it("entrega fechas únicas y ordenadas ascendentemente", () => {
    const dias = getAvailableDays();
    const fechas = dias.map((d) => d.fecha);
    expect(new Set(fechas).size).toBe(fechas.length);
    expect([...fechas].sort()).toEqual(fechas);
  });
});

describe("catálogo de servicios y bloques", () => {
  it("tiene servicios con id único, nombre y precio", () => {
    expect(SERVICIOS.length).toBeGreaterThan(0);
    const ids = SERVICIOS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of SERVICIOS) {
      expect(s.nombre.length).toBeGreaterThan(0);
      expect(s.precio.length).toBeGreaterThan(0);
    }
  });

  it("ofrece al menos un bloque horario", () => {
    expect(BLOQUES.length).toBeGreaterThan(0);
  });
});
