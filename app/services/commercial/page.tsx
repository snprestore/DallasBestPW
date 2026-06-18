import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import { COMMERCIAL_SURFACES, MARKET_ANCHORS } from "@/lib/pricing";
import { breadcrumbSchema, faqPageSchema, jsonLd, serviceSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Commercial Pressure Washing in DFW — Per Sq Ft Pricing",
  description:
    "Commercial pressure washing for DFW businesses and property managers: concrete flatwork, building exteriors, stucco, and storefronts. Transparent per-square-foot pricing.",
  alternates: { canonical: "/services/commercial" },
};

const FAQS: Faq[] = [
  {
    question: "How is commercial pressure washing priced?",
    answer: `Commercial work is priced per square foot based on the surface and condition. Standard jobs in the DFW market average roughly $${MARKET_ANCHORS.commercialAvgLow.toFixed(2)}–$${MARKET_ANCHORS.commercialAvgHigh.toFixed(2)} per square foot. Use our commercial estimator for an instant ballpark, then we confirm on site.`,
  },
  {
    question: "Do you offer recurring or scheduled cleaning?",
    answer:
      "Yes. Many commercial clients set up recurring flatwork and storefront cleaning (monthly, quarterly, or seasonal) to maintain a consistently professional appearance. We'll build a schedule that fits your property.",
  },
  {
    question: "Can you work after hours to avoid disrupting business?",
    answer:
      "Often, yes. We can schedule cleaning during off-hours for storefronts, restaurants, and offices to minimize impact on customers and staff. Let us know your needs when requesting a quote.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: "Commercial Pressure Washing",
              description:
                "Commercial pressure washing for flatwork, building exteriors, stucco, and storefronts across DFW, priced per square foot.",
              url: absoluteUrl("/services/commercial"),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Commercial", path: "/services/commercial" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">Commercial Pressure Washing</h1>
          <p className="mt-4 text-lg text-text-light/90">
            Keep your property spotless and professional. We service flatwork, building exteriors,
            storefronts, and parking areas with transparent per-square-foot pricing.
          </p>
          <Link href="/commercial-quote" className="btn-primary mt-7">
            Get an Instant Estimate
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="heading text-2xl text-text md:text-3xl">Surfaces & Rates</h2>
        <p className="mt-2 max-w-2xl text-text-muted">
          Per-square-foot rate ranges by surface type. Final pricing is confirmed on site and
          factors in condition (light, moderate, or heavy buildup). A $200 job minimum applies.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-surface-dim">
              <tr>
                <th className="px-5 py-4 font-heading text-sm font-bold uppercase tracking-wide text-text">
                  Surface
                </th>
                <th className="px-5 py-4 text-right font-heading text-sm font-bold uppercase tracking-wide text-text">
                  Rate ($/sq ft)
                </th>
              </tr>
            </thead>
            <tbody>
              {COMMERCIAL_SURFACES.map((s) => (
                <tr key={s.key} className="border-t border-primary/10">
                  <td className="px-5 py-4 font-semibold text-text">{s.label}</td>
                  <td className="px-5 py-4 text-right font-heading font-bold text-primary">
                    ${s.rateLow.toFixed(2)} – ${s.rateHigh.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            "Concrete flatwork & sidewalks",
            "Building exteriors & siding",
            "Storefronts & entryways",
            "Parking lots & garages",
            "Dumpster pads & drive-thrus",
            "Recurring maintenance plans",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-text">
              <CheckIcon className="h-5 w-5 text-accent" /> {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-16">
        <h2 className="heading mb-8 text-center text-3xl text-text">Commercial FAQs</h2>
        <FaqAccordion faqs={FAQS} />
      </section>

      <Cta title="Get Your Commercial Estimate" subtitle="Ballpark your job in seconds, then we confirm on site." />
    </>
  );
}
