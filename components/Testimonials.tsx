import { StarIcon } from "./Icons";

/**
 * TODO: Replace these PLACEHOLDER testimonials with real, verifiable reviews
 * before launch. Do not present fabricated reviews as real. Until then this
 * section is clearly generic and uses no fake names tied to schema markup.
 */
const PLACEHOLDER_TESTIMONIALS = [
  {
    quote:
      "TODO: Replace with a real customer review. Example tone — driveway looked brand new, crew was on time and professional.",
    author: "Customer — Dallas, TX",
  },
  {
    quote:
      "TODO: Replace with a real customer review. Example tone — house soft wash made a huge difference, no damage to landscaping.",
    author: "Customer — Plano, TX",
  },
  {
    quote:
      "TODO: Replace with a real customer review. Example tone — handled our commercial flatwork quickly and the entrance looks spotless.",
    author: "Property Manager — Irving, TX",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface-dim py-16">
      <div className="container-page">
        <h2 className="heading text-center text-3xl text-text md:text-4xl">What DFW Says</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-text-muted">
          Placeholder reviews — to be replaced with verified customer feedback at launch.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <div className="flex gap-1 text-highlight" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <StarIcon key={s} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm text-text-muted">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-text">{t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
