import { describe, expect, it } from "vitest";
import { minutosLectura } from "@/lib/blog";

describe("minutosLectura", () => {
  it("estima ~200 palabras por minuto", () => {
    const texto = Array.from({ length: 400 }, () => "palabra").join(" ");
    expect(minutosLectura(texto)).toBe(2);
  });

  it("nunca baja de 1 minuto", () => {
    expect(minutosLectura("hola")).toBe(1);
    expect(minutosLectura("")).toBe(1);
  });

  it("ignora espacios múltiples y saltos de línea", () => {
    const texto = "una   dos\n\ntres\t cuatro";
    expect(minutosLectura(texto)).toBe(1);
  });
});
