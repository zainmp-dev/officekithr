import { HERO_IMAGES } from "@/lib/seo/assets";
import { imgFetchPriority } from "@/lib/img-props";

/** Static fallback — new transparent tablet mockup (angle baked into asset). */
export function HeroDeviceStatic() {
  return (
    <div className="relative flex w-full max-w-full items-center justify-center overflow-x-clip px-1 pb-2 pt-1 sm:px-2 sm:pb-4 lg:justify-end lg:overflow-visible lg:px-3 lg:pb-6 lg:pr-4 xl:pr-6">
      <div className="w-full max-w-[min(100%,20rem)] sm:max-w-[min(100%,26rem)] lg:max-w-none lg:w-[108%] xl:w-[115%]">
        <img
          src={HERO_IMAGES.tablet.src}
          srcSet={HERO_IMAGES.tablet.srcSet}
          sizes="(max-width: 640px) 88vw, (max-width: 1023px) 26rem, (min-width: 1280px) 680px, 520px"
          alt={HERO_IMAGES.tablet.alt}
          width={HERO_IMAGES.tablet.width}
          height={HERO_IMAGES.tablet.height}
          className="mx-auto h-auto max-h-[min(36vh,20rem)] w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:max-h-[min(42vh,24rem)] lg:max-h-[min(52vh,28rem)] xl:max-h-[min(56vh,32rem)]"
          {...imgFetchPriority("high")}
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}
