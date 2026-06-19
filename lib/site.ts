/**
 * Central site configuration, sourced entirely from environment variables.
 * Nothing here is hardcoded so the domain, phone, and email can be swapped
 * at launch without code changes. See `.env.local.example`.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dbpowerwash.com"
).replace(/\/$/, "");

export const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Dallas Best Pressure Washing";

// Temporary number — swap to the new Google Voice line when it exists.
export const BUSINESS_PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "682-390-5608";

export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@dbpowerwash.com";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** Strip everything but digits and a leading + for use in tel: links. */
export function telHref(phone: string = BUSINESS_PHONE): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}

/** Service-area summary used across the site. */
export const SERVICE_AREA = "the Dallas–Fort Worth metroplex";

/** Business hours, surfaced on Contact + schema. TODO: confirm real hours. */
export const BUSINESS_HOURS = "Mon–Sat, 7:00 AM – 7:00 PM";

/** Absolute URL helper for canonicals, OG, sitemap. */
export function absoluteUrl(path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}
