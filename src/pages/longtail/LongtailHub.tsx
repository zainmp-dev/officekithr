import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { SeoHeroBanner } from "@/components/seo/SeoHeroBanner";
import { DirectAnswerBlock } from "@/components/seo/DirectAnswerBlock";
import { LONGTAIL_PAGES } from "@/data/longtail-keywords";
import { ArrowRight } from "lucide-react";

const LongtailHub = () => (
  <PageShell
    title="HR Knowledge Base & Guides | OfficeKit HR"
    description="In-depth guides on HRMS, payroll, compliance, and HR automation for India and GCC businesses. OfficeKit HR knowledge base."
    path="/resources/guides"
  >
    <div className="min-h-screen bg-background">
      <Navigation />

      <SeoHeroBanner
        eyebrow="HR Knowledge Base"
        title="HR & payroll guides"
        subtitle="Practical guides for HR leaders evaluating HRMS, payroll software, and compliance solutions."
        className="pt-40 sm:pt-44 md:pt-48"
      />

      <main className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <DirectAnswerBlock
          answer="OfficeKit HR knowledge base covers HRMS selection, payroll compliance, HR automation, and employee experience topics — written for decision-makers at growing companies in India and the GCC."
          definition={{
            term: "HR knowledge base",
            meaning:
              "Curated collection of factual guides and comparison content designed to help HR leaders evaluate software, navigate compliance, and implement best practices.",
          }}
        />

        <ul className="mt-12 space-y-4 list-none p-0">
          {Object.values(LONGTAIL_PAGES).map((page) => (
            <li key={page.path}>
              <Link
                to={page.path}
                className="block rounded-xl border border-border p-6 hover:bg-muted/50 transition-colors bg-card"
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {page.h1}
                </h2>
                <p className="text-muted-foreground line-clamp-2">{page.subtitle}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary mt-3">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  </PageShell>
);

export default LongtailHub;
