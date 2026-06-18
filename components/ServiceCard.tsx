import Link from "next/link";
import type { ResidentialService } from "@/lib/pricing";
import { formatUsd } from "@/lib/utils";
import { CheckIcon } from "./Icons";

export default function ServiceCard({ service }: { service: ResidentialService }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-heading text-xl font-bold text-primary">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-text-muted">{service.description}</p>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Starting at</p>
        <p className="font-heading text-2xl font-extrabold text-text">
          {formatUsd(service.low)}
          <span className="text-base font-semibold text-text-muted"> – {formatUsd(service.high)}</span>
        </p>
      </div>
      <Link href="/booking" className="btn-primary mt-5 w-full text-sm">
        Get a Free Quote
      </Link>
      <p className="mt-3 flex items-start gap-1.5 text-xs text-text-muted">
        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
        Final price depends on size, surface, and condition.
      </p>
    </div>
  );
}
