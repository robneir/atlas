"use client";

import Link from "next/link";
import type { Chronicle } from "@/data/types";
import { USERS } from "@/data/users";
import { EraTag } from "@/components/shared/EraTag";
import { StarButton } from "@/components/chronicles/StarButton";

interface ChronicleCardProps {
  chronicle: Chronicle;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "#8b6914",
    "#cd853f",
    "#8b7355",
    "#6b8e6b",
    "#7b9eb8",
    "#8fa4c4",
    "#b088c4",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ChronicleCard({ chronicle }: ChronicleCardProps) {
  const author = USERS.find((u) => u.id === chronicle.authorId);
  const authorName = author?.displayName ?? "Unknown Author";
  const initials = getInitials(authorName);
  const avatarColor = getAvatarColor(authorName);
  const displayTags = chronicle.tags.slice(0, 2);

  return (
    <article
      aria-label={chronicle.title}
      style={{
        background: "var(--atlas-white)",
        borderRadius: 10,
        padding: "20px 24px",
        boxShadow: "var(--atlas-shadow-sm)",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
      className="hover:shadow-[var(--atlas-shadow-md)] hover:-translate-y-[2px]"
    >
      {/* Top row: EraTag + StarButton */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <EraTag era={chronicle.era} />
        <StarButton count={chronicle.stars} />
      </div>

      {/* Title */}
      <Link href={`/chronicles/${chronicle.id}`}>
        <h3
          className="font-serif hover:text-[var(--atlas-accent)]"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--atlas-black)",
            marginTop: 12,
            cursor: "pointer",
            transition: "color 0.2s ease",
            lineHeight: 1.3,
          }}
        >
          {chronicle.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p
        className="font-sans"
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--atlas-dark-grey)",
          marginTop: 8,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {chronicle.excerpt}
      </p>

      {/* Bottom row */}
      <div
        className="font-sans"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        {/* Author avatar */}
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: avatarColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* Author name */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--atlas-charcoal)",
          }}
        >
          {authorName}
        </span>

        {/* Dot separator */}
        <span
          style={{
            color: "var(--atlas-mid-grey)",
            fontSize: 13,
            lineHeight: 1,
          }}
        >
          &middot;
        </span>

        {/* Date */}
        <span
          style={{
            fontSize: 13,
            color: "var(--atlas-mid-grey)",
          }}
        >
          {formatDate(chronicle.createdAt)}
        </span>

        {/* Tags */}
        {displayTags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              color: "var(--atlas-mid-grey)",
              border: "1px solid var(--atlas-light-grey)",
              padding: "2px 8px",
              borderRadius: 999,
              letterSpacing: "0.03em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
