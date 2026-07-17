import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100% estático (SSG); la única pieza dinámica es la Server Action
  // del formulario de contacto, que Vercel sirve como función.
  reactStrictMode: true,
};

export default nextConfig;
