import type { Metadata } from "next";
import {
  ADDRESS,
  PHONE_DISPLAY,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
  TAGLINE,
} from "@/lib/site";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

type PageSeo = {
  /** ≤ 60 caracteres contando la plantilla "· Daniela Alejandra Kaiser Ortiz" */
  title: string;
  /** ≤ 155 caracteres */
  description: string;
  path: string;
  noIndex?: boolean;
};

/** Metadata API por página: title ≤ 60, description ≤ 155, canonical
 *  absoluto y OG básico (plantilla next/og queda para Fase 2).
 *  [PLACEHOLDER: openGraph.images — falta la foto cuadrada OG de la
 *  sesión de fotos pendiente; agregarla aquí cuando exista]. */
export function buildMetadata({
  title,
  description,
  path,
  noIndex,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_CL",
      type: "website",
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

type JsonLdData = Record<string, unknown>;

/** Person global: solo credenciales confirmadas en CLAUDE.md. */
export function personJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Psicóloga y fonoaudióloga",
    description: TAGLINE,
    sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Título de Fonoaudióloga, Universidad Mayor",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Título de Psicóloga, Universidad UNIACC",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Postítulo en Psicopedagogía, Universidad Andrés Bello",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Magíster en Educación, Universidad del Mar",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Registro Superintendencia de Salud N° 65811",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Colegio de Fonoaudiólogos de Chile N° 551",
      },
    ],
  };
}

export function medicalBusinessJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    slogan: TAGLINE,
    telephone: PHONE_DISPLAY,
    areaServed: "CL",
    location: {
      "@type": "Place",
      name: ADDRESS.role,
      description:
        "Sede de jornadas presenciales de evaluación. Las entrevistas, sesiones y devoluciones se realizan online en todo Chile.",
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.region,
        addressCountry: ADDRESS.country,
      },
    },
    sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
  };
}

export type FaqItem = { question: string; answer: string };

export function faqJsonLd(items: FaqItem[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    areaServed: "CL",
    provider: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  };
}

/** Inserta un bloque JSON-LD serializado de forma segura. */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
