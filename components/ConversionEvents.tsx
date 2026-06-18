"use client";

import { useEffect, useRef } from "react";
import { generateLead, type LeadType } from "@/lib/tracking";

/**
 * Fires the lead conversion exactly once on the thank-you page.
 *
 * - Pushes `generate_lead` to dataLayer (GTM maps this to GA4 + Google Ads
 *   conversions; consent is enforced GTM-side via Consent Mode v2).
 * - Fires the Meta Pixel `Lead` event ONLY if the pixel was initialized, which
 *   only happens after the user granted consent (see ConsentManager).
 *
 * The one-shot guard prevents double-counting on re-render / back-forward.
 */
export default function ConversionEvents({
  leadType,
  value,
}: {
  leadType: LeadType;
  value: number;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    generateLead({ lead_type: leadType, value });

    if (typeof window.fbq === "function" && window._fbqInitialized) {
      window.fbq("track", "Lead", { value, currency: "USD", lead_type: leadType });
    }
  }, [leadType, value]);

  return null;
}
