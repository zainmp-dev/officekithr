import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Cloud,
  Headphones,
  Lock,
  Shield,
  Users,
} from "lucide-react";
import { FeatureCard } from "./ui/FeatureCard";
import { Link } from "react-router-dom";
import { StaggerReveal, StaggerItem } from "@/components/motion/StaggerReveal";
import { CtaHoverLift } from "@/components/motion/CtaHoverLift";
import { HOME_WHY } from "@/data/home-page-content";

const WHY_ICONS = [
  <CheckCircle key="all-in-one" className="w-5 h-5 text-[#2463eb]" />,
  <Lock key="payroll" className="w-5 h-5 text-[#2463eb]" />,
  <Shield key="recruitment" className="w-5 h-5 text-[#2463eb]" />,
  <Users key="ess" className="w-5 h-5 text-[#2463eb]" />,
  <Cloud key="cloud" className="w-5 h-5 text-[#2463eb]" />,
  <Headphones key="support" className="w-5 h-5 text-[#2463eb]" />,
] as const;

export default function WhyOfficeKit() {
  return (
    <section className="pb-16 sm:pb-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="!bg-[#f4f7fa] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12">
          <div className="mb-8 sm:mb-10 max-w-3xl">
            <Badge className="bg-white font-normal py-2 px-4 text-[#1d4ed8] mb-3 sm:mb-4 border border-[#ededed] hover:bg-transparent">
              {HOME_WHY.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-hr-text-primary leading-tight mb-3 sm:mb-4">
              Why does <span className="gradient-text">{HOME_WHY.titleAccent}</span>{" "}
              stand out?
            </h2>
            <p className="text-base sm:text-lg font-medium text-hr-text-primary mb-3 sm:mb-4">
              {HOME_WHY.subtitle}
            </p>
            <p className="text-hr-text-secondary text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              {HOME_WHY.intro}
            </p>
            <CtaHoverLift className="inline-block">
              <Button
                asChild
                variant="outline"
                className="btn-cta gradient-text font-normal min-h-11"
              >
                <Link to={HOME_WHY.cta.href}>{HOME_WHY.cta.label}</Link>
              </Button>
            </CtaHoverLift>
          </div>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {HOME_WHY.items.map((feature, index) => (
              <StaggerItem key={feature.id}>
                <FeatureCard
                  icon={WHY_ICONS[index]}
                  title={feature.title}
                  description={feature.description}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <p className="mt-8 sm:mt-10 text-hr-text-secondary text-sm sm:text-base leading-relaxed max-w-4xl">
            {HOME_WHY.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
