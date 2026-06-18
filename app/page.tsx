import Link from "next/link";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import Cta from "@/components/Cta";
import Testimonials from "@/components/Testimonials";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import { RESIDENTIAL_SERVICES, MARKET_ANCHORS } from "@/lib/pricing";
import { CITIES, cityRouteSlug } from "@/lib/cities";
import { SERVICE_AREA } from "@/lib/site";
import { faqPageSchema, jsonLd } from "@/lib/schema";
import { formatUsd } from "@/lib/utils";
import { CheckIcon, DropletIcon, ShieldIcon, MapPinIcon, ArrowRightIcon } from "@/components/Icons";

const HOME_FAQS: Faq[] = [
  {
    question: "How much does pressure washing cost in Dallas?",
    answer: `It depends on the surface and size. Residential services start in the ranges shown on our pricing — a typical DFW house wash runs about ${formatUsd(MARKET_ANCHORS.houseWashLow)}–${formatUsd(MARKET_ANCHORS.houseWashHigh)}. Commercial work is priced per square foot (roughly $0.40–$0.50/sq ft for standard jobs). Get a free quote for an exact price.`,
  },
  {
    question: "Do you use pressure washing or soft washing?",
    answer:
      "Both — we match the method to the surface. Durable concrete gets surface cleaning at higher pressure, while siding, roofs, brick, and stucco get a low-pressure soft wash with cleaning solutions so we never cause damage.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Dallas Best Pressure Washing is a licensed and insured local company serving the Dallas–Fort Worth metroplex. (TODO: add license/insurance specifics before launch.)",
  },
  {
    question: "How long does a job take?",
    answer:
      "Most residential jobs are completed in a few hours. Larger homes and commercial flatwork may take longer; we'll give you a clear time estimate with your quote.",
  },
  {
    question: "What areas do you serve?",
    answer: `We serve ${SERVICE_AREA}, including Dallas, Plano, Frisco, McKinney, Irving, and many more. See our service-area pages for your city.`,
  },
];

const WHY_US = [
  {
    icon: DropletIcon,
    title: "Surface-Safe Methods",
    body: "We dial in the right pressure and cleaning solution for every surface — no etched concrete, no stripped paint.",
  },
  {
    icon: ShieldIcon,
    title: "Licensed & Insured",
    body: "A legitimate, insured local business. Your property is protected from the moment we arrive.",
  },
  {
    icon: CheckIcon,
    title: "Satisfaction Guarantee",
    body: "If it isn't clean, we make it right. We stand behind every job we complete.",
  },
  {
    icon: MapPinIcon,
    title: "Local to DFW",
    body: "We know Texas dirt, clay-dust, and humidity — and exactly how to get rid of the grime they leave behind.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(HOME_FAQS)) }}
      />

      <Hero
        title="DFW's Cleanest Surfaces. Guaranteed."
        subtitle="Powerful, surface-safe pressure washing for homes and businesses across the Dallas–Fort Worth metroplex. From dirty to spotless — fast, local, and fully insured."
      />

      <TrustBar />

      {/* Residential services */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading text-3xl text-text md:text-4xl">Residential Pressure Washing</h2>
          <p className="mt-3 text-text-muted">
            Clear pricing, no surprises. Simple starting ranges — final price confirmed with a quick
            free quote.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESIDENTIAL_SERVICES.map((s) => (
            <ServiceCard key={s.key} service={s} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services/residential" className="font-semibold text-primary hover:underline">
            View all residential services →
          </Link>
        </div>
      </section>

      {/* Commercial section */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-light">
              Commercial
            </p>
            <h2 className="heading mt-2 text-3xl md:text-4xl">Per-Square-Foot Commercial Cleaning</h2>
            <p className="mt-4 text-text-light/90">
              Property managers and businesses get transparent, square-footage-based pricing for
              flatwork, building exteriors, and storefronts. Use our instant estimator to ballpark
              your job in seconds.
            </p>
            <ul className="mt-5 space-y-2 text-text-light/90">
              <li className="flex gap-2"><CheckIcon className="h-5 w-5 text-accent" /> Concrete flatwork, siding, stucco & more</li>
              <li className="flex gap-2"><CheckIcon className="h-5 w-5 text-accent" /> Light, moderate & heavy condition pricing</li>
              <li className="flex gap-2"><CheckIcon className="h-5 w-5 text-accent" /> Scheduled & recurring maintenance available</li>
            </ul>
            <Link href="/commercial-quote" className="btn-primary mt-7">
              Try the Commercial Estimator
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-wide text-accent-light">Market anchor</p>
            <p className="mt-2 font-heading text-4xl font-extrabold">
              ${MARKET_ANCHORS.commercialAvgLow.toFixed(2)}–${MARKET_ANCHORS.commercialAvgHigh.toFixed(2)}
              <span className="text-lg font-semibold text-text-light/70"> / sq ft</span>
            </p>
            <p className="mt-2 text-sm text-text-light/80">
              Typical standard commercial work in the DFW market. Your exact estimate depends on
              surface and condition.
            </p>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading text-3xl text-text md:text-4xl">Why Choose Us</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <Icon className="h-8 w-8 text-accent" />
              <h3 className="mt-3 font-heading text-lg font-bold text-text">{title}</h3>
              <p className="mt-2 text-sm text-text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Service area mention */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading text-3xl text-text md:text-4xl">Serving the DFW Metroplex</h2>
          <p className="mt-3 text-text-muted">
            Proudly serving {SERVICE_AREA} — find pressure washing in your city.
          </p>
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/locations/${cityRouteSlug(c)}`}
              className="rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-white"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page pb-16">
        <h2 className="heading mb-8 text-center text-3xl text-text md:text-4xl">
          Frequently Asked Questions
        </h2>
        <FaqAccordion faqs={HOME_FAQS} />
      </section>

      <Cta />
    </>
  );
}
