import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { INDUSTRY_PAGES } from "@/data/industry-verticals";
import { GeoFaqSection } from "@/components/geo/GeoFaqSection";
import { AiFactGrid } from "@/components/geo/AiContentBlock";
import { RelatedLinks } from "@/components/geo/RelatedLinks";
import { SeoHeroBanner } from "@/components/seo/SeoHeroBanner";
import { SeoBreadcrumb } from "@/components/seo/SeoBreadcrumb";
import { DirectAnswerBlock } from "@/components/seo/DirectAnswerBlock";
import { breadcrumbSchema } from "@/seo/schema";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, AlertTriangle } from "lucide-react";
import NotFound from "@/pages/NotFound";

const IndustryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? INDUSTRY_PAGES[slug] : undefined;

  if (!page) return <NotFound />;

  return (
    <PageShell
      title={page.title}
      description={page.metaDescription}
      path={page.path}
      faqs={page.faqs}
      schemaNodes={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: page.h1, path: page.path },
        ]),
      ]}
    >
      <div className="min-h-screen bg-background">
        <Navigation />

        <SeoHeroBanner
          eyebrow="OfficeKit HR Industry Solutions"
          title={page.h1}
          subtitle={page.subtitle}
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

        <div className="container mx-auto px-4 max-w-4xl py-6">
          <SeoBreadcrumb
            items={[
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: page.h1, path: page.path },
            ]}
          />
        </div>

        <div className="container mx-auto px-4 max-w-4xl pb-12 md:pb-16">
          <DirectAnswerBlock answer={page.directAnswer} definition={page.definition} />
        </div>

        {page.highlights.length > 0 && (
          <section className="py-12 bg-muted/20" aria-labelledby="highlights-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2
                id="highlights-heading"
                className="text-2xl font-semibold text-foreground mb-8 text-center"
              >
                Why teams choose OfficeKit HR
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
                {page.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 items-start text-muted-foreground rounded-lg border bg-card p-4"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {page.sections.length > 0 && (
          <section className="py-12 bg-background" aria-labelledby="industry-detail-heading">
            <div className="container mx-auto px-4 max-w-4xl space-y-10">
              <h2 id="industry-detail-heading" className="sr-only">
                Industry overview
              </h2>
              {page.sections.map((section) => (
                <article key={section.heading}>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {section.heading}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="py-16 bg-muted/20" aria-labelledby="challenges-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2
              id="challenges-heading"
              className="text-2xl font-semibold text-foreground mb-8 text-center"
            >
              Industry challenges
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
              {page.challenges.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 items-start text-muted-foreground rounded-lg border bg-card p-4"
                >
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {page.features.length > 0 && (
          <section className="py-16 bg-background" aria-labelledby="features-heading">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2
                id="features-heading"
                className="text-2xl font-semibold text-foreground mb-8 text-center"
              >
                Key features for your industry
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {page.features.map((feature) => (
                  <div key={feature.title} className="rounded-xl border bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 bg-muted/20" aria-labelledby="facts-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="facts-heading" className="sr-only">
              Key facts
            </h2>
            <AiFactGrid facts={page.facts} />
          </div>
        </section>

        <section className="py-16 bg-background" aria-labelledby="capabilities-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2
              id="capabilities-heading"
              className="text-2xl font-semibold text-foreground mb-8 text-center"
            >
              How OfficeKit HR helps
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
              {page.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 items-start text-muted-foreground rounded-lg border bg-card p-4"
                >
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {page.compliancePoints.length > 0 && (
          <section className="py-12 bg-muted/20" aria-labelledby="compliance-heading">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2
                id="compliance-heading"
                className="text-2xl font-semibold text-foreground mb-6"
              >
                Compliance & payroll coverage
              </h2>
              <ul className="flex flex-wrap justify-center gap-2 list-none p-0 m-0">
                {page.compliancePoints.map((point) => (
                  <li
                    key={point}
                    className="px-3 py-1.5 rounded-full bg-card border text-sm font-medium text-foreground"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Button asChild className="btn-cta h-11 group">
              <Link to="/contact">
                Book a free demo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>

        <GeoFaqSection faqs={page.faqs} />
        <RelatedLinks links={page.relatedLinks} heading="Related guides & solutions" />
        <Footer />
      </div>
    </PageShell>
  );
};

export default IndustryPage;
