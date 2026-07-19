import { defineConfig, devices } from "@playwright/test";

/**
 * Pruebas E2E de los caminos felices (humo): home + navegación, tema
 * claro/oscuro, avance del wizard de reserva y validación del formulario
 * de contacto. Levantan el sitio ya construido (`npm run start`) — en CI
 * se corre `npm run build` antes. No dependen de Supabase/Resend/MP: solo
 * ejercen el front hasta donde el sitio degrada sin esos servicios.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
