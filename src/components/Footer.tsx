import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Instagram,
  YoutubeIcon,
  Shield,
  Lock,
  Eye,
} from "lucide-react";
import { useState, FormEvent } from "react";
import { PreFooterGeo } from "@/components/geo/PreFooterGeo";
import { SITE } from "@/seo/site-config";
import { CANONICAL } from "@/seo/canonical-paths";

const solutionsLinks = [
  { name: "HRMS software India", href: CANONICAL.hrmsIndia },
  { name: "Payroll software UAE", href: CANONICAL.payrollUae },
  { name: "Payroll software KSA", href: "/solutions/payroll-software-ksa" },
  { name: "WPS compliance", href: CANONICAL.wpsUae },
  { name: "AI HR software GCC", href: "/solutions/ai-hr-software-gcc" },
  { name: "greytHR alternative", href: CANONICAL.greythrCompare },
  { name: "Keka alternative", href: CANONICAL.kekaCompare },
  { name: "GCC compliance hub", href: "/gcc-compliance" },
  { name: "Compare HRMS", href: "/compare" },
];

const featuresLinks = [
  { name: "Recruitment Management", href: "/features/recruitment-management" },
  { name: "Attendance and Leave", href: "/features/attendance-and-leave" },
  { name: "Payroll and Compliance", href: "/features/payroll-and-compliance" },
  { name: "Performance Management", href: "/features/performance-appraisal" },
  { name: "Self Service Portal", href: "/features/self-service-portal" },
  { name: "Exit Management", href: "/features/exit-management" },
  { name: "Mobile App", href: "/features/mobile-app" },
  { name: "Face Kit", href: "/features/face-kit" },
];

const resourcesLinks = [
  { name: "FAQs", href: "/faq" },
  { name: "Blog", href: "/resources/blogs" },
  { name: "HR Guides", href: "/resources/guides" },
  { name: "Knowledge Base", href: "/knowledge" },
  { name: "Free Tools", href: "/tools" },
  { name: "Customers", href: "/customers" },
  { name: "Reviews", href: "/reviews" },
];

const globalLinks = [
  { name: "India", to: "/" },
  { name: "UAE", to: "/ae" },
  { name: "Saudi Arabia", to: "/solutions/payroll-software-ksa" },
  { name: "Kuwait", to: "/solutions/hrms-software-kuwait" },
  { name: "Qatar", to: "/solutions/payroll-software-qatar" },
  { name: "Oman", to: "/solutions/hrms-software-oman" },
  { name: "Bahrain", to: "/solutions/hrms-software-bahrain" },
  { name: "Kerala", to: "/solutions/payroll-software-kerala" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <PreFooterGeo />
      <footer className="bg-gray-900 pt-p-tursioury pb-[32px] text-gray-100">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/Footer logo2.png"
                alt="OfficeKit HR logo"
                width={140}
                height={44}
                className="h-11 w-auto brightness-0 invert"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="text-gray-300 leading-relaxed">
              Simplifying HR for everyone with smart, fast, and intuitive solutions
              <br />
              that help your team focus on what truly matters.
            </p>

            <div className="flex space-x-2">
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white p-2.5 min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-gray-800" aria-label="OfficeKit HR on LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white p-2.5 min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-gray-800" aria-label="OfficeKit HR on Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white p-2.5 min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-gray-800" aria-label="OfficeKit HR on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white p-2.5 min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg hover:bg-gray-800" aria-label="OfficeKit HR on YouTube">
                <YoutubeIcon className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 opacity-50 my-6" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 mt-12 mb-20">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <div className="space-y-3">
                <Link to="/about-us" className="block text-gray-300 hover:text-white transition-colors">About Us</Link>
                <Link to="/pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</Link>
                <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact Us</Link>
                <Link to="/security" className="block text-gray-300 hover:text-white transition-colors">Security</Link>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Features</h3>
              <div className="space-y-3">
                {featuresLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="block text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Resources</h3>
              <div className="space-y-3">
                {resourcesLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="block text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Solutions</h3>
              <div className="space-y-3">
                {solutionsLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="block text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Global</h3>
              <div className="space-y-3">
                {globalLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="block py-2 text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <a href="mailto:hello@officekithr.com" className="text-sm hover:text-white transition-colors">
                    hello@officekithr.com
                  </a>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <a href="tel:+918137932991" className="hover:text-white transition-colors">
                      + 91 8137932991
                    </a>
                    <br />
                    Ground floor, Cyber Park Calicut - 673 016
                  </span>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <a href="tel:+971528155771" className="hover:text-white transition-colors">+971 52 815 5771</a>
                    <br />
                    <a href="tel:+971553155343" className="hover:text-white transition-colors">+971 55 315 5343</a>
                    <br />
                    #105, Bushager Building, 13 55 St - Al Garhoud - Dubai
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-semibold text-white mb-2">Stay updated</h4>
                <form
                  onSubmit={(e: FormEvent) => { e.preventDefault(); setEmail(""); }}
                  className="flex flex-col gap-2 w-full"
                >
                  <Input
                    type="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 text-sm h-9 focus-visible:ring-gray-500"
                    required
                    aria-label="Email for newsletter"
                  />
                  <Button type="submit" className="w-full bg-[#0055ff] hover:bg-[#0044cc] text-white h-9 text-sm">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 opacity-50 my-6" />

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1.5 text-xs text-gray-300">
              <Lock className="h-3 w-3" aria-hidden /> 256-bit SSL encryption
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1.5 text-xs text-gray-300">
              <Shield className="h-3 w-3" aria-hidden /> Cloudflare protected
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1.5 text-xs text-gray-300">
              <Eye className="h-3 w-3" aria-hidden /> GDPR compliant
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1.5 text-xs text-gray-300">
              99.9% uptime SLA
            </span>
          </div>

          <div className="border-t border-gray-700 opacity-50 my-6" />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              &copy; 2026 OfficeKit HR. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors py-2 inline-block">
                Privacy Policy
              </Link>
              <Link to="/terms-and-condition" className="text-gray-300 hover:text-white transition-colors py-2 inline-block">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-300 hover:text-white transition-colors py-2 inline-block">
                Cookie Policy
              </Link>
              <Link to="/security" className="text-gray-300 hover:text-white transition-colors py-2 inline-block">
                Security
              </Link>
              <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors py-2 inline-block">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
