import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { TESTIMONIALS } from "@/data/testimonials-data";
import { breadcrumbSchema, reviewSchema } from "@/seo/schema";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Star } from "lucide-react";

const REVIEWS_FAQS = [
  {
    question: "Where can I read OfficeKit HR reviews?",
    answer:
      "This page lists verified customer testimonials from HR leaders using OfficeKit HR. Third-party reviews on G2 and Capterra are linked below when available.",
  },
  {
    question: "How do I leave a review for OfficeKit HR?",
    answer:
      "Contact hello@officekithr.com if you are an existing customer and would like to share feedback. We also welcome reviews on G2 and Capterra after your implementation is live.",
  },
] as const;

/** On-site testimonials only — do not inflate counts with unverified third-party totals. */
const ON_SITE_REVIEWS = TESTIMONIALS.map((t) => ({
  author: t.name,
  reviewBody: t.quote,
  ratingValue: String(t.rating),
  publisher: t.company,
}));

const Reviews = () => (
  <PageShell
    title="OfficeKit HR Reviews & Customer Testimonials"
    description="Read what HR leaders at Lulu International Exchange, Thai Group, Midac Electronics, and other companies say about OfficeKit HR for India and GCC payroll."
    path="/reviews"
    faqs={[...REVIEWS_FAQS]}
    schemaNodes={[
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Reviews", path: "/reviews" },
      ]),
      reviewSchema({
        aggregateRating: {
          ratingValue: "5",
          reviewCount: String(ON_SITE_REVIEWS.length),
          bestRating: "5",
          worstRating: "1",
        },
        reviews: ON_SITE_REVIEWS,
      }),
    ]}
  >
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-36 pb-12 md:pt-44 bg-gradient-subtle">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            OfficeKit HR reviews
          </h1>
          <p className="text-lg text-muted-foreground direct-answer">
            Customer testimonials from HR teams using OfficeKit HR for payroll,
            attendance, and compliance across India and the GCC.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl grid gap-6">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl border border-border bg-card p-6 md:p-8"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="text-sm">
                <cite className="font-semibold text-foreground not-italic">
                  {t.name}
                </cite>
                <span className="text-muted-foreground">
                  {" "}
                  — {t.role}, {t.company}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Third-party review platforms
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Read verified reviews from HR professionals on leading software review platforms.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="outline" className="rounded-full">
              <a
                href="https://www.g2.com/products/officekit-hr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                G2 reviews
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a
                href="https://www.capterra.com/p/officekit-hr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Capterra reviews
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </Button>
            <Button asChild className="rounded-full bg-[#0055ff]">
              <Link to="/customers">
                Customer success stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="page-faq-heading" className="text-2xl font-semibold text-center mb-8">
            Review FAQs
          </h2>
          <dl className="space-y-4">
            {REVIEWS_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border p-5">
                <dt className="font-semibold text-foreground">{faq.question}</dt>
                <dd className="mt-2 text-sm text-muted-foreground geo-faq-answer">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Footer />
    </div>
  </PageShell>
);

export default Reviews;
