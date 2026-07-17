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

/** URL absoluta de la imagen OG de marca generada al vuelo (/api/og). */
export function ogImageUrl(title: string, eyebrow?: string): string {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return absoluteUrl(`/api/og?${params.toString()}`);
}

/** Bloque openGraph.images + twitter reutilizable. */
export function ogImages(title: string, eyebrow?: string) {
  const url = ogImageUrl(title, eyebrow);
  return {
    images: [{ url, width: 1200, height: 630, alt: title }],
  };
}

type PageSeo = {
  /** ≤ 60 caracteres contando la plantilla "· Daniela Alejandra Kaiser Ortiz" */
  title: string;
  /** ≤ 155 caracteres */
  description: string;
  path: string;
  noIndex?: boolean;
  /** Texto del "eyebrow" en la imagen OG (opcional). */
  ogEyebrow?: string;
};

/** Metadata API por página: title ≤ 60, description ≤ 155, canonical
 *  absoluto y OG con imagen de marca dinámica (next/og). */
export function buildMetadata({
  title,
  description,
  path,
  noIndex,
  ogEyebrow,
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
      ...ogImages(title, ogEyebrow),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...ogImages(title, ogEyebrow),
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
  offer,
}: {
  name: string;
  description: string;
  path: string;
  /** Precio en CLP (entero, sin símbolo) para emitir un Offer. */
  offer?: { price: string };
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
    ...(offer
      ? {
          offers: {
            "@type": "Offer",
            price: offer.price,
            priceCurrency: "CLP",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(path),
          },
        }
      : {}),
  };
}

/** Article para posts del blog (sección 7.1). */
export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [ogImageUrl(title, "Blog")],
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "es-CL",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Psicóloga y fonoaudióloga",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-icon.png"),
      },
    },
  };
}

/** Migas de pan para páginas anidadas (rich results). */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
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
