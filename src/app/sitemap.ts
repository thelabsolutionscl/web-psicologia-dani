import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import { SERVICIO_SLUGS } from "@/lib/servicios";

const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/evaluaciones", priority: 0.9 },
  { path: "/evaluaciones/autismo", priority: 0.9 },
  { path: "/evaluaciones/tdah", priority: 0.9 },
  { path: "/evaluaciones/lenguaje", priority: 0.9 },
  { path: "/servicios", priority: 0.8 },
  { path: "/servicios/psicoterapia", priority: 0.8 },
  { path: "/servicios/perinatal", priority: 0.8 },
  { path: "/servicios/fonoaudiologia", priority: 0.8 },
  { path: "/servicios/ivadec", priority: 0.8 },
  { path: "/servicios/orientacion-familiar", priority: 0.7 },
  { path: "/servicios/primeros-auxilios", priority: 0.7 },
  { path: "/servicios/capacitaciones", priority: 0.7 },
  { path: "/servicios/terapia-integral", priority: 0.6 },
  { path: "/terapias", priority: 0.8 },
  { path: "/radiestesia", priority: 0.6 },
  { path: "/precios", priority: 0.8 },
  { path: "/agenda", priority: 0.8 },
  { path: "/atencion-online", priority: 0.7 },
  { path: "/sobre-mi", priority: 0.7 },
  { path: "/blog", priority: 0.6 },
  { path: "/contacto", priority: 0.6 },
  { path: "/privacidad", priority: 0.2 },
  { path: "/terminos", priority: 0.2 },
];

// Aviso en build si algún servicio queda fuera del sitemap.
const enSitemap = new Set(routes.map((r) => r.path));
for (const slug of SERVICIO_SLUGS) {
  if (!enSitemap.has(`/servicios/${slug}`)) {
    throw new Error(
      `El servicio "/servicios/${slug}" no está en el sitemap (src/app/sitemap.ts).`,
    );
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
