import type { Metadata } from "next";

export const SITE_URL = "https://www.rank-day.com";
const OG_IMAGE = "/og-image.png";

type PageMetaInput = {
  title: string;
  description: string;
  /** Absolute path beginning with "/" (e.g. "/pricing"). Resolved against metadataBase. */
  path: string;
  /** Optional robots override (e.g. for the AI info page). */
  robots?: Metadata["robots"];
};

/**
 * Builds per-page metadata with a self-referencing canonical and page-specific
 * Open Graph / Twitter tags.
 *
 * Why this exists: Next.js does not derive `alternates.canonical` automatically,
 * and `openGraph`/`twitter` titles do not inherit from a page's `title`. Without
 * this, every page either ships no canonical or reuses the homepage social card.
 * og:image and card type are restated here so they survive regardless of how
 * Next merges metadata across segments.
 */
export function pageMeta({ title, description, path, robots }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export type FaqItem = { q: string; a: string };

/**
 * FAQPage structured data. The answers must match the visible text rendered by
 * <FaqSection /> on the same page - never ship FAQ schema without the matching
 * on-page Q&A.
 */
export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

type ServiceSchemaInput = {
  /** e.g. "SEO Agency Dubai" or "SEO for Plumbers" */
  name: string;
  description: string;
  /** Path of the page the service is described on, beginning with "/". */
  path: string;
  /** ISO country codes or place names the service covers. */
  areaServed: string[];
  /** Optional headline price, e.g. { price: "4900", currency: "USD" }. */
  offer?: { price: string; currency: string };
};

/**
 * Service structured data for the commercial location/industry landing pages.
 * Mirrors the visible content (a service offered in a named area, at a price),
 * which strengthens local relevance and AI-citation signals.
 */
export function serviceSchema({ name, description, path, areaServed, offer }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: ["Search Engine Optimization", "Answer Engine Optimization", "Web Design"],
    url: `${SITE_URL}${path}`,
    areaServed: areaServed.map((a) => ({ "@type": "AdministrativeArea", name: a })),
    provider: {
      "@type": "ProfessionalService",
      name: "rankday",
      url: SITE_URL,
    },
    ...(offer
      ? {
          offers: {
            "@type": "Offer",
            price: offer.price,
            priceCurrency: offer.currency,
            url: `${SITE_URL}${path}`,
          },
        }
      : {}),
  };
}
