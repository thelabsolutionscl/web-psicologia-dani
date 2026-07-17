import Script from "next/script";
import { SITE_URL } from "@/lib/site";

/**
 * Analytics según NEXT_PUBLIC_ANALYTICS: "plausible" | "ga4" | "off"
 * (sección 9). GA4 requiere además NEXT_PUBLIC_GA4_ID.
 */
export function Analytics() {
  const mode = process.env.NEXT_PUBLIC_ANALYTICS;

  if (mode === "plausible") {
    const domain = new URL(SITE_URL).hostname;
    return (
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    );
  }

  if (mode === "ga4") {
    const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
    if (!ga4Id) return null;
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}');`}
        </Script>
      </>
    );
  }

  return null;
}
