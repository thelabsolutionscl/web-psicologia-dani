import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicioDetalle } from "@/components/sections/ServicioDetalle";
import { buildMetadata } from "@/lib/seo";
import { SERVICIO_SLUGS, SERVICIOS } from "@/lib/servicios";

type Params = { slug: string };

// Solo se generan los slugs conocidos; cualquier otro devuelve 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return SERVICIO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = SERVICIOS[slug];
  if (!config) return {};
  return buildMetadata({
    title: config.eyebrow,
    description: config.serviceDescription,
    path: `/servicios/${config.slug}`,
    ogEyebrow: "Servicios",
  });
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const config = SERVICIOS[slug];
  if (!config) notFound();
  return <ServicioDetalle config={config} />;
}
