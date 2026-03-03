import { ERA_CONFIG } from "@/lib/eras";

interface Collection {
  title: string;
  itemCount: number;
  eraColor: string;
}

const COLLECTIONS: Collection[] = [
  {
    title: "Ancient Wonders",
    itemCount: 8,
    eraColor: ERA_CONFIG.ancient.color,
  },
  {
    title: "Revolutionary Ideas",
    itemCount: 12,
    eraColor: ERA_CONFIG.enlightenment.color,
  },
  {
    title: "Women in History",
    itemCount: 6,
    eraColor: ERA_CONFIG.modern.color,
  },
];

export function FeaturedCollections() {
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
        Featured Collections
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {COLLECTIONS.map((collection, index) => (
          <div
            key={collection.title}
            className="atlas-card-stagger"
            style={{
              animationDelay: `${index * 80}ms`,
              backgroundColor: "var(--atlas-white)",
              borderRadius: 10,
              boxShadow: "var(--atlas-shadow-sm)",
              padding: 20,
              cursor: "pointer",
              transition: "box-shadow 0.25s ease, transform 0.25s ease",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-md)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--atlas-shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3
              className="font-sans"
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "var(--atlas-black)",
                margin: 0,
                marginBottom: 4,
              }}
            >
              {collection.title}
            </h3>
            <p
              className="font-sans"
              style={{
                fontSize: 13,
                color: "var(--atlas-mid-grey)",
                margin: 0,
                marginBottom: 16,
              }}
            >
              {collection.itemCount} items
            </p>

            {/* Era accent bar at bottom */}
            <div
              style={{
                height: 3,
                backgroundColor: collection.eraColor,
                borderRadius: 2,
                marginTop: "auto",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
