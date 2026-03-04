import { MapPin, Calendar } from "lucide-react";
import type { User, AuthUser, UserRole } from "@/data/types";

interface ProfileHeaderProps {
  user: User;
  authUser?: AuthUser | null;
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

function formatJoinDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

const TIER_CONFIG: Record<UserRole, { label: string; color: string }> = {
  explorer: { label: "Explorer", color: "var(--atlas-mid-grey)" },
  contributor: { label: "Contributor", color: "#3b82f6" },
  historian: { label: "Historian", color: "#f59e0b" },
};

function TierBadge({ role }: { role: UserRole }) {
  const tier = TIER_CONFIG[role];
  return (
    <span
      className="font-sans"
      style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        color: "#fff",
        backgroundColor: tier.color,
        padding: "3px 10px",
        borderRadius: 4,
        marginLeft: 10,
        verticalAlign: "middle",
        lineHeight: 1.4,
      }}
    >
      {tier.label}
    </span>
  );
}

function TierProgressionCard({ authUser }: { authUser: AuthUser }) {
  const role = authUser.role;
  const tier = TIER_CONFIG[role];

  return (
    <div
      className="font-sans"
      style={{
        backgroundColor: "var(--atlas-white)",
        borderRadius: 4,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        padding: 20,
        marginTop: 24,
      }}
    >
      {/* Current tier indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: tier.color,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--atlas-black)",
          }}
        >
          {tier.label}
        </span>
      </div>

      {role === "explorer" && (
        <ExplorerProgression authUser={authUser} />
      )}
      {role === "contributor" && (
        <ContributorProgression authUser={authUser} />
      )}
      {role === "historian" && (
        <HistorianMaxTier authUser={authUser} />
      )}
    </div>
  );
}

function ExplorerProgression({ authUser }: { authUser: AuthUser }) {
  const starred = authUser.stats.starredSuggestions;
  const target = 5;
  const pct = Math.min((starred / target) * 100, 100);

  return (
    <>
      <p
        style={{
          fontSize: 13,
          color: "var(--atlas-dark-grey)",
          margin: 0,
          marginBottom: 10,
        }}
      >
        {starred}/{target} starred suggestions to Contributor
      </p>

      {/* Progress bar */}
      <div
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "var(--atlas-light-grey)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 4,
            backgroundColor: "#3b82f6",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--atlas-mid-grey)",
          margin: 0,
          marginTop: 10,
        }}
      >
        Keep exploring and contributing to unlock more abilities!
      </p>
    </>
  );
}

function ContributorProgression({ authUser }: { authUser: AuthUser }) {
  const chronicles = authUser.stats.chroniclesCreated;
  const starsReceived = authUser.stats.starsReceived;

  return (
    <>
      <p
        style={{
          fontSize: 13,
          color: "var(--atlas-dark-grey)",
          margin: 0,
          marginBottom: 8,
        }}
      >
        Apply for Verified Historian status
      </p>

      <ul
        style={{
          fontSize: 13,
          color: "var(--atlas-dark-grey)",
          margin: 0,
          marginBottom: 14,
          paddingLeft: 18,
          lineHeight: 1.7,
        }}
      >
        <li>
          10+ chronicles{" "}
          <span style={{ color: chronicles >= 10 ? "#22c55e" : "var(--atlas-mid-grey)" }}>
            ({chronicles}/10)
          </span>
        </li>
        <li>
          100+ stars received{" "}
          <span style={{ color: starsReceived >= 100 ? "#22c55e" : "var(--atlas-mid-grey)" }}>
            ({starsReceived}/100)
          </span>
        </li>
      </ul>

      <button
        className="font-sans"
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#3b82f6",
          backgroundColor: "transparent",
          border: "1.5px solid #3b82f6",
          borderRadius: 4,
          padding: "6px 20px",
          cursor: "pointer",
        }}
      >
        Apply
      </button>
    </>
  );
}

function HistorianMaxTier({ authUser }: { authUser: AuthUser }) {
  return (
    <>
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#f59e0b",
          margin: 0,
          marginBottom: 6,
        }}
      >
        Verified Historian — Highest Tier
      </p>

      <p
        style={{
          fontSize: 13,
          color: "var(--atlas-dark-grey)",
          margin: 0,
          marginBottom: 8,
          lineHeight: 1.5,
        }}
      >
        Your contributions help preserve history for future generations.
      </p>

      <p
        style={{
          fontSize: 12,
          color: "var(--atlas-mid-grey)",
          margin: 0,
        }}
      >
        {authUser.stats.chroniclesCreated} chronicles &middot;{" "}
        {authUser.stats.starsReceived.toLocaleString()} stars received &middot;{" "}
        {authUser.stats.totalContributions.toLocaleString()} total contributions
      </p>
    </>
  );
}

export function ProfileHeader({ user, authUser }: ProfileHeaderProps) {
  const initials = getInitials(user.displayName);
  const avatarColor = getAvatarColor(user.displayName);

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8"
    >
      {/* Avatar */}
      {user.avatarUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={user.avatarUrl}
          alt={user.displayName}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          className="font-sans"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: avatarColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Display name + tier badge */}
        <h1
          className="font-serif"
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "var(--atlas-black)",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {user.displayName}
          {authUser && <TierBadge role={authUser.role} />}
        </h1>

        {/* Username */}
        <p
          className="font-sans"
          style={{
            fontSize: 15,
            color: "var(--atlas-mid-grey)",
            margin: 0,
            marginTop: 2,
          }}
        >
          @{user.username}
        </p>

        {/* Bio */}
        <p
          className="font-sans"
          style={{
            fontSize: 15,
            color: "var(--atlas-dark-grey)",
            margin: 0,
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {user.bio}
        </p>

        {/* Location + Join date */}
        <div
          className="font-sans"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            marginTop: 10,
            fontSize: 13,
            color: "var(--atlas-mid-grey)",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MapPin size={14} />
            {user.location}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Calendar size={14} />
            Joined {formatJoinDate(user.joinedAt)}
          </span>
        </div>

        {/* Stats row */}
        <div
          className="font-sans"
          style={{
            display: "flex",
            gap: 24,
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid var(--atlas-light-grey)",
          }}
        >
          <div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--atlas-black)",
                display: "block",
              }}
            >
              {user.stats.chronicles}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--atlas-mid-grey)",
              }}
            >
              Chronicles
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--atlas-black)",
                display: "block",
              }}
            >
              {user.stats.stars.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--atlas-mid-grey)",
              }}
            >
              Stars
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--atlas-black)",
                display: "block",
              }}
            >
              {user.stats.contributions}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--atlas-mid-grey)",
              }}
            >
              Contributions
            </span>
          </div>
        </div>

        {/* Tier Progression Card */}
        {authUser && <TierProgressionCard authUser={authUser} />}
      </div>
    </div>
  );
}
