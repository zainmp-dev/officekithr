import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FeaturePageLayout } from "@/components/seo/FeaturePageLayout";
import { FeatureSeoIntro } from "@/components/seo/FeatureSeoIntro";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { ModuleContent } from "@/data/modules/types";
import { ArrowRight, Check, Play } from "lucide-react";
import { Link } from "react-router-dom";

type ModuleLandingPageProps = {
  content: ModuleContent;
};

export function ModuleLandingPage({ content }: ModuleLandingPageProps) {
  const {
    path,
    productName,
    breadcrumbLabel,
    hero,
    intro,
    features,
    whyChoose,
    benefits,
    faqs,
    cta,
  } = content;

  return (
    <FeaturePageLayout
      path={path}
      productName={productName}
      breadcrumbLabel={breadcrumbLabel}
      faqs={faqs}
    >
      <div className="min-h-screen bg-background">
        <Navigation />
        <main id="main-content">
          {/* Hero */}
          <section
            className="pt-36 sm:pt-40 pb-16 sm:pb-20 bg-gradient-subtle bg-cover bg-center"
            style={{ backgroundImage: "url('/RecruitmentManagement2.jpg')" }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {hero.eyebrow ? (
                  <p className="text-sm sm:text-base font-medium text-primary mb-3">
                    {hero.eyebrow}
                  </p>
                ) : null}
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6"
                  style={{ lineHeight: 1.2 }}
                >
                  {hero.title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-4 leading-relaxed max-w-3xl mx-auto">
                  {hero.subtitle}
                </p>
                {hero.tagline ? (
                  <p className="text-base sm:text-lg font-semibold text-foreground mb-8">
                    {hero.tagline}
                  </p>
                ) : (
                  <div className="mb-8" />
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="btn-cta h-11 px-6 group">
                    <Link to="/contact">
                      {hero.primaryCta ?? "Book a Free Demo"}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="btn-outline group h-11 px-6"
                  >
                    <Link to="/contact">
                      <Play className="mr-2 h-4 w-4" />
                      {hero.secondaryCta ?? "Talk to Our Experts"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <FeatureSeoIntro path={path} />

          {/* Intro */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6">
                {intro.title}
              </h2>
              <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                {intro.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 sm:py-20 bg-[#f4f7fa]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                  {features.title}
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {features.subtitle}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
                {features.items.map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-2xl bg-white border border-[#ededed] p-6 sm:p-8"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3 w-3 text-primary" />
                          </span>
                          <span className="text-sm sm:text-base text-hr-text-secondary">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Why choose */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                  {whyChoose.title}
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {whyChoose.subtitle}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {whyChoose.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#ededed] bg-white p-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits icon cards */}
          <section className="py-16 sm:py-20 bg-[#f4f7fa]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                <Badge className="bg-white font-normal py-2 px-4 text-[#1d4ed8] mb-4 border border-[#ededed] hover:bg-transparent">
                  Key Benefits
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                  {benefits.title}
                </h2>
                {benefits.subtitle ? (
                  <p className="text-muted-foreground text-base sm:text-lg">
                    {benefits.subtitle}
                  </p>
                ) : null}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {benefits.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white border border-[#ededed] p-6 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary text-lg font-bold">
                      {item.title.charAt(0)}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-10 text-center">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-base sm:text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0055ff] to-[#01004f] text-white">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                {cta.title}
              </h2>
              <div className="space-y-4 text-white/90 text-base sm:text-lg leading-relaxed mb-8">
                {cta.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
              <Button
                asChild
                className="bg-white text-[#0055ff] hover:bg-white/90 h-12 px-8 font-semibold rounded-xl"
              >
                <Link to="/contact">
                  {cta.buttonText ?? "Book Your Free Demo Today"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {cta.closingLine ? (
                <p className="mt-6 text-white/80 text-sm sm:text-base">
                  {cta.closingLine}
                </p>
              ) : null}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </FeaturePageLayout>
  );
}
