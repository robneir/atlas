"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Star,
  ArrowUp,
  AlertCircle,
  BookOpen,
  MapPin,
  User,
  Zap,
  Shield,
  Award,
  Lock,
  Check,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/data/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActionItem {
  icon: React.ElementType;
  label: string;
  minRole: UserRole;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROLE_RANK: Record<UserRole, number> = {
  explorer: 0,
  contributor: 1,
  historian: 2,
};

const TIER_BADGE: Record<UserRole, { label: string; bg: string }> = {
  explorer: { label: "Explorer", bg: "var(--atlas-mid-grey)" },
  contributor: { label: "Contributor", bg: "#3b82f6" },
  historian: { label: "Historian", bg: "#f59e0b" },
};

const ACTIONS: ActionItem[] = [
  { icon: Star, label: "Star content you love", minRole: "explorer" },
  { icon: ArrowUp, label: "Upvote & downvote contributions", minRole: "explorer" },
  { icon: AlertCircle, label: "Suggest corrections & report errors", minRole: "explorer" },
  { icon: BookOpen, label: "Create chronicles", minRole: "contributor" },
  { icon: MapPin, label: "Add events to the atlas", minRole: "contributor" },
  { icon: User, label: "Write figure bios", minRole: "contributor" },
  { icon: Zap, label: "Edits go live immediately", minRole: "historian" },
  { icon: Shield, label: "Review community submissions", minRole: "historian" },
  { icon: Award, label: "Curate featured content", minRole: "historian" },
];

/* ------------------------------------------------------------------ */
/*  ContributeModal                                                    */
/* ------------------------------------------------------------------ */

export function ContributeModal({ isOpen, onClose }: ContributeModalProps) {
  const { user, isSignedIn } = useAuth();
  const [animating, setAnimating] = useState(false);

  /* ── Animate on open ───────────────────────────────── */

  useEffect(() => {
    if (isOpen) {
      setAnimating(true);
    }
  }, [isOpen]);

  /* ── Escape key ────────────────────────────────────── */

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* ── Render nothing when closed ────────────────────── */

  if (!isOpen) return null;

  const role: UserRole = user?.role ?? "explorer";
  const badge = TIER_BADGE[role];
  const userRank = ROLE_RANK[role];

  /* ── Helpers ───────────────────────────────────────── */

  function isUnlocked(minRole: UserRole) {
    return ROLE_RANK[minRole] <= userRank;
  }

  /* ── Progression section ───────────────────────────── */

  function renderProgression() {
    if (!user) return null;

    if (role === "explorer") {
      const starredCount = user.stats.starredSuggestions;
      const target = 5;
      const progress = Math.min(starredCount / target, 1);

      return (
        <div style={{ marginTop: 24 }}>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--atlas-charcoal)",
              margin: "0 0 8px 0",
            }}
          >
            {starredCount}/{target} starred suggestions to Contributor
          </p>

          {/* Progress bar */}
          <div
            style={{
              height: 8,
              borderRadius: 4,
              background: "var(--atlas-light-grey)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                borderRadius: 4,
                background: "#3b82f6",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--atlas-mid-grey)",
              margin: "10px 0 0 0",
              lineHeight: 1.4,
            }}
          >
            Keep contributing to unlock more abilities!
          </p>
        </div>
      );
    }

    if (role === "contributor") {
      return (
        <div style={{ marginTop: 24 }}>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--atlas-charcoal)",
              margin: "0 0 10px 0",
            }}
          >
            Apply for Verified Historian status
          </p>

          <ul
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--atlas-mid-grey)",
              margin: "0 0 14px 0",
              paddingLeft: 20,
              lineHeight: 1.7,
            }}
          >
            <li>10+ chronicles published</li>
            <li>100+ stars received on contributions</li>
            <li>Active for 30+ days</li>
            <li>No outstanding moderation flags</li>
          </ul>

          <button
            type="button"
            className="cursor-pointer"
            style={{
              padding: "8px 24px",
              borderRadius: 4,
              border: "2px solid #3b82f6",
              background: "transparent",
              color: "#3b82f6",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-ui)",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3b82f6";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#3b82f6";
            }}
          >
            Apply
          </button>
        </div>
      );
    }

    // historian
    const eventsPreserved = user.stats.totalContributions;
    const chroniclesPublished = user.stats.chroniclesCreated;

    return (
      <div style={{ marginTop: 24 }}>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--atlas-charcoal)",
            margin: "0 0 6px 0",
          }}
        >
          You&apos;ve reached the highest tier.
        </p>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--atlas-mid-grey)",
            margin: "0 0 12px 0",
            lineHeight: 1.5,
          }}
        >
          Your contributions help preserve history for future generations.
        </p>
        <div
          className="flex"
          style={{ gap: 16 }}
        >
          <div
            style={{
              flex: 1,
              background: "var(--atlas-off-white)",
              borderRadius: 4,
              padding: "12px 16px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--atlas-charcoal)",
                margin: 0,
              }}
            >
              {eventsPreserved}
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                color: "var(--atlas-mid-grey)",
                margin: "2px 0 0 0",
              }}
            >
              events preserved
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: "var(--atlas-off-white)",
              borderRadius: 4,
              padding: "12px 16px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--atlas-charcoal)",
                margin: 0,
              }}
            >
              {chroniclesPublished}
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                color: "var(--atlas-mid-grey)",
                margin: "2px 0 0 0",
              }}
            >
              chronicles published
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main render ───────────────────────────────────── */

  return (
    <div
      className="fixed inset-0"
      role="dialog"
      aria-modal="true"
      aria-label="Your Contributions"
      style={{
        zIndex: 200,
        animation: animating ? "searchFadeIn 0.15s ease-out" : undefined,
      }}
      onAnimationEnd={() => setAnimating(false)}
    >
      {/* Glass overlay backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.50)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered card */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 480,
          marginTop: "min(15vh, 120px)",
          background: "var(--atlas-white)",
          borderRadius: 4,
          boxShadow: "var(--atlas-shadow-lg)",
          overflow: "hidden",
          padding: 28,
          animation: animating ? "searchScaleIn 0.15s ease-out" : undefined,
        }}
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute cursor-pointer flex items-center justify-center"
          style={{
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 4,
            border: "none",
            background: "transparent",
            color: "var(--atlas-mid-grey)",
            zIndex: 1,
          }}
        >
          <X size={18} />
        </button>

        {/* Not signed in fallback */}
        {!isSignedIn ? (
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 15,
              color: "var(--atlas-mid-grey)",
              textAlign: "center",
              margin: 0,
            }}
          >
            Please sign in to see your contributions.
          </p>
        ) : (
          <>
            {/* Header: title + tier badge */}
            <div
              className="flex items-center"
              style={{ gap: 12, marginBottom: 20 }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "var(--atlas-black)",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Your Contributions
              </h2>
              <span
                style={{
                  display: "inline-block",
                  padding: "3px 12px",
                  borderRadius: 4,
                  background: badge.bg,
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "var(--font-ui)",
                  lineHeight: 1.5,
                  whiteSpace: "nowrap",
                }}
              >
                {badge.label}
              </span>
            </div>

            {/* Action checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ACTIONS.map((action) => {
                const unlocked = isUnlocked(action.minRole);
                const IconComponent = action.icon;

                return (
                  <div
                    key={action.label}
                    className="flex items-center"
                    style={{
                      gap: 12,
                      opacity: unlocked ? 1 : 0.6,
                    }}
                  >
                    {/* Action icon */}
                    <IconComponent
                      size={20}
                      style={{
                        flexShrink: 0,
                        color: unlocked
                          ? "var(--atlas-charcoal)"
                          : "var(--atlas-mid-grey)",
                      }}
                    />

                    {/* Label */}
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "var(--font-ui)",
                        fontSize: 15,
                        color: unlocked
                          ? "var(--atlas-charcoal)"
                          : "var(--atlas-mid-grey)",
                      }}
                    >
                      {action.label}
                    </span>

                    {/* Status icon */}
                    {unlocked ? (
                      <Check
                        size={18}
                        style={{
                          flexShrink: 0,
                          color: "#22c55e",
                        }}
                      />
                    ) : (
                      <Lock
                        size={18}
                        style={{
                          flexShrink: 0,
                          color: "var(--atlas-mid-grey)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progression section */}
            {renderProgression()}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ContributeModalWrapper                                             */
/*  Self-contained: manages open/close, listens for custom event.      */
/* ------------------------------------------------------------------ */

export function ContributeModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleOpenEvent() {
      setIsOpen(true);
    }

    window.addEventListener("atlas:open-contribute", handleOpenEvent);
    return () => {
      window.removeEventListener("atlas:open-contribute", handleOpenEvent);
    };
  }, []);

  return <ContributeModal isOpen={isOpen} onClose={handleClose} />;
}
