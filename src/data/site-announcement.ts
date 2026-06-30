/** Site-wide top announcement — toggle `enabled` when the promo ends. */
export const SITE_ANNOUNCEMENT = {
  enabled: true,
  storageKey: "officekit_face_scan_launch_dismissed",
  href: "/features/face-kit",
  /** Tailwind top offset class for fixed nav when bar is visible (h-10). */
  navOffsetClass: "!top-10",
  badge: "New",
  messages: [
    "AI Face Scan is live — touchless attendance for modern HR teams",
    "Free for up to 25 users",
    "WPS-ready payroll & employee self-service included",
  ],
  ctaLabel: "Explore Face Kit",
} as const;
