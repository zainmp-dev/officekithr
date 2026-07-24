import type { ReactNode } from "react";
import { SEO_ASSETS } from "@/lib/seo/assets";
import { cn } from "@/lib/utils";

type SeoHeroBannerProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  backgroundImage?: string;
  centered?: boolean;
  titleId?: string;
  overlayClassName?: string;
  className?: string;
};

/** Full-width hero with background image and readable overlay (matches feature pages). */
export function SeoHeroBanner({
  eyebrow,
  title,
  subtitle,
  children,
  backgroundImage = SEO_ASSETS.sectionBg,
  centered = true,
  titleId,
  overlayClassName = "from-background/92 via-background/88 to-background/96",
  className = "",
}: SeoHeroBannerProps) {
  const align = centered ? "text-center" : "";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cover bg-center pt-28 pb-12 sm:pt-32 sm:pb-16 md:pb-20",
        className
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${overlayClassName}`}
        aria-hidden
      />
      <div className={`relative container mx-auto px-4 max-w-4xl ${align}`}>
        {eyebrow && (
          <p className="text-sm font-medium text-primary mb-3">{eyebrow}</p>
        )}
        <h1
          id={titleId}
          className={cn(
            "mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl",
            centered ? "mx-auto max-w-4xl" : "max-w-3xl"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl",
              centered ? "mx-auto max-w-3xl" : "max-w-3xl"
            )}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div
            className={cn(
              "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4",
              centered && "items-stretch justify-center sm:items-center"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
