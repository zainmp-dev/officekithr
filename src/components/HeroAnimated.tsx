import { HeroCopy } from "@/components/HeroCopy";
import { HeroDeviceMorph } from "@/components/motion/HeroDeviceMorph";
import { MotionProvider, m } from "@/lib/performance/motion";
import {
  HERO_INTRO_DURATION,
  HERO_INTRO_EASE,
  HERO_TEXT_DELAY,
  HERO_TEXT_ENTER_X,
} from "@/components/motion/hero-intro";

/**
 * Desktop motion hero: after the banner paints, copy eases in from the left
 * while the tablet enters from the right.
 */
export default function HeroAnimated() {
  return (
    <MotionProvider>
      <div className="mx-auto grid w-full max-w-[90rem] flex-1 items-center gap-8 overflow-x-clip lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:gap-8 lg:overflow-visible xl:gap-10">
        <m.div
          className="will-change-transform"
          initial={{ opacity: 0, x: `-${HERO_TEXT_ENTER_X}vw` }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: HERO_INTRO_DURATION,
            ease: HERO_INTRO_EASE,
            delay: HERO_TEXT_DELAY,
          }}
        >
          <HeroCopy />
        </m.div>

        <div className="relative z-10 min-w-0 overflow-visible px-2 sm:px-4 lg:px-6 xl:px-8">
          <HeroDeviceMorph />
        </div>
      </div>
    </MotionProvider>
  );
}
