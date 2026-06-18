import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CITIES, cityRouteSlug } from "@/lib/cities";

/**
 * Sitemap — all static routes + dynamic city pages. The thank-you page is
 * intentionally excluded (noindex conversion confirmation).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/services/residential", priority: 0.9, freq: "monthly" },
    { path: "/services/commercial", priority: 0.9, freq: "monthly" },
    { path: "/commercial-quote", priority: 0.8, freq: "monthly" },
    { path: "/locations", priority: 0.8, freq: "monthly" },
    { path: "/booking", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.5, freq: "yearly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const cityEntries: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE_URL}/locations/${cityRouteSlug(c)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...cityEntries];
}
