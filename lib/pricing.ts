/**
 * CORE BUSINESS LOGIC — pricing.
 *
 * Two distinct modes:
 *  - Residential = FIXED price ranges shown as "Starting at" (no sq-ft math).
 *  - Commercial  = PER-SQUARE-FOOT calculator with a job-minimum floor.
 *
 * All numbers are Dallas-market estimates and are intentionally easy to edit.
 * TODO: owner to review/adjust ranges and rates before launch.
 */

// ---------------------------------------------------------------------------
// 6a. RESIDENTIAL — fixed ranges
// ---------------------------------------------------------------------------

export type ResidentialService = {
  /** Stable key, also used as the BookingForm `service_detail` value. */
  key: string;
  name: string;
  /** Low end of the displayed range, in whole dollars. */
  low: number;
  /** High end of the displayed range, in whole dollars. */
  high: number;
  /** Short customer-facing description. */
  description: string;
};

export const RESIDENTIAL_SERVICES: ResidentialService[] = [
  {
    key: "driveway",
    name: "Driveway Cleaning",
    low: 150,
    high: 350,
    description:
      "Surface-clean concrete driveways to lift oil, dirt, mildew, and tire marks for a uniform, like-new finish.",
  },
  {
    key: "house-soft-wash",
    name: "House Soft Wash (Exterior)",
    low: 350,
    high: 650,
    description:
      "Low-pressure soft wash that safely removes algae, dirt, and cobwebs from siding, brick, and stucco without damage.",
  },
  {
    key: "deck-patio",
    name: "Deck / Patio Cleaning",
    low: 200,
    high: 400,
    description:
      "Restore wood and concrete patios and decks, clearing ground-in grime, mold, and weathering.",
  },
  {
    key: "fence",
    name: "Wood / Vinyl Fence Cleaning",
    low: 150,
    high: 400,
    description:
      "Brighten fences by removing green algae, mildew, and dirt — prepping wood for sealing if desired.",
  },
  {
    key: "roof-soft-wash",
    name: "Roof Soft Wash",
    low: 400,
    high: 700,
    description:
      "Gentle soft-wash treatment that kills black streaks (Gloeocapsa magma) and moss without harming shingles.",
  },
  {
    key: "gutter-exterior",
    name: "Gutter Cleaning (Exterior)",
    low: 100,
    high: 250,
    description:
      "Wash exterior gutter faces to remove the dark 'tiger stripe' oxidation streaks and restore the trim line.",
  },
  {
    key: "sidewalk",
    name: "Sidewalk / Walkway",
    low: 100,
    high: 200,
    description:
      "Surface-clean walkways and entry paths to remove dirt, mildew, and stains for safer, brighter approaches.",
  },
];

// ---------------------------------------------------------------------------
// 6b. COMMERCIAL — per-square-foot calculator
// ---------------------------------------------------------------------------

export type CommercialSurface = {
  key: string;
  label: string;
  /** Low rate, $/sq ft. */
  rateLow: number;
  /** High rate, $/sq ft. */
  rateHigh: number;
};

export const COMMERCIAL_SURFACES: CommercialSurface[] = [
  { key: "concrete-flatwork", label: "Concrete flatwork", rateLow: 0.15, rateHigh: 0.3 },
  { key: "building-exterior", label: "Building exterior / siding", rateLow: 0.3, rateHigh: 0.5 },
  { key: "stucco", label: "Stucco", rateLow: 0.3, rateHigh: 0.5 },
  { key: "mixed-default", label: "Mixed / not sure", rateLow: 0.35, rateHigh: 0.45 },
];

export type ConditionLevel = "light" | "moderate" | "heavy";

export const CONDITION_MULTIPLIERS: Record<ConditionLevel, number> = {
  light: 1.0,
  moderate: 1.2,
  heavy: 1.5,
};

export const CONDITION_OPTIONS: { key: ConditionLevel; label: string }[] = [
  { key: "light", label: "Light — routine maintenance" },
  { key: "moderate", label: "Moderate — visible buildup" },
  { key: "heavy", label: "Heavy — neglected / stained" },
];

/** Minimum job charge — small jobs cost more per sq ft, so enforce a floor. */
export const COMMERCIAL_JOB_MINIMUM = 200;

export type CommercialEstimate = {
  low: number;
  high: number;
  /** True when the job-minimum floor was applied to the low end. */
  minimumApplied: boolean;
};

/**
 * Compute a commercial estimate RANGE (never a single hard number).
 * Returns rounded low/high dollar figures with the $200 floor enforced.
 */
export function calculateCommercialEstimate(params: {
  squareFootage: number;
  surfaceKey: string;
  condition: ConditionLevel;
}): CommercialEstimate {
  const surface =
    COMMERCIAL_SURFACES.find((s) => s.key === params.surfaceKey) ??
    COMMERCIAL_SURFACES.find((s) => s.key === "mixed-default")!;

  const multiplier = CONDITION_MULTIPLIERS[params.condition] ?? 1.0;
  const sqft = Math.max(0, Math.floor(params.squareFootage || 0));

  const rawLow = sqft * surface.rateLow * multiplier;
  const rawHigh = sqft * surface.rateHigh * multiplier;

  const low = Math.max(rawLow, COMMERCIAL_JOB_MINIMUM);
  // Keep high >= low; also floor it so a tiny job still shows a sane range.
  const high = Math.max(rawHigh, low);

  return {
    low: Math.round(low),
    high: Math.round(high),
    minimumApplied: rawLow < COMMERCIAL_JOB_MINIMUM,
  };
}

/**
 * Market anchors for credibility copy / SEO (NOT hard quotes):
 *  - A typical Dallas house wash runs ~$400–$600.
 *  - Standard commercial work averages ~$0.40–$0.50 / sq ft.
 */
export const MARKET_ANCHORS = {
  houseWashLow: 400,
  houseWashHigh: 600,
  commercialAvgLow: 0.4,
  commercialAvgHigh: 0.5,
} as const;
