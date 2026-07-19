import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CompartirPost } from "@/components/CompartirPost";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { VoiceLine } from "@/components/VoiceLine";
import {
  formatDate,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from "@/lib/blog";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  JsonLd,
  ogImages,
} from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${slug}`);
  return {
    // Título absoluto: los títulos editoriales no caben con la plantilla.
    title: { absolute: post.meta.seoTitle },
    description: post.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.seoTitle,
      description: post.meta.description,
      url,
      siteName: SITE_NAME,
      locale: "es_CL",
      type: "article",
      publishedTime: post.meta.date,
      ...ogImages(post.meta.title, "Blog"),
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.seoTitle,
      description: post.meta.description,
      ...ogImages(post.meta.title, "Blog"),
    },
  };
}

/* Estilos del cuerpo MDX: serif para el texto, display solo en H2. */
const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-4 font-display text-2xl font-bold tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 font-sans text-lg font-bold" {...props} />
  ),
  p: (props) => <p className="my-4 text-base text-quebrada/90" {...props} />,
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-base text-quebrada/90" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-base text-quebrada/90" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-quebrada" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-pacifico pl-4 text-lg text-enlace italic"
      {...props}
    />
  ),
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-enlace underline" {...props}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        className="text-enlace underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relacionados = getRelatedPosts(slug);
  const url = absoluteUrl(`/blog/${slug}`);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.meta.title,
          description: post.meta.description,
          path: `/blog/${slug}`,
          datePublished: post.meta.date,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.meta.title, path: `/blog/${slug}` },
        ])}
      />

      <article className="mx-auto max-w-2xl px-4 pt-14 pb-16 sm:pt-20">
        <header>
          <p className="font-sans text-sm font-semibold text-enlace">
            {formatDate(post.meta.date)} · {SITE_NAME} ·{" "}
            {post.meta.minutos} min de lectura
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance">
            {post.meta.title}
          </h1>
          <VoiceLine className="mt-5" />
        </header>

        <div className="mt-8">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Cierre obligatorio de todos los artículos (sección 2) */}
        <p className="mt-10 border-t border-arena pt-6 text-base text-quebrada/80 italic">
          Este contenido es informativo y no reemplaza una evaluación
          profesional.
        </p>

        <CompartirPost titulo={post.meta.title} url={url} />

        <div className="mt-8 rounded-2xl border border-arena bg-superficie p-6">
          <p className="font-sans text-base font-bold text-quebrada">
            ¿Te hizo sentido este artículo?
          </p>
          <p className="mt-2 text-base text-quebrada/90">
            Si quieres conversar tu situación con calma, este es el siguiente
            paso.
          </p>
          <div className="mt-4">
            <ButtonLink href={post.meta.service} variant="secondary">
              {post.meta.serviceLabel}
            </ButtonLink>
          </div>
        </div>
      </article>

      {relacionados.length > 0 ? (
        <section
          aria-labelledby="relacionados-titulo"
          className="mx-auto max-w-2xl px-4 pb-4"
        >
          <h2
            id="relacionados-titulo"
            className="font-display text-xl font-bold tracking-tight"
          >
            Seguir leyendo
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {relacionados.map((r) => (
              <Card key={r.slug}>
                <p className="font-sans text-sm font-semibold text-enlace">
                  {formatDate(r.date)} · {r.minutos} min
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">
                  <Link href={`/blog/${r.slug}`} className="hover:text-enlace">
                    {r.title}
                  </Link>
                </h3>
                <Link
                  href={`/blog/${r.slug}`}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold text-enlace hover:underline"
                >
                  Leer el artículo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <CtaFinal />
    </>
  );
}
