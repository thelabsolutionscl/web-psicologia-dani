import type { NextConfig } from "next";

/**
 * Content-Security-Policy. Se mantiene compatible con la generación
 * estática (sin nonce por request, que obligaría a render dinámico en
 * todo el sitio): script/style permiten 'unsafe-inline' porque hay
 * scripts inline propios (tema, JSON-LD) y estilos de Tailwind. Aun así
 * se endurece todo lo demás — orígenes de scripts/imagenes/conexiones,
 * base-uri, form-action, object-src y frame-ancestors — que sí bloquea
 * exfiltración, embebido y carga de recursos de terceros no previstos.
 * El checkout de Mercado Pago es una redirección de nivel superior, así
 * que no lo afecta esta política.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://plausible.io https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://plausible.io https://www.google-analytics.com https://*.google-analytics.com https://region1.google-analytics.com",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Cabeceras de seguridad aplicadas a todas las rutas. X-Frame-Options
 *  DENY protege el panel /admin de clickjacking (el sitio no se embebe
 *  en iframes en ningún caso legítimo). */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
