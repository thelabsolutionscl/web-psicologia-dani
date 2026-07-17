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
};

export type Post = { meta: PostMeta; content: string };

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function parsePost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      seoTitle: data.seoTitle,
      description: data.description,
      date: data.date,
      service: data.service,
      serviceLabel: data.serviceLabel,
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

/** Fecha legible en español de Chile. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
