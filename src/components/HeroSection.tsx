import { lazy, Suspense, useEffect, useRef } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { HERO_IMAGES } from "@/lib/seo/assets";
import { HeroCopy } from "@/components/HeroCopy";
import { HeroDeviceStatic } from "@/components/motion/HeroDeviceStatic";
import { useShouldAnimate } from "@/lib/performance/usePerformanceMode";

const HeroAnimated = lazy(() => import("@/components/HeroAnimated"));

// Start fetching the motion hero immediately on desktop so Suspense does not lag.
if (typeof window !== "undefined") {
  const desktop =
    !window.matchMedia("(max-width: 767px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (desktop) {
    void import("@/components/HeroAnimated");
  }
}

function HeroGridStatic() {
  return (
    <div className="mx-auto grid w-full max-w-[90rem] flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:gap-8 xl:gap-10">
      <HeroCopy />
      <div className="relative z-10 min-w-0 px-2 sm:px-4 lg:px-6 xl:px-8">
        <HeroDeviceStatic />
      </div>
    </div>
  );
}

/** Keeps layout while the motion chunk loads — no static tablet flash. */
function HeroMotionPlaceholder() {
  return (
    <div
      className="mx-auto grid w-full max-w-[90rem] flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:gap-8 xl:gap-10"
      aria-hidden
    >
      <div className="min-h-[14rem] sm:min-h-[18rem]" />
      <div className="relative aspect-[16/11] w-full max-h-[36vh] px-2 sm:max-h-[42vh] sm:px-4 lg:max-h-[min(52vh,28rem)] lg:px-6" />
    </div>
  );
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  // Prefetch motion hero so Suspense barely flashes an empty shell.
  useEffect(() => {
    if (!shouldAnimate) return;
    void import("@/components/HeroAnimated");
    // Warm the tablet image decode path before the entrance runs.
    const img = new Image();
    img.decoding = "async";
    img.src = HERO_IMAGES.tablet.src;
  }, [shouldAnimate]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-0 flex-col overflow-x-clip rounded-b-3xl bg-[#01004f] lg:min-h-[min(100svh,56rem)] lg:overflow-visible"
      style={{
        backgroundImage: "linear-gradient(160deg, #0055ff 0%, #01004f 55%)",
      }}
      aria-label="OfficeKit HR — AI-Powered HRMS for India, UAE & GCC Payroll"
    >
      {/* Clip only the background to the rounded hero — devices stay uncropped */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-3xl">
        <OptimizedImage
          src={HERO_IMAGES.heroBg.src}
          srcSet={HERO_IMAGES.heroBg.srcSet}
          sizes={HERO_IMAGES.heroBg.sizes}
          alt=""
          width={HERO_IMAGES.heroBg.width}
          height={HERO_IMAGES.heroBg.height}
          className="h-full w-full object-cover object-center opacity-90"
          priority="high"
          loading="eager"
          decoding="async"
          decorative
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-col justify-start overflow-x-clip px-4 pb-12 pt-[7.5rem] sm:px-6 sm:pb-14 sm:pt-36 md:pt-40 lg:min-h-[min(100svh,56rem)] lg:justify-safe-center lg:overflow-visible lg:px-8 lg:pb-16 lg:pt-40 xl:px-12 xl:pb-20">
        {shouldAnimate ? (
          <Suspense fallback={<HeroMotionPlaceholder />}>
            <HeroAnimated sectionRef={sectionRef} />
          </Suspense>
        ) : (
          <HeroGridStatic />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
