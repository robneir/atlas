"use client";

import { Search } from "lucide-react";
import { FEED_POSTS } from "@/data/feed-posts";
import { USERS } from "@/data/users";

/** Map post type to a small icon/label for the trending section */
function postTypeLabel(type: string): string {
  switch (type) {
    case "thought":
      return "Thought";
    case "chronicle":
      return "Chronicle";
    case "recreation":
      return "Recreation";
    case "map-annotation":
      return "Annotation";
    case "debate":
      return "Debate";
    case "source":
      return "Source";
    case "correction":
      return "Correction";
    case "team":
      return "Team";
    default:
      return type;
  }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "...";
}

export function RightSidebar() {
  // Top 4 posts by score
  const trendingPosts = [...FEED_POSTS]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  // Top 5 users by stars
  const topContributors = [...USERS]
    .sort((a, b) => b.stats.stars - a.stats.stars)
    .slice(0, 5);

  return (
    <aside
      className="hidden xl:flex flex-col"
      style={{
        position: "fixed",
        top: 54,
        right: 0,
        width: 300,
        height: "calc(100vh - 54px)",
        zIndex: 40,
        backgroundColor: "var(--atlas-white)",
        borderLeft: "1px solid var(--atlas-light-grey)",
        padding: 16,
        overflowY: "auto",
      }}
    >
      {/* Search button */}
      <button
        type="button"
        onClick={() => {
          window.dispatchEvent(new CustomEvent("atlas:open-search"));
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "10px 14px",
          borderRadius: 4,
          border: "1px solid var(--atlas-light-grey)",
          backgroundColor: "transparent",
          cursor: "pointer",
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
        }}
      >
        <Search
          size={16}
          style={{ color: "var(--atlas-mid-grey)", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--atlas-mid-grey)",
          }}
        >
          Search Atlas...
        </span>
      </button>

      {/* Trending This Week */}
      <h3
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--atlas-black)",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Trending This Week
      </h3>
      <div>
        {trendingPosts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: 10,
              borderBottom: "1px solid var(--atlas-light-grey)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--atlas-charcoal)",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {truncate(post.title || post.content, 60)}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--atlas-accent)",
                  flexShrink: 0,
                }}
              >
                {post.score}
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--atlas-mid-grey)",
                marginTop: 4,
                display: "inline-block",
              }}
            >
              {postTypeLabel(post.type)}
            </span>
          </div>
        ))}
      </div>

      {/* Top Contributors */}
      <h3
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--atlas-black)",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Top Contributors
      </h3>
      <div>
        {topContributors.map((user) => (
          <div
            key={user.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
            }}
          >
            {/* Avatar initial circle */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "var(--atlas-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "var(--font-ui)",
                flexShrink: 0,
              }}
            >
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                flex: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--atlas-charcoal)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.displayName}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 11,
                  color: "var(--atlas-mid-grey)",
                }}
              >
                {user.stats.stars.toLocaleString()} stars
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
