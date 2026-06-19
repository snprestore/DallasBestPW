import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentManager from "@/components/ConsentManager";
import { BUSINESS_NAME, GTM_ID, META_PIXEL_ID, SITE_URL } from "@/lib/site";
import { jsonLd, localBusinessSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_NAME} | Professional Pressure Washing in DFW`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "Professional residential and commercial pressure washing across the Dallas–Fort Worth metroplex. Driveways, house soft washing, roofs, and commercial flatwork. Free quotes.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS_NAME,
    url: SITE_URL,
    title: `${BUSINESS_NAME} | Professional Pressure Washing in DFW`,
    description:
      "Powerful, surface-safe pressure washing for DFW homes and businesses. Free quotes, licensed & insured.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, type: "image/png", alt: BUSINESS_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} | Pressure Washing in DFW`,
    description: "Powerful, surface-safe pressure washing for DFW homes and businesses.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <head>
        {/*
          Google Consent Mode v2 — set DEFAULT consent to denied BEFORE GTM
          loads. Restores a prior "granted" choice from the cookie so returning
          visitors aren't re-gated. `gtag` is defined globally here so the
          ConsentManager can call gtag('consent','update', ...) later.
        */}
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent','default',{
                ad_storage:'denied',
                ad_user_data:'denied',
                ad_personalization:'denied',
                analytics_storage:'denied',
                wait_for_update: 500
              });
              try {
                var m = document.cookie.match(/(?:^|; )dbpw_consent=([^;]+)/);
                if (m && decodeURIComponent(m[1]) === 'granted') {
                  gtag('consent','update',{
                    ad_storage:'granted',
                    ad_user_data:'granted',
                    ad_personalization:'granted',
                    analytics_storage:'granted'
                  });
                }
              } catch (e) {}
            `,
          }}
        />

        {/* Google Tag Manager — loads GA4 + Ads tags, all gated by consent. */}
        {GTM_ID && GTM_ID !== "GTM-REPLACE" && (
          <script
            id="gtm-loader"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        {/*
          Meta Pixel base library — define fbq + load the script, but DO NOT
          init/track here. ConsentManager calls fbq('init') + PageView only
          after the user grants consent. (Conversion 'Lead' fires on thank-you.)
        */}
        {META_PIXEL_ID && META_PIXEL_ID !== "REPLACE" && (
          <script
            id="meta-pixel-base"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
              `,
            }}
          />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema()) }}
        />
      </head>
      <body>
        {/* GTM noscript fallback */}
        {GTM_ID && GTM_ID !== "GTM-REPLACE" && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        )}

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ConsentManager />
      </body>
    </html>
  );
}
