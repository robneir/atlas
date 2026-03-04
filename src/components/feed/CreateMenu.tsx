"use client";

import { useRef, useEffect } from "react";
import {
  Pen,
  BookOpen,
  Box,
  MapPin,
  Swords,
  FileText,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface CreateMenuProps {
  open: boolean;
  onClose: () => void;
  dropDown?: boolean;
}

const menuItems = [
  { label: "Write a Thought", icon: Pen },
  { label: "Publish a Chronicle", icon: BookOpen },
  { label: "Share a Recreation", icon: Box },
  { label: "Add a Map Annotation", icon: MapPin },
  { label: "Start a Debate", icon: Swords },
  { label: "Share a Source", icon: FileText },
  { label: "Submit a Correction", icon: Pencil },
] as const;

export function CreateMenu({ open, onClose, dropDown }: CreateMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, openAuthModal } = useAuth();

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  function handleItemClick() {
    if (!isSignedIn) {
      openAuthModal();
    } else {
      alert("Coming soon!");
    }
    onClose();
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        ...(dropDown
          ? { top: "100%", right: 0, marginTop: 8, minWidth: 220 }
          : { bottom: "100%", left: 0, right: 0, marginBottom: 8 }),
        backgroundColor: "var(--atlas-white)",
        border: "1px solid var(--atlas-light-grey)",
        borderRadius: 4,
        boxShadow: "var(--atlas-shadow-lg)",
        padding: 8,
        zIndex: 50,
      }}
    >
      {menuItems.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          onClick={handleItemClick}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 4,
            cursor: "pointer",
            width: "100%",
            background: "none",
            border: "none",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--atlas-cream)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Icon
            size={16}
            style={{ color: "var(--atlas-dark-grey)", flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--atlas-charcoal)",
            }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
