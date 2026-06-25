import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { SeoHeroBanner } from "@/components/seo/SeoHeroBanner";
import { DirectAnswerBlock } from "@/components/seo/DirectAnswerBlock";
import { GeoFaqSection } from "@/components/geo/GeoFaqSection";
import { RelatedLinks } from "@/components/geo/RelatedLinks";
import { GEO_INTERNAL_LINKS } from "@/data/geo-links";
import { INDUSTRY_PAGES } from "@/data/industry-verticals";
import { breadcrumbSchema } from "@/seo/schema";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HUB_FAQS = [
  {
    question: "Does OfficeKit HR support industry-specific payroll compliance?",
    answer:
      "Yes. OfficeKit HR handles India statutory payroll (PF, ESI, PT, TDS) and GCC compliance (UAE WPS, KSA GOSI, Kuwait PIFSS) with industry-specific shift, incentive, and workforce policies for retail, healthcare, fintech, manufacturing, and more.",
  },
  {
    question: "Can one HRMS cover multiple industries in a group company?",
    answer:
      "Yes. Organisational units can be configured per business line or subsidiary with independent attendance and payroll rules while consolidating reporting at the group level.",
  },
  {
    question: "Which industries does OfficeKit HR serve?",
    answer:
      "OfficeKit HR serves fintech, healthcare, IT services, retail, hospitality, manufacturing, education, logistics, real estate, and banking & BFSI — with dedicated industry pages for each vertical.",
  },
];

const industryPages = Object.values(INDUSTRY_PAGES);

const IndustriesHub = () => (
  <PageShell
    title="HRMS by Industry | Fintech, Healthcare, Retail & More — OfficeKit HR"
    description="Industry-specific HRMS for fintech, healthcare, IT, retail, hospitality, manufacturing, education, logistics, real estate, and BFSI. India and GCC payroll compliance."
    path="/industries"
    faqs={HUB_FAQS}
    schemaNodes={[
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
      ]),
    ]}
  >
    <div className="min-h-screen bg-background">
      <Navigation />

      <SeoHeroBanner
        eyebrow="Industry solutions"
        title="HRMS built for your industry"
        subtitle="Purpose-built workforce management for fintech, healthcare, IT, retail, and more — with India and GCC statutory payroll."
        className="pt-40 sm:pt-44 md:pt-48"
      >
        <Button asChild className="btn-cta h-11 group">
          <Link to="/contact">
            Book a demo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-11">
          <Link to="/pricing">View pricing</Link>
        </Button>
      </SeoHeroBanner>

      <main className="container mx-auto px-4 max-w-5xl py-12 md:py-16">
        <DirectAnswerBlock
          answer="OfficeKit HR provides industry-specific HRMS solutions for fintech, healthcare, IT services, retail, hospitality, manufacturing, education, logistics, real estate, and BFSI — with shift management, variable pay, statutory payroll for India (PF, ESI, PT, TDS), and GCC compliance (WPS, GOSI, PIFSS) tailored to each sector's workforce needs."
          definition={{
            term: "Industry HRMS",
            meaning:
              "A human resource management system configured for the specific workforce patterns, compliance requirements, and payroll structures of a particular business sector.",
          }}
        />

        <ul className="mt-12 grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {industryPages.map((page) => (
            <li key={page.slug}>
              <Link
                to={page.path}
                className="block h-full rounded-xl border border-border p-6 hover:bg-muted/50 transition-colors bg-card group"
              >
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {page.h1}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">{page.subtitle}</p>
                {page.highlights.length > 0 && (
                  <ul className="text-xs text-muted-foreground space-y-1 mb-4 list-disc pl-4">
                    {page.highlights.slice(0, 2).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <GeoFaqSection faqs={HUB_FAQS} />
      <RelatedLinks
        links={[
          GEO_INTERNAL_LINKS.hrmsIndia,
          GEO_INTERNAL_LINKS.payrollUae,
          GEO_INTERNAL_LINKS.gccCompliance,
          GEO_INTERNAL_LINKS.hrDubai,
        ]}
        heading="Regional HRMS guides"
      />
      <Footer />
    </div>
  </PageShell>
);

export default IndustriesHub;
