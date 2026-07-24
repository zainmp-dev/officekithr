import { lazy, Suspense } from "react";
import { HomePageSchema } from "@/components/HomePageSchema";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustedCompanies from "@/components/TrustedCompanies";
import { DeferredMount } from "@/components/DeferredMount";
import { HR_POPUP_SENTINEL_ID } from "@/hooks/useHrPopupTrigger";
import { LazyMotionBoundary } from "@/components/motion/LazyMotionBoundary";

const WhyOfficeKit = lazy(() => import("@/components/WhyOfficeKit"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const IndustrySolutions = lazy(() => import("@/components/IndustrySolutions"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const TrustBadges = lazy(() =>
  import("@/components/TrustBadges").then((m) => ({ default: m.TrustBadges }))
);
const MobileApp = lazy(() => import("@/components/MobileApp"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FinalCtaSection = lazy(() => import("@/components/FinalCtaSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-14 lg:pb-0">
      <HomePageSchema />
      <Navigation />
      <main id="main-content">
        {/* LCP-critical — no motion bundle */}
        <HeroSection />
        <div
          id={HR_POPUP_SENTINEL_ID}
          className="h-px w-full shrink-0 pointer-events-none"
          aria-hidden
        />
        <TrustedCompanies />

        {/* Below-fold — lazy motion + lazy sections */}
        <LazyMotionBoundary>
          <Suspense fallback={null}>
            <WhyOfficeKit />
          </Suspense>
          <Suspense fallback={null}>
            <FeaturesSection />
          </Suspense>
          <Suspense fallback={null}>
            <IndustrySolutions />
          </Suspense>
          <Suspense fallback={null}>
            <FAQSection />
          </Suspense>
        </LazyMotionBoundary>

        <DeferredMount minHeight="120px">
          <Suspense fallback={null}>
            <div className="py-8">
              <TrustBadges />
            </div>
          </Suspense>
        </DeferredMount>

        <DeferredMount minHeight="320px">
          <Suspense fallback={null}>
            <MobileApp />
          </Suspense>
        </DeferredMount>

        <DeferredMount minHeight="200px">
          <LazyMotionBoundary>
            <Suspense fallback={null}>
              <TestimonialsSection />
            </Suspense>
          </LazyMotionBoundary>
        </DeferredMount>

        <DeferredMount minHeight="240px">
          <Suspense fallback={null}>
            <FinalCtaSection />
          </Suspense>
        </DeferredMount>
      </main>

      <DeferredMount minHeight="200px">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </DeferredMount>
    </div>
  );
};

export default Index;
