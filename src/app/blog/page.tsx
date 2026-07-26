import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Brain,
  Heart,
  HeartHandshake,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Newsletter } from "@/components/sections/Newsletter";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { formatDate, getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Información clara y basada en evidencia sobre neurodesarrollo, salud mental, crianza, comunicación y bienestar, escrita con cercanía por una psicóloga y fonoaudióloga.",
  path: "/blog",
});

const categorias = [
  {
    icon: Brain,
    title: "Neurodesarrollo",
    text: "Comprender el desarrollo y sus diversas formas.",
  },
  {
    icon: Leaf,
    title: "Salud mental",
    text: "Bienestar emocional, ansiedad, autoestima y más.",
  },
  {
    icon: HeartHandshake,
    title: "Crianza y familia",
    text: "Herramientas para acompañar con respeto y conexión.",
  },
  {
    icon: Baby,
    title: "Embarazo y lactancia",
    text: "Acompañamiento emocional en esta etapa de vida.",
  },
  {
    icon: MessageCircle,
    title: "Lenguaje y comunicación",
    text: "Desarrollo del lenguaje, habla y habilidades comunicativas.",
  },
  {
    icon: Heart,
    title: "Duelo y bienestar",
    text: "Procesos de duelo, pérdidas y crecimiento personal.",
  },
];

const valores = [
  {
    icon: ShieldCheck,
    title: "Información confiable y basada en evidencia",
    text: "Artículos escritos desde la práctica clínica y la actualización constante.",
  },
  {
    icon: BookOpen,
    title: "Lenguaje claro y sin alarmismo",
    text: "Porque comprender no debe generar miedo, sino tranquilidad.",
  },
  {
    icon: Sprout,
    title: "Escritos para acompañarte",
    text: "Para que te sientas comprendido/a y con herramientas reales.",
  },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Aprender para comprender"
        lede="Información clara, basada en evidencia y escrita con cercanía para acompañarte en temas de neurodesarrollo, salud mental, crianza, comunicación y bienestar."
      />

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 pb-10">
        <Card className="bg-superficie">
          <p className="text-base text-quebrada/90">
            “Creo que cuando comprendemos lo que nos ocurre, disminuye la
            incertidumbre y aparecen nuevas posibilidades para avanzar. Este
            espacio nace para compartir información clara y confiable,{" "}
            <strong className="font-semibold text-quebrada">
              escrita desde la experiencia clínica y una mirada humana.
            </strong>
            ”
          </p>
        </Card>
      </section>

      {/* Categorías */}
      <section
        aria-labelledby="categorias-titulo"
        className="mx-auto max-w-6xl px-4 pb-12"
      >
        <h2
          id="categorias-titulo"
          className="mb-8 text-center font-display text-2xl font-bold tracking-tight"
        >
          Explora por categorías
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Card className="h-full">
                <span className="flex size-11 items-center justify-center rounded-full bg-arena">
                  <Icon className="size-5 text-enlace" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-sans text-base font-bold text-quebrada">
                  {title}
                </h3>
                <p className="mt-2 text-base text-quebrada/90">{text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* Artículos */}
      <section
        aria-labelledby="articulos-titulo"
        className="mx-auto max-w-3xl px-4 pb-14"
      >
        <h2
          id="articulos-titulo"
          className="mb-6 font-display text-2xl font-bold tracking-tight"
        >
          Artículos
        </h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.slug}>
              <p className="font-sans text-sm font-semibold text-enlace">
                {formatDate(post.date)} · {post.minutos} min de lectura
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="hover:text-enlace">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 text-base text-quebrada/90">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-enlace hover:underline"
              >
                Leer el artículo
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Por qué leer aquí */}
      <section aria-label="Por qué leer este blog" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-6 sm:grid-cols-3">
            {valores.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <Icon
                  className="size-8 shrink-0 text-enlace"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-sans text-base font-bold text-quebrada">
                    {title}
                  </p>
                  <p className="mt-1 text-base text-quebrada/90">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <CtaFinal />
    </>
  );
}
