"use client";

import { useState } from "react";
import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_PHONE, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";
import Logo from "./Logo";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/services/residential", label: "Residential" },
  { href: "/services/commercial", label: "Commercial" },
  { href: "/commercial-quote", label: "Commercial Quote" },
  { href: "/locations", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${BUSINESS_NAME} — home`} className="flex items-center">
          <Logo className="h-8 w-auto text-[#0B2A4A]" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref()}
            className="flex items-center gap-2 text-sm font-semibold text-primary"
            data-tracking="header-call"
          >
            <PhoneIcon className="h-4 w-4" />
            {BUSINESS_PHONE}
          </a>
          <Link href="/booking" className="btn-primary px-5 py-2 text-sm">
            Get a Free Quote
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={telHref()}
            aria-label={`Call ${BUSINESS_PHONE}`}
            data-tracking="header-call-mobile"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-primary"
          >
            <PhoneIcon className="h-6 w-6" />
          </a>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-primary"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("border-t border-primary/10 lg:hidden", open ? "block" : "hidden")}>
        <nav className="container-page flex flex-col py-3" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base font-medium text-text-muted hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <a href={telHref()} className="btn-outline" onClick={() => setOpen(false)}>
              <PhoneIcon className="mr-2 h-4 w-4" /> {BUSINESS_PHONE}
            </a>
            <Link href="/booking" className="btn-primary" onClick={() => setOpen(false)}>
              Get a Free Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
