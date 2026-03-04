import { USERS } from "@/data/users";
import { CHRONICLES } from "@/data/chronicles";
import { EVENTS } from "@/data/events";

interface ActivityItem {
  id: string;
  user: string;
  avatarUrl: string;
  text: string;
  time: string;
}

const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "act-1",
    user: USERS[0].displayName,
    avatarUrl: USERS[0].avatarUrl,
    text: `published a new chronicle: "${CHRONICLES[0].title}"`,
    time: "2 hours ago",
  },
  {
    id: "act-2",
    user: USERS[1].displayName,
    avatarUrl: USERS[1].avatarUrl,
    text: `starred "${CHRONICLES[2].title}"`,
    time: "3 hours ago",
  },
  {
    id: "act-3",
    user: USERS[2].displayName,
    avatarUrl: USERS[2].avatarUrl,
    text: `added an event: "${EVENTS[4].title}"`,
    time: "5 hours ago",
  },
  {
    id: "act-4",
    user: USERS[3].displayName,
    avatarUrl: USERS[3].avatarUrl,
    text: `earned the badge: Geology Enthusiast`,
    time: "8 hours ago",
  },
  {
    id: "act-5",
    user: USERS[4].displayName,
    avatarUrl: USERS[4].avatarUrl,
    text: `published a new chronicle: "${CHRONICLES[4].title}"`,
    time: "yesterday",
  },
  {
    id: "act-6",
    user: USERS[5].displayName,
    avatarUrl: USERS[5].avatarUrl,
    text: `starred "${CHRONICLES[7].title}"`,
    time: "yesterday",
  },
  {
    id: "act-7",
    user: USERS[7].displayName,
    avatarUrl: USERS[7].avatarUrl,
    text: `added an event: "${EVENTS[7].title}"`,
    time: "2 days ago",
  },
  {
    id: "act-8",
    user: USERS[6].displayName,
    avatarUrl: USERS[6].avatarUrl,
    text: `earned the badge: Book Lover`,
    time: "3 days ago",
  },
];

export function ActivityFeed() {
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
        Recent Activity
      </h2>

      <div
        style={{
          backgroundColor: "var(--atlas-white)",
          borderRadius: 4,
          padding: "16px 20px",
          boxShadow: "var(--atlas-shadow-sm)",
        }}
      >
        {ACTIVITY_ITEMS.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderBottom:
                index < ACTIVITY_ITEMS.length - 1
                  ? "1px solid var(--atlas-light-grey)"
                  : "none",
            }}
          >
            {/* Small avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatarUrl}
              alt={item.user}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            {/* Text */}
            <p
              className="font-sans"
              style={{
                fontSize: 14,
                color: "var(--atlas-charcoal)",
                margin: 0,
                flex: 1,
                lineHeight: 1.4,
              }}
            >
              <span style={{ fontWeight: 600 }}>{item.user}</span>{" "}
              {item.text}
            </p>

            {/* Time */}
            <span
              className="font-sans"
              style={{
                fontSize: 12,
                color: "var(--atlas-mid-grey)",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
