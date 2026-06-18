import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Cta from "@/components/Cta";
import ServiceCard from "@/components/ServiceCard";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import { CITIES, cityRouteSlug, getCityByParam, type City } from "@/lib/cities";
import { RESIDENTIAL_SERVICES, MARKET_ANCHORS } from "@/lib/pricing";
import {
  breadcrumbSchema,
  cityLocalBusinessSchema,
  faqPageSchema,
  jsonLd,
  serviceSchema,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { formatUsd } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return CITIES.map((c) => ({ city: cityRouteSlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: cityParam } = await params;
  const city = getCityByParam(cityParam);
  if (!city) return {};
  const path = `/locations/${cityRouteSlug(city)}`;
  return {
    title: `Pressure Washing in ${city.name}, TX — Residential & Commercial`,
    description: `Professional pressure washing in ${city.name}, TX. ${city.intro.slice(0, 110)}… Free quotes for driveways, house soft washing, and commercial flatwork.`,
    alternates: { canonical: path },
    openGraph: {
      title: `Pressure Washing in ${city.name}, TX`,
      description: `Surface-safe residential & commercial pressure washing in ${city.name}. Free quotes.`,
      url: absoluteUrl(path),
    },
  };
}

function cityFaqs(city: City): Faq[] {
  return [
    {
      question: `Do you offer pressure washing in ${city.name}?`,
      answer: `Yes — we provide both residential and commercial pressure washing throughout ${city.name} and the surrounding ${city.county} area, including neighborhoods like ${city.neighborhoods.slice(0, 2).join(" and ")}.`,
    },
    {
      question: `How much does pressure washing cost in ${city.name}?`,
      answer: `Residential services in ${city.name} start in our standard DFW ranges — a typical house wash runs about ${formatUsd(MARKET_ANCHORS.houseWashLow)}–${formatUsd(MARKET_ANCHORS.houseWashHigh)}. Commercial work is priced per square foot. Request a free quote for an exact price.`,
    },
    {
      question: `What surfaces do you clean in ${city.name}?`,
      answer: `${city.localNote} We clean driveways, house exteriors (soft wash), roofs, decks, patios, fences, gutters, and commercial flatwork.`,
    },
  ];
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { city: cityParam } = await params;
  const city = getCityByParam(cityParam);
  if (!city) notFound();

  const path = `/locations/${cityRouteSlug(city)}`;
  const url = absoluteUrl(path);
  const faqs = cityFaqs(city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(cityLocalBusinessSchema(city, url)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: `Pressure Washing in ${city.name}, TX`,
              description: city.intro,
              url,
              areaServed: `${city.name}, TX`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Service Areas", path: "/locations" },
              { name: city.name, path },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-light">
            {city.county} · {city.population} residents
          </p>
          <h1 className="heading mt-2 text-4xl md:text-5xl">
            Pressure Washing in {city.name}, TX
          </h1>
          <p className="mt-4 text-lg text-text-light/90">{city.intro}</p>
          <Link href="/booking" className="btn-primary mt-7">
            Get a Free Quote in {city.name}
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Local detail */}
      <section className="container-page py-14">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="heading text-2xl text-text md:text-3xl">
              Local Pressure Washing for {city.name} Homes & Businesses
            </h2>
            <p className="mt-4 text-text-muted">{city.localNote}</p>
            <p className="mt-4 text-text-muted">
              We serve {city.name} neighborhoods including{" "}
              {city.neighborhoods.join(", ")} — bringing the same surface-safe methods and clear
              pricing to every job, residential or commercial.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "Driveways & walkways",
                "House soft washing",
                "Roof soft wash",
                "Decks, patios & fences",
                "Commercial flatwork",
                "Storefronts & buildings",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2 text-text">
                  <CheckIcon className="h-5 w-5 text-accent" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-primary/10 bg-surface-dim p-6">
            <h3 className="font-heading text-lg font-bold text-primary">Why {city.name} chooses us</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>• Licensed & insured, locally operated</li>
              <li>• Surface-safe soft washing</li>
              <li>• Transparent, upfront pricing</li>
              <li>• Satisfaction guarantee</li>
            </ul>
            <Link href="/booking" className="btn-primary mt-5 w-full text-sm">
              Request a Quote
            </Link>
          </aside>
        </div>
      </section>

      {/* Popular services */}
      <section className="container-page pb-14">
        <h2 className="heading mb-8 text-2xl text-text md:text-3xl">
          Popular Services in {city.name}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESIDENTIAL_SERVICES.slice(0, 3).map((s) => (
            <ServiceCard key={s.key} service={s} />
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="heading mb-8 text-center text-3xl text-text">
          {city.name} Pressure Washing FAQs
        </h2>
        <FaqAccordion faqs={faqs} />
      </section>

      <Cta title={`Get Your Free Quote in ${city.name}`} />
    </>
  );
}
