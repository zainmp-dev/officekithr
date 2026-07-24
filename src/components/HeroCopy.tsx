import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Check,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { HOME_HERO } from "@/data/home-page-content";
import { cn } from "@/lib/utils";

type HeroCopyProps = {
  className?: string;
};

const STAT_ICONS = {
  building: Building2,
  users: Users,
  shield: ShieldCheck,
} as const;

/**
 * Homepage hero copy — full white type, clear hierarchy, geo-aligned messaging.
 */
export function HeroCopy({ className }: HeroCopyProps) {
  return (
    <div
      className={cn(
        "relative z-20 flex w-full max-w-xl flex-col items-start text-left lg:max-w-[38rem]",
        className
      )}
    >
      <h1 className="text-[1.75rem] font-bold leading-[1.18] tracking-tight text-white min-[375px]:text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.25rem] xl:text-[2.75rem] 2xl:text-[3rem]">
        {HOME_HERO.titleLines.map((line) => (
          <span key={line} className="block text-white">
            {line}
          </span>
        ))}
      </h1>

      <div
        className="mt-4 h-1 w-14 rounded-full bg-white/90 sm:mt-5 sm:w-16"
        aria-hidden
      />

      <p className="mt-4 max-w-lg text-[0.8125rem] font-normal leading-relaxed text-white sm:mt-5 sm:text-sm md:text-[0.9375rem]">
        {HOME_HERO.subtitleParagraphs[0]}
      </p>

      <ul className="mt-5 flex w-full list-none flex-col gap-2.5 p-0 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
        {HOME_HERO.highlights.map((item, index) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-2 text-sm font-medium text-white sm:px-3",
              index > 0 && "sm:border-l sm:border-white/30",
              index === 0 && "sm:pl-0"
            )}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40">
              <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid w-full grid-cols-1 gap-2.5 min-[420px]:grid-cols-3 sm:mt-7 sm:gap-3">
        {HOME_HERO.stats.map((stat) => {
          const Icon = STAT_ICONS[stat.icon];
          return (
            <div
              key={stat.label}
              className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 sm:px-3.5 sm:py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                <Icon className="h-4 w-4 text-white" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-base font-bold leading-none text-white sm:text-lg">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/85 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
        <Button
          asChild
          className="h-11 w-full bg-white px-6 text-sm font-semibold text-[#0055ff] shadow-lg shadow-black/10 hover:bg-white/95 !rounded-xl sm:w-auto"
        >
          <Link to={HOME_HERO.primaryCta.href}>
            {HOME_HERO.primaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 w-full border-white/60 bg-transparent px-6 text-sm font-medium text-white hover:border-white hover:bg-white/10 !rounded-xl sm:w-auto"
        >
          <Link to={HOME_HERO.secondaryCta.href}>
            {HOME_HERO.secondaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}
