"use client";

import { useState } from "react";
import {
  ArrowUp,
  Star,
  Flame,
  BookOpen,
  Award,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { MILESTONES } from "@/data/milestones";

interface MilestoneBadgesProps {
  earnedMilestones: string[];
  stats: {
    totalContributions: number;
    starsReceived: number;
    votesCast: number;
    currentStreak: number;
    chroniclesCreated: number;
  };
}

const ICON_MAP: Record<string, LucideIcon> = {
  ArrowUp,
  Star,
  Flame,
  BookOpen,
  Award,
  Shield,
};

const STAT_FIELD_MAP: Record<string, string> = {
  votesCast: "votesCast",
  starsReceived: "starsReceived",
  currentStreak: "currentStreak",
  chroniclesCreated: "chroniclesCreated",
};

export default function MilestoneBadges({
  earnedMilestones,
  stats,
}: MilestoneBadgesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      style={{
        backgroundColor: "var(--atlas-white)",
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        className="font-accent"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: "0 0 16px",
        }}
      >
        Milestones
      </h3>

      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {MILESTONES.map((milestone) => {
          const earned = earnedMilestones.includes(milestone.id);
          const Icon = ICON_MAP[milestone.icon] ?? Award;

          // Calculate "X more needed" for unearned milestones with thresholds
          let thresholdInfo = "";
          if (!earned && milestone.threshold && milestone.field) {
            const fieldKey = STAT_FIELD_MAP[milestone.field];
            const current =
              fieldKey && fieldKey in stats
                ? stats[fieldKey as keyof typeof stats]
                : 0;
            const remaining = Math.max(0, milestone.threshold - current);
            if (remaining > 0) {
              thresholdInfo = `${remaining} more ${milestone.field === "votesCast" ? "votes" : milestone.field === "starsReceived" ? "stars" : milestone.field === "currentStreak" ? "streak days" : "chronicles"} needed`;
            }
          }

          return (
            <div
              key={milestone.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
              onMouseEnter={() => setHoveredId(milestone.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Badge circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.15s ease",
                  transform:
                    hoveredId === milestone.id ? "scale(1.1)" : "scale(1)",
                  ...(earned
                    ? {
                        backgroundColor: "var(--atlas-accent)",
                        boxShadow: "0 0 12px rgba(209,64,31,0.3)",
                      }
                    : {
                        backgroundColor: "var(--atlas-cream)",
                        opacity: 0.5,
                      }),
                }}
              >
                <Icon
                  size={20}
                  style={{
                    color: earned ? "#ffffff" : "var(--atlas-mid-grey)",
                  }}
                />
              </div>

              {/* CSS-only tooltip on hover */}
              {hoveredId === milestone.id && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--atlas-charcoal)",
                    color: "#fff",
                    fontSize: 11,
                    padding: "6px 10px",
                    borderRadius: 6,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 20,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{milestone.label}</div>
                  <div style={{ opacity: 0.85 }}>{milestone.description}</div>
                  {!earned && thresholdInfo && (
                    <div
                      style={{
                        marginTop: 2,
                        opacity: 0.7,
                        fontStyle: "italic",
                      }}
                    >
                      {thresholdInfo}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
