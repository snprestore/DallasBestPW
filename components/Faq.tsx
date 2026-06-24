"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./Icons";
import { FAQ_ITEMS } from "@/lib/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="heading text-3xl text-text md:text-4xl">Common questions</h2>
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/10 bg-white">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      item.tag === "Commercial"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent-dark"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="font-semibold text-text">{item.q}</span>
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
