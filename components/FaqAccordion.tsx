"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "./Icons";

export type Faq = { question: string; answer: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-primary/10 rounded-2xl border border-primary/10 bg-white">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-heading font-bold text-text">{faq.question}</span>
              <ChevronDownIcon
                className={cn(
                  "h-5 w-5 shrink-0 text-accent transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{faq.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
