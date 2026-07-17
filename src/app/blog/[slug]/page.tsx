import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { ButtonLink } from "@/components/ui/Button";
import { VoiceLine } from "@/components/VoiceLine";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { absoluteUrl, articleJsonLd, JsonLd, ogImages } from "@/lib/seo";
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
      className="my-6 border-l-2 border-pacifico pl-4 text-lg text-pacifico italic"
      {...props}
    />
  ),
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-pacifico underline" {...props}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        className="text-pacifico underline"
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

      <article className="mx-auto max-w-2xl px-4 pt-14 pb-16 sm:pt-20">
        <header>
          <p className="font-sans text-sm font-semibold text-pacifico">
            {formatDate(post.meta.date)} · {SITE_NAME}
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

        <div className="mt-8 rounded-2xl border border-arena bg-white p-6">
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

      <CtaFinal />
    </>
  );
}
