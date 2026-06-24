import { ZapIcon } from "./Icons";

/**
 * Small trust pill placed next to phone numbers / CTAs.
 * tone="light" for dark backgrounds; compact for tight spots (e.g. header).
 */
export default function ResponseBadge({
  className = "",
  compact = false,
  tone = "default",
}: {
  className?: string;
  compact?: boolean;
  tone?: "default" | "light";
}) {
  const toneCls =
    tone === "light" ? "bg-white/10 text-text-light" : "bg-accent/10 text-primary";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneCls} ${className}`}
    >
      <ZapIcon className={`h-3 w-3 ${tone === "light" ? "text-accent-light" : "text-accent"}`} />
      {compact ? "Replies in under 60 sec" : "We respond in under 60 seconds — day or night"}
    </span>
  );
}
