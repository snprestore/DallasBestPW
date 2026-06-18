"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitLead, type LeadFormState } from "@/lib/actions";
import { RESIDENTIAL_SERVICES } from "@/lib/pricing";
import { CITIES } from "@/lib/cities";
import { beginBooking, type LeadType } from "@/lib/tracking";

const initialState: LeadFormState = { ok: true };

export default function BookingForm() {
  const params = useSearchParams();
  const [state, formAction, isPending] = useActionState(submitLead, initialState);
  const beganRef = useRef(false);

  // Prefill from the commercial calculator (or a service link).
  const prefillType = (params.get("type") as LeadType | null) ?? "residential";
  const [serviceType, setServiceType] = useState<LeadType>(
    prefillType === "commercial" ? "commercial" : "residential"
  );
  const prefillSqft = params.get("sqft") ?? "";
  const prefillEstimate = params.get("estimate") ?? "";
  const prefillCity = params.get("city") ?? "";

  // Capture UTM params from the URL into hidden fields.
  const [utm, setUtm] = useState({ source: "", medium: "", campaign: "" });
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setUtm({
      source: sp.get("utm_source") ?? "",
      medium: sp.get("utm_medium") ?? "",
      campaign: sp.get("utm_campaign") ?? "",
    });
  }, []);

  function handleFirstInteraction() {
    if (!beganRef.current) {
      beganRef.current = true;
      beginBooking(serviceType);
    }
  }

  return (
    <form
      action={formAction}
      onFocusCapture={handleFirstInteraction}
      className="space-y-5 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:p-8"
    >
      {/* Honeypot — hidden from humans; bots fill it and get rejected. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input name="full_name" required maxLength={120} autoComplete="name" className={inputCls} />
        </Field>
        <Field label="Phone" required>
          <input
            name="phone"
            required
            type="tel"
            maxLength={30}
            autoComplete="tel"
            className={inputCls}
          />
        </Field>
        <Field label="Email (optional)">
          <input name="email" type="email" maxLength={160} autoComplete="email" className={inputCls} />
        </Field>
        <Field label="City">
          <select name="city" defaultValue={prefillCity} className={inputCls}>
            <option value="">Select a city</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Service type" required>
          <select
            name="service_type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value as LeadType)}
            className={inputCls}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </Field>

        {serviceType === "residential" ? (
          <Field label="Service needed">
            <select name="service_detail" className={inputCls}>
              <option value="">Select a service</option>
              {RESIDENTIAL_SERVICES.map((s) => (
                <option key={s.key} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Other / multiple">Other / multiple</option>
            </select>
          </Field>
        ) : (
          <Field label="Square footage (approx.)">
            <input
              name="square_footage"
              type="number"
              inputMode="numeric"
              min={0}
              defaultValue={prefillSqft}
              className={inputCls}
            />
          </Field>
        )}

        <Field label="Property type">
          <input
            name="property_type"
            maxLength={120}
            placeholder={serviceType === "commercial" ? "e.g. retail, office, HOA" : "e.g. single-family home"}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Anything else? (optional)">
        <textarea name="message" rows={4} maxLength={2000} className={inputCls} />
      </Field>

      {/* Hidden: estimate prefill + UTM capture */}
      <input type="hidden" name="estimated_quote" defaultValue={prefillEstimate} />
      <input type="hidden" name="utm_source" value={utm.source} readOnly />
      <input type="hidden" name="utm_medium" value={utm.medium} readOnly />
      <input type="hidden" name="utm_campaign" value={utm.campaign} readOnly />

      {!state.ok && state.error && (
        <p role="alert" className="rounded-lg bg-highlight/10 px-4 py-3 text-sm font-medium text-highlight-dark">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={isPending} className="btn-primary w-full text-base disabled:opacity-60">
        {isPending ? "Sending…" : "Request My Free Quote"}
      </button>
      <p className="text-center text-xs text-text-muted">
        By submitting, you agree to be contacted about your request. We never sell your information.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-primary/20 px-4 py-3 text-base focus:border-accent";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-text">
        {label}
        {required && <span className="text-highlight"> *</span>}
      </span>
      {children}
    </label>
  );
}
