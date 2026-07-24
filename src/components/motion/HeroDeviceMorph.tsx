import { useEffect, useState, type RefObject } from "react";
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
  HERO_TABLET_DELAY,
} from "@/components/motion/hero-intro";

/**
 * Scroll timeline (0 → 1 while pinned):
 * Most of the pin drives the swap; only a short settle after the phone lands
 * so scrolling does not feel stuck.
 */
const T = {
  tabletGone: 0.42,
  phoneArrive: 0.78,
} as const;

/**
 * Device mockups include their own 3D angle — no extra CSS perspective.
 */

/** Horizontal travel in vw — open stage, no clip box. */
const TABLET_ENTER_X = 56;
const TABLET_REST_X = 0;
const TABLET_EXIT_X = 72;
const PHONE_ENTER_X = 70;
const PHONE_REST_X = 0;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function segmentT(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return easeInOutCubic((progress - start) / (end - start));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function forceScrollTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Pin + scrub only after the load intro finishes, so a restored scroll
 * position cannot show a half tablet / phone on first paint.
 */
function usePinnedProgress(
  sectionRef: RefObject<HTMLElement | null>,
  introReady: boolean
) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!introReady) {
      progress.set(0);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      forceScrollTop();
      progress.set(0);

      const html = document.documentElement;
      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.set(self.progress);
        },
      });

      const onLoad = () => {
        forceScrollTop();
        ScrollTrigger.refresh();
        progress.set(0);
      };
      window.addEventListener("load", onLoad);
      ScrollTrigger.refresh();
      progress.set(0);

      revert = () => {
        window.removeEventListener("load", onLoad);
        html.style.scrollBehavior = prevScrollBehavior;
        trigger.kill();
        progress.set(0);
      };
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [sectionRef, progress, introReady]);

  return progress;
}

function useIntroProgress() {
  const intro = useMotionValue(0);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    forceScrollTop();
    // Warm GSAP while the intro plays so pin setup does not hitch afterward.
    void import("gsap");
    void import("gsap/ScrollTrigger");

    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      forceScrollTop();
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
    const swap = segmentT(p as number, 0, T.tabletGone);
    return `${lerp(TABLET_REST_X, TABLET_EXIT_X, swap)}vw`;
  });

  const phoneX = useTransform(progress, (p) => {
    if (p <= 0) return `${PHONE_ENTER_X}vw`;
    const swap = segmentT(p, 0, T.phoneArrive);
    return `${lerp(PHONE_ENTER_X, PHONE_REST_X, swap)}vw`;
  });

  const tabletOpacity = useTransform([intro, progress], ([i, p]) => {
    const introFade = i as number;
    if ((p as number) <= 0) return introFade;
    return introFade * (1 - segmentT(p as number, 0, T.tabletGone));
  });

  const phoneOpacity = useTransform(progress, (p) => {
    if (p <= 0) return 0;
    return segmentT(p, 0, T.phoneArrive);
  });

  return { tabletX, phoneX, tabletOpacity, phoneOpacity };
}

type HeroDeviceMorphProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Load: text left + full tablet from the right (scroll locked at top).
 * After intro: scroll-scrubbed tablet → phone replacement.
 */
export function HeroDeviceMorph({ sectionRef }: HeroDeviceMorphProps) {
  const { intro, introReady } = useIntroProgress();
  const progress = usePinnedProgress(sectionRef, introReady);
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
