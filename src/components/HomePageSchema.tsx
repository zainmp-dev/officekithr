import { Helmet } from "react-helmet-async";
import { SITE } from "@/seo/site-config";
import {
  breadcrumbSchema,
  faqPageSchema,
  productSchema,
  videoObjectSchema,
  speakableSchema,
} from "@/seo/schema";
import { HOME_ALL_FAQS, homeFaqToSchemaAnswer } from "@/data/home-faqs";

/** Homepage JSON-LD: FAQ, Product, Breadcrumb, VideoObject, Speakable. */
export function HomePageSchema() {
  const faq = faqPageSchema(
    HOME_ALL_FAQS.map((item) => ({
      question: item.question,
      answer: homeFaqToSchemaAnswer(item),
    }))
  );

  const product = productSchema({
    name: SITE.name,
    description:
      "AI-powered HRMS for India, UAE & GCC payroll — recruitment, attendance, statutory compliance, and WPS in one platform.",
    url: SITE.url,
  });

  const breadcrumb = breadcrumbSchema([{ name: "Home", path: "/" }]);

  const video = videoObjectSchema({
    name: "OfficeKit HR Platform Overview",
    description:
      "See how OfficeKit HR unifies recruitment, attendance, payroll, and compliance for India, UAE, and the GCC.",
    thumbnailUrl: SITE.ogImage,
    uploadDate: "2025-06-01",
    contentUrl: "https://www.youtube.com/watch?v=Tposa0O5s_k",
    embedUrl: "https://www.youtube.com/embed/Tposa0O5s_k",
  });

  const speakable = speakableSchema({
    url: SITE.url,
    cssSelectors: ["#faq-heading", ".home-faq-answer", ".direct-answer", "h1"],
  });

  const graph = [faq, product, breadcrumb, video, speakable].filter(Boolean);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}
      </script>
    </Helmet>
  );
}
