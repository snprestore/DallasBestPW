import type { Metadata } from "next";
import Cta from "@/components/Cta";
import TrustBar from "@/components/TrustBar";
import { BUSINESS_NAME, SERVICE_AREA } from "@/lib/site";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us — Local DFW Pressure Washing",
  description: `Learn about ${BUSINESS_NAME}, a locally owned and operated pressure washing company serving the Dallas–Fort Worth metroplex with surface-safe, professional service.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ])
          ),
        }}
      />

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-page max-w-3xl">
          <h1 className="heading text-4xl md:text-5xl">About {BUSINESS_NAME}</h1>
          <p className="mt-4 text-lg text-text-light/90">
            Locally owned, results-driven, and obsessed with the transformation from grimy to
            spotless.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-text-muted">
          {/* TODO: Replace this placeholder story with the real owner/manager bio. */}
          <div className="rounded-lg border border-highlight/30 bg-highlight/5 px-4 py-3 text-sm text-highlight-dark">
            Placeholder — owner to replace with the real company story, founding year, and
            owner/manager bio before launch.
          </div>

          <p>
            {BUSINESS_NAME} is a dedicated pressure washing company serving {SERVICE_AREA}. We
            started with a simple idea: deliver powerful, surface-safe cleaning with honest pricing
            and treat every property like it's our own.
          </p>
          <p>
            From residential driveways and house soft washing to commercial flatwork and
            storefronts, our crews bring professional-grade equipment and the know-how to match the
            right method to every surface. High pressure where it helps, gentle soft washing where
            it matters — never a one-size-fits-all blast that risks damage.
          </p>
          <p>
            We're licensed, insured, and proud to be local to the DFW metroplex. We know Texas heat,
            clay-dust, pollen, and humidity, and we know exactly how to undo the grime they leave
            behind. When we finish, your property doesn't just look clean — it looks cared for.
          </p>
          <h2 className="heading pt-4 text-2xl text-text">Our Promise</h2>
          <p>
            If it isn't clean, we make it right. Every job comes with our satisfaction guarantee,
            clear communication, and respect for your time and property.
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
