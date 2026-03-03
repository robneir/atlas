"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, BookOpen, MessageCircle, Compass, Search, X, Users } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { label: "Atlas", href: "/", icon: Globe },
  { label: "Chronicles", href: "/chronicles", icon: BookOpen },
  { label: "Echoes", href: "/echoes", icon: MessageCircle },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Community", href: "https://discord.gg/pbbPsQMhdR", icon: Users, external: true },
] as const;

export function TopBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-100 flex h-[54px] items-center px-4 md:px-7"
      style={{
        background: "var(--topbar-bg, rgba(255,255,255,0.85))",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--topbar-border, rgba(0,0,0,0.06))",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-serif text-[22px] md:text-[26px] font-black mr-4 md:mr-12 cursor-pointer"
        style={{
          color: "var(--atlas-black)",
          letterSpacing: "-0.01em",
        }}
      >
        Atlas
      </Link>

      {/* Nav Items - hidden on mobile */}
      <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2 mr-auto">
        {navItems.map(({ label, href, icon: Icon, ...rest }) => {
          const isExternal = "external" in rest && rest.external;
          const isActive =
            !isExternal && (href === "/" ? pathname === "/" : pathname.startsWith(href));

          const className = "flex items-center gap-[7px] px-4 py-2 text-[15px] transition-colors duration-150";
          const style = {
            fontFamily: "var(--font-source-sans), sans-serif",
            fontWeight: isActive ? 700 : 500,
            color: isActive
              ? "var(--atlas-black)"
              : "var(--atlas-dark-grey)",
            whiteSpace: "nowrap" as const,
          };
          const hoverHandlers = {
            onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (!isActive) e.currentTarget.style.color = "var(--atlas-black)";
            },
            onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (!isActive) e.currentTarget.style.color = "var(--atlas-dark-grey)";
            },
          };

          if (isExternal) {
            return (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={style}
                {...hoverHandlers}
              >
                <Icon className="w-[15px] h-[15px]" />
                {label}
              </a>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={className}
              style={style}
              {...hoverHandlers}
            >
              <Icon className="w-[15px] h-[15px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Spacer on mobile to push right items */}
      <div className="flex-1 md:hidden" />

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-[14px]">
        {/* Search Button - simplified on mobile */}
        <button
          type="button"
          aria-label="Search (Cmd+K)"
          className="hidden md:flex items-center gap-[6px] rounded-full cursor-pointer transition-all duration-150"
          style={{
            padding: "8px 14px",
            border: "1.5px solid var(--atlas-light-grey)",
            background: "transparent",
            color: "var(--atlas-dark-grey)",
            fontFamily: "var(--font-source-sans), sans-serif",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent("atlas:open-search"));
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
            e.currentTarget.style.color = "var(--atlas-black)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
            e.currentTarget.style.color = "var(--atlas-dark-grey)";
          }}
        >
          <Search className="w-[14px] h-[14px]" />
          <span>Search</span>
          <kbd
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--atlas-mid-grey)",
              marginLeft: 4,
            }}
          >
            {"\u2318"}K
          </kbd>
        </button>

        {/* Mobile search icon button */}
        <button
          type="button"
          aria-label="Search"
          className="flex md:hidden items-center justify-center rounded-full cursor-pointer"
          style={{
            width: 40,
            height: 40,
            border: "1.5px solid var(--atlas-light-grey)",
            background: "transparent",
            color: "var(--atlas-dark-grey)",
          }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent("atlas:open-search"));
          }}
        >
          <Search className="w-[16px] h-[16px]" />
        </button>

        {/* Choose Era Button - hidden on mobile */}
        <button
          type="button"
          className="hidden lg:flex items-center gap-[6px] rounded-full text-[14px] font-semibold cursor-pointer transition-all duration-150"
          style={{
            padding: "8px 18px",
            border: "1.5px solid var(--atlas-light-grey)",
            background: "transparent",
            color: "var(--atlas-link)",
            fontFamily: "var(--font-source-sans), sans-serif",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--atlas-link)";
            e.currentTarget.style.background = "rgba(209,64,31,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Choose Era
        </button>

        {/* Contribute Button - hidden on mobile/tablet */}
        <button
          type="button"
          className="hidden lg:block rounded-full text-[14px] font-semibold text-white cursor-pointer transition-colors duration-150"
          style={{
            padding: "8px 22px",
            background: "var(--atlas-accent)",
            border: "none",
            fontFamily: "var(--font-source-sans), sans-serif",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--atlas-accent-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--atlas-accent)";
          }}
        >
          Contribute
        </button>

        {/* Theme Toggle - hidden on mobile, shown in dropdown */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Hamburger / Close Menu Button */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-haspopup="true"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex flex-col items-center justify-center w-10 h-10 md:w-9 md:h-9 cursor-pointer rounded-full"
            style={{
              border: "1.5px solid var(--atlas-light-grey)",
              background: "transparent",
              gap: mobileMenuOpen ? 0 : "5px",
            }}
          >
            {mobileMenuOpen ? (
              <X size={18} style={{ color: "var(--atlas-dark-grey)" }} />
            ) : (
              <>
                <span
                  className="block rounded-sm"
                  style={{
                    width: "18px",
                    height: "1.5px",
                    background: "var(--atlas-dark-grey)",
                  }}
                />
                <span
                  className="block rounded-sm"
                  style={{
                    width: "18px",
                    height: "1.5px",
                    background: "var(--atlas-dark-grey)",
                  }}
                />
                <span
                  className="block rounded-sm"
                  style={{
                    width: "18px",
                    height: "1.5px",
                    background: "var(--atlas-dark-grey)",
                  }}
                />
              </>
            )}
          </button>

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div
              className="mobile-nav-menu absolute right-0 top-[calc(100%+8px)]"
              style={{
                width: 260,
                borderRadius: 12,
                backgroundColor: "var(--atlas-white)",
                boxShadow: "var(--atlas-shadow-lg)",
                border: "1px solid var(--atlas-light-grey)",
                overflow: "hidden",
                animation: "mobileMenuFadeIn 0.15s ease-out",
              }}
            >
              {/* Navigation links */}
              <nav aria-label="Mobile navigation" className="py-2">
                {navItems.map(({ label, href, icon: Icon, ...rest }) => {
                  const isExternal = "external" in rest && rest.external;
                  const isActive =
                    !isExternal && (href === "/" ? pathname === "/" : pathname.startsWith(href));

                  const commonProps = {
                    className: "flex items-center gap-3 font-sans text-[15px] transition-colors duration-150",
                    style: {
                      padding: "12px 20px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive
                        ? "var(--atlas-black)"
                        : "var(--atlas-dark-grey)",
                      backgroundColor: isActive
                        ? "var(--atlas-cream)"
                        : "transparent",
                    },
                  };

                  if (isExternal) {
                    return (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...commonProps}
                      >
                        <Icon className="w-[16px] h-[16px]" />
                        {label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      {...commonProps}
                    >
                      <Icon className="w-[16px] h-[16px]" />
                      {label}
                    </Link>
                  );
                })}
              </nav>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "var(--atlas-light-grey)" }} />

              {/* Action buttons in dropdown */}
              <div className="p-3 flex flex-col gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-full text-[14px] font-semibold cursor-pointer transition-all duration-150 w-full"
                  style={{
                    padding: "10px 18px",
                    border: "1.5px solid var(--atlas-light-grey)",
                    background: "transparent",
                    color: "var(--atlas-link)",
                    fontFamily: "var(--font-source-sans), sans-serif",
                  }}
                >
                  Choose Era
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center rounded-full text-[14px] font-semibold text-white cursor-pointer transition-colors duration-150 w-full"
                  style={{
                    padding: "10px 22px",
                    background: "var(--atlas-accent)",
                    border: "none",
                    fontFamily: "var(--font-source-sans), sans-serif",
                  }}
                >
                  Contribute
                </button>
              </div>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "var(--atlas-light-grey)" }} />

              {/* Theme toggle in dropdown */}
              <div className="flex items-center justify-between px-5 py-3">
                <span
                  className="font-sans text-[14px]"
                  style={{ color: "var(--atlas-dark-grey)" }}
                >
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
