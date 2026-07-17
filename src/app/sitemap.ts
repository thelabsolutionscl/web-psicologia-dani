import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/evaluaciones", priority: 0.9 },
  { path: "/evaluaciones/autismo", priority: 0.9 },
  { path: "/evaluaciones/tdah", priority: 0.9 },
  { path: "/evaluaciones/lenguaje", priority: 0.9 },
  { path: "/terapias", priority: 0.8 },
  { path: "/atencion-online", priority: 0.7 },
  { path: "/sobre-mi", priority: 0.7 },
  { path: "/contacto", priority: 0.6 },
  { path: "/privacidad", priority: 0.2 },
  { path: "/terminos", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
