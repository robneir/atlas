"use client";

import { Layers, Star, Flame, TrendingUp } from "lucide-react";

interface StatCardsProps {
  stats: {
    totalContributions: number;
    starsReceived: number;
    currentStreak: number;
    votesCast: number;
  };
}

export default function StatCards({ stats }: StatCardsProps) {
  const rank = Math.max(1, 100 - Math.floor(stats.totalContributions / 10));

  const cards = [
    {
      icon: Layers,
      value: stats.totalContributions.toLocaleString(),
      label: "Contributions",
    },
    {
      icon: Star,
      value: stats.starsReceived.toLocaleString(),
      label: "Stars Received",
    },
    {
      icon: Flame,
      value: `${stats.currentStreak} days`,
      label: "Current Streak",
    },
    {
      icon: TrendingUp,
      value: `#${rank}`,
      label: "Community Rank",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            backgroundColor: "var(--atlas-white)",
            borderRadius: 10,
            padding: 20,
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <card.icon
            size={24}
            style={{ color: "var(--atlas-mid-grey)", margin: "0 auto 8px" }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "var(--atlas-black)",
              lineHeight: 1.2,
            }}
          >
            {card.value}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--atlas-mid-grey)",
              marginTop: 4,
            }}
          >
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}
