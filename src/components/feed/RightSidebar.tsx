"use client";

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
        padding: "24px 16px",
        overflowY: "auto",
      }}
    >
      {/* Trending This Week */}
      <h3
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--atlas-black)",
          marginTop: 0,
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
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
