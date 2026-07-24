import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import { initEngagementSignals, resetEngagementSignals } from "@/lib/engagement";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    trackPageView(pathname);

    // GA4 only counts scroll/time/active-user events once per listener lifetime.
    // On SPA route changes, tear listeners down and re-arm them so the new page
    // gets its own engagement signals. Skip on first render — analytics.ts
    // initialises signals after requestIdleCallback to protect LCP.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resetEngagementSignals();
    initEngagementSignals();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
