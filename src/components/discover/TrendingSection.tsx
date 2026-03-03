"use client";

import { useMemo } from "react";
import { Star } from "lucide-react";
import { CHRONICLES } from "@/data/chronicles";
import { USERS } from "@/data/users";
import { ERA_CONFIG } from "@/lib/eras";

export function TrendingSection() {
  const topChronicles = useMemo(() => {
    return [...CHRONICLES].sort((a, b) => b.stars - a.stars).slice(0, 4);
  }, []);

  const getUserName = (authorId: string) => {
    const user = USERS.find((u) => u.id === authorId);
    return user?.displayName ?? "Unknown";
  };

  return (
    <section style={{ marginBottom: 48 }}>
      <h2
        className="font-accent"
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 4,
        }}
      >
        Trending Chronicles
      </h2>
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          color: "var(--atlas-mid-grey)",
          margin: 0,
          marginBottom: 20,
        }}
      >
        This week&apos;s most popular stories
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingBottom: 4,
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {topChronicles.map((chronicle, index) => {
          const eraColor = ERA_CONFIG[chronicle.era].color;
          return (
            <div
              key={chronicle.id}
              className="atlas-card-stagger"
              style={{
                animationDelay: `${index * 80}ms`,
                minWidth: 300,
                maxWidth: 300,
                backgroundColor: "var(--atlas-white)",
                borderRadius: 10,
                boxShadow: "var(--atlas-shadow-sm)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--atlas-shadow-sm)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Era color stripe */}
              <div
                style={{
                  height: 4,
                  backgroundColor: eraColor,
                }}
              />

              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h3
                  className="font-serif"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--atlas-black)",
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  {chronicle.title}
                </h3>

                <p
                  className="font-sans"
                  style={{
                    fontSize: 14,
                    color: "var(--atlas-dark-grey)",
                    margin: 0,
                    marginBottom: 16,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {chronicle.excerpt}
                </p>

                <div
                  className="font-sans"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 13,
                    color: "var(--atlas-mid-grey)",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Star size={14} fill="currentColor" />
                    {chronicle.stars.toLocaleString()}
                  </span>
                  <span>{getUserName(chronicle.authorId)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
