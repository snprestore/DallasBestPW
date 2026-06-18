import type { Metadata } from "next";
import CommercialCalculator from "@/components/CommercialCalculator";
import Cta from "@/components/Cta";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Commercial Pressure Washing Estimate Calculator — DFW",
  description:
    "Get an instant per-square-foot estimate for commercial pressure washing in Dallas–Fort Worth. Enter square footage, surface, and condition for a ballpark range.",
  alternates: { canonical: "/commercial-quote" },
};

export default function CommercialQuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Commercial Quote", path: "/commercial-quote" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-14 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">Commercial Estimate Calculator</h1>
          <p className="mt-4 text-lg text-text-light/90">
            Ballpark your commercial pressure washing job in seconds. Enter the details below for an
            estimated range — then request the quote and we'll confirm on site.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <CommercialCalculator />
          <p className="mt-4 text-center text-sm text-text-muted">
            This tool provides an estimate only. Final pricing is confirmed after a quick on-site
            assessment of surface and condition.
          </p>
        </div>
      </section>

      <Cta title="Prefer to Talk It Through?" subtitle="Call us or request a detailed quote — we're happy to walk your property." />
    </>
  );
}
