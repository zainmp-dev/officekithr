import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { breadcrumbSchema, webPageSchema } from "@/seo/schema";
import { absoluteUrl } from "@/seo/site-config";
import { Shield, Lock, Server, Eye, FileCheck, Clock, Globe, Key } from "lucide-react";

const PAGE_PATH = "/security";

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: "256-bit SSL encryption",
    description: "All data in transit is encrypted with TLS 1.3. Sensitive data at rest is encrypted with AES-256.",
  },
  {
    icon: Server,
    title: "Cloud infrastructure",
    description: "Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA across multiple availability zones.",
  },
  {
    icon: Eye,
    title: "GDPR compliant",
    description: "Built for GDPR compliance with data residency options, right-to-erasure support, and data processing agreements.",
  },
  {
    icon: FileCheck,
    title: "Audit-ready logs",
    description: "Complete audit trail for all user actions, payroll runs, and compliance filings. Exportable for regulatory reviews.",
  },
  {
    icon: Key,
    title: "Role-based access control",
    description: "Granular permissions per role, department, and entity. SSO support via SAML 2.0 and OAuth 2.0.",
  },
  {
    icon: Clock,
    title: "Automated backups",
    description: "Daily encrypted backups with point-in-time recovery. Data retained for 90 days with geo-redundant storage.",
  },
  {
    icon: Globe,
    title: "Data residency",
    description: "Choose data residency in India or UAE. Multi-entity support with country-specific data isolation.",
  },
  {
    icon: Shield,
    title: "Cloudflare protection",
    description: "DDoS mitigation, WAF rules, and bot protection powered by Cloudflare's global edge network.",
  },
];

const COMPLIANCE_FRAMEWORKS = [
  { name: "GDPR", description: "EU General Data Protection Regulation — data processing, consent, and erasure workflows." },
  { name: "UAE WPS", description: "Wage Protection System — SIF file generation and MOHRE-compliant salary processing." },
  { name: "India Statutory", description: "PF, ESI, PT, TDS compliance with challan-ready outputs and Form 16 generation." },
  { name: "GCC Labour Laws", description: "GOSI (KSA), PIFSS (Kuwait), PASI (Oman), SIO (Bahrain) contribution tracking." },
  { name: "ISO 27001", description: "Information security management — currently implementing. Contact us for our roadmap." },
  { name: "SOC 2 Type II", description: "Security, availability, and confidentiality controls — currently implementing. Contact us for our timeline." },
];

const Security = () => (
  <PageShell
    title="Security & Compliance | OfficeKit HR"
    description="OfficeKit HR security architecture: 256-bit encryption, GDPR compliance, role-based access, audit logs, data residency in India and UAE, and 99.9% uptime SLA."
    path={PAGE_PATH}
    faqs={[
      {
        question: "Is OfficeKit HR GDPR compliant?",
        answer: "Yes. OfficeKit HR is built for GDPR compliance with data residency options, right-to-erasure support, data processing agreements, and encrypted data storage. Contact our team for our DPA and sub-processor list.",
      },
      {
        question: "Where is OfficeKit HR data stored?",
        answer: "OfficeKit HR offers data residency in India and UAE. Multi-entity companies can choose country-specific data isolation to meet local regulatory requirements.",
      },
      {
        question: "Does OfficeKit HR have SOC 2 certification?",
        answer: "OfficeKit HR is currently pursuing SOC 2 Type II certification. Our security controls are designed to meet SOC 2 requirements for security, availability, and confidentiality. Contact sales for our security roadmap.",
      },
      {
        question: "How does OfficeKit HR protect employee data?",
        answer: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Role-based access control, SSO support, audit logs, and automated backups ensure your HR data is secure and recoverable.",
      },
    ]}
    schemaNodes={[
      webPageSchema({
        url: absoluteUrl(PAGE_PATH),
        name: "Security & Compliance",
        description: "OfficeKit HR security architecture and compliance certifications.",
        type: "WebPage",
      }),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Security", path: PAGE_PATH },
      ]),
    ]}
  >
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-36 pb-12 md:pt-44 bg-gradient-subtle">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0055ff] mb-6">
            <Shield className="h-4 w-4" aria-hidden />
            Security &amp; Compliance
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Enterprise-grade security for your HR data
          </h1>
          <p className="text-lg text-muted-foreground direct-answer max-w-2xl mx-auto">
            OfficeKit HR protects your employee data with 256-bit encryption, role-based access control, audit-ready logs, and compliance with GDPR, WPS, and India statutory requirements.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-10">
            Security architecture
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECURITY_FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border bg-card p-6">
                <feature.icon className="h-8 w-8 text-[#0055ff] mb-3" aria-hidden />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-10">
            Compliance frameworks
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {COMPLIANCE_FRAMEWORKS.map((fw) => (
              <div key={fw.name} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-semibold text-foreground mb-1">{fw.name}</h3>
                <p className="text-sm text-muted-foreground">{fw.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Need our security questionnaire or DPA?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact our security team for our detailed security whitepaper, data processing agreement, or sub-processor list.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild className="rounded-full bg-[#0055ff] hover:bg-[#0044cc]">
              <a href="mailto:hello@officekithr.com?subject=Security%20questionnaire%20request">
                Request security docs
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="https://calendly.com/officekithr/demo" target="_blank" rel="noopener noreferrer">
                Book a security review call
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </PageShell>
);

export default Security;
