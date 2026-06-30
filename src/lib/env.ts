import {
  FLOWPILOT_BLOG_API_URL,
  FLOWPILOT_BLOG_DEV_PROXY,
} from "@/lib/flowpilot-blog-api";

function str(value: string | undefined, fallback: string): string {
  const v = value?.trim();
  return v || fallback;
}

function flag(value: string | undefined): boolean {
  return value === "true" || value === "1";
}

const siteUrl = str(
  import.meta.env.VITE_SITE_URL,
  "https://www.officekithr.com",
).replace(/\/$/, "");

let siteHost = "www.officekithr.com";
try {
  siteHost = new URL(siteUrl).host;
} catch {
  /* keep default */
}

export const env = {
  siteUrl,
  siteHost,
  syncoraLeadsUrl: str(
    import.meta.env.VITE_SYNCORA_LEADS_URL,
    "https://app.syncoraai.com/api/leads/external",
  ),
  syncoraApiKey: str(import.meta.env.VITE_SYNCORA_API_KEY, ""),
  blogApiUrl: str(
    import.meta.env.VITE_BLOG_API_URL,
    import.meta.env.DEV ? FLOWPILOT_BLOG_DEV_PROXY : FLOWPILOT_BLOG_API_URL,
  ),
  blogApiKey: str(import.meta.env.VITE_BLOG_API_KEY, ""),
  gaMeasurementId: str(
    import.meta.env.VITE_GA_MEASUREMENT_ID,
    "G-J60WZ10KBF",
  ),
  gtagId: str(import.meta.env.VITE_GTAG_ID, "GT-KDD8X4P9"),
  googleAdsId: str(import.meta.env.VITE_GOOGLE_ADS_ID, "AW-17365780413"),
  googleAdsConversion: str(
    import.meta.env.VITE_GOOGLE_ADS_CONVERSION,
    "AW-17365780413/MAzACIaay74bEL2P09hA",
  ),
  disableAnalytics: flag(import.meta.env.VITE_DISABLE_ANALYTICS),
} as const;
