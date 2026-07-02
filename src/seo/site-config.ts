import { env } from "@/lib/env";

/** Canonical site configuration — single source of truth for URLs and brand. */
export const SITE = {
  name: "OfficeKit HR",
  legalName: "OfficeKit HR",
  domain: env.siteHost,
  url: env.siteUrl,
  defaultLocale: "en_US",
  defaultLanguage: "en",
  twitter: "@officekit",
  email: "hello@officekithr.com",
  phone: "+91-8137932991",
  logo: `${env.siteUrl}/NavLogo.webp`,
  ogImage: `${env.siteUrl}/ImageThumbnail2.webp`,
  areasServed: ["IN", "AE", "KW", "SA", "QA", "OM", "BH"],
  social: {
    linkedin: "https://www.linkedin.com/company/officekithr/",
    facebook: "https://www.facebook.com/officekithr/",
    instagram: "https://www.instagram.com/officekit_hr/",
    youtube: "https://www.youtube.com/channel/UC8zUtDkAkZUkOl0TkMhQpNw",
  },
  sameAs: [
    "https://www.linkedin.com/company/officekithr/",
    "https://www.facebook.com/officekithr/",
    "https://www.instagram.com/officekit_hr/",
    "https://www.youtube.com/channel/UC8zUtDkAkZUkOl0TkMhQpNw",
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized === "/" ? "" : normalized}`;
}

export function canonicalUrl(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0] || "/";
  if (path === "/") return `${SITE.url}/`;
  return absoluteUrl(path.endsWith("/") ? path.slice(0, -1) : path);
}
