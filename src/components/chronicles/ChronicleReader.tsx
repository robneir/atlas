"use client";

import Link from "next/link";
import type { Chronicle, User } from "@/data/types";
import { EraTag } from "@/components/shared/EraTag";
import { StarButton } from "@/components/chronicles/StarButton";
import { ChronicleCard } from "@/components/chronicles/ChronicleCard";

interface ChronicleReaderProps {
  chronicle: Chronicle;
  author: User;
  relatedChronicles: Chronicle[];
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
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function renderContentParagraphs(content: string) {
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0);

  return paragraphs.map((paragraph, index) => {
    const trimmed = paragraph.trim();

    // Skip markdown headings (## Title etc.) since we already show the title
    if (trimmed.startsWith("#")) {
      return null;
    }

    // Render bold (**text**) as <strong> elements
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} style={{ fontWeight: 700, color: "var(--atlas-black)" }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    return (
      <p
        key={index}
        className="font-sans text-[16px] md:text-[18px]"
        style={{
          lineHeight: 1.75,
          color: "var(--atlas-charcoal)",
          marginBottom: 24,
          margin: 0,
          paddingBottom: 24,
        }}
      >
        {rendered}
      </p>
    );
  });
}

export function ChronicleReader({
  chronicle,
  author,
  relatedChronicles,
}: ChronicleReaderProps) {
  const initials = getInitials(author.displayName);
  const avatarColor = getAvatarColor(author.displayName);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--atlas-cream)",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "40px 16px 100px",
        }}
        className="md:!px-7 md:!pt-[60px] md:!pb-[120px]"
      >
        {/* Back link */}
        <Link
          href="/chronicles"
          className="font-sans"
          style={{
            fontSize: 14,
            color: "var(--atlas-link)",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: 40,
            transition: "opacity 0.15s",
          }}
        >
          &larr; Back to Chronicles
        </Link>

        {/* Era + Date row */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <EraTag era={chronicle.era} />
          <span
            className="font-sans"
            style={{
              fontSize: 13,
              color: "var(--atlas-mid-grey)",
            }}
          >
            {formatShortDate(chronicle.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-serif text-[26px] md:text-[36px]"
          style={{
            fontWeight: 700,
            color: "var(--atlas-black)",
            marginTop: 16,
            marginBottom: 0,
            lineHeight: 1.2,
          }}
        >
          {chronicle.title}
        </h1>

        {/* Author info */}
        <div
          className="flex flex-wrap items-center gap-3"
          style={{
            marginTop: 20,
            paddingBottom: 24,
            borderBottom: "1px solid var(--atlas-light-grey)",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          {/* Author name */}
          <span
            className="font-sans"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--atlas-charcoal)",
            }}
          >
            {author.displayName}
          </span>

          {/* Star count */}
          <StarButton count={chronicle.stars} />

          {/* Published date */}
          <span
            className="font-sans"
            style={{
              fontSize: 13,
              color: "var(--atlas-mid-grey)",
              marginLeft: "auto",
            }}
          >
            Published {formatDate(chronicle.createdAt)}
          </span>
        </div>

        {/* Content body */}
        <div style={{ marginTop: 32 }}>{renderContentParagraphs(chronicle.content)}</div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid var(--atlas-light-grey)",
            flexWrap: "wrap",
          }}
        >
          {chronicle.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans"
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--atlas-mid-grey)",
                border: "1px solid var(--atlas-light-grey)",
                padding: "4px 12px",
                borderRadius: 4,
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Chronicles */}
        {relatedChronicles.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2
              className="font-accent"
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--atlas-black)",
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Related Chronicles
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {relatedChronicles.map((related) => (
                <ChronicleCard key={related.id} chronicle={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
