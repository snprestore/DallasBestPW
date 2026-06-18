/**
 * Tiny class-name combiner. Avoids pulling in clsx/tailwind-merge so the
 * dependency surface stays limited to the §2 stack. Filters falsy values and
 * joins with spaces — good enough for conditional Tailwind classes.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as USD with no decimals (e.g. 1234 -> "$1,234"). */
export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/** Slugify a city name -> "Flower Mound" => "flower-mound". */
export function slugifyCity(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
