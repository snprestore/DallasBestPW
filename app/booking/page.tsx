import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import { telHref, BUSINESS_PHONE } from "@/lib/site";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { PhoneIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Get a Free Pressure Washing Quote — DFW",
  description:
    "Request a free, no-obligation pressure washing quote for your DFW home or business. Tell us what you need and we'll get right back to you.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Get a Quote", path: "/booking" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-14 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">Get Your Free Quote</h1>
          <p className="mt-4 text-lg text-text-light/90">
            Tell us a little about your project and we'll follow up fast with a free, no-pressure
            quote.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="rounded-2xl border border-primary/10 bg-white p-8 text-text-muted">Loading form…</div>}>
              <BookingForm />
            </Suspense>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-primary/10 bg-surface-dim p-6">
              <h2 className="font-heading text-lg font-bold text-primary">Prefer to call?</h2>
              <a href={telHref()} className="mt-3 flex items-center gap-2 font-semibold text-primary">
                <PhoneIcon className="h-5 w-5" /> {BUSINESS_PHONE}
              </a>
              <p className="mt-2 text-sm text-text-muted">
                Call or text — we're happy to talk through your project.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-white p-6">
              <h2 className="font-heading text-lg font-bold text-primary">What to expect</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                {[
                  "A fast response — usually same day",
                  "A clear, upfront quote",
                  "Surface-safe, insured service",
                  "No obligation",
                ].map((i) => (
                  <li key={i} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
