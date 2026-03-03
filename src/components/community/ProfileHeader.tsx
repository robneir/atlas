import { MapPin, Calendar } from "lucide-react";
import type { User } from "@/data/types";

interface ProfileHeaderProps {
  user: User;
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

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = getInitials(user.displayName);
  const avatarColor = getAvatarColor(user.displayName);

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8"
    >
      {/* Avatar */}
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

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Display name */}
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
      </div>
    </div>
  );
}
