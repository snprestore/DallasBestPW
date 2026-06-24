import Link from "next/link";
import { telHref, BUSINESS_PHONE } from "@/lib/site";
import { PhoneIcon, ArrowRightIcon } from "./Icons";
import ResponseBadge from "./ResponseBadge";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export default function Hero({
  eyebrow = "DFW's Pressure Washing Pros",
  title,
  subtitle,
  primaryCta = { href: "/booking", label: "Get a Free Quote" },
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* Decorative water-gradient backdrop (CSS only — no image dependency) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-accent-dark opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="container-page relative py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-light">
            {eyebrow}
          </p>
          <h1 className="heading text-4xl leading-tight sm:text-5xl md:text-6xl">{title}</h1>
          <p className="mt-5 text-lg text-text-light/90 md:text-xl">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryCta.href} className="btn-primary text-base">
              {primaryCta.label}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="btn border-2 border-white/40 text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            ) : (
              <a
                href={telHref()}
                className="btn border-2 border-white/40 text-white hover:bg-white/10"
                data-tracking="hero-call"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                {BUSINESS_PHONE}
              </a>
            )}
          </div>
          <ResponseBadge tone="light" className="mt-4" />
        </div>
      </div>
    </section>
  );
}
