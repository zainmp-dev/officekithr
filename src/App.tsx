import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  markHrPopupShown,
  useHrPopupTrigger,
} from "@/hooks/useHrPopupTrigger";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import { BackToTopButton } from "@/components/BackToTopButton";
import GoogleAdsWrapper from "./GoogleAdsWrapper";
import { SeoProvider } from "@/seo/SeoContext";
import { SeoHead } from "@/seo/SeoHead";
import { SkipLink } from "@/components/SkipLink";
import { LegacyRedirect } from "@/components/LegacyRedirect";
import { LEGACY_REDIRECTS } from "@/seo/canonical-paths";
import { MARKETING_PAGES } from "@/data/marketing-pages";
import {
  loadScriptOnce,
  scheduleAfterIdle,
} from "@/lib/performance/third-party";
import { isUaePath } from "@/lib/utils";
// Homepage is the LCP target — keep it in the main bundle so the hero image
// renders without waiting on a Suspense round-trip for a lazy chunk.
import Index from "./pages/Index";

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);
const TooltipProvider = lazy(() =>
  import("@/components/ui/tooltip").then((m) => ({ default: m.TooltipProvider }))
);

const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const RecruitmentManagement = lazy(() => import("./pages/features/RecruitmentManagement"));
const AttendanceAndLeave = lazy(() => import("./pages/features/AttendanceAndLeave"));
const PayrollAndCompliance = lazy(() => import("./pages/features/PayrollAndCompliance"));
const PerformanceAppraisal = lazy(() => import("./pages/features/PerformanceAppraisal"));
const SelfServicePortal = lazy(() => import("./pages/features/SelfServicePortal"));
const ExitManagement = lazy(() => import("./pages/features/ExitManagement"));
const MobileApp = lazy(() => import("./pages/features/MobileApp"));
const Employeemanagment = lazy(() => import("./pages/features/EmployementManagment"));
const OkaiLens = lazy(() => import("./pages/face-lens"));
const Chatbot = lazy(() => import("./pages/AiPilot"));
const Blog = lazy(() => import("./pages/resources/Blog"));
const UseCases = lazy(() => import("./pages/resources/UseCases"));
const Community = lazy(() => import("./pages/resources/Community"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndCondition = lazy(() => import("./pages/TermsandConditions"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Blog1 = lazy(() => import("./pages/Blogpages/HrStrategies"));
const NewPerfomenceBlog = lazy(() => import("./pages/Blogpages/NewPerfomenceBlog"));
const StreamliningPayroll = lazy(() => import("./pages/Blogpages/StreamliningPayroll"));
const MobileAppUpdates = lazy(() => import("./pages/Blogpages/MobileAppUpdates"));
const NavigateHybrid = lazy(() => import("./pages/Blogpages/NavigateHybrid"));
const QualityQuatity = lazy(() => import("./pages/Blogpages/QualityQuatity"));
const WhyHrms = lazy(() => import("./pages/Blogpages/WhyHrms"));
const AIPoweredFeatures = lazy(() => import("./pages/Blogpages/AIPoweredFeatures"));
const HRMSSystem = lazy(() => import("./pages/Blogpages/HRMSSystem"));
const RealWorldDEI = lazy(() => import("./pages/Blogpages/RealWorldDEI"));
const BlogDetail = lazy(() => import("./pages/Blogpages/BlogDetails"));
const UaeLandingpage = lazy(() => import("./UaeLandingPage"));
const SolutionsHub = lazy(() => import("./pages/geo/SolutionsHub"));
const GeoLandingPage = lazy(() => import("./pages/geo/GeoLandingPage"));
const CompareHub = lazy(() => import("./pages/compare/CompareHub"));
const ComparisonPage = lazy(() => import("./pages/compare/ComparisonPage"));
const MarketingLandingPage = lazy(
  () => import("./pages/marketing/MarketingLandingPage")
);
const ComplianceHub = lazy(() => import("./pages/compliance/ComplianceHub"));
const GccComplianceHub = lazy(() => import("./pages/compliance/GccComplianceHub"));
const CompliancePage = lazy(() => import("./pages/compliance/CompliancePage"));
const LongtailHub = lazy(() => import("./pages/longtail/LongtailHub"));
const LongtailPage = lazy(() => import("./pages/longtail/LongtailPage"));
const IndustriesHub = lazy(() => import("./pages/industries/IndustriesHub"));
const IndustryPage = lazy(() => import("./pages/industries/IndustryPage"));
const Customers = lazy(() => import("./pages/Customers"));
const Reviews = lazy(() => import("./pages/Reviews"));
const ToolsHub = lazy(() => import("./pages/tools/ToolsHub"));
const ToolPage = lazy(() => import("./pages/tools/ToolPage"));
const KnowledgeIndex = lazy(() => import("./pages/knowledge/KnowledgePage"));
const KnowledgeSlugPage = lazy(() => import("./pages/knowledge/KnowledgeHub"));
const GuidesHub = lazy(() => import("./pages/guides/GuidesHub"));
const GuidePage = lazy(() => import("./pages/guides/GuidePage"));
const ArticlePostPage = lazy(() => import("./pages/articles/ArticlePostPage"));
const Security = lazy(() => import("./pages/Security"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const HRPopup = lazy(() =>
  import("./components/HRPopup").then((m) => ({ default: m.HRPopup }))
);
const StickyDemoCta = lazy(() =>
  import("@/components/StickyDemoCta").then((m) => ({ default: m.StickyDemoCta }))
);
const CookieConsent = lazy(() =>
  import("@/components/CookieConsent").then((m) => ({ default: m.CookieConsent }))
);
const ReviewPromptBanner = lazy(() =>
  import("@/components/ReviewPromptBanner").then((m) => ({
    default: m.ReviewPromptBanner,
  }))
);

function PageLoader() {
  return (
    <div
      className="min-h-[40vh] flex items-center justify-center text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      Loading…
    </div>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const isUaeRoute = isUaePath(location.pathname);
  const isHome = location.pathname === "/";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openHrPopup = useCallback(() => {
    markHrPopupShown();
    setIsPopupOpen(true);
  }, []);

  useHrPopupTrigger(isHome, isPopupOpen, openHrPopup);

  return (
    <LanguageProvider
      defaultLanguage="en"
      defaultRegion={isUaeRoute ? "uae" : "india"}
    >
      <SkipLink />
      <SeoHead />
      <DeferredChrome isPopupOpen={isPopupOpen} />
      <DeferredAnalytics />
      <DeferredSyncoraTrack />
      <DeferredSupportChat />
      {isPopupOpen && (
        <Suspense fallback={null}>
          <HRPopup onClose={() => setIsPopupOpen(false)} />
        </Suspense>
      )}
      <ScrollToTop />
      <BackToTopButton />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />

          <Route
            path="/features/recruitment-management"
            element={<RecruitmentManagement />}
          />
          <Route
            path="/features/attendance-and-leave"
            element={<AttendanceAndLeave />}
          />
          <Route
            path="/features/payroll-and-compliance"
            element={<PayrollAndCompliance />}
          />
          <Route
            path="/features/performance-appraisal"
            element={<PerformanceAppraisal />}
          />
          <Route
            path="/features/self-service-portal"
            element={<SelfServicePortal />}
          />
          <Route path="/features/exit-management" element={<ExitManagement />} />
          <Route path="/features/mobile-app" element={<MobileApp />} />
          <Route
            path="/features/employee-management"
            element={<Employeemanagment />}
          />
          <Route
            path="/features/employe-managment"
            element={
              <LegacyRedirect to="/features/employee-management" />
            }
          />
          <Route path="/features/face-kit" element={<OkaiLens />} />
          <Route path="/features/ai-pilot" element={<Chatbot />} />

          <Route path="/resources/blogs" element={<Blog />} />
          <Route path="/resources/use-cases" element={<UseCases />} />
          <Route path="/resources/community" element={<Community />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<TermsAndCondition />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="/resources/blogs/hrblogs" element={<Blog1 />} />
          <Route
            path="/resources/blogs/performance-management-tools"
            element={<NewPerfomenceBlog />}
          />
          <Route
            path="/resources/blogs/newperfomenceblog"
            element={
              <LegacyRedirect to="/resources/blogs/performance-management-tools" />
            }
          />
          <Route
            path="/resources/blogs/streamliningpayroll"
            element={<StreamliningPayroll />}
          />
          <Route
            path="/resources/blogs/mobileappupdates"
            element={<MobileAppUpdates />}
          />
          <Route
            path="/resources/blogs/navigatehybrid"
            element={<NavigateHybrid />}
          />
          <Route
            path="/resources/blogs/quality-vs-quantity-hiring"
            element={<QualityQuatity />}
          />
          <Route
            path="/resources/blogs/qualityvsquatity"
            element={
              <LegacyRedirect to="/resources/blogs/quality-vs-quantity-hiring" />
            }
          />
          <Route path="/resources/blogs/whyhrms" element={<WhyHrms />} />
          <Route path="/resources/blogs/aipowered" element={<AIPoweredFeatures />} />
          <Route path="/resources/blogs/hrmssystem" element={<HRMSSystem />} />
          <Route path="/resources/blogs/realworld-dei" element={<RealWorldDEI />} />

          {Object.keys(MARKETING_PAGES).map((slug) => (
            <Route
              key={slug}
              path={`/${slug}`}
              element={<MarketingLandingPage />}
            />
          ))}

          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route
              key={from}
              path={from}
              element={<LegacyRedirect to={to} />}
            />
          ))}

          <Route path="/solutions" element={<SolutionsHub />} />
          <Route path="/solutions/:slug" element={<GeoLandingPage />} />
          <Route path="/compare" element={<CompareHub />} />
          <Route path="/compare/:slug" element={<ComparisonPage />} />

          <Route path="/ae" element={<UaeLandingpage />} />
          <Route path="/uae" element={<LegacyRedirect to="/ae" />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Compliance pages */}
          <Route path="/compliance" element={<ComplianceHub />} />
          <Route path="/gcc-compliance" element={<GccComplianceHub />} />
          <Route path="/compliance/:slug" element={<CompliancePage />} />

          {/* Long-tail keyword pages */}
          <Route path="/resources/guides" element={<LongtailHub />} />
          <Route path="/longtail/:slug" element={<LongtailPage />} />

          {/* Industry vertical pages */}
          <Route path="/industries" element={<IndustriesHub />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/security" element={<Security />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/tools" element={<ToolsHub />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/knowledge" element={<KnowledgeIndex />} />
          <Route path="/knowledge/:slug" element={<KnowledgeSlugPage />} />
          <Route path="/guides" element={<GuidesHub />} />
          <Route path="/guides/:slug" element={<GuidePage />} />
          <Route path="/resources/blogs/:slug" element={<ArticlePostPage />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
};

function DeferredChrome({ isPopupOpen }: { isPopupOpen: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (!cancelled) setReady(true);
    };
    const timeoutId = window.setTimeout(mount, 2500);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(mount, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.clearTimeout(timeoutId);
        window.cancelIdleCallback(idleId);
      };
    }
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      {!isPopupOpen && (
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <StickyDemoCta />
      </Suspense>
      <Suspense fallback={null}>
        <ReviewPromptBanner />
      </Suspense>
    </>
  );
}

function DeferredAnalytics() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const isMobile =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const timeout = isMobile ? 12_000 : 5_000;

    const run = () => setOn(true);

    if (isMobile) {
      const events = ["pointerdown", "keydown", "touchstart"] as const;
      const onInteraction = () => {
        for (const event of events) {
          window.removeEventListener(event, onInteraction);
        }
        run();
      };
      for (const event of events) {
        window.addEventListener(event, onInteraction, { once: true, passive: true });
      }
      const fallback = setTimeout(run, timeout);
      return () => {
        clearTimeout(fallback);
        for (const event of events) {
          window.removeEventListener(event, onInteraction);
        }
      };
    }

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, timeout);
    return () => clearTimeout(t);
  }, []);
  return on ? <GoogleAdsWrapper /> : null;
}

function DeferredSupportChat() {
  useEffect(() => {
    const cancel = scheduleAfterIdle(
      () => {
        void loadScriptOnce({
          id: "askmybot-widget",
          src: "https://www.askmybot.ai/p/officekit-hr-qa84/widget.js",
          defer: true,
          async: true,
        }).catch(() => {
          // Keep UX stable if the third-party endpoint is unavailable.
        });
      },
      {
        timeout: 12_000,
        mobileInteractionOnly: true,
      }
    );

    return cancel;
  }, []);

  return null;
}

function DeferredSyncoraTrack() {
  useEffect(() => {
    const cancel = scheduleAfterIdle(
      () => {
        void loadScriptOnce({
          id: "syncora-track",
          src: "https://app.syncoraai.com/api/widget/track/PUB_2d854a99-8f50-4e7f-886f-d39a21019e18",
          defer: true,
        }).catch(() => {});
      },
      { timeout: 10_000, mobileInteractionOnly: true }
    );
    return cancel;
  }, []);

  return null;
}

function DeferredUiEnhancements() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const cancel = scheduleAfterIdle(
      () => setEnabled(true),
      { timeout: 8_000, mobileInteractionOnly: true }
    );
    return cancel;
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <TooltipProvider>
        <Toaster />
      </TooltipProvider>
    </Suspense>
  );
}

const App = () => (
  <>
    <DeferredUiEnhancements />
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <SeoProvider>
        <AppRoutes />
      </SeoProvider>
    </BrowserRouter>
  </>
);

export default App;
