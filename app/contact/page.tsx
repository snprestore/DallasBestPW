import type { Metadata } from "next";
import Link from "next/link";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_HOURS,
  SERVICE_AREA,
  telHref,
} from "@/lib/site";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { PhoneIcon, MapPinIcon, CheckIcon } from "@/components/Icons";
import ResponseBadge from "@/components/ResponseBadge";

export const metadata: Metadata = {
  title: "Contact Us — DFW Pressure Washing",
  description: `Contact ${BUSINESS_NAME} for residential and commercial pressure washing across the Dallas–Fort Worth metroplex. Call, email, or request a free quote.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-text-light/90">
            Questions or ready to book? We're here to help — reach out any way you like.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-primary">Get in touch</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">Call or Text</p>
                    <a href={telHref()} className="font-semibold text-text hover:text-primary">
                      {BUSINESS_PHONE}
                    </a>
                    <p className="mt-1 text-sm text-text-muted">
                      Our AI receptionist Kate is available 7 days a week
                    </p>
                    <ResponseBadge className="mt-3" />
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center text-accent">@</span>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="font-semibold text-text hover:text-primary">
                    {BUSINESS_EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-accent" />
                  <span className="text-text">Serving {SERVICE_AREA}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="h-5 w-5 text-accent" />
                  <span className="text-text">{BUSINESS_HOURS}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-primary p-8 text-white">
            <h2 className="heading text-2xl">Request a Free Quote</h2>
            <p className="mt-3 text-text-light/90">
              The fastest way to get pricing is our quick quote form. Tell us about your project and
              we'll respond — usually the same day.
            </p>
            <Link href="/booking" className="btn-primary mt-6">
              Get a Free Quote
            </Link>
            <ResponseBadge tone="light" className="mt-4" />
          </div>
        </div>
      </section>
    </>
  );
}
