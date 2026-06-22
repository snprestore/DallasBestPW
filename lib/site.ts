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

// Routes to our AI receptionist (Kate) — handles all inbound calls automatically.
export const BUSINESS_PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "(945) 219-5775";

export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@dbpowerwash.com";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/**
 * Build a tel: link. Strips formatting and normalizes 10-digit US numbers to
 * E.164 (+1XXXXXXXXXX) so dialing is reliable across devices.
 */
export function telHref(phone: string = BUSINESS_PHONE): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  const normalized = cleaned.startsWith("+")
    ? cleaned
    : cleaned.length === 10
      ? `+1${cleaned}`
      : cleaned.length === 11 && cleaned.startsWith("1")
        ? `+${cleaned}`
        : cleaned;
  return `tel:${normalized}`;
}

/** Service-area summary used across the site. */
export const SERVICE_AREA = "the Dallas–Fort Worth metroplex";

/** Business hours, surfaced on Contact + Footer. */
export const BUSINESS_HOURS = "7 days a week, 8:00 AM – 5:00 PM";

/** Absolute URL helper for canonicals, OG, sitemap. */
export function absoluteUrl(path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}
