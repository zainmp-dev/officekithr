import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";
import { buildUtmSource, submitLead } from "@/lib/api/leads";
import { trackDemoConversion } from "@/lib/analytics";
import { SEO_ASSETS } from "@/lib/seo/assets";
import { HOME_FINAL_CTA } from "@/data/home-page-content";

const FinalCtaSection = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        message__c: `Company size: ${formData.companySize}`,
        source: buildUtmSource("home-final-cta"),
      });

      if (res.ok) {
        trackDemoConversion("contact_form");

        toast({
          title: "Success",
          variant: "success",
          description: "Demo scheduled successfully!",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          companySize: "",
        });
      } else {
        const errorText = await res.text();
        toast({
          title: "Error",
          variant: "destructive",
          description:
            "❌ There was a problem submitting your request.\n" + errorText,
        });
      }
    } catch {
      toast({
        title: "Error",
        variant: "destructive",
        description: "⚠️ Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="relative bg-cover bg-center py-12 text-center sm:py-16 lg:py-20"
        style={{ backgroundImage: `url('${SEO_ASSETS.sectionBg}')` }}
      >
        <div className="relative container mx-auto px-4">
          <Badge className="mb-4 border border-[#ededed] bg-white px-4 py-2 font-normal text-[#1d4ed8] hover:bg-transparent">
            Book a Demo
          </Badge>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-foreground sm:mb-5 sm:text-4xl lg:text-5xl">
            Ready to Upgrade{" "}
            <span className="gradient-text">Your HR Operations?</span>
          </h2>
          <div className="mx-auto max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:space-y-4 sm:text-base lg:text-lg">
            {HOME_FINAL_CTA.seoParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <p>{HOME_FINAL_CTA.supporting}</p>
            <p>{HOME_FINAL_CTA.seoSupporting}</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-subtle py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card
              className="shadow-medium bg-cover bg-center"
              style={{ backgroundImage: "url('/RecruitmentManagement-Bg.png')" }}
            >
              <CardContent className="p-5 sm:p-6 lg:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {HOME_FINAL_CTA.experienceHeading}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {HOME_FINAL_CTA.experienceSubheading}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="final-cta-name">
                        Full Name <span className="required-asterisk">*</span>
                      </Label>
                      <Input
                        id="final-cta-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="final-cta-email">
                        Email Address <span className="required-asterisk">*</span>
                      </Label>
                      <Input
                        id="final-cta-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="final-cta-phone">
                        Phone Number <span className="required-asterisk">*</span>
                      </Label>
                      <Input
                        id="final-cta-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your Phone Number"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="final-cta-company">
                        Company Name <span className="required-asterisk">*</span>
                      </Label>
                      <Input
                        id="final-cta-company"
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Your Company"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="final-cta-size">
                      Company size <span className="required-asterisk">*</span>
                    </Label>
                    <select
                      id="final-cta-size"
                      name="companySize"
                      required
                      value={formData.companySize}
                      onChange={(e) =>
                        setFormData({ ...formData, companySize: e.target.value })
                      }
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select employee count</option>
                      <option value="1-50">1–50 employees</option>
                      <option value="51-200">51–200 employees</option>
                      <option value="201-500">201–500 employees</option>
                      <option value="501-1000">501–1,000 employees</option>
                      <option value="1000+">1,000+ employees</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="btn-cta w-full group"
                    disabled={loading}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {loading ? "Sending..." : HOME_FINAL_CTA.ctaLabel}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="bg-white rounded-2xl p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">
                {HOME_FINAL_CTA.experienceSubheading}
              </h3>
              <p className="text-muted-foreground mb-8">
                {HOME_FINAL_CTA.supporting}
              </p>
              <ul className="space-y-4">
                {HOME_FINAL_CTA.checkmarks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-base text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalCtaSection;
