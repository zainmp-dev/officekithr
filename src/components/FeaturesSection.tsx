import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeUpOnce } from "@/components/motion/FadeUpOnce";
import { StaggerReveal, StaggerItem } from "@/components/motion/StaggerReveal";
import { HOME_MODULES } from "@/data/home-page-content";

export default function FeaturesSection() {
  return (
    <section className="bg-background mb-16 sm:mb-24 lg:mb-[110px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUpOnce className="text-center mb-10 sm:mb-14">
          <Badge className="bg-white font-normal py-2 px-4 text-[#1d4ed8] mb-3 sm:mb-4 border border-[#ededed] hover:bg-transparent">
            {HOME_MODULES.badge}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-hr-text-primary mb-3 sm:mb-4">
            {HOME_MODULES.title}
          </h2>
          <p className="text-xl sm:text-2xl font-medium text-hr-text-primary mb-4 sm:mb-6">
            <span className="gradient-text leading-snug">
              {HOME_MODULES.titleAccent}
            </span>
          </p>
          <p className="text-hr-text-secondary text-base sm:text-lg leading-relaxed max-w-3xl mx-auto px-1">
            {HOME_MODULES.subtitle}
          </p>
        </FadeUpOnce>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {HOME_MODULES.modules.map((module) => (
            <StaggerItem key={module.title}>
              <Link
                to={module.href}
                className="group flex h-full flex-col rounded-2xl bg-[#f4f7fa] p-5 sm:p-6 transition-colors hover:bg-[#eef3f9]"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-hr-text-primary mb-2 sm:mb-3 group-hover:text-[#2463EB] transition-colors">
                  {module.title}
                </h3>
                <p className="text-hr-text-secondary text-sm sm:text-base leading-relaxed flex-1">
                  {module.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#2463EB]">
                  Learn more
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <p className="mt-8 sm:mt-10 text-center text-hr-text-secondary text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
          {HOME_MODULES.closing}
        </p>
      </div>
    </section>
  );
}
