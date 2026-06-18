"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { META_PIXEL_ID } from "@/lib/site";

/**
 * Cookie-persisted consent banner wired to Google Consent Mode v2.
 *
 * - On accept: gtag('consent','update', all granted) + init Meta Pixel.
 * - On decline: gtag('consent','update', all denied) + no pixel.
 * - Choice persists in the `dbpw_consent` cookie (read in layout head too).
 */

const COOKIE = "dbpw_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

type Consent = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbqInitialized?: boolean;
  }
}

function readChoice(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )dbpw_consent=([^;]+)/);
  if (!m) return null;
  const v = decodeURIComponent(m[1]);
  return v === "granted" || v === "denied" ? v : null;
}

function writeChoice(value: Consent): void {
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}

function updateGoogleConsent(value: Consent): void {
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

/** Initialize Meta Pixel once, only after consent is granted. */
function initMetaPixel(): void {
  if (!META_PIXEL_ID || META_PIXEL_ID === "REPLACE") return;
  if (typeof window.fbq !== "function" || window._fbqInitialized) return;
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
  window._fbqInitialized = true;
}

export default function ConsentManager() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "granted") {
      // Returning visitor who previously accepted — ensure pixel is live.
      initMetaPixel();
      setVisible(false);
    } else if (choice === "denied") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  function accept() {
    writeChoice("granted");
    updateGoogleConsent("granted");
    initMetaPixel();
    setVisible(false);
  }

  function decline() {
    writeChoice("denied");
    updateGoogleConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-white shadow-2xl"
    >
      <div className="container-page flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-text-muted">
          We use cookies for analytics and advertising to improve your experience and measure our
          marketing. You can accept or decline non-essential cookies. See our{" "}
          <Link href="/privacy" className="font-semibold text-primary underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button onClick={decline} className="btn-outline px-5 py-2 text-sm">
            Decline
          </button>
          <button onClick={accept} className="btn-primary px-5 py-2 text-sm">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
