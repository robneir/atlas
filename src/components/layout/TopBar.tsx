"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Globe, BookOpen, MessageCircle, Compass, Search, X, Users, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CreateMenu } from "@/components/feed/CreateMenu";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Map", href: "/map", icon: Globe },
  { label: "Chronicles", href: "/chronicles", icon: BookOpen },
  { label: "Echoes", href: "/echoes", icon: MessageCircle },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Community", href: "https://discord.gg/pbbPsQMhdR", icon: Users, external: true },
] as const;

/* ── Helper functions ─────────────────────────────────── */

function getInitials(name: string): string {
  return name.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = ["#8b6914", "#cd853f", "#8b7355", "#6b8e6b", "#7b9eb8", "#8fa4c4", "#b088c4"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

const TIER_COLORS: Record<string, string> = {
  explorer: "var(--atlas-mid-grey)",
  contributor: "#3b82f6",
  historian: "#f59e0b",
};

export function TopBar() {
  const pathname = usePathname();
  const hideNav = pathname === "/";
  const { user, isSignedIn, signOut, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAvatarMenuOpen(false);
    setCreateMenuOpen(false);
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

  // Close avatar menu on outside click
  useEffect(() => {
    if (!avatarMenuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [avatarMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!mobileMenuOpen && !avatarMenuOpen && !createMenuOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setAvatarMenuOpen(false);
        setCreateMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, avatarMenuOpen, createMenuOpen]);

  // Mutual exclusion: close avatar when hamburger opens and vice versa
  function openMobileMenu() {
    setAvatarMenuOpen(false);
    setCreateMenuOpen(false);
    setMobileMenuOpen((v) => !v);
  }

  function toggleAvatarMenu() {
    setMobileMenuOpen(false);
    setCreateMenuOpen(false);
    setAvatarMenuOpen((v) => !v);
  }

  function handleContributeClick() {
    if (!isSignedIn) {
      openAuthModal();
    } else {
      setCreateMenuOpen((v) => !v);
      setAvatarMenuOpen(false);
      setMobileMenuOpen(false);
    }
  }

  /* ── Tier badge component ─────────────────────────────── */
  const TierBadge = ({ role }: { role: string }) => (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "var(--font-ui)",
        color: "#fff",
        backgroundColor: TIER_COLORS[role] || "var(--atlas-mid-grey)",
        lineHeight: "16px",
        textTransform: "capitalize",
      }}
    >
      {role}
    </span>
  );

  /* ── Avatar component ─────────────────────────────────── */
  const Avatar = ({ size = 36 }: { size?: number }) => {
    if (!user) return null;
    if (user.avatarUrl) {
      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={user.avatarUrl}
          alt={user.displayName}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            cursor: "pointer",
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: getAvatarColor(user.displayName),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: size * 0.38,
          fontWeight: 700,
          fontFamily: "var(--font-ui)",
          letterSpacing: "0.02em",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        {getInitials(user.displayName)}
      </div>
    );
  };

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
      {/* Official site badge + Logo */}
      <div className="flex items-center gap-3 md:gap-4 mr-4 md:mr-12">
        <Link
          href="/"
          className="font-serif text-[22px] md:text-[26px] font-black cursor-pointer"
          style={{
            color: "var(--atlas-black)",
            letterSpacing: "-0.01em",
          }}
        >
          Atlas
        </Link>
      </div>

      {/* Nav Items - hidden on mobile, hidden when hideNav is true (feed page uses left sidebar) */}
      <nav aria-label="Main navigation" className={`hidden ${hideNav ? "" : "md:flex"} items-center gap-2 mr-auto`}>
        {navItems.map(({ label, href, icon: Icon, ...rest }) => {
          const isExternal = "external" in rest && rest.external;
          const isActive =
            !isExternal && (href === "/" ? pathname === "/" : pathname.startsWith(href));

          const className = "flex items-center gap-[7px] px-4 py-2 text-[15px] cursor-pointer transition-colors duration-150";
          const style = {
            fontFamily: "var(--font-ui)",
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

      {/* Spacer to push right items — always on mobile, on desktop when nav is hidden */}
      <div className={`flex-1 ${hideNav ? "" : "md:hidden"}`} />

      {/* Right Side — Order: Search | Contribute | Theme | Sign In/Avatar | Hamburger (mobile only) */}
      <div className="flex items-center gap-2 md:gap-[14px]">
        {/* Search Button (desktop) */}
        <button
          type="button"
          aria-label="Search (Cmd+K)"
          className="hidden md:flex items-center gap-[6px] rounded cursor-pointer transition-all duration-150"
          style={{
            padding: "8px 14px",
            border: "1.5px solid var(--atlas-light-grey)",
            background: "transparent",
            color: "var(--atlas-dark-grey)",
            fontFamily: "var(--font-ui)",
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

        {/* Search icon (mobile) */}
        <button
          type="button"
          aria-label="Search"
          className="flex md:hidden items-center justify-center rounded cursor-pointer"
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

        {/* Contribute — primary CTA with CreateMenu dropdown */}
        <div className="relative hidden lg:block">
          <button
            type="button"
            className="rounded text-[14px] font-semibold text-white cursor-pointer transition-colors duration-150"
            style={{
              padding: "8px 22px",
              background: "var(--atlas-accent)",
              border: "none",
              fontFamily: "var(--font-ui)",
              whiteSpace: "nowrap",
            }}
            onClick={handleContributeClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--atlas-accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--atlas-accent)";
            }}
          >
            Contribute
          </button>
          <CreateMenu
            open={createMenuOpen}
            onClose={() => setCreateMenuOpen(false)}
            dropDown
          />
        </div>

        {/* Theme Toggle (desktop only — in mobile dropdown) */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Sign In (desktop, signed out) */}
        {!isSignedIn && (
          <button
            type="button"
            className="hidden lg:flex items-center gap-[6px] rounded text-[14px] font-semibold cursor-pointer transition-all duration-150"
            style={{
              padding: "8px 18px",
              border: "1.5px solid var(--atlas-light-grey)",
              background: "transparent",
              color: "var(--atlas-dark-grey)",
              fontFamily: "var(--font-ui)",
              whiteSpace: "nowrap",
            }}
            onClick={openAuthModal}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
              e.currentTarget.style.color = "var(--atlas-black)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
              e.currentTarget.style.color = "var(--atlas-dark-grey)";
            }}
          >
            Sign In
          </button>
        )}

        {/* Avatar with dropdown (desktop, signed in) */}
        {isSignedIn && user && (
          <div ref={avatarMenuRef} className="relative hidden lg:block">
            <button
              type="button"
              aria-label="User menu"
              aria-expanded={avatarMenuOpen}
              aria-haspopup="true"
              onClick={toggleAvatarMenu}
              className="flex items-center cursor-pointer"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <Avatar size={36} />
            </button>

            {avatarMenuOpen && (
              <div
                className="absolute right-0 top-[calc(100%+8px)]"
                style={{
                  width: 240,
                  borderRadius: 4,
                  backgroundColor: "var(--atlas-white)",
                  boxShadow: "var(--atlas-shadow-lg)",
                  border: "1px solid var(--atlas-light-grey)",
                  overflow: "hidden",
                  animation: "mobileMenuFadeIn 0.15s ease-out",
                }}
              >
                {/* User info header */}
                <div
                  className="flex items-center gap-3"
                  style={{ padding: "14px 16px" }}
                >
                  <Avatar size={32} />
                  <div className="flex flex-col gap-1 min-w-0">
                    <span
                      className="font-sans text-[14px] font-semibold truncate"
                      style={{ color: "var(--atlas-black)" }}
                    >
                      {user.displayName}
                    </span>
                    <TierBadge role={user.role} />
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: "var(--atlas-light-grey)" }} />

                {/* Profile link */}
                <Link
                  href="/profile"
                  className="flex items-center gap-3 font-sans text-[14px] cursor-pointer transition-colors duration-150"
                  style={{
                    padding: "12px 16px",
                    fontWeight: 500,
                    color: "var(--atlas-dark-grey)",
                  }}
                  onClick={() => setAvatarMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--atlas-cream)";
                    e.currentTarget.style.color = "var(--atlas-black)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--atlas-dark-grey)";
                  }}
                >
                  <Users className="w-[15px] h-[15px]" />
                  Profile
                </Link>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: "var(--atlas-light-grey)" }} />

                {/* Sign out */}
                <button
                  type="button"
                  className="flex items-center gap-3 font-sans text-[14px] cursor-pointer transition-colors duration-150 w-full"
                  style={{
                    padding: "12px 16px",
                    fontWeight: 500,
                    color: "var(--atlas-dark-grey)",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    fontFamily: "var(--font-ui)",
                  }}
                  onClick={() => {
                    setAvatarMenuOpen(false);
                    signOut();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--atlas-cream)";
                    e.currentTarget.style.color = "var(--atlas-black)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--atlas-dark-grey)";
                  }}
                >
                  <LogOut className="w-[15px] h-[15px]" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hamburger — mobile only */}
        <div ref={menuRef} className="relative md:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-haspopup="true"
            onClick={openMobileMenu}
            className="flex flex-col items-center justify-center w-10 h-10 md:w-9 md:h-9 cursor-pointer rounded"
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
                borderRadius: 4,
                backgroundColor: "var(--atlas-white)",
                boxShadow: "var(--atlas-shadow-lg)",
                border: "1px solid var(--atlas-light-grey)",
                overflow: "hidden",
                animation: "mobileMenuFadeIn 0.15s ease-out",
              }}
            >
              {/* Signed-in user info row at top */}
              {isSignedIn && user && (
                <>
                  <div
                    className="flex items-center gap-3"
                    style={{ padding: "14px 16px" }}
                  >
                    <Avatar size={32} />
                    <div className="flex flex-col gap-1 min-w-0">
                      <span
                        className="font-sans text-[14px] font-semibold truncate"
                        style={{ color: "var(--atlas-black)" }}
                      >
                        {user.displayName}
                      </span>
                      <TierBadge role={user.role} />
                    </div>
                  </div>
                  <div style={{ height: 1, backgroundColor: "var(--atlas-light-grey)" }} />
                </>
              )}

              {/* Navigation links */}
              <nav aria-label="Mobile navigation" className="py-2">
                {navItems.map(({ label, href, icon: Icon, ...rest }) => {
                  const isExternal = "external" in rest && rest.external;
                  const isActive =
                    !isExternal && (href === "/" ? pathname === "/" : pathname.startsWith(href));

                  const commonProps = {
                    className: "flex items-center gap-3 font-sans text-[15px] cursor-pointer transition-colors duration-150",
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

                {/* Profile link (signed in only) */}
                {isSignedIn && (
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 font-sans text-[15px] cursor-pointer transition-colors duration-150"
                    style={{
                      padding: "12px 20px",
                      fontWeight: pathname === "/profile" ? 700 : 500,
                      color: pathname === "/profile"
                        ? "var(--atlas-black)"
                        : "var(--atlas-dark-grey)",
                      backgroundColor: pathname === "/profile"
                        ? "var(--atlas-cream)"
                        : "transparent",
                    }}
                  >
                    <Users className="w-[16px] h-[16px]" />
                    Profile
                  </Link>
                )}
              </nav>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "var(--atlas-light-grey)" }} />

              {/* Action buttons in dropdown */}
              <div className="p-3 flex flex-col gap-2">
                {/* Sign In button (signed out only) */}
                {!isSignedIn && (
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded text-[14px] font-semibold cursor-pointer transition-all duration-150 w-full"
                    style={{
                      padding: "10px 18px",
                      border: "1.5px solid var(--atlas-light-grey)",
                      background: "transparent",
                      color: "var(--atlas-dark-grey)",
                      fontFamily: "var(--font-ui)",
                    }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal();
                    }}
                  >
                    Sign In
                  </button>
                )}

                <button
                  type="button"
                  className="flex items-center justify-center rounded text-[14px] font-semibold text-white cursor-pointer transition-colors duration-150 w-full"
                  style={{
                    padding: "10px 22px",
                    background: "var(--atlas-accent)",
                    border: "none",
                    fontFamily: "var(--font-ui)",
                  }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleContributeClick();
                  }}
                >
                  Contribute
                </button>

                {/* Sign Out button (signed in only) */}
                {isSignedIn && (
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded text-[14px] font-semibold cursor-pointer transition-all duration-150 w-full"
                    style={{
                      padding: "10px 18px",
                      border: "1.5px solid var(--atlas-light-grey)",
                      background: "transparent",
                      color: "var(--atlas-dark-grey)",
                      fontFamily: "var(--font-ui)",
                    }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                  >
                    <LogOut className="w-[14px] h-[14px]" />
                    Sign Out
                  </button>
                )}
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
