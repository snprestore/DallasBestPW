"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  COMMERCIAL_SURFACES,
  CONDITION_OPTIONS,
  COMMERCIAL_JOB_MINIMUM,
  calculateCommercialEstimate,
  type ConditionLevel,
} from "@/lib/pricing";
import { formatUsd } from "@/lib/utils";
import {
  viewQuoteCalculator,
  calculateCommercialEstimate as trackEstimate,
} from "@/lib/tracking";

export default function CommercialCalculator() {
  const router = useRouter();
  const [sqft, setSqft] = useState<string>("");
  const [surface, setSurface] = useState<string>(COMMERCIAL_SURFACES[0].key);
  const [condition, setCondition] = useState<ConditionLevel>("light");

  // Fire the calculator-view event once on mount.
  useEffect(() => {
    viewQuoteCalculator();
  }, []);

  const sqftNum = Math.max(0, Math.floor(Number(sqft) || 0));

  const estimate = useMemo(() => {
    if (sqftNum <= 0) return null;
    return calculateCommercialEstimate({
      squareFootage: sqftNum,
      surfaceKey: surface,
      condition,
    });
  }, [sqftNum, surface, condition]);

  // Track estimate computations (debounced via effect on the computed value).
  useEffect(() => {
    if (estimate && sqftNum > 0) {
      trackEstimate({
        square_footage: sqftNum,
        estimated_low: estimate.low,
        estimated_high: estimate.high,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimate?.low, estimate?.high]);

  function requestThisQuote() {
    if (!estimate) return;
    const params = new URLSearchParams({
      type: "commercial",
      sqft: String(sqftNum),
      surface,
      condition,
      // Pass the midpoint as the prefilled estimated quote value.
      estimate: String(Math.round((estimate.low + estimate.high) / 2)),
    });
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-text">Square footage</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full rounded-lg border border-primary/20 px-4 py-3 text-base focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-text">Surface type</span>
          <select
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            className="w-full rounded-lg border border-primary/20 px-4 py-3 text-base focus:border-accent"
          >
            {COMMERCIAL_SURFACES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-semibold text-text">Condition</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {CONDITION_OPTIONS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCondition(c.key)}
                className={
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors " +
                  (condition === c.key
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-primary/20 text-text-muted hover:border-accent")
                }
              >
                {c.label}
              </button>
            ))}
          </div>
        </label>
      </div>

      {/* Estimate output */}
      <div className="mt-6 rounded-xl bg-surface-dim p-5">
        {estimate ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
              Estimated range
            </p>
            <p className="font-heading text-3xl font-extrabold text-primary">
              {formatUsd(estimate.low)} – {formatUsd(estimate.high)}
            </p>
            {estimate.minimumApplied && (
              <p className="mt-1 text-xs text-text-muted">
                A {formatUsd(COMMERCIAL_JOB_MINIMUM)} job minimum applies to smaller jobs.
              </p>
            )}
            <p className="mt-2 text-xs text-text-muted">
              Estimate only — final quote confirmed on site after a quick assessment.
            </p>
            <button onClick={requestThisQuote} className="btn-primary mt-4 w-full sm:w-auto">
              Request This Quote
            </button>
          </>
        ) : (
          <p className="text-sm text-text-muted">
            Enter square footage to see an estimated range. The {formatUsd(COMMERCIAL_JOB_MINIMUM)}{" "}
            job minimum ensures small jobs are still worth scheduling.
          </p>
        )}
      </div>
    </div>
  );
}
