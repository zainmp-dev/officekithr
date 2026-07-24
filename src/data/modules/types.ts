export type ModuleFaq = {
  question: string;
  answer: string;
};

export type ModuleFeature = {
  title: string;
  description: string;
  bullets: string[];
};

export type ModuleCard = {
  title: string;
  description: string;
};

export type ModuleBenefit = {
  title: string;
  description: string;
};

export type ModuleContent = {
  path: string;
  productName: string;
  breadcrumbLabel: string;
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    tagline?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  intro: {
    title: string;
    paragraphs: string[];
  };
  features: {
    title: string;
    subtitle: string;
    items: ModuleFeature[];
  };
  whyChoose: {
    title: string;
    subtitle: string;
    items: ModuleCard[];
  };
  benefits: {
    title: string;
    subtitle?: string;
    items: ModuleBenefit[];
  };
  faqs: ModuleFaq[];
  cta: {
    title: string;
    paragraphs: string[];
    buttonText?: string;
    closingLine?: string;
  };
};
