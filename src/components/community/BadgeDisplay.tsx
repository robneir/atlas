import { Trophy } from "lucide-react";

interface BadgeDisplayProps {
  badges: string[];
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        className="font-accent"
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "var(--atlas-black)",
          margin: 0,
          marginBottom: 16,
        }}
      >
        Acknowledgments
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {badges.map((badge) => (
          <span
            key={badge}
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              backgroundColor: "var(--atlas-off-white)",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--atlas-charcoal)",
              cursor: "default",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLSpanElement).style.backgroundColor =
                "var(--atlas-light-grey)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLSpanElement).style.backgroundColor =
                "var(--atlas-off-white)";
            }}
          >
            <Trophy size={12} />
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
