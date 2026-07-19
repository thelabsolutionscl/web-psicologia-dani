import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Frontmatter de los posts de content/blog/*.mdx (Fase 2, sección 7.2). */
export type PostMeta = {
  slug: string;
  /** Título completo del artículo (H1). */
  title: string;
  /** Título corto para <title>, absoluto y ≤ 60 caracteres. */
  seoTitle: string;
  /** ≤ 155 caracteres. */
  description: string;
  /** Fecha ISO (YYYY-MM-DD). */
  date: string;
  /** Ruta del servicio relacionado para el CTA de cierre. */
  service: string;
  serviceLabel: string;
  /** Minutos de lectura estimados (≈200 palabras/min). */
  minutos: number;
};

export type Post = { meta: PostMeta; content: string };

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/** Minutos de lectura estimados: ~200 palabras/minuto, mínimo 1. */
export function minutosLectura(texto: string): number {
  const palabras = texto.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

function parsePost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  // Validación de frontmatter: falla en build (no en runtime silencioso)
  // si a un post le falta un campo obligatorio.
  for (const campo of ["title", "seoTitle", "description", "date"] as const) {
    if (typeof data[campo] !== "string" || !data[campo]) {
      throw new Error(
        `El post "${fileName}" no tiene el campo obligatorio "${campo}" en el frontmatter.`,
      );
    }
  }
  return {
    meta: {
      slug,
      title: data.title,
      seoTitle: data.seoTitle,
      description: data.description,
      date: data.date,
      service: data.service,
      serviceLabel: data.serviceLabel,
      minutos: minutosLectura(content),
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parsePost(file).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return parsePost(`${slug}.mdx`);
}

/**
 * Artículos relacionados con `slug`: primero los del mismo servicio y,
 * si no alcanzan, se completa con los más recientes. Nunca incluye el
 * propio post. Devuelve como máximo `limite`.
 */
export function getRelatedPosts(slug: string, limite = 2): PostMeta[] {
  const actual = getPost(slug)?.meta;
  const otros = getAllPosts().filter((p) => p.slug !== slug);
  const mismoServicio = otros.filter(
    (p) => actual?.service && p.service === actual.service,
  );
  const resto = otros.filter((p) => !mismoServicio.includes(p));
  return [...mismoServicio, ...resto].slice(0, limite);
}

/** Fecha legible en español de Chile. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
