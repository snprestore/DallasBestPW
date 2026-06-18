/**
 * City dataset that powers the location SEO pages at
 * `/locations/pressure-washing-[city]-tx`.
 *
 * Each entry carries UNIQUE copy (intro, localNote, neighborhoods) so the
 * generated pages are not thin/duplicate content. Owner can freely edit this
 * array — add/remove cities or tweak copy. Slugs are kebab-case.
 */

export type City = {
  /** Kebab slug, e.g. "flower-mound". */
  slug: string;
  /** Display name, e.g. "Flower Mound". */
  name: string;
  county: string;
  /** ~population, for credibility copy only. */
  population: string;
  /** Unique 2–3 sentence intro. Vary tone/detail per city. */
  intro: string;
  /** A specific local hook (climate, surfaces, neighborhoods, landmarks). */
  localNote: string;
  /** A few recognizable areas, woven into copy for local relevance. */
  neighborhoods: string[];
};

export const CITIES: City[] = [
  {
    slug: "dallas",
    name: "Dallas",
    county: "Dallas County",
    population: "1.3M+",
    intro:
      "Dallas homes and businesses take a beating from Texas heat, clay-dust, and summer storms, and it shows up fast on driveways, brick, and siding. Our crews handle everything from East Dallas bungalows to Uptown commercial frontage with the right pressure for each surface.",
    localNote:
      "Older Dallas neighborhoods often have delicate brick and painted wood that need soft washing — not the high-PSI blasting that strips mortar and paint.",
    neighborhoods: ["Lakewood", "Oak Cliff", "Uptown", "Preston Hollow"],
  },
  {
    slug: "plano",
    name: "Plano",
    county: "Collin County",
    population: "285K+",
    intro:
      "Plano's master-planned neighborhoods and HOA standards mean curb appeal isn't optional. We keep driveways, walkways, and stone facades looking sharp so your home stays in step with the block.",
    localNote:
      "Many Plano HOAs cite homeowners for mildew streaks on north-facing walls — a soft wash clears it without damaging masonry.",
    neighborhoods: ["West Plano", "Willow Bend", "Legacy West", "Los Rios"],
  },
  {
    slug: "frisco",
    name: "Frisco",
    county: "Collin County",
    population: "230K+",
    intro:
      "Frisco's newer construction looks great until algae and pollen settle into the concrete and stucco. We restore that builder-fresh finish across driveways, patios, and exterior walls.",
    localNote:
      "Fresh Frisco concrete stains easily in the first few years — regular gentle cleaning protects it long-term.",
    neighborhoods: ["Frisco Square", "Starwood", "Phillips Creek Ranch", "The Trails"],
  },
  {
    slug: "mckinney",
    name: "McKinney",
    county: "Collin County",
    population: "210K+",
    intro:
      "From historic downtown McKinney's brick storefronts to newer suburban builds, we tailor the cleaning method to the surface. Period masonry gets a careful soft wash; modern flatwork gets a thorough surface clean.",
    localNote:
      "Historic McKinney brick and mortar require low-pressure soft washing to preserve the original character.",
    neighborhoods: ["Historic Downtown", "Stonebridge Ranch", "Adriatica", "Craig Ranch"],
  },
  {
    slug: "allen",
    name: "Allen",
    county: "Collin County",
    population: "105K+",
    intro:
      "Allen homeowners care about a tidy, well-kept look, and dingy driveways or green-streaked fences undercut it. We bring back the clean lines on concrete, brick, and wood.",
    localNote:
      "Allen's mature trees drop heavy pollen and sap that bond to driveways — surface cleaning lifts it without etching.",
    neighborhoods: ["Twin Creeks", "Watters Creek", "Bethany Lakes", "Star Creek"],
  },
  {
    slug: "richardson",
    name: "Richardson",
    county: "Dallas County",
    population: "120K+",
    intro:
      "Richardson blends established neighborhoods with the Telecom Corridor's commercial properties. We service both — residential soft washing and large-scale commercial flatwork on the same routes.",
    localNote:
      "Richardson's mid-century homes often have original brick and aggregate that benefit from gentle, controlled cleaning.",
    neighborhoods: ["Canyon Creek", "Cottonwood Heights", "Telecom Corridor", "Heights Park"],
  },
  {
    slug: "garland",
    name: "Garland",
    county: "Dallas County",
    population: "245K+",
    intro:
      "Garland's mix of long-established homes and busy commercial corridors means surfaces collect years of grime, oil, and mildew. We cut through it on driveways, storefronts, and parking areas.",
    localNote:
      "Commercial entrances in Garland gather gum and oil stains fast — hot-surface cleaning restores them.",
    neighborhoods: ["Firewheel", "Duck Creek", "Embree", "Club Hill"],
  },
  {
    slug: "irving",
    name: "Irving",
    county: "Dallas County",
    population: "260K+",
    intro:
      "From Las Colinas office plazas to established Irving neighborhoods, we handle the full range — building exteriors, walkways, and residential driveways — with surface-appropriate pressure.",
    localNote:
      "Las Colinas commercial properties benefit from scheduled flatwork cleaning to maintain a professional first impression.",
    neighborhoods: ["Las Colinas", "Valley Ranch", "University Hills", "Hackberry Creek"],
  },
  {
    slug: "carrollton",
    name: "Carrollton",
    county: "Dallas County",
    population: "135K+",
    intro:
      "Carrollton's tree-lined streets are great for shade and tough on exterior surfaces, which trap moisture and grow algae. We clear the green and brighten concrete across the city.",
    localNote:
      "Shaded north-side walls and fences in Carrollton are prone to mildew that returns without proper soft washing.",
    neighborhoods: ["Old Downtown", "Josey Ranch", "Indian Creek", "Country Place"],
  },
  {
    slug: "lewisville",
    name: "Lewisville",
    county: "Denton County",
    population: "115K+",
    intro:
      "With Lewisville Lake nearby, humidity speeds up algae and mildew growth on shaded surfaces. We keep driveways, patios, and house exteriors clean despite the lake-effect moisture.",
    localNote:
      "Lakeside humidity around Lewisville accelerates organic growth — periodic soft washing keeps it in check.",
    neighborhoods: ["Old Town", "Castle Hills", "Vista Ridge", "Garden Ridge"],
  },
  {
    slug: "flower-mound",
    name: "Flower Mound",
    county: "Denton County",
    population: "80K+",
    intro:
      "Flower Mound's larger lots and upscale homes mean more driveway, more stone, and higher expectations. We deliver a meticulous clean on expansive flatwork and premium exteriors.",
    localNote:
      "Bigger Flower Mound properties often have natural stone and stamped concrete that require careful, low-damage methods.",
    neighborhoods: ["Bridlewood", "Wellington", "Canyon Falls", "Lakeside"],
  },
  {
    slug: "highland-park",
    name: "Highland Park",
    county: "Dallas County",
    population: "9K+",
    intro:
      "Highland Park's historic estates demand a careful hand. We specialize in gentle soft washing for delicate brick, limestone, and ornate exteriors where high pressure would do real damage.",
    localNote:
      "Highland Park's limestone and historic masonry must be soft washed — never high-pressure blasted.",
    neighborhoods: ["Armstrong", "Beverly Drive", "Lakeside Park", "Connor"],
  },
  {
    slug: "university-park",
    name: "University Park",
    county: "Dallas County",
    population: "25K+",
    intro:
      "Around SMU, University Park's stately homes and manicured properties set a high bar. We match it with precise, surface-safe cleaning on brick, stone, and walkways.",
    localNote:
      "University Park's established trees mean heavy leaf tannin staining on driveways each fall — surface cleaning lifts it.",
    neighborhoods: ["SMU area", "Volk Estates", "Caruth Hills", "Fairfax"],
  },
  {
    slug: "addison",
    name: "Addison",
    county: "Dallas County",
    population: "16K+",
    intro:
      "Addison packs restaurants, offices, and apartments into a dense footprint, so commercial exteriors and entryways need frequent attention. We keep storefronts and flatwork presentable for high foot traffic.",
    localNote:
      "Addison's restaurant row sees heavy grease and gum on sidewalks — hot-surface cleaning is the right tool.",
    neighborhoods: ["Addison Circle", "Vitruvian Park", "Beltway", "Midway"],
  },
  {
    slug: "rockwall",
    name: "Rockwall",
    county: "Rockwall County",
    population: "50K+",
    intro:
      "Lakeside living near Ray Hubbard means beautiful views and persistent humidity. We fight the resulting algae and mildew on Rockwall driveways, decks, and home exteriors.",
    localNote:
      "Lake Ray Hubbard humidity drives mildew on Rockwall decks and patios — regular cleaning keeps them safe and clean.",
    neighborhoods: ["The Shores", "Chandlers Landing", "Stone Creek", "Harbor"],
  },
  {
    slug: "rowlett",
    name: "Rowlett",
    county: "Dallas County",
    population: "65K+",
    intro:
      "Surrounded on three sides by Lake Ray Hubbard, Rowlett homes contend with constant moisture. We keep waterfront and inland properties alike free of the green growth humidity invites.",
    localNote:
      "Rowlett's peninsula geography means high humidity year-round — exterior surfaces need periodic soft washing.",
    neighborhoods: ["Waterview", "Liberty Grove", "Springfield", "Lakeshore"],
  },
  {
    slug: "wylie",
    name: "Wylie",
    county: "Collin County",
    population: "60K+",
    intro:
      "Wylie's fast-growing neighborhoods sit on newer concrete that's worth protecting early. We keep driveways, sidewalks, and patios clean before stains and growth take hold.",
    localNote:
      "Newer Wylie construction means fresh concrete that stains easily — early, gentle maintenance pays off.",
    neighborhoods: ["Downtown Wylie", "Woodbridge", "Bozman Farm", "Inspiration"],
  },
  {
    slug: "coppell",
    name: "Coppell",
    county: "Dallas County",
    population: "42K+",
    intro:
      "Coppell's well-kept, family-focused neighborhoods hold high standards for curb appeal. We deliver a clean, uniform finish on driveways, brick, and walkways that keeps homes looking their best.",
    localNote:
      "Coppell's mature landscaping drops pollen and sap that bond to driveways — surface cleaning restores them.",
    neighborhoods: ["Old Town", "Riverchase", "The Lakes", "Northlake"],
  },
];

/** The `[city]` route segment for a city, e.g. "pressure-washing-dallas-tx". */
export function cityRouteSlug(city: Pick<City, "slug">): string {
  return `pressure-washing-${city.slug}-tx`;
}

/** Resolve a `[city]` route param back to a City, or undefined if unknown. */
export function getCityByParam(param: string): City | undefined {
  return CITIES.find((c) => cityRouteSlug(c) === param);
}
