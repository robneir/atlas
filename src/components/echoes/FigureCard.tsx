"use client";

import Link from "next/link";
import type { HistoricalFigure } from "@/data/types";
import { ERA_CONFIG } from "@/lib/eras";
import { EraTag } from "@/components/shared/EraTag";

interface FigureCardProps {
  figure: HistoricalFigure;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  return `${year} AD`;
}

export function FigureCard({ figure }: FigureCardProps) {
  const eraColor = ERA_CONFIG[figure.era].color;
  const initials = getInitials(figure.name);

  return (
    <Link href={`/echoes/${figure.id}`} aria-label={`Chat with ${figure.name} — ${figure.title}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--atlas-white)",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "var(--atlas-shadow-sm)",
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
        className="hover:shadow-[var(--atlas-shadow-md)] hover:-translate-y-[2px]"
      >
        {/* Portrait area */}
        <div
          style={{
            height: 200,
            background: `linear-gradient(135deg, ${eraColor}cc, ${eraColor}88, ${eraColor}55)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {figure.portraitUrl ? (
            <img
              src={figure.portraitUrl}
              alt={figure.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span
              className="font-serif"
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#fff",
                userSelect: "none",
              }}
            >
              {initials}
            </span>
          )}
        </div>

        {/* Info area */}
        <div style={{ padding: "16px 20px" }}>
          <h3
            className="font-serif"
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--atlas-black)",
              margin: 0,
            }}
          >
            {figure.name}
          </h3>

          <p
            className="font-sans"
            style={{
              fontSize: 14,
              color: "var(--atlas-dark-grey)",
              margin: 0,
              marginTop: 4,
            }}
          >
            {figure.title}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <EraTag era={figure.era} />
            <span
              className="font-sans"
              style={{
                fontSize: 12,
                color: "var(--atlas-mid-grey)",
                fontWeight: 500,
              }}
            >
              {formatYear(figure.birthYear)} &ndash;{" "}
              {formatYear(figure.deathYear)}
            </span>
          </div>

          <p
            className="font-sans"
            style={{
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--atlas-dark-grey)",
              marginTop: 8,
              marginBottom: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {figure.bio}
          </p>
        </div>
      </div>
    </Link>
  );
}
