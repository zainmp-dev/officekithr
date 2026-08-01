/** Testimonials for on-site display — not third-party aggregate ratings. */
export type Testimonial = {
  name: string;
  role: string;
  company: string;
  /** Optional headshot — omit when using company logo in avatar. */
  avatar?: string;
  /** Company logo under /company-logos/ — shown in avatar when no headshot. */
  companyLogo?: string;
  rating: number;
  quote: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: "Mohideen Kader",
    role: "Head of HR",
    company: "Lulu International Exchange LLC",
    companyLogo: "/company-logos/lulu.webp",
    rating: 5,
    quote:
      "OfficeKit transformed our payroll and attendance management process. The platform is easy to use and has significantly reduced manual work.",
  },
  {
    name: "Anees",
    role: "Head of HR",
    company: "Thai Group",
    companyLogo: "/company-logos/thai.webp",
    rating: 5,
    quote:
      "The recruitment and employee management features helped us streamline HR operations across multiple branches.",
  },
  {
    name: "Sajitha",
    role: "HR Manager",
    company: "Midac Electronics",
    companyLogo: "/company-logos/midac.webp",
    rating: 5,
    quote:
      "The mobile app and employee self-service portal improved employee engagement and reduced HR dependency.",
  },
] as const;

/** @deprecated Do not use for UI — third-party counts are not verified. Use on-site testimonials only. */
export const AGGREGATE_RATING = {
  ratingValue: "4.8",
  reviewCount: "47",
  bestRating: "5",
  worstRating: "1",
} as const;
