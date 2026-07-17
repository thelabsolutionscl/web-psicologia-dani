import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/evaluaciones", priority: 0.9 },
  { path: "/evaluaciones/autismo", priority: 0.9 },
  { path: "/evaluaciones/tdah", priority: 0.9 },
  { path: "/evaluaciones/lenguaje", priority: 0.9 },
  { path: "/terapias", priority: 0.8 },
  { path: "/agenda", priority: 0.8 },
  { path: "/atencion-online", priority: 0.7 },
  { path: "/sobre-mi", priority: 0.7 },
  { path: "/blog", priority: 0.6 },
  { path: "/contacto", priority: 0.6 },
  { path: "/privacidad", priority: 0.2 },
  { path: "/terminos", priority: 0.2 },
];

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
