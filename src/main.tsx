import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Always start at the top — browser scroll restoration can leave the hero mid-swap.
if (typeof window !== "undefined") {
  try {
    window.history.scrollRestoration = "manual";
  } catch {
    /* ignore */
  }
  window.scrollTo(0, 0);
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

function hideHeroLcpPlaceholder(): void {
  document
    .querySelector<HTMLElement>(".hero-lcp-placeholder")
    ?.classList.add("is-hidden");
}

// Drop static LCP skeleton as soon as React has painted — banner first, then hero motion.
requestAnimationFrame(() => {
  hideHeroLcpPlaceholder();
});
