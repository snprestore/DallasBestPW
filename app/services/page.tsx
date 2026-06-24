import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import { breadcrumbSchema, jsonLd, serviceSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { ArrowRightIcon, DropletIcon, ShieldIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pressure Washing Services — Residential & Commercial",
  description:
    "Explore our residential and commercial pressure washing services across DFW: driveways, house soft washing, roofs, fences, decks, and commercial flatwork.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: "Pressure Washing",
              description:
                "Residential and commercial pressure washing and soft washing across the Dallas–Fort Worth metroplex.",
              url: absoluteUrl("/services"),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">Our Pressure Washing Services</h1>
          <p className="mt-4 text-lg text-text-light/90">
            Whether it's a single driveway or an entire commercial property, we use the right
            method and pressure for every surface — powerful where it helps, gentle where it
            matters.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 py-16 md:grid-cols-2">
        <Link
          href="/services/residential"
          className="group rounded-2xl border border-primary/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
        >
          <DropletIcon className="h-10 w-10 text-accent" />
          <h2 className="mt-4 font-heading text-2xl font-bold text-primary">Residential</h2>
          <p className="mt-2 text-text-muted">
            Driveways, house soft washing, roofs, decks, patios, fences, gutters, and walkways —
            custom-quoted for your property with a fast, free estimate.
          </p>
          <span className="mt-4 inline-flex items-center font-semibold text-highlight">
            View residential services
            <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/services/commercial"
          className="group rounded-2xl border border-primary/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
        >
          <ShieldIcon className="h-10 w-10 text-accent" />
          <h2 className="mt-4 font-heading text-2xl font-bold text-primary">Commercial</h2>
          <p className="mt-2 text-text-muted">
            Flatwork, building exteriors, storefronts, and parking areas — priced transparently per
            square foot with our instant estimator.
          </p>
          <span className="mt-4 inline-flex items-center font-semibold text-highlight">
            View commercial services
            <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      <Cta />
    </>
  );
}
