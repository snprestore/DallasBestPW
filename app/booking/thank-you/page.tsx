import type { Metadata } from "next";
import Link from "next/link";
import ConversionEvents from "@/components/ConversionEvents";
import { telHref, BUSINESS_PHONE } from "@/lib/site";
import type { LeadType } from "@/lib/tracking";
import { CheckIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Thank You — We Received Your Request",
  description: "Thanks for your pressure washing quote request. We'll be in touch shortly.",
  // Keep conversion confirmation out of the index.
  robots: { index: false, follow: false },
  alternates: { canonical: "/booking/thank-you" },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; value?: string }>;
}) {
  const sp = await searchParams;
  const leadType: LeadType = sp.type === "commercial" ? "commercial" : "residential";
  const value = Number(sp.value) || 0;

  return (
    <>
      {/* Fires generate_lead (+ Meta Lead if consented) exactly once. */}
      <ConversionEvents leadType={leadType} value={value} />

      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
          <CheckIcon className="h-8 w-8 text-accent" />
        </div>
        <h1 className="heading mt-6 text-4xl text-text md:text-5xl">Thank You!</h1>
        <p className="mt-4 max-w-xl text-lg text-text-muted">
          We've received your {leadType} pressure washing request. A member of our team will reach
          out shortly with your free quote — usually the same day.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={telHref()} className="btn-secondary">
            <PhoneIcon className="mr-2 h-5 w-5" /> Call us: {BUSINESS_PHONE}
          </a>
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-text-muted">
          In the meantime, explore our{" "}
          <Link href="/services" className="font-semibold text-primary underline">
            services
          </Link>{" "}
          or{" "}
          <Link href="/locations" className="font-semibold text-primary underline">
            service areas
          </Link>
          .
        </p>
      </section>
    </>
  );
}
