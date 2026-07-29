/**
 * Home hero load choreography:
 * 1) Banner/nav paint first (brief beat)
 * 2) Text eases in from the left
 * 3) Tablet follows from the right
 *
 * Tuned for a normal, non-laggy entrance — not rushed, not delayed.
 */
export const HERO_INTRO_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/** Short beat so the banner is visible before motion — keep this small to avoid lag. */
export const HERO_BANNER_HOLD = 0.12;

/** Text starts after the banner hold. */
export const HERO_TEXT_DELAY = HERO_BANNER_HOLD;

/** Horizontal travel (vw) — text from the left, tablet from the right. */
export const HERO_TEXT_ENTER_X = 48;
export const HERO_TABLET_ENTER_X = 56;

/** Tablet follows the text slightly so the entrance reads left → right. */
export const HERO_TABLET_DELAY = HERO_BANNER_HOLD + 0.1;

/** Shared duration for text + tablet entrance. */
export const HERO_INTRO_DURATION = 1.15;

/** Total time until the tablet has fully settled (delay + duration). */
export const HERO_INTRO_TOTAL_MS = Math.round(
  (HERO_TABLET_DELAY + HERO_INTRO_DURATION) * 1000
);
