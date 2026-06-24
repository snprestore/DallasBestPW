"use client";

import { useState } from "react";
import Link from "next/link";
import { telHref, BUSINESS_PHONE } from "@/lib/site";
import { PhoneIcon, CheckIcon } from "./Icons";

type Service = {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  included: string[];
};

const SERVICES: Service[] = [
  {
    key: "driveway",
    name: "Driveway",
    subtitle: "Oil, tire marks, algae",
    description:
      "We surface-clean your concrete driveway at the right pressure to lift years of oil, dirt, and organic staining. The result is an even, like-new finish without etching the concrete.",
    included: ["Pre-treat oil & rust spots", "Hot-water surface cleaning", "Edge & crack detailing", "Final rinse & inspection"],
  },
  {
    key: "house-exterior",
    name: "House exterior",
    subtitle: "Siding, mold, grime",
    description:
      "A low-pressure soft wash safely removes algae, mildew, and dirt from siding, brick, and stucco. We never force water behind surfaces or strip paint.",
    included: ["Biodegradable soft-wash solution", "Algae & mildew treatment", "Siding, brick & stucco safe", "Landscaping pre-soak & rinse"],
  },
  {
    key: "deck-patio",
    name: "Deck & patio",
    subtitle: "Wood, concrete, pavers",
    description:
      "We restore wood and concrete decks and patios, clearing ground-in grime, mold, and weathering. Pressure and method are matched to the surface to avoid damage.",
    included: ["Surface-matched pressure", "Mold & mildew removal", "Wood-safe cleaning", "Brightened, even finish"],
  },
  {
    key: "fence",
    name: "Fence",
    subtitle: "Wood, vinyl, chain link",
    description:
      "Brighten and sanitize fences by removing green algae, mildew, and dirt. Wood fences can be prepped for sealing on request.",
    included: ["Algae & mildew removal", "Wood, vinyl & metal safe", "Both sides cleaned", "Prep for sealing (optional)"],
  },
  {
    key: "roof-soft-wash",
    name: "Roof soft wash",
    subtitle: "Algae, moss, black streaks",
    description:
      "A gentle, no-pressure soft wash kills black streaks (Gloeocapsa magma) and moss without harming shingles or voiding your roof warranty.",
    included: ["Zero high pressure", "Kills algae at the root", "Shingle-safe solution", "Gutter & landscaping protection"],
  },
  {
    key: "concrete-sidewalks",
    name: "Concrete & sidewalks",
    subtitle: "Walkways, pool deck, steps",
    description:
      "Surface-clean walkways, steps, and pool decks to remove dirt, mildew, and stains for safer, brighter approaches around your property.",
    included: ["Even surface cleaning", "Mildew & stain removal", "Safer, brighter walkways", "Edge & corner detailing"],
  },
  {
    key: "parking-lot",
    name: "Parking lot",
    subtitle: "Commercial — oil, grime, striping",
    description:
      "Commercial flatwork cleaning that lifts oil, gum, and grime from parking areas. Scheduled and recurring maintenance available for property managers.",
    included: ["Oil & gum spot treatment", "Large-area surface cleaning", "Recurring maintenance plans", "After-hours scheduling"],
  },
  {
    key: "gas-station",
    name: "Gas station",
    subtitle: "Pump islands, fuel pads, canopy",
    description:
      "Specialized cleaning for fuel pads, pump islands, and canopies — removing fuel residue and grime while staying compliant with site requirements.",
    included: ["Fuel-pad degreasing", "Pump island detailing", "Canopy & column cleaning", "Night & early-morning service"],
  },
];

function DetailPanel({ service }: { service: Service }) {
  return (
    <div className="mt-3 rounded-2xl border border-primary/15 bg-surface-dim p-6">
      <h3 className="font-heading text-xl font-bold text-primary">{service.name}</h3>
      <p className="mt-2 text-sm text-text-muted">{service.description}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {service.included.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-text">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href={telHref()} className="btn-secondary" data-tracking="selector-call">
          <PhoneIcon className="mr-2 h-5 w-5" /> Call {BUSINESS_PHONE}
        </a>
        <Link href="/booking" className="btn-outline">
          Get a Free Quote
        </Link>
      </div>
    </div>
  );
}

export default function ServiceSelector() {
  const [active, setActive] = useState<string | null>(null);
  const selected = SERVICES.find((s) => s.key === active) ?? null;

  return (
    <section id="service-selector" className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="heading text-3xl text-text md:text-4xl">What needs cleaning today?</h2>
        <p className="mt-3 text-text-muted">Tap any area to see what&apos;s included</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => {
          const isActive = service.key === active;
          return (
            <div key={service.key}>
              <button
                type="button"
                onClick={() => setActive(isActive ? null : service.key)}
                aria-expanded={isActive}
                className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-primary/10 bg-white hover:border-primary/40"
                }`}
              >
                <span className="font-heading text-lg font-bold text-primary">{service.name}</span>
                <span className="mt-1 block text-sm text-text-muted">{service.subtitle}</span>
              </button>
              {/* Mobile: panel appears directly below the selected card */}
              {isActive && (
                <div className="sm:hidden">
                  <DetailPanel service={service} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: single panel below the whole grid */}
      {selected && (
        <div className="mx-auto mt-2 hidden max-w-4xl sm:block">
          <DetailPanel service={selected} />
        </div>
      )}
    </section>
  );
}
