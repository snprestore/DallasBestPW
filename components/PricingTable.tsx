import Link from "next/link";
import { RESIDENTIAL_SERVICES } from "@/lib/pricing";
import { formatUsd } from "@/lib/utils";

/**
 * Residential fixed-range pricing table. "Starting at" framing — final price
 * confirmed after a quick quote. Intentionally NOT per-square-foot.
 */
export default function PricingTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-surface-dim">
          <tr>
            <th className="px-5 py-4 font-heading text-sm font-bold uppercase tracking-wide text-text">
              Service
            </th>
            <th className="px-5 py-4 text-right font-heading text-sm font-bold uppercase tracking-wide text-text">
              Price Range
            </th>
            <th className="hidden px-5 py-4 text-right sm:table-cell" />
          </tr>
        </thead>
        <tbody>
          {RESIDENTIAL_SERVICES.map((s) => (
            <tr key={s.key} className="border-t border-primary/10">
              <td className="px-5 py-4">
                <span className="font-semibold text-text">{s.name}</span>
                <span className="mt-0.5 block text-xs text-text-muted">{s.description}</span>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-right font-heading font-bold text-primary">
                {formatUsd(s.low)} – {formatUsd(s.high)}
              </td>
              <td className="hidden px-5 py-4 text-right sm:table-cell">
                <Link href="/booking" className="text-sm font-semibold text-highlight hover:underline">
                  Get quote →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-primary/10 bg-surface-dim px-5 py-3 text-xs text-text-muted">
        Ranges are starting estimates for the DFW market. Final pricing depends on square footage,
        surface type, and condition. <Link href="/booking" className="font-semibold text-primary underline">Request a free quote</Link> for an exact price.
      </p>
    </div>
  );
}
