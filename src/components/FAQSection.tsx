import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "./ui/badge";
import {
  HOME_FAQ_CATEGORIES,
  FAQ_PAGE_ALL_FAQS,
  type HomeFaq,
  type HomeFaqCategory,
} from "@/data/home-faqs";
import { Link } from "react-router-dom";
import { ArrowRight, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

function FaqAnswer({ faq }: { faq: HomeFaq }) {
  if (!faq.bullets?.length) {
    return <p>{faq.answer}</p>;
  }

  const ListTag = faq.ordered ? "ol" : "ul";
  const listClass = faq.ordered
    ? "list-decimal list-inside space-y-2 mt-3"
    : "list-disc list-inside space-y-2 mt-3";

  return (
    <>
      <p>{faq.answer}</p>
      <ListTag className={listClass}>
        {faq.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </>
  );
}

function FaqAccordion({ faqs, idPrefix }: { faqs: HomeFaq[]; idPrefix: string }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={`${idPrefix}-${faq.question}`}
          value={`${idPrefix}-${index}`}
          className="rounded-xl border border-border bg-background px-4 sm:px-6"
        >
          <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:no-underline sm:py-5 sm:text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="home-faq-answer pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <FaqAnswer faq={faq} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

type FAQSectionProps = {
  variant?: "home" | "page";
  categories?: HomeFaqCategory[];
};

const FAQSection = ({ variant = "home", categories }: FAQSectionProps) => {
  const isPage = variant === "page";
  const faqCategories = categories ?? HOME_FAQ_CATEGORIES;
  const defaultTab = faqCategories[0]?.id ?? "overview";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  if (!faqCategories.length) return null;

  return (
    <section
      className="mb-16 bg-background sm:mb-24 lg:mb-28"
      aria-labelledby={isPage ? undefined : "faq-heading"}
    >
      <div className="container mx-auto px-4">
        {!isPage && (
          <div className="mb-8 text-center sm:mb-12">
            <Badge className="mb-3 border border-[#ededed] bg-white px-4 py-2 font-normal text-[#1d4ed8] hover:bg-transparent sm:mb-4">
              FAQs
            </Badge>
            <h2
              id="faq-heading"
              className="mb-3 text-3xl font-semibold text-hr-text-primary sm:text-4xl lg:text-5xl"
            >
              Frequently Asked{" "}
              <span className="gradient-text leading-snug">Questions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl">
              Quick answers to common questions about OfficeKit HR
            </p>
          </div>
        )}

        <div className={`mx-auto max-w-4xl ${isPage ? "pt-4 md:pt-8" : ""}`}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-center gap-2 rounded-2xl border border-border/50 bg-muted/40 p-2 shadow-none">
              {faqCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  type="button"
                  className="rounded-full border border-transparent px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-none transition-all duration-200 hover:bg-white hover:text-foreground data-[state=active]:border-[#0055ff] data-[state=active]:bg-[#0055ff] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:shadow-[#0055ff]/20 focus-visible:ring-[#0055ff]/30 sm:text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {faqCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0 focus-visible:outline-none"
              >
                <FaqAccordion faqs={category.faqs} idPrefix={category.id} />
              </TabsContent>
            ))}
          </Tabs>

          {!isPage && (
            <div className="mt-10 rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 via-background to-blue-50/40 p-6 text-center sm:p-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0055ff]/10 text-[#0055ff]">
                <CircleHelp className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
                Need more detail?
              </h3>
              <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground sm:text-base">
                Browse all {FAQ_PAGE_ALL_FAQS.length} answers on India &amp; GCC
                payroll, WPS, modules, implementation, and security.
              </p>
              <Button
                asChild
                className="group h-11 rounded-full bg-[#0055ff] px-6 hover:bg-[#0044cc]"
              >
                <Link to="/faq">
                  View all FAQs
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
