import Link from "next/link";
import type { ResidentialService } from "@/lib/pricing";
import { telHref, BUSINESS_PHONE } from "@/lib/site";
import { CheckIcon, PhoneIcon } from "./Icons";

export default function ServiceCard({ service }: { service: ResidentialService }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-heading text-xl font-bold text-primary">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-text-muted">{service.description}</p>
      <p className="mt-5 flex items-start gap-1.5 text-xs text-text-muted">
        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
        Custom-quoted per property — based on size, surface, and condition.
      </p>
      <Link href="/booking" className="btn-primary mt-4 w-full text-sm">
        Get a Free Quote
      </Link>
      <a
        href={telHref()}
        className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <PhoneIcon className="h-4 w-4" /> Call {BUSINESS_PHONE}
      </a>
    </div>
  );
}
