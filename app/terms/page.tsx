import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${BUSINESS_NAME}, a Texas pressure washing service business.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <section className="container-page max-w-3xl py-14">
      <div className="mb-8 rounded-lg border border-highlight/40 bg-highlight/5 px-4 py-3 text-sm font-medium text-highlight-dark">
        Template — owner to review with legal counsel before launch. This is not legal advice.
      </div>

      <h1 className="heading text-4xl text-text">Terms of Service</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: TODO — set on launch.</p>

      <div className="mt-8 space-y-6 text-text-muted">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website and services
          of {BUSINESS_NAME} LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using
          our website or requesting services, you agree to these Terms.
        </p>

        <h2 className="heading text-2xl text-text">Services</h2>
        <p>
          We provide residential and commercial pressure washing and soft washing services in the
          Dallas–Fort Worth metroplex. Quotes and estimates provided through our website or
          calculator are estimates only and are not a binding offer. Final pricing is confirmed in
          a written quote after assessing the property, surface, and condition.
        </p>

        <h2 className="heading text-2xl text-text">Estimates &amp; Pricing</h2>
        <p>
          Our online pricing ranges and commercial calculator are provided for general guidance.
          Actual pricing depends on factors including size, surface type, condition, accessibility,
          and location. A minimum job charge may apply. We reserve the right to adjust a quote if
          on-site conditions differ materially from what was described.
        </p>

        <h2 className="heading text-2xl text-text">Scheduling &amp; Access</h2>
        <p>
          You agree to provide safe access to the areas to be serviced and a functional water
          source unless otherwise arranged. We are not responsible for delays caused by weather,
          access issues, or circumstances beyond our control.
        </p>

        <h2 className="heading text-2xl text-text">Customer Responsibilities</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Secure or remove fragile items, vehicles, and valuables from the work area</li>
          <li>Disclose known issues (loose siding, damaged surfaces, leaks, electrical hazards)</li>
          <li>Close windows and doors and secure pets prior to service</li>
        </ul>

        <h2 className="heading text-2xl text-text">Satisfaction Guarantee</h2>
        <p>
          We stand behind our work. If you are not satisfied with a completed cleaning, notify us
          promptly and we will return to address the affected areas as described in your quote.
        </p>

        <h2 className="heading text-2xl text-text">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, our liability for any claim arising from our
          services is limited to the amount paid for the specific service at issue. We are not
          liable for pre-existing damage, deterioration, or conditions disclosed or reasonably
          discoverable before service. Nothing in these Terms limits liability that cannot be
          limited under applicable law.
        </p>

        <h2 className="heading text-2xl text-text">Texas Consumer Protection (DTPA)</h2>
        <p>
          Nothing in these Terms waives or limits any rights you may have under the{" "}
          <strong>Texas Deceptive Trade Practices–Consumer Protection Act (DTPA)</strong> or other
          applicable consumer-protection laws. These Terms are to be read consistently with those
          rights. TODO: confirm specific warranty and DTPA notice language with counsel.
        </p>

        <h2 className="heading text-2xl text-text">Payment</h2>
        <p>
          Payment terms are stated in your quote or invoice. Unless otherwise agreed, payment is due
          upon completion of services.
        </p>

        <h2 className="heading text-2xl text-text">Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law
          principles. Any disputes will be handled in the appropriate courts located in Texas.
        </p>

        <h2 className="heading text-2xl text-text">Changes to These Terms</h2>
        <p>We may update these Terms from time to time. Continued use constitutes acceptance.</p>

        <h2 className="heading text-2xl text-text">Contact</h2>
        <p>
          Questions about these Terms? Contact {BUSINESS_NAME} at{" "}
          <a href={`mailto:${BUSINESS_EMAIL}`} className="text-primary underline">
            {BUSINESS_EMAIL}
          </a>{" "}
          or {BUSINESS_PHONE}. See also our{" "}
          <Link href="/privacy" className="text-primary underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
