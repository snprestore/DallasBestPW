# Dallas Best Pressure Washing

Production marketing + lead-generation website for **Dallas Best Pressure Washing LLC**, serving the Dallas–Fort Worth metroplex. Built with Next.js (App Router) + TypeScript + Tailwind, Supabase for lead storage, Resend for lead-notification email, and GTM / GA4 / Meta Pixel with Google Consent Mode v2.

> This brand is 100% siloed. Every external ID (Supabase, GTM, GA4, Meta Pixel, Ads) is **new and dedicated** to this business and supplied via environment variables. Nothing is shared with any sibling brand.

---

## Tech stack

- Next.js 15 (App Router, server components, Server Actions)
- TypeScript, Tailwind CSS
- Supabase (Postgres) — lead storage
- Resend — transactional lead-notification email
- GTM + GA4 + Meta Pixel + Google Consent Mode v2
- Hosted on Vercel

## Local development

> Requires Node.js 20+ and npm. (If you only deploy via Vercel, you can skip local dev — Vercel runs `npm install` and `next build` on push.)

```bash
cp .env.local.example .env.local   # then fill in values
npm install
npm run dev                        # http://localhost:3000
```

## Project structure

```
app/          routes (App Router) — pages, sitemap.ts, robots.ts
components/   UI components (Header, Hero, BookingForm, CommercialCalculator, ...)
lib/          cities, pricing, supabase, schema, tracking, actions, site config
supabase/     migrations/0001_init.sql (leads table + spam-defense trigger)
public/       placeholder logo / OG image (replace before launch)
```

## How leads flow

1. Visitor submits the **BookingForm** (`/booking`).
2. The `submitLead` **Server Action** (`lib/actions.ts`) validates input (zod) + honeypot.
3. Inserts into Supabase `leads` using the **service role key** (server only).
4. Sends a notification email via **Resend** to `LEAD_NOTIFICATION_EMAIL`.
5. Redirects to `/booking/thank-you`, which pushes the `generate_lead` event to
   `dataLayer` (the conversion trigger — **event-name keyed, not URL keyed**).

## Pricing model

- **Residential** = fixed "starting at" ranges (`lib/pricing.ts → RESIDENTIAL_SERVICES`).
- **Commercial** = per-square-foot calculator (`/commercial-quote`) with surface
  rates, condition multipliers, and a **$200 job minimum** (`lib/pricing.ts`).

## Tracking & consent

- Consent Mode v2 defaults **denied** for `ad_storage`, `ad_user_data`,
  `ad_personalization`, `analytics_storage` (set in `app/layout.tsx` before GTM).
- `ConsentManager` shows the banner, persists the choice in the `dbpw_consent`
  cookie, calls `gtag('consent','update', ...)`, and initializes the Meta Pixel
  only after consent is granted.
- The conversion (`generate_lead`) and Meta `Lead` fire on the thank-you page.

---

## ⚠️ Placeholders to swap before launch

Replace these before going live:

1. **Domain** → `NEXT_PUBLIC_SITE_URL` (+ add the domain in Vercel project settings).
2. **Lead email** → `NEXT_PUBLIC_BUSINESS_EMAIL`, `LEAD_NOTIFICATION_EMAIL`
   (temporarily the existing Dallas Best scheduling email).
3. **Phone** → `NEXT_PUBLIC_BUSINESS_PHONE` (temporarily the existing Dallas Best
   number; swap to the new Google Voice line when it exists).
4. **Supabase** → new project URL + `NEXT_PUBLIC_SUPABASE_ANON_KEY` +
   `SUPABASE_SERVICE_ROLE_KEY`. Run `supabase/migrations/0001_init.sql` in the
   new project's SQL editor.
5. **Tracking IDs** → `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`,
   `NEXT_PUBLIC_META_PIXEL_ID` (all new/dedicated).
6. **Resend** → `RESEND_API_KEY` + verified `RESEND_FROM_EMAIL` sending domain.
7. **Assets** → `public/logo.svg`, `public/og-image.svg`, `app/icon.svg`,
   the About bio (`app/about/page.tsx`), and the placeholder testimonials
   (`components/Testimonials.tsx`).
8. **Content review** → pricing in `lib/pricing.ts` and the city list in
   `lib/cities.ts`.
9. **Legal** → `app/terms/page.tsx` and `app/privacy/page.tsx` reviewed by counsel
   (TDPSA / DTPA / cookie disclosures are templated, not final advice).

## Environment variables

See [`.env.local.example`](.env.local.example) for the full annotated list. In
Vercel, add the same variables under **Project → Settings → Environment Variables**.

## Deploy (Vercel)

The repo is linked to Vercel. On push to `main`, Vercel auto-detects **Next.js**,
runs `npm install` + `next build`, and deploys. Add all environment variables in
the Vercel dashboard (they are **not** committed). Configure the custom domain
under Project → Settings → Domains.
