// Homepage FAQ data — kept in a plain (non-"use client") module so it can be
// imported by both the client <Faq> accordion AND the server page (for JSON-LD).
export type FaqItem = { q: string; a: string; tag: "Residential" | "Commercial" };

export const FAQ_ITEMS: FaqItem[] = [
  {
    tag: "Residential",
    q: "Do I need to be home when you come out?",
    a: "Not at all — as long as we have access to the property we're good. We'll text you when we're on the way and when we're done. Just let us know any gate codes or parking instructions.",
  },
  {
    tag: "Residential",
    q: "Is pressure washing safe for my plants and pets?",
    a: "Yes — we pre-soak all landscaping before and after cleaning to prevent any chemical exposure. Our solutions are biodegradable and we follow strict protocols around pets and plants.",
  },
  {
    tag: "Residential",
    q: "Will it damage my siding, deck, or roof?",
    a: "We use soft wash (low pressure + cleaning solution) on any surface that can be damaged by high pressure — siding, roofs, wood decks. High pressure is only used on concrete and hard surfaces.",
  },
  {
    tag: "Residential",
    q: "How soon can you come out?",
    a: "We work 7 days a week and our schedule is usually flexible. Text or call us at (945) 219-5775 and we'll get you on the calendar — often same week, sometimes same day.",
  },
  {
    tag: "Commercial",
    q: "Do you carry full commercial insurance?",
    a: "Yes — we're fully insured with general liability coverage. We can provide insurance documentation for property managers, HOAs, and commercial clients on request.",
  },
  {
    tag: "Commercial",
    q: "Can you work after hours or on weekends?",
    a: "Absolutely — we work 7 days a week with evening availability. For commercial properties that need cleaning outside business hours, we're happy to schedule nights or early mornings.",
  },
  {
    tag: "Commercial",
    q: "Do you handle large commercial properties like parking lots and gas stations?",
    a: "Yes — we serve commercial clients across DFW including parking lots, gas stations, storefronts, apartment complexes, and HOAs. Commercial jobs receive a custom written quote.",
  },
  {
    tag: "Commercial",
    q: "How do you quote commercial jobs?",
    a: "Commercial pricing is custom — based on square footage, surface type, and scope of work. We don't quote commercial jobs over the phone without reviewing the property first. Call or fill out our form and we'll set up a quick assessment.",
  },
];
