import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { SITE_ANNOUNCEMENT } from "@/data/site-announcement";
import { safeSessionGet, safeSessionSet } from "@/lib/safe-storage";
import { useMemo, useState } from "react";

type AnnouncementBarProps = {
  visible: boolean;
  onDismiss: () => void;
};

function LiveBlinkIcon() {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-live-ring rounded-full bg-red-500" />
      <span className="relative inline-flex h-2 w-2 animate-live-pulse rounded-full bg-red-500" />
    </span>
  );
}

function AnnouncementBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-400/40 bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-red-300 sm:text-xs">
      <LiveBlinkIcon />
      {SITE_ANNOUNCEMENT.badge}
    </span>
  );
}

function MarqueeTicker({ text }: { text: string }) {
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <p className="hidden truncate px-2 text-xs text-slate-300/95 motion-reduce:block sm:text-[13px]">
        {text}
      </p>
      <div
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:hidden"
        aria-hidden
      >
        <div className="group flex w-max animate-announcement-marquee hover:[animation-play-state:paused]">
          <p className="whitespace-nowrap px-6 text-xs text-slate-300/95 sm:text-[13px]">
            {text}
          </p>
          <p className="whitespace-nowrap px-6 text-xs text-slate-300/95 sm:text-[13px]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export function useAnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    if (!SITE_ANNOUNCEMENT.enabled) return false;
    return !safeSessionGet(SITE_ANNOUNCEMENT.storageKey);
  });

  const dismiss = () => {
    safeSessionSet(SITE_ANNOUNCEMENT.storageKey, "1");
    setVisible(false);
  };

  return { visible, dismiss };
}

export function AnnouncementBar({ visible, onDismiss }: AnnouncementBarProps) {
  const tickerText = useMemo(
    () => SITE_ANNOUNCEMENT.messages.join("   ·   "),
    [],
  );

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Product announcement"
      className="fixed inset-x-0 top-0 z-[60] h-10 border-b border-white/[0.06] bg-[#0a1020]/95 backdrop-blur-md"
    >
      <p className="sr-only">{tickerText}</p>

      <div className="mx-auto flex h-full max-w-7xl items-center gap-2.5 pl-3 pr-10 sm:gap-4 sm:pl-4 sm:pr-12">
        <AnnouncementBadge />

        <MarqueeTicker text={tickerText} />

        <Link
          to={SITE_ANNOUNCEMENT.href}
          className="hidden shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-sky-100 transition-colors hover:border-sky-400/30 hover:bg-sky-500/10 hover:text-white sm:inline-flex sm:text-xs"
        >
          {SITE_ANNOUNCEMENT.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>

        <Link
          to={SITE_ANNOUNCEMENT.href}
          className="inline-flex shrink-0 items-center text-sky-300 transition-colors hover:text-white sm:hidden"
          aria-label={SITE_ANNOUNCEMENT.ctaLabel}
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>

        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/** Sync nav offset when announcement is toggled from site config only. */
export function useAnnouncementNavOffset() {
  const { visible, dismiss } = useAnnouncementBar();
  return { announcementVisible: visible, dismissAnnouncement: dismiss };
}
