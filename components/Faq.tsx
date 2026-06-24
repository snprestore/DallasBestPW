"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./Icons";

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

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="heading text-3xl text-text md:text-4xl">Common questions</h2>
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/10 bg-white">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      item.tag === "Commercial"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent-dark"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="font-semibold text-text">{item.q}</span>
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
