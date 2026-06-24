"use client";

import { useState } from "react";
import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_PHONE, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PhoneIcon, MenuIcon, CloseIcon, ChevronDownIcon } from "./Icons";
import ResponseBadge from "./ResponseBadge";
import Logo from "./Logo";

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: NavChild[] };

// Granular per-service pages don't exist, so dropdown items point at the
// existing residential/commercial overview pages (and the commercial quote tool).
const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/services/residential",
    label: "Residential",
    children: [
      { href: "/services/residential", label: "House Washing" },
      { href: "/services/residential", label: "Driveway Cleaning" },
      { href: "/services/residential", label: "Deck & Patio" },
      { href: "/services/residential", label: "Fence Washing" },
      { href: "/services/residential", label: "Roof Soft Wash" },
      { href: "/services/residential", label: "Concrete & Sidewalks" },
    ],
  },
  {
    href: "/services/commercial",
    label: "Commercial",
    children: [
      { href: "/services/commercial", label: "Parking Lot Cleaning" },
      { href: "/services/commercial", label: "Storefront Washing" },
      { href: "/services/commercial", label: "Building Exterior" },
      { href: "/services/commercial", label: "Gas Station Cleaning" },
      { href: "/services/commercial", label: "Re-Striping" },
      { href: "/commercial-quote", label: "Commercial Quote" },
    ],
  },
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                  <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                {/* pt-3 bridges the hover gap */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-60 rounded-xl border border-primary/10 bg-white py-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface-dim hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex flex-col items-end">
            <a
              href={telHref()}
              className="flex items-center gap-2 text-sm font-semibold text-primary"
              data-tracking="header-call"
            >
              <PhoneIcon className="h-4 w-4" />
              {BUSINESS_PHONE}
            </a>
            <ResponseBadge compact className="mt-1" />
          </div>
          <Link href="/booking" className="btn-primary px-5 py-2 text-sm">
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile: icon-only call + menu toggle */}
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
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-semibold text-text hover:text-primary"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mb-1 ml-3 flex flex-col border-l border-primary/10 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="py-1.5 text-sm font-medium text-text-muted hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <a href={telHref()} className="btn-secondary" onClick={() => setOpen(false)}>
              <PhoneIcon className="mr-2 h-4 w-4" /> Call {BUSINESS_PHONE}
            </a>
            <Link href="/booking" className="btn-outline" onClick={() => setOpen(false)}>
              Get a Free Quote
            </Link>
            <ResponseBadge className="self-start" />
          </div>
        </nav>
      </div>
    </header>
  );
}
