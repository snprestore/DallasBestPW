import Link from "next/link";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_HOURS,
  SERVICE_AREA,
  telHref,
} from "@/lib/site";
import { CITIES, cityRouteSlug } from "@/lib/cities";
import { PhoneIcon, DropletIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-primary-dark text-text-light">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-heading text-lg font-extrabold text-white">
            <DropletIcon className="h-6 w-6 text-accent" />
            {BUSINESS_NAME}
          </div>
          <p className="mt-3 text-sm text-text-light/70">
            Professional residential & commercial pressure washing serving {SERVICE_AREA}.
          </p>
          <p className="mt-4 text-sm text-text-light/70">{BUSINESS_HOURS}</p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services/residential" className="hover:text-white">Residential</Link></li>
            <li><Link href="/services/commercial" className="hover:text-white">Commercial</Link></li>
            <li><Link href="/commercial-quote" className="hover:text-white">Commercial Quote</Link></li>
            <li><Link href="/booking" className="hover:text-white">Get a Free Quote</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Service Areas
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/locations/${cityRouteSlug(c)}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={telHref()} className="flex items-center gap-2 hover:text-white">
                <PhoneIcon className="h-4 w-4" /> {BUSINESS_PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white">
                {BUSINESS_EMAIL}
              </a>
            </li>
            <li><Link href="/contact" className="hover:text-white">Contact page</Link></li>
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-text-light/60 md:flex-row">
          <p>© {year} {BUSINESS_NAME} LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
