"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface VoteButtonsProps {
  itemId: string;
  initialScore?: number;
}

export function VoteButtons({ itemId, initialScore = 1 }: VoteButtonsProps) {
  const { user, isSignedIn, castVote, openAuthModal } = useAuth();

  const userVote = user?.votes[itemId] ?? null;

  const displayedScore =
    initialScore + (userVote === "up" ? 1 : userVote === "down" ? -1 : 0);

  function handleVote(direction: "up" | "down") {
    if (!isSignedIn) {
      openAuthModal();
      return;
    }
    castVote(itemId, direction);
  }

  const upColor =
    userVote === "up" ? "var(--atlas-accent)" : "var(--atlas-mid-grey)";
  const downColor =
    userVote === "down" ? "#6366f1" : "var(--atlas-mid-grey)";
  const scoreColor =
    userVote === "up"
      ? "var(--atlas-accent)"
      : userVote === "down"
        ? "#6366f1"
        : "var(--atlas-charcoal)";

  return (
    <div
      className="flex flex-col items-center gap-0"
      style={{ width: 32 }}
    >
      <button
        type="button"
        aria-label={userVote === "up" ? "Remove upvote" : "Upvote"}
        onClick={() => handleVote("up")}
        className="flex items-center justify-center rounded hover:opacity-75"
        style={{
          color: upColor,
          transition: "color 0.15s",
          background: "none",
          border: "none",
          padding: 2,
          cursor: "pointer",
        }}
      >
        <ChevronUp size={18} />
      </button>

      <span
        className="font-sans font-semibold select-none"
        style={{
          fontSize: 14,
          lineHeight: "20px",
          color: scoreColor,
          transition: "color 0.15s",
        }}
      >
        {displayedScore}
      </span>

      <button
        type="button"
        aria-label={userVote === "down" ? "Remove downvote" : "Downvote"}
        onClick={() => handleVote("down")}
        className="flex items-center justify-center rounded hover:opacity-75"
        style={{
          color: downColor,
          transition: "color 0.15s",
          background: "none",
          border: "none",
          padding: 2,
          cursor: "pointer",
        }}
      >
        <ChevronDown size={18} />
      </button>
    </div>
  );
}
