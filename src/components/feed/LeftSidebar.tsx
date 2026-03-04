"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Globe,
  BookOpen,
  MessageCircle,
  Compass,
  User,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { CreateMenu } from "./CreateMenu";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Map", href: "/map", icon: Globe },
  { label: "Chronicles", href: "/chronicles", icon: BookOpen },
  { label: "Echoes", href: "/echoes", icon: MessageCircle },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Profile", href: "/profile", icon: User },
] as const;

export function LeftSidebar() {
  const pathname = usePathname();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <aside
      className="hidden lg:flex flex-col"
      style={{
        position: "fixed",
        top: 54,
        left: 0,
        width: 220,
        height: "calc(100vh - 54px)",
        zIndex: 40,
        backgroundColor: "var(--atlas-white)",
        borderRight: "1px solid var(--atlas-light-grey)",
        padding: "16px 12px",
      }}
    >
      <nav>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 4,
                fontSize: 15,
                fontWeight: isActive ? 700 : 500,
                fontFamily: "var(--font-ui)",
                color: isActive
                  ? "var(--atlas-black)"
                  : "var(--atlas-dark-grey)",
                backgroundColor: isActive
                  ? "var(--atlas-cream)"
                  : "transparent",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor =
                    "var(--atlas-cream)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Create button pushed to bottom */}
      <div style={{ marginTop: "auto", position: "relative" }}>
        <CreateMenu
          open={showCreateMenu}
          onClose={() => setShowCreateMenu(false)}
        />
        <button
          type="button"
          onClick={() => setShowCreateMenu((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            backgroundColor: "var(--atlas-accent)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            fontFamily: "var(--font-ui)",
            borderRadius: 4,
            padding: "12px 16px",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--atlas-accent-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--atlas-accent)";
          }}
        >
          <Plus size={18} />
          Create
        </button>
      </div>
    </aside>
  );
}
