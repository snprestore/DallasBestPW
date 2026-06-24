import {
  DropletsIcon,
  WindIcon,
  LayersIcon,
  ZapIcon,
  CircleIcon,
  Trash2Icon,
  BugIcon,
  FlameIcon,
} from "./Icons";

const ITEMS = [
  { Icon: DropletsIcon, label: "Oil & grease stains" },
  { Icon: WindIcon, label: "Mold & algae" },
  { Icon: LayersIcon, label: "Dirt & grime buildup" },
  { Icon: ZapIcon, label: "Rust & oxidation" },
  { Icon: CircleIcon, label: "Tire marks" },
  { Icon: Trash2Icon, label: "Graffiti" },
  { Icon: BugIcon, label: "Organic growth" },
  { Icon: FlameIcon, label: "Hard water deposits" },
];

export default function WhatWeRemove() {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="heading text-3xl text-text md:text-4xl">We remove what others can&apos;t</h2>
        <p className="mt-3 text-text-muted">
          Commercial-grade equipment handles every surface across DFW
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {ITEMS.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <Icon className="h-6 w-6 text-accent" />
            <span className="mt-3 text-sm font-medium text-text">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
