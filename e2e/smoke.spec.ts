import { expect, test } from "@playwright/test";

test.describe("Home y navegación", () => {
  test("carga con el H1 y la navegación principal", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Navegación principal" });
    await expect(nav.getByRole("link", { name: "Evaluaciones" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contacto" })).toBeVisible();
    // CTA de agenda presente (único del sitio).
    await expect(
      page.getByRole("link", { name: /Agenda tu hora/ }).first(),
    ).toBeVisible();
  });

  test("el botón de tema alterna claro/oscuro", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /tema (claro|oscuro)/i });
    const antes = await page.evaluate(
      () => document.documentElement.dataset.theme,
    );
    await toggle.click();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.theme))
      .not.toBe(antes);
  });

  test("la página de contacto valida campos vacíos", async ({ page }) => {
    await page.goto("/contacto");
    await page.getByRole("button", { name: /Enviar mensaje/ }).click();
    // Sin datos, aparece al menos un mensaje de error de campo (SC 3.3.1).
    await expect(page.getByText(/Escribe tu nombre/)).toBeVisible();
  });
});
