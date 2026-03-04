"use client";

import { useAuth } from "@/hooks/useAuth";

export function FeedComposer() {
  const { user, isSignedIn } = useAuth();

  if (!isSignedIn || !user) return null;

  return (
    <div
      style={{
        padding: "16px 0",
        marginBottom: 16,
        borderBottom: "1px solid var(--atlas-light-grey)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        {/* Avatar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl}
          alt={user.displayName}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        {/* Input area */}
        <div style={{ flex: 1 }}>
          <button
            type="button"
            onClick={() => {
              alert("Coming soon! Post creation is under development.");
            }}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 14px",
              borderRadius: 4,
              border: "1px solid var(--atlas-light-grey)",
              backgroundColor: "transparent",
              color: "var(--atlas-mid-grey)",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              textAlign: "left",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
            }}
          >
            What&apos;s on your mind?
          </button>

          {/* Post button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <button
              type="button"
              disabled
              style={{
                backgroundColor: "var(--atlas-accent)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
                fontFamily: "var(--font-ui)",
                borderRadius: 4,
                padding: "6px 16px",
                border: "none",
                cursor: "not-allowed",
                opacity: 0.5,
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
