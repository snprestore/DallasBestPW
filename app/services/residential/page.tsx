import type { Metadata } from "next";
import PricingTable from "@/components/PricingTable";
import ServiceCard from "@/components/ServiceCard";
import Cta from "@/components/Cta";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import { RESIDENTIAL_SERVICES } from "@/lib/pricing";
import { breadcrumbSchema, faqPageSchema, jsonLd, serviceSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Pressure Washing in DFW — Driveways, Houses & More",
  description:
    "Residential pressure washing and soft washing in Dallas–Fort Worth: driveways, house soft wash, roofs, decks, patios, fences, gutters, and walkways. Free, no-obligation quotes.",
  alternates: { canonical: "/services/residential" },
};

const FAQS: Faq[] = [
  {
    question: "Will pressure washing damage my home's siding?",
    answer:
      "No — for siding, brick, and stucco we use soft washing, a low-pressure method with specialized cleaning solutions. It removes algae and dirt safely without forcing water behind surfaces or chipping paint.",
  },
  {
    question: "How often should I have my home pressure washed?",
    answer:
      "Most DFW homes benefit from a house wash once a year and driveway cleaning every 1–2 years. Shaded, north-facing, or tree-heavy properties may need it more often due to algae and pollen.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "Not necessarily, as long as we have access to the areas being cleaned and a water spigot. We'll confirm details when scheduling your quote.",
  },
];

export default function ResidentialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: "Residential Pressure Washing",
              description:
                "Residential pressure washing and soft washing for driveways, houses, roofs, decks, fences, and more across DFW.",
              url: absoluteUrl("/services/residential"),
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
              { name: "Residential", path: "/services/residential" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">Residential Pressure Washing</h1>
          <p className="mt-4 text-lg text-text-light/90">
            From a quick driveway refresh to a full-home soft wash, we restore your home's curb
            appeal with surface-safe methods and a fast, free custom quote.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESIDENTIAL_SERVICES.map((s) => (
            <ServiceCard key={s.key} service={s} />
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="heading mb-6 text-2xl text-text md:text-3xl">Residential Pricing</h2>
        <PricingTable />
      </section>

      <section className="container-page pb-16">
        <h2 className="heading mb-8 text-center text-3xl text-text">Residential FAQs</h2>
        <FaqAccordion faqs={FAQS} />
      </section>

      <Cta />
    </>
  );
}
