import { useMemo } from "react";
import { Star, BookOpen, PenTool } from "lucide-react";
import { USERS } from "@/data/users";

export function Leaderboard() {
  const topUsers = useMemo(() => {
    return [...USERS]
      .sort((a, b) => {
        const aTotal =
          a.stats.chronicles + a.stats.contributions;
        const bTotal =
          b.stats.chronicles + b.stats.contributions;
        return bTotal - aTotal;
      })
      .slice(0, 5);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          marginBottom: 20,
        }}
      >
        Top Contributors
      </h2>

      <div
        style={{
          backgroundColor: "var(--atlas-white)",
          borderRadius: 10,
          boxShadow: "var(--atlas-shadow-sm)",
          padding: "4px 20px",
        }}
      >
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "12px 0",
              borderBottom:
                index < topUsers.length - 1
                  ? "1px solid var(--atlas-light-grey)"
                  : "none",
            }}
          >
            {/* Rank */}
            <span
              className="font-sans"
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--atlas-mid-grey)",
                width: 30,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              {index + 1}
            </span>

            {/* Avatar */}
            <div
              className="font-sans"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "var(--atlas-light-grey)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--atlas-dark-grey)",
                flexShrink: 0,
              }}
            >
              {getInitials(user.displayName)}
            </div>

            {/* Name + username */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="font-sans"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--atlas-black)",
                }}
              >
                {user.displayName}
              </div>
              <div
                className="font-sans"
                style={{
                  fontSize: 13,
                  color: "var(--atlas-mid-grey)",
                }}
              >
                @{user.username}
              </div>
            </div>

            {/* Stats */}
            <div
              className="font-sans hidden sm:flex"
              style={{
                gap: 16,
                alignItems: "center",
                fontSize: 13,
                color: "var(--atlas-dark-grey)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <BookOpen size={14} />
                {user.stats.chronicles}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Star size={14} />
                {user.stats.stars.toLocaleString()}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <PenTool size={14} />
                {user.stats.contributions}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
