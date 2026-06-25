import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COOKIE_CONSENT_EVENT, getConsent, setConsent } from "@/lib/consent";
import { loadAnalytics } from "@/lib/analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing === "accepted") {
      const schedule =
        "requestIdleCallback" in window
          ? () =>
              window.requestIdleCallback(() => loadAnalytics(), {
                timeout: 5000,
              })
          : () => window.setTimeout(loadAnalytics, 3000);
      schedule();
      return;
    }
    if (existing === "rejected") return;
    setVisible(true);
  }, []);

  const accept = () => {
    setConsent("accepted");
    loadAnalytics();
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT));
    setVisible(false);
  };

  const reject = () => {
    setConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed left-0 right-0 z-[200] p-3 sm:p-4 md:p-6 bottom-[max(4.5rem,env(safe-area-inset-bottom))] sm:bottom-0 sm:pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-lg sm:gap-4 sm:p-5 md:flex-row md:items-center md:p-6">
        <div className="min-w-0 flex-1">
          <p id="cookie-consent-title" className="text-sm font-semibold text-foreground sm:text-base">
            Cookie preferences
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm"
          >
            We use cookies for analytics and ads to improve our site. See our{" "}
            <Link to="/cookie-policy" className="text-primary underline">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={reject}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted sm:w-auto sm:py-2"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={accept}
            className="w-full rounded-lg bg-[#0055ff] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0044cc] sm:w-auto sm:py-2"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
