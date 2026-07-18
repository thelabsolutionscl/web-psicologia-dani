import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Newsletter } from "@/components/sections/Newsletter";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { formatDate, getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Artículos sobre neurodesarrollo, autismo, TDAH, lenguaje y duelo, escritos con calma y sin alarmismo por una psicóloga y fonoaudióloga chilena.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Para leer con calma"
        lede="Artículos pensados para familias y adultos que buscan entender mejor el neurodesarrollo, las evaluaciones y los procesos emocionales, sin jerga y sin alarmismo."
      />

      <section className="mx-auto max-w-3xl space-y-6 px-4 pb-16">
        {posts.map((post) => (
          <Card key={post.slug}>
            <p className="font-sans text-sm font-semibold text-pacifico">
              {formatDate(post.date)}
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
              <Link href={`/blog/${post.slug}`} className="hover:text-pacifico">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-base text-quebrada/90">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-pacifico hover:underline"
            >
              Leer el artículo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        ))}
      </section>

      <Newsletter />
      <CtaFinal />
    </>
  );
}
