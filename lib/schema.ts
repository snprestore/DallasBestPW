/**
 * JSON-LD builders. Each returns a plain object to be serialized into a
 * <script type="application/ld+json"> tag.
 *
 * We use the generic "LocalBusiness" @type sitewide for the business entity
 * (broadly supported and valid for aggregateRating / areaServed).
 */

import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_PHONE, SITE_URL, absoluteUrl } from "./site";
import type { City } from "./cities";

/** Stable @id for the business node so other nodes can reference it. */
export const BUSINESS_ID = `${SITE_URL}/#business`;

export function localBusinessSchema(extra?: { areaServed?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    image: absoluteUrl("/og-image.png"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressRegion: "TX",
      addressCountry: "US",
      // TODO: add street address / city / zip when a physical/mailing address exists.
    },
    areaServed: extra?.areaServed ?? "Dallas–Fort Worth Metroplex, TX",
    // TODO: replace with real, verifiable reviews before relying on this.
  };
}

export function serviceSchema(params: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    name: params.name,
    description: params.description,
    url: params.url,
    provider: { "@id": BUSINESS_ID },
    areaServed: params.areaServed ?? "Dallas–Fort Worth Metroplex, TX",
  };
}

export function cityLocalBusinessSchema(city: City, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${BUSINESS_NAME} — ${city.name}, TX`,
    url,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    image: absoluteUrl("/og-image.png"),
    priceRange: "$$",
    parentOrganization: { "@id": BUSINESS_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, TX`,
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
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

/** Render helper: stringify JSON-LD for dangerouslySetInnerHTML. */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}
