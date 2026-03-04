"use client";

import { useAuth } from "@/hooks/useAuth";

export function FeedBanner() {
  const { isSignedIn, openAuthModal } = useAuth();

  if (isSignedIn) return null;

  return (
    <div
      style={{
        padding: "24px 0",
        marginBottom: 16,
        borderBottom: "1px solid var(--atlas-light-grey)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
        }}
      >
        Where history comes alive.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 15,
          color: "var(--atlas-dark-grey)",
          marginTop: 6,
          marginBottom: 0,
        }}
      >
        Join a community of explorers, historians, and curious minds.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          marginTop: 18,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={openAuthModal}
          style={{
            backgroundColor: "var(--atlas-accent)",
            color: "#fff",
            borderRadius: 4,
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: 14,
            fontFamily: "var(--font-ui)",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--atlas-accent-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--atlas-accent)";
          }}
        >
          Join the Community
        </button>
        <button
          type="button"
          style={{
            backgroundColor: "transparent",
            color: "var(--atlas-dark-grey)",
            borderRadius: 4,
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: 14,
            fontFamily: "var(--font-ui)",
            border: "1px solid var(--atlas-dark-grey)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--atlas-black)";
            e.currentTarget.style.borderColor = "var(--atlas-black)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--atlas-dark-grey)";
            e.currentTarget.style.borderColor = "var(--atlas-dark-grey)";
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
