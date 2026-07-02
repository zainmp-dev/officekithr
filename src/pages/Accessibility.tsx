import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { breadcrumbSchema, webPageSchema } from "@/seo/schema";
import { absoluteUrl } from "@/seo/site-config";
import { Accessibility as AccessibilityIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAGE_PATH = "/accessibility";

const Accessibility = () => (
  <PageShell
    title="Accessibility Statement | OfficeKit HR"
    description="OfficeKit HR is committed to digital accessibility. Learn about our WCAG 2.2 compliance efforts, accessibility features, and how to report issues."
    path={PAGE_PATH}
    faqs={[
      {
        question: "What accessibility standard does OfficeKit HR follow?",
        answer: "OfficeKit HR is committed to conforming with WCAG 2.2 Level AA standards. We continuously audit and improve our platform to ensure accessibility for all users, including those using assistive technologies.",
      },
      {
        question: "How do I report an accessibility issue?",
        answer: "If you encounter any accessibility barriers on our website or in our product, please email hello@officekithr.com or call +91-8137932991. We take all reports seriously and aim to respond within 2 business days.",
      },
      {
        question: "Does OfficeKit HR work with screen readers?",
        answer: "Yes. OfficeKit HR is designed to work with major screen readers including NVDA, JAWS, VoiceOver, and TalkBack. We use semantic HTML, ARIA labels, and keyboard-navigable interfaces throughout the platform.",
      },
    ]}
    schemaNodes={[
      webPageSchema({
        url: absoluteUrl(PAGE_PATH),
        name: "Accessibility Statement",
        description: "OfficeKit HR accessibility commitment and WCAG 2.2 compliance.",
        type: "WebPage",
      }),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Accessibility", path: PAGE_PATH },
      ]),
    ]}
  >
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-36 pb-12 md:pt-44 bg-gradient-subtle">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0055ff] mb-6">
            <AccessibilityIcon className="h-4 w-4" aria-hidden />
            Accessibility
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Accessibility statement
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            OfficeKit HR is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our commitment</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe HR software should be usable by everyone — HR managers, employees, and executives regardless of ability. OfficeKit HR is designed and developed with accessibility as a core requirement, not an afterthought.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Standards we follow</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OfficeKit HR aims to conform to the{" "}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong>. These guidelines are established by the W3C and are recognized internationally as the standard for web accessibility.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              WCAG 2.2 Level AA compliance means our content is perceivable, operable, understandable, and robust for the widest possible range of users and assistive technologies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Accessibility features</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Semantic HTML structure with proper heading hierarchy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>ARIA labels and roles for interactive elements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Full keyboard navigation support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Skip-to-content link for keyboard users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Sufficient color contrast ratios (4.5:1 minimum)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Alt text for all meaningful images</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Responsive design that works across devices and zoom levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Respects prefers-reduced-motion settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Form labels and error messages for screen reader users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0055ff] font-bold mt-0.5">&#10003;</span>
                <span>Focus indicators on all interactive elements</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Known limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are continuously working to improve accessibility. Some older content, third-party integrations, or PDF documents may not yet fully meet WCAG 2.2 AA. If you encounter a barrier, please let us know.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Feedback</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We welcome your feedback on the accessibility of OfficeKit HR. Please contact us if you encounter an accessibility barrier:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: <a href="mailto:hello@officekithr.com" className="text-[#0055ff] hover:underline">hello@officekithr.com</a></li>
              <li>Phone: <a href="tel:+918137932991" className="text-[#0055ff] hover:underline">+91-8137932991</a></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We aim to respond to accessibility feedback within 2 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">External resources</h2>
            <ul className="space-y-2">
              <li>
                <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0055ff] hover:underline">
                  WCAG 2.2 Guidelines <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
              <li>
                <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0055ff] hover:underline">
                  W3C Accessibility Testing <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </PageShell>
);

export default Accessibility;
