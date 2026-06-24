import Link from "next/link";
import { PhoneIcon, FileTextIcon, CheckCircleIcon } from "./Icons";

const STEPS = [
  {
    n: 1,
    Icon: PhoneIcon,
    title: "Call or text us",
    body: "Tell us what needs cleaning. We respond in under 60 seconds — day or night.",
  },
  {
    n: 2,
    Icon: FileTextIcon,
    title: "Get your free quote",
    body: "Same-day quote based on your property. No site visit required for most jobs.",
  },
  {
    n: 3,
    Icon: CheckCircleIcon,
    title: "We show up and handle everything",
    body: "We come to you anywhere in DFW. You don't even need to be home.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface-dim py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading text-3xl text-text md:text-4xl">
            Getting your property cleaned is simple
          </h2>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-3">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-primary/20 md:block"
          />
          {STEPS.map(({ n, Icon, title, body }) => (
            <div key={n} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                <Icon className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-highlight text-xs font-bold text-white">
                  {n}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-text">{title}</h3>
              <p className="mt-2 max-w-xs text-sm text-text-muted">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/booking" className="btn-primary">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
