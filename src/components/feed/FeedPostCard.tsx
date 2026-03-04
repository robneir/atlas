"use client";

import {
  MapPin,
  BookOpen,
  Play,
  Swords,
  FileText,
  Pencil,
  Globe,
  MessageCircle,
  Share2,
  Clock,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { VoteButtons } from "@/components/shared/VoteButtons";
import { EraTag } from "@/components/shared/EraTag";
import { USERS } from "@/data/users";
import type { FeedPost, FeedPostType, User } from "@/data/types";

/* ── Helpers ──────────────────────────────────────────── */

function formatRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diff = Math.floor((now - then) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function getUserRole(user: User): {
  label: string;
  color: string;
} {
  if (user.stats.chronicles >= 15) return { label: "Historian", color: "#f59e0b" };
  if (user.stats.chronicles >= 5) return { label: "Contributor", color: "#3b82f6" };
  return { label: "Explorer", color: "var(--atlas-mid-grey)" };
}

const TYPE_BADGE_CONFIG: Record<
  Exclude<FeedPostType, "thought">,
  { label: string; color: string }
> = {
  chronicle: { label: "CHRONICLE", color: "#3b82f6" },
  recreation: { label: "RECREATION", color: "#8b5cf6" },
  "map-annotation": { label: "MAP ANNOTATION", color: "#10b981" },
  debate: { label: "DEBATE", color: "#f59e0b" },
  source: { label: "SOURCE", color: "#6366f1" },
  correction: { label: "CORRECTION", color: "#64748b" },
  team: { label: "ATLAS TEAM", color: "var(--atlas-accent)" },
};

/* ── Sub-renderers ────────────────────────────────────── */

function ThoughtContent({ post }: { post: FeedPost }) {
  return (
    <div>
      <p
        className="font-sans"
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--atlas-charcoal)" }}
      >
        {post.content}
      </p>
      {post.media?.type === "image" && (
        <div
          style={{
            marginTop: 12,
            borderRadius: 4,
            overflow: "hidden",
            maxHeight: 400,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.media.url}
            alt=""
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              display: "block",
              borderRadius: 4,
            }}
          />
        </div>
      )}
    </div>
  );
}

function ChronicleContent({ post }: { post: FeedPost }) {
  return (
    <div
      style={{
        background: "var(--atlas-cream)",
        border: "1px solid var(--atlas-light-grey)",
        borderRadius: 4,
        padding: 16,
      }}
    >
      <h3
        className="font-serif"
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 8,
        }}
      >
        {post.title}
      </h3>
      <div className="flex items-center gap-3 flex-wrap" style={{ marginBottom: 10 }}>
        {post.metadata?.readTime && (
          <span
            className="flex items-center gap-1 font-sans"
            style={{ fontSize: 12, color: "var(--atlas-mid-grey)" }}
          >
            <Clock size={12} />
            {post.metadata.readTime}
          </span>
        )}
        {post.metadata?.era && <EraTag era={post.metadata.era} />}
        <span
          className="font-sans"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--atlas-link)",
            cursor: "pointer",
          }}
        >
          Read more &rarr;
        </span>
      </div>
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--atlas-dark-grey)",
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.content}
      </p>
    </div>
  );
}

function RecreationContent({ post }: { post: FeedPost }) {
  const mediaLabel =
    post.media?.type === "3d" ? "3D Experience" : post.media?.type === "video" ? "AI Video" : "Media";

  return (
    <div>
      {/* Gradient placeholder with play icon */}
      <div
        style={{
          height: 200,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <Play size={28} style={{ color: "#fff", marginLeft: 3 }} />
        </div>
      </div>

      <h3
        className="font-serif"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 4,
        }}
      >
        {post.title}
      </h3>
      <span
        className="font-sans"
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#8b5cf6",
          marginBottom: 8,
          display: "inline-block",
        }}
      >
        {mediaLabel}
      </span>
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--atlas-dark-grey)",
          margin: 0,
        }}
      >
        {post.content}
      </p>
    </div>
  );
}

function MapAnnotationContent({ post }: { post: FeedPost }) {
  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 10 }}>
        <MapPin size={16} style={{ color: "#10b981" }} />
        {post.metadata?.location && (
          <span
            className="font-sans"
            style={{ fontSize: 13, fontWeight: 600, color: "var(--atlas-charcoal)" }}
          >
            {post.metadata.location}
          </span>
        )}
        {post.metadata?.era && <EraTag era={post.metadata.era} />}
      </div>
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--atlas-dark-grey)",
          margin: 0,
          marginBottom: 10,
        }}
      >
        {post.content}
      </p>
      <span
        className="font-sans"
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--atlas-link)",
          cursor: "pointer",
        }}
      >
        View on Map &rarr;
      </span>
    </div>
  );
}

function DebateContent({ post }: { post: FeedPost }) {
  const pollFor = post.metadata?.pollFor ?? 0;
  const pollAgainst = post.metadata?.pollAgainst ?? 0;
  const total = pollFor + pollAgainst || 1;
  const forPct = Math.round((pollFor / total) * 100);
  const againstPct = 100 - forPct;

  return (
    <div>
      <h3
        className="font-serif"
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 12,
        }}
      >
        {post.title}
      </h3>

      {/* Poll bar */}
      <div
        style={{
          display: "flex",
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 6,
        }}
      >
        <div style={{ width: `${forPct}%`, background: "#22c55e" }} />
        <div style={{ width: `${againstPct}%`, background: "#ef4444" }} />
      </div>
      <div
        className="flex justify-between font-sans"
        style={{ fontSize: 12, marginBottom: 12 }}
      >
        <span style={{ color: "#22c55e", fontWeight: 600 }}>For: {forPct}%</span>
        <span style={{ color: "#ef4444", fontWeight: 600 }}>Against: {againstPct}%</span>
      </div>

      <div className="flex items-center gap-3 font-sans" style={{ fontSize: 13 }}>
        <span style={{ color: "var(--atlas-mid-grey)" }}>
          <Swords size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />
          {post.metadata?.argumentCount ?? 0} arguments
        </span>
        <span
          style={{
            fontWeight: 600,
            color: "var(--atlas-link)",
            cursor: "pointer",
          }}
        >
          Join the debate &rarr;
        </span>
      </div>
    </div>
  );
}

function SourceContent({ post }: { post: FeedPost }) {
  return (
    <div
      style={{
        background: "var(--atlas-cream)",
        border: "1px solid var(--atlas-light-grey)",
        borderRadius: 4,
        padding: 16,
      }}
    >
      <h3
        className="font-sans"
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 6,
        }}
      >
        <FileText
          size={14}
          style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }}
        />
        {post.title}
      </h3>
      {(post.metadata?.sourceType || post.metadata?.sourceOrigin) && (
        <p
          className="font-sans"
          style={{
            fontSize: 12,
            color: "var(--atlas-mid-grey)",
            margin: 0,
            marginBottom: 8,
          }}
        >
          {post.metadata.sourceType && (
            <span style={{ textTransform: "capitalize" }}>
              {post.metadata.sourceType}
            </span>
          )}
          {post.metadata.sourceType && post.metadata.sourceOrigin && " · "}
          {post.metadata.sourceOrigin}
        </p>
      )}
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--atlas-dark-grey)",
          margin: 0,
        }}
      >
        {post.content}
      </p>
    </div>
  );
}

function CorrectionContent({ post }: { post: FeedPost }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        border: "1px solid var(--atlas-light-grey)",
        borderRadius: 4,
        padding: 16,
      }}
    >
      {post.metadata?.correctedField && (
        <p
          className="font-sans"
          style={{
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#64748b",
            margin: 0,
            marginBottom: 8,
          }}
        >
          <Pencil
            size={12}
            style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }}
          />
          Corrected: {post.metadata.correctedField}
        </p>
      )}

      {post.metadata?.oldValue && post.metadata?.newValue && (
        <div
          className="font-sans"
          style={{ fontSize: 14, marginBottom: 10, lineHeight: 1.6 }}
        >
          <span
            style={{
              textDecoration: "line-through",
              color: "#ef4444",
              opacity: 0.7,
            }}
          >
            {post.metadata.oldValue}
          </span>
          <span style={{ margin: "0 8px", color: "var(--atlas-mid-grey)" }}>&rarr;</span>
          <span style={{ color: "#22c55e", fontWeight: 600 }}>
            {post.metadata.newValue}
          </span>
        </div>
      )}

      <p
        className="font-sans"
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--atlas-dark-grey)",
          margin: 0,
        }}
      >
        {post.content}
      </p>
    </div>
  );
}

function TeamContent({ post }: { post: FeedPost }) {
  return (
    <div>
      {post.title && (
        <h3
          className="font-serif"
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "var(--atlas-black)",
            margin: 0,
            marginBottom: 8,
          }}
        >
          {post.title}
        </h3>
      )}
      <p
        className="font-sans"
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--atlas-charcoal)" }}
      >
        {post.content}
      </p>
      {post.media?.type === "image" && (
        <div
          style={{
            marginTop: 12,
            borderRadius: 4,
            overflow: "hidden",
            maxHeight: 400,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.media.url}
            alt=""
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              display: "block",
              borderRadius: 4,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ── Content dispatcher ───────────────────────────────── */

function PostContent({ post }: { post: FeedPost }) {
  switch (post.type) {
    case "thought":
      return <ThoughtContent post={post} />;
    case "chronicle":
      return <ChronicleContent post={post} />;
    case "recreation":
      return <RecreationContent post={post} />;
    case "map-annotation":
      return <MapAnnotationContent post={post} />;
    case "debate":
      return <DebateContent post={post} />;
    case "source":
      return <SourceContent post={post} />;
    case "correction":
      return <CorrectionContent post={post} />;
    case "team":
      return <TeamContent post={post} />;
    default:
      return null;
  }
}

/* ── Main Component ───────────────────────────────────── */

interface FeedPostCardProps {
  post: FeedPost;
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  /* Resolve author */
  const author = USERS.find((u) => u.id === post.authorId);
  const displayName = post.isTeam ? "Atlas Team" : (author?.displayName ?? "Unknown");
  const role = author ? getUserRole(author) : { label: "Explorer", color: "var(--atlas-mid-grey)" };

  /* Type badge */
  const showTypeBadge = post.type !== "thought";
  const badgeConfig = showTypeBadge
    ? TYPE_BADGE_CONFIG[post.type as Exclude<FeedPostType, "thought">]
    : null;

  return (
    <article
      style={{
        background: "var(--atlas-white)",
        boxShadow: "var(--atlas-shadow-sm)",
        borderRadius: 4,
        padding: 20,
        marginBottom: 12,
        border: "1px solid var(--atlas-light-grey)",
      }}
    >
      {/* ── Header ────────────────────────────────────── */}
      <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
        {/* Avatar */}
        {post.isTeam ? (
          <div
            className="flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--atlas-accent)",
              flexShrink: 0,
            }}
          >
            <Globe size={20} style={{ color: "#fff" }} />
          </div>
        ) : (
          <div
            className="flex items-center justify-center font-sans"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--atlas-accent)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              flexShrink: 0,
              textTransform: "uppercase",
            }}
          >
            {displayName.charAt(0)}
          </div>
        )}

        <div className="flex flex-col" style={{ minWidth: 0, flex: 1 }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-sans"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--atlas-black)",
              }}
            >
              {displayName}
            </span>

            {post.isTeam ? (
              <span
                className="flex items-center gap-1 font-sans"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: "color-mix(in srgb, var(--atlas-accent) 12%, transparent)",
                  color: "var(--atlas-accent)",
                }}
              >
                Official
                <CheckCircle size={10} />
              </span>
            ) : (
              <span
                className="font-sans"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 4,
                  backgroundColor: `${role.color}18`,
                  color: role.color,
                }}
              >
                {role.label}
              </span>
            )}

            <span
              className="font-sans"
              style={{ fontSize: 13, color: "var(--atlas-mid-grey)" }}
            >
              {formatRelativeTime(post.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Type badge ────────────────────────────────── */}
      {showTypeBadge && badgeConfig && (
        <div style={{ marginBottom: 10 }}>
          <span
            className="font-sans"
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "3px 10px",
              borderRadius: 4,
              backgroundColor: `${badgeConfig.color}18`,
              color: badgeConfig.color,
            }}
          >
            {badgeConfig.label}
          </span>
        </div>
      )}

      {/* ── Content area ──────────────────────────────── */}
      <div style={{ marginBottom: 14 }}>
        <PostContent post={post} />
      </div>

      {/* ── Footer ────────────────────────────────────── */}
      <div
        className="flex items-center gap-4"
        style={{ borderTop: "1px solid var(--atlas-light-grey)", paddingTop: 12 }}
      >
        <VoteButtons itemId={post.id} initialScore={post.score} />

        <button
          type="button"
          className="flex items-center gap-1.5 font-sans"
          style={{
            fontSize: 13,
            color: "var(--atlas-mid-grey)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 4,
          }}
        >
          <MessageCircle size={15} />
          {post.commentCount}
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 font-sans"
          style={{
            fontSize: 13,
            color: "var(--atlas-mid-grey)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 4,
          }}
        >
          <Share2 size={15} />
          Share
        </button>
      </div>
    </article>
  );
}
