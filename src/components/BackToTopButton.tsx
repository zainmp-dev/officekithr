import { useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 400;

/**
 * Floating back-to-top control. Visibility is driven via data-visible on the
 * button node (no React state on scroll) to avoid re-renders while scrolling.
 */
export function BackToTopButton() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    let ticking = false;

    const syncVisibility = () => {
      const show = window.scrollY > SCROLL_THRESHOLD;
      const visible = btn.dataset.visible === "true";
      if (show === visible) {
        ticking = false;
        return;
      }
      if (!show && document.activeElement === btn) {
        btn.blur();
      }
      btn.dataset.visible = show ? "true" : "false";
      btn.tabIndex = show ? 0 : -1;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    syncVisibility();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      data-visible="false"
      tabIndex={-1}
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-5 z-[9990] flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-background/95 text-primary shadow-lg backdrop-blur-sm transition-[opacity,transform] duration-300 ease-out opacity-0 pointer-events-none translate-y-2 data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto data-[visible=true]:translate-y-0 hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:bottom-6 lg:left-6"
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
