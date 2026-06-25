import {
  Coins,
  HeartPulse,
  Laptop,
  ShoppingBag,
  UtensilsCrossed,
  Factory,
  GraduationCap,
  Truck,
  Building2,
  Landmark,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { INDUSTRY_PAGES } from "@/data/industry-verticals";

export type IndustryNavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

const navMeta: { slug: string; name: string; icon: LucideIcon; description?: string }[] = [
  {
    slug: "hrms-for-fintech",
    name: "Fintech",
    icon: Coins,
    description: "Fintech payroll and onboarding.",
  },
  {
    slug: "hrms-for-healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    description: "Staffing and compliance.",
  },
  {
    slug: "hrms-for-it-services",
    name: "IT & Software",
    icon: Laptop,
    description: "IT performance and payroll.",
  },
  {
    slug: "hrms-for-retail",
    name: "Retail",
    icon: ShoppingBag,
    description: "Retail attendance and payroll.",
  },
  {
    slug: "hrms-for-hospitality",
    name: "Hospitality",
    icon: UtensilsCrossed,
    description: "Hospitality shifts and payroll.",
  },
  {
    slug: "hrms-for-manufacturing",
    name: "Manufacturing",
    icon: Factory,
    description: "Factory shifts and compliance.",
  },
  {
    slug: "hrms-for-education",
    name: "Education",
    icon: GraduationCap,
    description: "Education attendance and payroll.",
  },
  {
    slug: "hrms-for-logistics",
    name: "Logistics",
    icon: Truck,
    description: "Driver shifts and payroll.",
  },
  {
    slug: "hrms-for-real-estate",
    name: "Real Estate",
    icon: Building2,
    description: "Commission payroll and HR.",
  },
  {
    slug: "hrms-for-bfsi",
    name: "Banking & BFSI",
    icon: Landmark,
    description: "BFSI HR and compliance.",
  },
];

export const INDUSTRY_NAV_LINKS: IndustryNavLink[] = navMeta
  .filter((item) => INDUSTRY_PAGES[item.slug])
  .map((item) => {
    const page = INDUSTRY_PAGES[item.slug];
    return {
      name: item.name,
      href: page.path,
      icon: item.icon,
      description: item.description ?? page.subtitle,
    };
  });

export const INDUSTRY_NAV_VIEW_ALL: IndustryNavLink = {
  name: "All industries",
  href: "/industries",
  icon: LayoutGrid,
  description: "Browse industry HRMS solutions.",
};
