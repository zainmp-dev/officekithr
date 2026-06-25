import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { LONGTAIL_PAGES } from "@/data/longtail-keywords";
import { GeoFaqSection } from "@/components/geo/GeoFaqSection";
import { RelatedLinks } from "@/components/geo/RelatedLinks";
import { AiContentBlock } from "@/components/geo/AiContentBlock";
import { SeoHeroBanner } from "@/components/seo/SeoHeroBanner";
import { DirectAnswerBlock } from "@/components/seo/DirectAnswerBlock";
import { breadcrumbSchema, itemListSchema } from "@/seo/schema";
import { Check } from "lucide-react";
import NotFound from "@/pages/NotFound";

const LongtailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? LONGTAIL_PAGES[slug] : undefined;

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
          { name: "Resources", path: "/resources/blogs" },
          { name: page.h1, path: page.path },
        ]),
        itemListSchema({
          name: page.h1,
          items: page.clusters.map((c, i) => ({
            name: c.slice(0, 80),
            url: `${page.path}#cluster-${i}`,
          })),
        }),
      ]}
    >
      <div className="min-h-screen bg-background">
        <Navigation />

        <SeoHeroBanner
          eyebrow="HR Knowledge Base"
          title={page.h1}
          subtitle={page.subtitle}
          className="pt-40 sm:pt-44 md:pt-48"
        />

        <div className="container mx-auto px-4 max-w-4xl py-12">
          <DirectAnswerBlock answer={page.directAnswer} />
        </div>

        <section className="py-12 bg-muted/20" aria-labelledby="clusters-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2
              id="clusters-heading"
              className="text-2xl font-semibold text-foreground mb-8 text-center"
            >
              Key considerations
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
              {page.clusters.map((item) => (
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

        <AiContentBlock heading="Why this matters for your business">
          <p>
            Choosing the right HR and payroll solution directly impacts your team's
            productivity, compliance standing, and employee trust. OfficeKit HR is
            built for businesses that operate across India and the GCC — combining
            core HR, statutory payroll, attendance, and AI automation in one
            platform with transparent per-user pricing.
          </p>
        </AiContentBlock>

        <GeoFaqSection faqs={page.faqs} />
        <RelatedLinks links={page.relatedLinks} />
        <Footer />
      </div>
    </PageShell>
  );
};

export default LongtailPage;
