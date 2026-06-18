/**
 * Typed dataLayer helpers.
 *
 * CRITICAL: GTM triggers in this account are keyed to dataLayer EVENT NAMES,
 * not page URLs. The `generate_lead` conversion must be fired by pushing the
 * named event below — never assume a thank-you pageview is enough.
 *
 * These run client-side. They no-op safely on the server / before GTM loads.
 */

export type LeadType = "residential" | "commercial";

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function push(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Fired when the commercial quote calculator page is viewed. */
export function viewQuoteCalculator(): void {
  push({ event: "view_quote_calculator" });
}

/** Fired when the user computes a commercial estimate. */
export function calculateCommercialEstimate(detail: {
  square_footage: number;
  estimated_low: number;
  estimated_high: number;
}): void {
  push({ event: "calculate_commercial_estimate", ...detail });
}

/** Fired when the user begins interacting with the booking form. */
export function beginBooking(leadType?: LeadType): void {
  push({ event: "begin_booking", lead_type: leadType ?? null });
}

/**
 * THE CONVERSION. Fire ONLY on the thank-you page, after a confirmed insert.
 * `value` is the estimated quote when available, otherwise 0.
 */
export function generateLead(detail: { lead_type: LeadType; value: number }): void {
  push({ event: "generate_lead", lead_type: detail.lead_type, value: detail.value });
}
