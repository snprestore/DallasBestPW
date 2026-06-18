import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import { CITIES, cityRouteSlug } from "@/lib/cities";
import { SERVICE_AREA } from "@/lib/site";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { MapPinIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pressure Washing Service Areas — Dallas–Fort Worth Metroplex",
  description:
    "Dallas Best Pressure Washing serves cities across the DFW metroplex — Dallas, Plano, Frisco, McKinney, Irving, and more. Find professional pressure washing in your city.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Service Areas", path: "/locations" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">Service Areas Across DFW</h1>
          <p className="mt-4 text-lg text-text-light/90">
            We proudly serve {SERVICE_AREA}. Choose your city below for local pressure washing
            details and a free quote.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/locations/${cityRouteSlug(c)}`}
              className="group flex items-start gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
              <div>
                <h2 className="font-heading text-lg font-bold text-primary group-hover:underline">
                  Pressure Washing in {c.name}, TX
                </h2>
                <p className="mt-1 text-sm text-text-muted">{c.county}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
