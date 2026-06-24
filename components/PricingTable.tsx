import Link from "next/link";
import { telHref, BUSINESS_PHONE } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/**
 * Residential pricing callout. Residential jobs are custom-quoted — we don't show
 * rates to B2C visitors; instead we drive them to a free quote or a call.
 */
export default function PricingTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white p-8 text-center shadow-sm">
      <p className="mx-auto max-w-2xl text-text-muted">
        Pricing is based on the size and scope of your property. Every job is custom-quoted —
        contact us for a free estimate.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/booking" className="btn-primary">
          Get a Free Estimate
        </Link>
        <a
          href={telHref()}
          className="btn border-2 border-primary/20 text-primary hover:bg-primary/5"
        >
          <PhoneIcon className="mr-2 h-5 w-5" /> Call {BUSINESS_PHONE}
        </a>
      </div>
    </div>
  );
}
