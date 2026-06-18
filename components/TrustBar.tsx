import { ShieldIcon, CheckIcon, MapPinIcon, StarIcon } from "./Icons";

const ITEMS = [
  { icon: ShieldIcon, label: "Licensed & Insured" },
  { icon: CheckIcon, label: "Satisfaction Guarantee" },
  { icon: MapPinIcon, label: "Locally Owned — DFW" },
  { icon: StarIcon, label: "Surface-Safe Methods" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-primary/10 bg-surface-dim">
      <div className="container-page grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2 text-center">
            <Icon className="h-5 w-5 shrink-0 text-accent" />
            <span className="text-sm font-semibold text-text">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
