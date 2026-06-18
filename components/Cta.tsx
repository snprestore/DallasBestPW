import Link from "next/link";
import { telHref, BUSINESS_PHONE } from "@/lib/site";
import { PhoneIcon } from "./Icons";

type CtaProps = {
  title?: string;
  subtitle?: string;
};

export default function Cta({
  title = "Ready for a Spotless Property?",
  subtitle = "Get a fast, free quote today. No pressure — just a clean estimate.",
}: CtaProps) {
  return (
    <section className="bg-primary">
      <div className="container-page flex flex-col items-center gap-6 py-14 text-center text-white">
        <h2 className="heading text-3xl md:text-4xl">{title}</h2>
        <p className="max-w-2xl text-lg text-text-light/90">{subtitle}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="btn-primary text-base">
            Get a Free Quote
          </Link>
          <a
            href={telHref()}
            className="btn border-2 border-white/40 text-white hover:bg-white/10"
            data-tracking="cta-call"
          >
            <PhoneIcon className="mr-2 h-5 w-5" />
            {BUSINESS_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
