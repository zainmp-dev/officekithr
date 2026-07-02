/**
 * Third-party review platform URLs — single source of truth.
 * Update profileUrl once G2/Capterra listings are verified and live.
 */
export const REVIEW_PLATFORMS = {
  g2: {
    name: "G2",
    profileUrl: "https://www.g2.com/products/officekit-hr",
    submitUrl: "https://www.g2.com/products/officekit-hr/reviews/new",
  },
  capterra: {
    name: "Capterra",
    profileUrl: "https://www.capterra.com/p/officekit-hr",
    submitUrl: "https://www.capterra.com/p/officekit-hr/reviews/",
  },
} as const;

/** Days after onboarding before showing the in-app review prompt. */
export const REVIEW_PROMPT_DAYS_AFTER_ONBOARDING = 90;
