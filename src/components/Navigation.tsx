"use client";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ArrowRight, ChevronDown,
  BookOpen,
  Lightbulb,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { NavBrandLogo } from "@/components/ui/NavBrandLogo";
import { useIsDesktopNav } from "@/hooks/useMediaQuery";
import { useMobileNavLock } from "@/hooks/useMobileNavLock";
import { INDUSTRY_NAV_LINKS, INDUSTRY_NAV_VIEW_ALL } from "@/data/industry-nav";
import { FEATURE_NAV_LINKS } from "@/data/feature-nav";
import { AnnouncementBar, useAnnouncementNavOffset } from "@/components/AnnouncementBar";
import { SITE_ANNOUNCEMENT } from "@/data/site-announcement";

const MobileNavigationPanel = lazy(
  () => import("@/components/MobileNavigationPanel")
);

const Navigation = () => {
  const isDesktopNav = useIsDesktopNav();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const { announcementVisible, dismissAnnouncement } = useAnnouncementNavOffset();
  const featuresTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  useMobileNavLock(isMobileMenuOpen, closeMenu);

  const toggleMobileDropdown = useCallback((key: "features" | "resources" | "industries") => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const resourcesLinks = [
    { name: "Blogs", href: "/resources/blogs", icon: BookOpen, description: "Latest insights and updates." },
    { name: "HR Software UAE", href: "/hr-software-uae", icon: Lightbulb, description: "WPS payroll & GCC HR." },
    { name: "HRMS India", href: "/hrms-software-india", icon: Lightbulb, description: "Statutory payroll & HRMS." },
    { name: "Compare vendors", href: "/compare", icon: Lightbulb, description: "OfficeKit vs Keka, greytHR." },
    { name: "GCC compliance", href: "/gcc-compliance", icon: Lightbulb, description: "WPS, GOSI, PIFSS guides." },
    { name: "FAQs", href: "/faq", icon: HelpCircle, description: "Common questions about OfficeKit HR." },
  ];

  // WhatsApp Handler
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/918137932991?text=" + encodeURIComponent("Hi OfficeKit HR"),
      "_blank"
    );
  };

  // Hover handlers for Features dropdown
  const handleFeaturesMouseEnter = () => {
    if (featuresTimeoutRef.current) {
      clearTimeout(featuresTimeoutRef.current);
    }
    featuresTimeoutRef.current = setTimeout(() => {
      setFeaturesOpen(true);
    }, 200); // 200ms delay
  };

  const handleFeaturesMouseLeave = () => {
    if (featuresTimeoutRef.current) {
      clearTimeout(featuresTimeoutRef.current);
    }
    featuresTimeoutRef.current = setTimeout(() => {
      setFeaturesOpen(false);
    }, 150); // 150ms delay before closing
  };

  // Hover handlers for Resources dropdown
  const handleResourcesMouseEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    resourcesTimeoutRef.current = setTimeout(() => {
      setResourcesOpen(true);
    }, 200); // 200ms delay
  };

  const handleResourcesMouseLeave = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    resourcesTimeoutRef.current = setTimeout(() => {
      setResourcesOpen(false);
    }, 150); // 150ms delay before closing
  };

  const handleIndustriesMouseEnter = () => {
    if (industriesTimeoutRef.current) {
      clearTimeout(industriesTimeoutRef.current);
    }
    industriesTimeoutRef.current = setTimeout(() => {
      setIndustriesOpen(true);
    }, 200);
  };

  const handleIndustriesMouseLeave = () => {
    if (industriesTimeoutRef.current) {
      clearTimeout(industriesTimeoutRef.current);
    }
    industriesTimeoutRef.current = setTimeout(() => {
      setIndustriesOpen(false);
    }, 150);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (featuresTimeoutRef.current) {
        clearTimeout(featuresTimeoutRef.current);
      }
      if (resourcesTimeoutRef.current) {
        clearTimeout(resourcesTimeoutRef.current);
      }
      if (industriesTimeoutRef.current) {
        clearTimeout(industriesTimeoutRef.current);
      }
    };
  }, []);

  // Custom Logo Component
  const NavbarLogo = () => (
    <Link
      to="/"
      className="relative z-20 mr-2 sm:mr-4 flex items-center space-x-2 px-2 py-1 transition-all duration-300 group/nav flex-shrink-0"
    >
      <NavBrandLogo />
    </Link>
  );

  return (
    <>
      <AnnouncementBar visible={announcementVisible} onDismiss={dismissAnnouncement} />
      <Navbar
        className={cn(
          "!fixed left-0 w-full right-0 z-50 pt-2 sm:pt-4 md:pt-6 lg:pt-8",
          announcementVisible ? SITE_ANNOUNCEMENT.navOffsetClass : "!top-0"
        )}
      >
      {/* Desktop Navigation — not mounted on mobile (saves Radix + heavy DOM) */}
      {isDesktopNav ? (
      <NavBody className="overflow-visible">
        <NavbarLogo />
        
        {/* Desktop Navigation Items with Dropdowns */}
        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-2 xl:space-x-3 2xl:space-x-4 lg:flex pointer-events-none">
          {/* Features Dropdown */}
          <DropdownMenu 
            modal={false} 
            open={featuresOpen} 
            onOpenChange={setFeaturesOpen}
          >
            <div
              onMouseEnter={handleFeaturesMouseEnter}
              onMouseLeave={handleFeaturesMouseLeave}
              className="pointer-events-auto"
            >
              <DropdownMenuTrigger asChild>
                <button 
                  className="nav-menu-trigger gap-1 px-2 sm:px-2.5 md:px-3 lg:px-3 xl:px-4 py-2 text-sm lg:text-base font-medium whitespace-nowrap"
                  aria-label="Features menu"
                  aria-expanded={featuresOpen}
                  aria-haspopup="true"
                >
                  <span>Features</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              </DropdownMenuTrigger>
            </div>
            <div
              onMouseEnter={handleFeaturesMouseEnter}
              onMouseLeave={handleFeaturesMouseLeave}
            >
              <DropdownMenuContent
                onMouseEnter={handleFeaturesMouseEnter}
                onMouseLeave={handleFeaturesMouseLeave}
              className="w-[92vw] max-w-[880px] bg-white rounded-2xl shadow-xl border border-gray-100 mt-2 p-3 md:p-4 z-[70]"
              align="start"
              sideOffset={8}
              onCloseAutoFocus={(e) => e.preventDefault()}
              side="bottom"
              alignOffset={-32}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
                {FEATURE_NAV_LINKS.map((link) => (
                  <Link
                    key={link.id}
                    to={link.href}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-sm group cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-[#0055ff] flex items-center justify-center transition-all duration-200">
                      <link.icon className="h-4 w-4 text-[#0055ff] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 group-hover:text-[#0055ff] transition-colors duration-200 mb-0.5">
                        {link.name}
                      </h3>
                      <p className="truncate text-xs text-gray-600 transition-colors duration-200">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
            </div>
          </DropdownMenu>

          {/* Industries Dropdown */}
          <div
            onMouseEnter={handleIndustriesMouseEnter}
            onMouseLeave={handleIndustriesMouseLeave}
            className="pointer-events-auto relative"
          >
            <button
              className="nav-menu-trigger gap-1 px-2 sm:px-2.5 md:px-3 lg:px-3 xl:px-4 py-2 text-sm lg:text-base font-medium whitespace-nowrap"
              aria-label="Industries menu"
              aria-expanded={industriesOpen}
              aria-haspopup="true"
            >
              <span>Industries</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {industriesOpen ? (
              <div className="pointer-events-auto absolute top-[calc(100%+14px)] right-[-630px] z-[70] w-[86vw] max-w-[min(780px,calc(100vw-96px))]">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 md:p-4">
                  <div className="grid grid-cols-3 gap-y-2.5 md:gap-y-3 gap-x-0.5 md:gap-x-1">
                    {INDUSTRY_NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-sm group cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-[#0055ff] flex items-center justify-center transition-all duration-200">
                          <link.icon className="h-4 w-4 text-[#0055ff] group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 group-hover:text-[#0055ff] transition-colors duration-200 mb-0.5">
                            {link.name}
                          </h3>
                          <p className="text-xs text-gray-600 transition-colors duration-200">
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to={INDUSTRY_NAV_VIEW_ALL.href}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-sm group cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#0055ff] flex items-center justify-center transition-all duration-200">
                        <INDUSTRY_NAV_VIEW_ALL.icon className="h-4 w-4 text-white transition-colors duration-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 group-hover:text-[#0055ff] transition-colors duration-200 mb-0.5">
                          {INDUSTRY_NAV_VIEW_ALL.name}
                        </h3>
                        <p className="truncate text-xs font-medium text-gray-700 transition-colors duration-200">
                          {INDUSTRY_NAV_VIEW_ALL.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Resources Dropdown */}
          <DropdownMenu 
            modal={false} 
            open={resourcesOpen} 
            onOpenChange={setResourcesOpen}
          >
            <div
              onMouseEnter={handleResourcesMouseEnter}
              onMouseLeave={handleResourcesMouseLeave}
              className="pointer-events-auto"
            >
              <DropdownMenuTrigger asChild>
                <button 
                  className="nav-menu-trigger gap-1 px-2 sm:px-2.5 md:px-3 lg:px-3 xl:px-4 py-2 text-sm lg:text-base font-medium whitespace-nowrap"
                  aria-label="Resources menu"
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                >
                  <span>Resources</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              </DropdownMenuTrigger>
            </div>
            <div
              onMouseEnter={handleResourcesMouseEnter}
              onMouseLeave={handleResourcesMouseLeave}
            >
              <DropdownMenuContent
                onMouseEnter={handleResourcesMouseEnter}
                onMouseLeave={handleResourcesMouseLeave}
              className="w-[90vw] max-w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 mt-2 p-3 z-[70]"
              align="start"
              sideOffset={8}
              onCloseAutoFocus={(e) => e.preventDefault()}
              side="bottom"
              alignOffset={-20}
            >
              <div className="flex flex-col gap-2">
                {resourcesLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-sm group cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-[#0055ff] flex items-center justify-center transition-all duration-200">
                      <link.icon className="h-4 w-4 text-[#0055ff] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 group-hover:text-[#0055ff] transition-colors duration-200 mb-0.5">
                        {link.name}
                      </h3>
                      <p className="text-xs text-gray-600 transition-colors duration-200">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
            </div>
          </DropdownMenu>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              cn(
                "nav-link px-2 sm:px-2.5 md:px-3 lg:px-3 xl:px-4 py-2 text-sm lg:text-base font-medium whitespace-nowrap pointer-events-auto",
                isActive && "nav-link--active"
              )
            }
            aria-label="About OfficeKit HR"
          >
            About us
          </NavLink>

          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              cn(
                "nav-link px-2 sm:px-2.5 md:px-3 lg:px-3 xl:px-4 py-2 text-sm lg:text-base font-medium whitespace-nowrap pointer-events-auto",
                isActive && "nav-link--active"
              )
            }
            aria-label="View pricing plans"
          >
            Pricing
          </NavLink>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-shrink-0 ml-auto relative z-10">
          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] rounded-full flex items-center justify-center shadow-md transition-all duration-300 transform hover:scale-110 active:scale-95 min-w-11 min-h-11 w-11 h-11 flex-shrink-0"
            aria-label="Chat with OfficeKit HR on WhatsApp"
          >
            <WhatsAppIcon size={20} />
          </button>

          {/* Contact Button */}
          <Link to="/contact">
            <Button className="bg-[#0055ff] hover:bg-[#0044cc] text-white rounded-full px-5 py-2.5 text-sm lg:text-base font-medium transition-all duration-300 group shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </NavBody>
      ) : null}

      {/* Mobile Navigation */}
      {!isDesktopNav ? (
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Button - Mobile */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 min-w-11 min-h-11 w-11 h-11 flex-shrink-0"
              aria-label="Chat with OfficeKit HR on WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </button>
            <div data-hamburger>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              />
            </div>
          </div>
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMenu}>
          {isMobileMenuOpen ? (
            <Suspense fallback={<div className="p-4 text-sm text-gray-500">Loading…</div>}>
              <MobileNavigationPanel
                featuresLinks={FEATURE_NAV_LINKS}
                industriesLinks={INDUSTRY_NAV_LINKS}
                industriesViewAll={INDUSTRY_NAV_VIEW_ALL}
                resourcesLinks={resourcesLinks}
                openDropdown={openDropdown}
                onToggleDropdown={toggleMobileDropdown}
                onClose={closeMenu}
              />
            </Suspense>
          ) : null}
        </MobileNavMenu>
      </MobileNav>
      ) : null}
      </Navbar>
    </>
  );
};

export default Navigation;