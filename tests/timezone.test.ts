import { describe, expect, it } from "vitest";
import { ciudadDeZona, instanteChile, rangoEnZonaLocal } from "@/lib/timezone";

describe("instanteChile", () => {
  it("resuelve el invierno chileno (UTC-4)", () => {
    // 20 de julio: Chile continental está en UTC-4.
    expect(instanteChile("2026-07-20", "17:30").toISOString()).toBe(
      "2026-07-20T21:30:00.000Z",
    );
  });

  it("resuelve el verano chileno (UTC-3, horario de verano)", () => {
    // 15 de enero: Chile continental está en UTC-3.
    expect(instanteChile("2026-01-15", "17:30").toISOString()).toBe(
      "2026-01-15T20:30:00.000Z",
    );
  });
});

describe("rangoEnZonaLocal", () => {
  it("devuelve null para quien ya está en Chile", () => {
    expect(rangoEnZonaLocal("2026-07-20", "17:30–18:30", "America/Santiago")).toBeNull();
  });

  it("convierte a Madrid (invierno chileno: +6 horas)", () => {
    // 17:30 Chile (UTC-4) = 21:30 UTC = 23:30 Madrid (CEST, UTC+2).
    const texto = rangoEnZonaLocal("2026-07-20", "17:30–18:30", "Europe/Madrid");
    expect(texto).toContain("23:30");
    expect(texto).toContain("Madrid");
  });

  it("aclara el día cuando cruza la medianoche local", () => {
    // 18:30 Chile = 00:30 en Madrid del día siguiente (21 de julio).
    const texto = rangoEnZonaLocal("2026-07-20", "18:30–19:30", "Europe/Madrid");
    expect(texto).toContain("00:30");
    expect(texto).toMatch(/21/); // el día local (21) queda explícito
  });

  it("convierte a Buenos Aires en invierno (misma UTC-3: una hora más)", () => {
    const texto = rangoEnZonaLocal(
      "2026-07-20",
      "17:30–18:30",
      "America/Argentina/Buenos_Aires",
    );
    expect(texto).toContain("18:30–19:30");
    expect(texto).toContain("Buenos Aires");
  });
});

describe("ciudadDeZona", () => {
  it("extrae la ciudad legible", () => {
    expect(ciudadDeZona("America/Argentina/Buenos_Aires")).toBe("Buenos Aires");
    expect(ciudadDeZona("UTC")).toBe("UTC");
  });
});
