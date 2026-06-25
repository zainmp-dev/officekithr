import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export type MobileNavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

type MobileNavigationPanelProps = {
  featuresLinks: MobileNavLink[];
  industriesLinks: MobileNavLink[];
  industriesViewAll: MobileNavLink;
  resourcesLinks: MobileNavLink[];
  openDropdown: string | null;
  onToggleDropdown: (key: "features" | "resources" | "industries") => void;
  onClose: () => void;
};

/**
 * Mobile drawer links — mounted only after first open to keep initial bundle light.
 */
function MobileNavigationPanel({
  featuresLinks,
  industriesLinks,
  industriesViewAll,
  resourcesLinks,
  openDropdown,
  onToggleDropdown,
  onClose,
}: MobileNavigationPanelProps) {
  return (
    <div data-mobile-menu className="flex h-full w-full flex-col">
      <div className="w-full space-y-1">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-[#0055ff]"
          onClick={() => onToggleDropdown("features")}
          aria-expanded={openDropdown === "features"}
        >
          <span>Features</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-gray-600 ${
              openDropdown === "features" ? "rotate-180 text-[#0055ff]" : ""
            }`}
            aria-hidden
          />
        </button>
        {openDropdown === "features" && (
          <div className="space-y-1 pl-4 pt-2">
            {featuresLinks.map((link) => (
              <Link
                key={"id" in link ? link.id : link.href}
                to={link.href}
                className="group flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-[#0055ff]"
                onClick={onClose}
              >
                <link.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0055ff]" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium">{link.name}</h3>
                  <p className="text-xs text-gray-600">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 w-full space-y-1">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-[#0055ff]"
          onClick={() => onToggleDropdown("industries")}
          aria-expanded={openDropdown === "industries"}
        >
          <span>Industries</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-gray-600 ${
              openDropdown === "industries" ? "rotate-180 text-[#0055ff]" : ""
            }`}
            aria-hidden
          />
        </button>
        {openDropdown === "industries" && (
          <div className="space-y-1 pl-4 pt-2">
            {industriesLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-[#0055ff]"
                onClick={onClose}
              >
                <link.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0055ff]" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium">{link.name}</h3>
                  <p className="text-xs text-gray-600">{link.description}</p>
                </div>
              </Link>
            ))}
            <Link
              to={industriesViewAll.href}
              className="group flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-[#0055ff] border-t border-gray-100 mt-2 pt-3"
              onClick={onClose}
            >
              <industriesViewAll.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0055ff]" />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{industriesViewAll.name}</h3>
                <p className="text-xs text-gray-600">{industriesViewAll.description}</p>
              </div>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-2 w-full space-y-1">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-[#0055ff]"
          onClick={() => onToggleDropdown("resources")}
          aria-expanded={openDropdown === "resources"}
        >
          <span>Resources</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-gray-600 ${
              openDropdown === "resources" ? "rotate-180 text-[#0055ff]" : ""
            }`}
            aria-hidden
          />
        </button>
        {openDropdown === "resources" && (
          <div className="space-y-1 pl-4 pt-2">
            {resourcesLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-[#0055ff]"
                onClick={onClose}
              >
                <link.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0055ff]" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium">{link.name}</h3>
                  <p className="text-xs text-gray-600">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/about-us"
        className="mt-2 block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-[#0055ff]"
        onClick={onClose}
      >
        About us
      </Link>

      <Link
        to="/pricing"
        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-[#0055ff]"
        onClick={onClose}
      >
        Pricing
      </Link>

      <Link to="/contact" onClick={onClose} className="mt-4 block">
        <Button className="h-11 w-full rounded-xl bg-[#0055ff] text-sm font-medium text-white hover:bg-[#0044cc]">
          Contact Us
        </Button>
      </Link>
    </div>
  );
}

export default memo(MobileNavigationPanel);
