import { ReactNode } from "react";
import { PageShell } from "@/seo/PageShell";
import { productSchema, breadcrumbSchema } from "@/seo/schema";
import { canonicalUrl } from "@/seo/site-config";
import { PAGE_GEO_BY_PATH } from "@/data/page-faqs";
import { getRouteSeo } from "@/seo/route-seo";

type FeaturePageLayoutProps = {
  path: string;
  productName: string;
  breadcrumbLabel: string;
  productDescription?: string;
  faqs?: { question: string; answer: string }[];
  children: ReactNode;
};

/** SEO wrapper for /features/* pages — route meta, FAQ schema, Product + Breadcrumb JSON-LD. */
export function FeaturePageLayout({
  path,
  productName,
  breadcrumbLabel,
  productDescription,
  faqs,
  children,
}: FeaturePageLayoutProps) {
  const routeSeo = getRouteSeo(path);
  const geo = PAGE_GEO_BY_PATH[path];
  const description = productDescription ?? routeSeo.description;
  const url = canonicalUrl(path);
  const schemaFaqs = faqs ?? geo?.faqs;

  return (
    <PageShell
      title={routeSeo.title}
      description={description}
      path={path}
      faqs={schemaFaqs}
      schemaNodes={[
        productSchema({ name: productName, description, url }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: breadcrumbLabel, path },
        ]),
      ]}
    >
      {children}
    </PageShell>
  );
}
