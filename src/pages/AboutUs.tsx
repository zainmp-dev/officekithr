import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageShell } from "@/seo/PageShell";
import { breadcrumbSchema } from "@/seo/schema";
import { PAGE_GEO_BY_PATH } from "@/data/page-faqs";
import { Users, Target, Heart, Award, CheckCircle, Lock, Shield, LinkIcon } from "lucide-react";

const PAGE_PATH = "/about-us";

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "We believe great HR starts with putting people at the center of everything we do."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Constantly pushing boundaries to deliver cutting-edge HR solutions."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building strong partnerships with our clients and within our team."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality in everything we create."
    }
  ];

  const whyofficekit = [
    {
      icon: CheckCircle,
      title: "Unified HR Platform",
      description: "No more switching between multiple systems. OfficeKit HR centralizes all core HR functions — recruitment, onboarding, payroll, attendance, leave management, performance, and more — into one seamless solution. This means HR teams spend less time on admin, and more time driving strategy."
    },
    {
      icon: Lock,
      title: "Enhanced Engagement",
      description: "We go beyond processes. With tools for mood tracking, surveys, and a built-in social platform, OfficeKit HR helps employees feel heard, connected, and engaged. Because engaged employees aren’t just happier — they’re more productive and loyal."
    },
    {
      icon: Shield,
      title: "Robust Security & Compliance",
      description: "Your HR data deserves the highest level of protection. OfficeKit HR provides enterprise-grade security with built-in compliance for local and multi-country payroll. We help you stay audit-ready, minimize risks, and ensure regulations are never a burden."
    },
    {
      icon: LinkIcon,
      title: " Fast and Easy Implementation",
      description: "We know change shouldn’t slow you down. Our platform is designed for quick onboarding, so organizations can go live with minimal downtime. Whether you’re a growing startup or an enterprise, OfficeKit HR adapts to your needs — fast."
    }
  ];

  const team = [

    {
      name: "Haris PT",
      role: "Co Founder & CEO",
      image: "/haris-ceo.webp",
      linkedin: "https://www.linkedin.com/in/harispt/",
      bio: (
        <>
          Serial Entrepreneur with 20+ Years of <br />
          Experience in IT Business
        </>
      ),
    },
    {
      name: "Mohammed Faizan Lanka",
      role: "Co Founder & CTO",
      image: "/faizan-seo.webp",
      linkedin: "https://www.linkedin.com/in/mohammedfaizanlanka/",
      bio: "Technocrat with 14+ Years of Experience in BFSI, HR and Data Analytics domains."
    }
  ];

  return (
    <PageShell
      title="About OfficeKit HR | Enterprise HRMS Platform"
      description="Learn how OfficeKit HR helps growing businesses automate HR, payroll, and compliance across India and the Middle East."
      path={PAGE_PATH}
      faqs={PAGE_GEO_BY_PATH[PAGE_PATH]?.faqs}
      schemaNodes={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: PAGE_PATH },
        ]),
      ]}
    >
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 sm:pt-44 md:pt-48 pb-20 bg-gradient-subtle bg-cover bg-center"
        style={{
          backgroundImage: "url('/RecruitmentManagement2.jpg')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Who We Are and What <br /> <span className="gradient-text" >We Stand For</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              OfficeKit is on a mission to simplify HR for everyone — building modern, scalable,
              and people-first solutions trusted by companies around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-[44px] font-semibold text-foreground">Our <span className="gradient-text" >Mission </span></h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed">
                To democratize HR technology by making powerful, enterprise-grade HR tools
                accessible to businesses of all sizes. We believe every organization deserves
                the tools to build amazing workplace cultures.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-[44px] font-semibold text-foreground">Our <span className="gradient-text" >Vision </span></h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed">
                A world where HR professionals can focus on what matters most — their people.
                We envision workplaces where technology enhances human connection rather than
                replacing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[44px] font-semibold text-foreground mb-6">Our <span className="gradient-text" >Core</span>   Values</h2>
            <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center feature-card">
                  <div className="bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* whyofficekit Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[44px]  font-semibold text-hr-text-primary leading-tight mb-6">
              Why <span className="gradient-text" >OfficeKit </span>
              Stands out?
            </h2>
            <p className="text-[16px] text-muted-foreground max-w-6xl mx-auto">
              At OfficeKit HR, we believe HR should empower people, not overwhelm them. Founded with a vision to transform the way organizations manage their workforce, OfficeKit HR delivers a fully integrated, all-in-one platform that simplifies the entire employee lifecycle — from recruitment to retirement.
              Our journey began with a simple observation: HR teams spend too much time juggling disconnected systems, manual processes, and compliance headaches. We set out to change that. Today, OfficeKit HR powers organizations across industries and geographies with tools that make HR effortless, efficient, and people-focused.
            </p>
          </div>

          <div className="grid md:grid-cols-2  gap-8">
            {whyofficekit.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center feature-card">
                  <div className="bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[44px] font-semibold text-foreground mb-6">Leadership <span className="gradient-text" >Team</span> </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate leaders driving OfficeKit's mission forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <a
                key={index}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${member.name} on LinkedIn`}
                className="text-center feature-card block transition-shadow hover:shadow-lg hover:border-primary/30 cursor-pointer"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-border"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="py-20  text-primary-foreground bg-[#0055ff]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-primary-foreground/80">WorldWide Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">Companies Trust Us</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">70K+</div>
              <div className="text-primary-foreground/80">Employees Managed</div>
            </div>

            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Expert Support</div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
    </PageShell>
  );
};

export default AboutUs;