import { expect, test } from "@playwright/test";

/**
 * Avance del wizard de reserva hasta el paso de datos. No se envía (sin
 * Supabase/MP el sitio degrada), pero sí se verifica que cada paso
 * habilita el siguiente y que aparece la equivalencia de zona horaria.
 */
test("el wizard avanza de servicio a fecha/hora y a datos", async ({ page }) => {
  await page.goto("/agenda");

  // Paso 1: elegir un servicio y continuar.
  await page.getByRole("button", { name: /Evaluación de autismo/ }).first().click();
  await page.getByRole("button", { name: "Continuar" }).click();

  // Paso 2: aparece el selector de fecha y bloque.
  await expect(page.getByText("Elige fecha y bloque")).toBeVisible();

  // Elegir el primer día disponible (no deshabilitado) y un bloque.
  const dias = page
    .getByRole("button", { name: /de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/ })
    .and(page.locator("button:not([disabled])"));
  await dias.first().click();
  await page.getByRole("button", { name: /17:30/ }).click();

  // La equivalencia de zona horaria aparece (el runner no está en Chile).
  await expect(page.getByText(/En tu zona horaria equivale a/)).toBeVisible();

  // Continuar al paso de datos.
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText("Tus datos de contacto")).toBeVisible();
  await expect(page.getByLabel("Nombre")).toBeVisible();
});
