"use client";
import { cn } from "@/lib/utils";
import { imgFetchPriority } from "@/lib/img-props";
import React, { useEffect, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          setVisible(scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFixed = className?.includes("fixed") || className?.includes("!fixed");

  return (
    <div
      className={cn(
        isFixed ? "fixed inset-x-0 top-0 z-40 w-full" : "sticky inset-x-0 top-20 z-40 w-full",
        /* Fixed padding — shrink via child transform to avoid CLS */
        "py-3 sm:py-4 lg:py-6",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white lg:flex dark:bg-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4",
        "transition-[transform,box-shadow,opacity] duration-300 ease-out will-change-transform origin-top",
        visible
          ? "scale-[0.97] bg-white shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05)] dark:bg-neutral-950"
          : "scale-100",
        className
      )}
      data-visible={visible}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <span className="absolute inset-0 rounded-full bg-gray-100 dark:bg-neutral-800" />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between bg-white px-2 sm:px-3 md:px-4 lg:hidden py-3 sm:py-4",
        "transition-[transform,box-shadow] duration-300 ease-out will-change-transform origin-top",
        visible
          ? "scale-[0.97] rounded-2xl shadow-lg dark:bg-neutral-950"
          : "scale-100 rounded-[2rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setHasMounted(true);
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div
          role="presentation"
          data-mobile-nav-overlay
          onClick={onClose}
          className="fixed inset-0 z-[45] bg-black/40 opacity-100 lg:hidden touch-none"
        />
      ) : null}
      <div
        data-mobile-nav-panel
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "fixed right-0 top-0 z-[50] flex h-dvh w-[min(280px,88vw)] flex-col bg-white shadow-2xl transition-transform duration-200 ease-out will-change-transform sm:w-[min(320px,88vw)] lg:hidden",
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        aria-hidden={!isOpen}
      >
        {hasMounted ? (
          <div className="flex h-full flex-col overflow-y-auto overscroll-contain px-4 pt-16 pb-6 [-webkit-overflow-scrolling:touch]">
            {children}
          </div>
        ) : null}
      </div>
    </>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "relative z-[60] rounded-lg p-2.5 min-w-11 min-h-11 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0055ff] focus-visible:ring-offset-1 dark:hover:bg-neutral-800 touch-manipulation",
        isOpen ? "mr-3" : ""
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <div
        className={cn(
          "relative flex h-5 w-6 flex-col justify-between",
          isOpen && "justify-center"
        )}
      >
        <span
          className={cn(
            "block h-0.5 w-full origin-center bg-gray-600 transition-transform duration-150 dark:bg-gray-300",
            isOpen && "translate-y-[9px] rotate-45"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-full bg-gray-600 transition-opacity duration-150 dark:bg-gray-300",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-full origin-center bg-gray-600 transition-transform duration-150 dark:bg-gray-300",
            isOpen && "-translate-y-[9px] -rotate-45"
          )}
        />
      </div>
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/NavLogo-137.webp"
        srcSet="/NavLogo-137.webp 137w, /NavLogo.webp 274w"
        sizes="137px"
        alt="OfficeKit HR"
        width={137}
        height={41}
        className="h-8 w-auto object-contain"
        loading="eager"
        decoding="async"
        {...imgFetchPriority("high")}
      />
      <span className="font-medium text-black dark:text-white">OfficeKit HR</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
