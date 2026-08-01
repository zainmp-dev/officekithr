import { useEffect, useState } from "react";
import {
  animate,
  m,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "@/lib/performance/motion";
import { HERO_IMAGES } from "@/lib/seo/assets";
import { imgFetchPriority } from "@/lib/img-props";
import {
  HERO_INTRO_DURATION,
  HERO_INTRO_EASE,
  HERO_INTRO_TOTAL_MS,
  HERO_PHONE_HOLD_MS,
  HERO_SWAP_DURATION_S,
  HERO_SWAP_EASE,
  HERO_TABLET_DELAY,
  HERO_TABLET_ENTER_X,
  HERO_TABLET_HOLD_MS,
} from "@/components/motion/hero-intro";

/**
 * Device-swap timeline (progress 0 → 1, eased once at the driver level).
 * Position and opacity ranges overlap so both devices coexist during the handoff.
 */
const T = {
  tabletMove: [0, 0.68] as const,
  phoneMove: [0.08, 0.92] as const,
  tabletFade: [0, 0.72] as const,
  phoneFade: [0.12, 0.88] as const,
};

/**
 * Device mockups include their own 3D angle — no extra CSS perspective.
 */

/** Horizontal travel in vw — open stage, no clip box. */
const TABLET_ENTER_X = HERO_TABLET_ENTER_X;
const TABLET_REST_X = 0;
const TABLET_EXIT_X = 72;
const PHONE_ENTER_X = 70;
const PHONE_REST_X = 0;

function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Auto-loop device swap after the load intro finishes.
 * Reuses the same progress-driven transforms as the former scroll scrub.
 */
function useAutoLoopProgress(introReady: boolean) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!introReady) {
      progress.set(0);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let activeControl: { stop: () => void } | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutId = window.setTimeout(() => {
          timeoutId = undefined;
          resolve();
        }, ms);
      });

    const tween = (to: number) => {
      const control = animate(progress, to, {
        duration: HERO_SWAP_DURATION_S,
        ease: HERO_SWAP_EASE,
      });
      activeControl = control;
      return control;
    };

    const runLoop = async () => {
      progress.set(0);

      while (!cancelled) {
        await wait(HERO_TABLET_HOLD_MS);
        if (cancelled) break;

        await tween(1);
        if (cancelled) break;

        await wait(HERO_PHONE_HOLD_MS);
        if (cancelled) break;

        await tween(0);
        if (cancelled) break;
      }
    };

    void runLoop();

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      activeControl?.stop();
      progress.set(0);
    };
  }, [introReady, progress]);

  return progress;
}

function useIntroProgress() {
  const intro = useMotionValue(0);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      setIntroReady(true);
    };

    const controls = animate(intro, 1, {
      duration: HERO_INTRO_DURATION,
      ease: HERO_INTRO_EASE,
      delay: HERO_TABLET_DELAY,
      onComplete: finish,
    });

    const unlockFallback = window.setTimeout(finish, HERO_INTRO_TOTAL_MS + 50);

    return () => {
      controls.stop();
      window.clearTimeout(unlockFallback);
    };
  }, [intro]);

  return { intro, introReady };
}

function useDeviceTransforms(
  progress: MotionValue<number>,
  intro: MotionValue<number>
) {
  const tabletX = useTransform([intro, progress], ([i, p]) => {
    const settled = lerp(TABLET_ENTER_X, TABLET_REST_X, i as number);
    if ((p as number) <= 0) return `${settled}vw`;
    const swap = segment(p as number, T.tabletMove[0], T.tabletMove[1]);
    return `${lerp(TABLET_REST_X, TABLET_EXIT_X, swap)}vw`;
  });

  const phoneX = useTransform(progress, (p) => {
    if (p <= 0) return `${PHONE_ENTER_X}vw`;
    const swap = segment(p, T.phoneMove[0], T.phoneMove[1]);
    return `${lerp(PHONE_ENTER_X, PHONE_REST_X, swap)}vw`;
  });

  const tabletOpacity = useTransform([intro, progress], ([i, p]) => {
    const introFade = i as number;
    if ((p as number) <= 0) return introFade;
    const fade = segment(p as number, T.tabletFade[0], T.tabletFade[1]);
    return introFade * (1 - fade);
  });

  const phoneOpacity = useTransform(progress, (p) => {
    if (p <= 0) return 0;
    return segment(p, T.phoneFade[0], T.phoneFade[1]);
  });

  return { tabletX, phoneX, tabletOpacity, phoneOpacity };
}

/**
 * Load: text left + full tablet from the right.
 * After intro: auto-looping tablet ↔ phone swap on a timer.
 */
export function HeroDeviceMorph() {
  const { intro, introReady } = useIntroProgress();
  const progress = useAutoLoopProgress(introReady);
  const { tabletX, phoneX, tabletOpacity, phoneOpacity } = useDeviceTransforms(
    progress,
    intro
  );

  return (
    <div className="relative flex w-full max-w-full items-center justify-center overflow-x-clip px-1 pb-2 pt-1 sm:px-2 sm:pb-4 lg:justify-end lg:overflow-visible lg:px-3 lg:pb-6 lg:pr-4 xl:pr-6">
      <div className="relative aspect-[16/11] w-full max-w-[min(100%,20rem)] sm:max-w-[min(100%,26rem)] sm:w-full lg:max-w-none lg:w-[108%] xl:w-[115%]">
        <m.div
          className="absolute inset-0 flex items-center justify-center will-change-transform"
          style={{
            x: tabletX,
            opacity: tabletOpacity,
          }}
        >
          <img
            src={HERO_IMAGES.tablet.src}
            srcSet={HERO_IMAGES.tablet.srcSet}
            sizes={HERO_IMAGES.tablet.sizes}
            alt={HERO_IMAGES.tablet.alt}
            width={HERO_IMAGES.tablet.width}
            height={HERO_IMAGES.tablet.height}
            className="h-auto max-h-[min(52vh,28rem)] w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] xl:max-h-[min(56vh,32rem)]"
            {...imgFetchPriority("high")}
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </m.div>

        <m.div
          className="pointer-events-none absolute inset-0 flex translate-y-8 items-center justify-center will-change-transform sm:translate-y-10"
          style={{
            x: phoneX,
            opacity: phoneOpacity,
          }}
          aria-hidden
        >
          {/* Phone mockup already includes its 3D angle — no extra CSS perspective. */}
          <img
            src={HERO_IMAGES.phone.src}
            srcSet={HERO_IMAGES.phone.srcSet}
            sizes={HERO_IMAGES.phone.sizes}
            alt={HERO_IMAGES.phone.alt}
            width={HERO_IMAGES.phone.width}
            height={HERO_IMAGES.phone.height}
            className="h-full max-h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            {...imgFetchPriority("low")}
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </m.div>
      </div>
    </div>
  );
}
