import React from "react";
import { TestimonialMarquee } from "@/components/motion/TestimonialMarquee";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { HOME_TRUSTED } from "@/data/home-page-content";

const LOGOS = [
  "/company-logos/abreco.webp",
  "/company-logos/aerovative.webp",
  "/company-logos/anjuman.webp",
  "/company-logos/beyond.webp",
  "/company-logos/bigwing.webp",
  "/company-logos/bosq.webp",
  "/company-logos/chavara.webp",
  "/company-logos/clikon.webp",
  "/company-logos/clubsulaimani.webp",
  "/company-logos/crowe.webp",
  "/company-logos/empire.webp",
  "/company-logos/kvn.webp",
  "/company-logos/landmark.webp",
  "/company-logos/lulu.webp",
  "/company-logos/midac.webp",
  "/company-logos/mist.webp",
  "/company-logos/popees.webp",
  "/company-logos/pride.webp",
  "/company-logos/rsspectra.webp",
  "/company-logos/safa.webp",
  "/company-logos/seablueshipyard.webp",
  "/company-logos/skyworth.webp",
  "/company-logos/sreelakshmi.webp",
  "/company-logos/tablez.webp",
  "/company-logos/techfair.webp",
  "/company-logos/thai.webp",
  "/company-logos/thawfeeq.webp",
  "/company-logos/weddingmall.webp",
  "/company-logos/yesbharath.webp",
] as const;

const ROW_SIZE = Math.ceil(LOGOS.length / 3);
const ROWS = [
  LOGOS.slice(0, ROW_SIZE),
  LOGOS.slice(ROW_SIZE, ROW_SIZE * 2),
  LOGOS.slice(ROW_SIZE * 2),
] as const;

const ROW_CONFIG = [
  { duration: 58, reverse: false },
  { duration: 64, reverse: true },
  { duration: 52, reverse: false },
] as const;

type LogoItemProps = {
  src: string;
  label: string;
  priority?: boolean;
};

const LogoItem = ({ src, label, priority = false }: LogoItemProps) => (
  <div className="flex h-14 w-full shrink-0 items-center justify-center sm:h-16 sm:w-[8.5rem] md:h-[4.5rem] md:w-40 lg:h-20 lg:w-44">
    <PartnerLogo
      src={src}
      label={label}
      loading={priority ? "eager" : "lazy"}
      className="max-h-full max-w-[88%]"
    />
  </div>
);

const LogoRow = ({
  logos,
  duration,
  reverse,
  rowIndex,
}: {
  logos: readonly string[];
  duration: number;
  reverse: boolean;
  rowIndex: number;
}) => (
  <TestimonialMarquee
    seamless
    reverse={reverse}
    duration={duration}
    className="mb-4 sm:mb-5 last:mb-0"
    groupClassName="items-center gap-8 sm:gap-10 md:gap-12"
  >
    {logos.map((src, i) => (
      <LogoItem
        key={`r${rowIndex}-${src}`}
        src={src}
        label={`Partner logo ${rowIndex * ROW_SIZE + i + 1}`}
        priority={rowIndex === 0 && i < 4}
      />
    ))}
  </TestimonialMarquee>
);

const TrustedCompaniesShowcase = () => {
  return (
    <section
      className="relative min-h-[17rem] overflow-hidden bg-background py-12 sm:min-h-[19rem] lg:min-h-[21rem] lg:py-16"
      aria-labelledby="trusted-companies-heading"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mb-8 text-center lg:mb-10">
          <p className="mb-2 text-sm font-medium text-[#1d4ed8] sm:text-base">
            {HOME_TRUSTED.heading}
          </p>
          <h2
            id="trusted-companies-heading"
            className="text-lg font-semibold text-foreground sm:text-xl lg:text-2xl"
          >
            {HOME_TRUSTED.logoHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {HOME_TRUSTED.logoSubheading}
          </p>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {HOME_TRUSTED.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-5"
              >
                <p className="text-2xl font-semibold text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-background via-background/80 to-transparent sm:block sm:w-16 md:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-10 bg-gradient-to-l from-background via-background/80 to-transparent sm:block sm:w-16 md:w-24"
          aria-hidden
        />

        {/* Compact logo grid on small screens — avoids 3 wrapped marquee rows */}
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 px-4 sm:hidden">
          {LOGOS.slice(0, 9).map((src, i) => (
            <LogoItem
              key={`m-${src}`}
              src={src}
              label={`Partner logo ${i + 1}`}
              priority={i < 3}
            />
          ))}
        </div>

        <div className="hidden sm:block">
          {ROWS.map((logos, i) => (
            <LogoRow
              key={i}
              logos={logos}
              rowIndex={i}
              duration={ROW_CONFIG[i].duration}
              reverse={ROW_CONFIG[i].reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompaniesShowcase;
