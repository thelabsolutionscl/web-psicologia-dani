import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { firmaWebhookValida } from "@/lib/pagos";

const SECRET = "secreto-de-prueba";
const DATA_ID = "12345";
const REQUEST_ID = "req-abc";
const TS = "1700000000";

function firmaValida(): string {
  const manifest = `id:${DATA_ID.toLowerCase()};request-id:${REQUEST_ID};ts:${TS};`;
  const v1 = createHmac("sha256", SECRET).update(manifest).digest("hex");
  return `ts=${TS},v1=${v1}`;
}

afterEach(() => {
  delete process.env.MP_WEBHOOK_SECRET;
});

describe("firmaWebhookValida", () => {
  it("degrada a válido cuando no hay secreto configurado", async () => {
    delete process.env.MP_WEBHOOK_SECRET;
    expect(await firmaWebhookValida("cualquier-cosa", REQUEST_ID, DATA_ID)).toBe(
      true,
    );
  });

  it("acepta una firma HMAC correcta", async () => {
    process.env.MP_WEBHOOK_SECRET = SECRET;
    expect(await firmaWebhookValida(firmaValida(), REQUEST_ID, DATA_ID)).toBe(
      true,
    );
  });

  it("rechaza una firma alterada", async () => {
    process.env.MP_WEBHOOK_SECRET = SECRET;
    // Reemplaza v1 por un hash del mismo largo pero distinto garantizado.
    const v1 = firmaValida().split("v1=")[1];
    const otro = v1[0] === "0" ? "1" : "0";
    const mala = `ts=${TS},v1=${otro}${v1.slice(1)}`;
    expect(await firmaWebhookValida(mala, REQUEST_ID, DATA_ID)).toBe(false);
  });

  it("rechaza si falta el data.id", async () => {
    process.env.MP_WEBHOOK_SECRET = SECRET;
    expect(await firmaWebhookValida(firmaValida(), REQUEST_ID, null)).toBe(
      false,
    );
  });

  it("rechaza una cabecera sin ts ni v1", async () => {
    process.env.MP_WEBHOOK_SECRET = SECRET;
    expect(await firmaWebhookValida("basura", REQUEST_ID, DATA_ID)).toBe(false);
  });
});
