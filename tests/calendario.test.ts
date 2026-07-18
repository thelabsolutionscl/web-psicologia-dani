import { describe, expect, it } from "vitest";
import { eventoICS } from "@/lib/calendario";

describe("eventoICS", () => {
  const base = {
    fecha: "2026-07-20",
    bloque: "17:30–18:30", // en-dash
    titulo: "Sesión con Daniela",
    descripcion: "Reserva confirmada",
  };

  it("genera un VCALENDAR/VEVENT con inicio y fin en hora de Chile", () => {
    const ics = eventoICS(base);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("DTSTART;TZID=America/Santiago:20260720T173000");
    expect(ics).toContain("DTEND;TZID=America/Santiago:20260720T183000");
    expect(ics).toContain("END:VCALENDAR");
  });

  it("acepta también el guion normal en el bloque", () => {
    const ics = eventoICS({ ...base, bloque: "18:30-19:30" });
    expect(ics).toContain("DTSTART;TZID=America/Santiago:20260720T183000");
    expect(ics).toContain("DTEND;TZID=America/Santiago:20260720T193000");
  });

  it("incluye un recordatorio (VALARM) una hora antes", () => {
    const ics = eventoICS(base);
    expect(ics).toContain("BEGIN:VALARM");
    expect(ics).toContain("TRIGGER:-PT1H");
  });

  it("escapa comas y punto y coma en los textos", () => {
    const ics = eventoICS({
      ...base,
      titulo: "Sesión, parte 1; online",
    });
    expect(ics).toContain("SUMMARY:Sesión\\, parte 1\\; online");
  });

  it("usa CRLF como separador de líneas (requisito iCalendar)", () => {
    expect(eventoICS(base)).toContain("\r\n");
  });
});
