"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface StarButtonProps {
  count: number;
  starred?: boolean;
  onToggle?: () => void;
  itemId?: string;
}

export function StarButton({ count, starred = false, onToggle, itemId }: StarButtonProps) {
  const [hovered, setHovered] = useState(false);
  const { user, isSignedIn, toggleStar, openAuthModal } = useAuth();

  // When itemId is provided, derive star state from auth context
  const isStarredByUser = itemId ? (user?.starredItems.includes(itemId) ?? false) : starred;
  const displayCount = itemId ? count + (isStarredByUser ? 1 : 0) : count;

  const isActive = isStarredByUser || hovered;

  function handleClick() {
    if (itemId) {
      if (!isSignedIn) {
        openAuthModal();
        return;
      }
      toggleStar(itemId);
    } else {
      onToggle?.();
    }
  }

  return (
    <button
      type="button"
      aria-label={`${isStarredByUser ? "Unstar" : "Star"} (${displayCount.toLocaleString()} stars)`}
      aria-pressed={isStarredByUser}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-sans"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        transition: "color 0.15s",
      }}
    >
      <Star
        size={14}
        fill={isStarredByUser ? "var(--atlas-accent)" : "none"}
        stroke={isActive ? "var(--atlas-accent)" : "var(--atlas-mid-grey)"}
        style={{ transition: "all 0.15s" }}
      />
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: isActive ? "var(--atlas-accent)" : "var(--atlas-mid-grey)",
          transition: "color 0.15s",
        }}
      >
        {displayCount.toLocaleString()}
      </span>
    </button>
  );
}
