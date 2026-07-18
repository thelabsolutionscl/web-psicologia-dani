import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Pruebas unitarias de la lógica pura (fechas de agenda, generación de
 * .ics, firma del webhook, escape de CSV/HTML). No renderizan React ni
 * tocan la red: corren rápido en CI. El alias @/ replica el de tsconfig.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
