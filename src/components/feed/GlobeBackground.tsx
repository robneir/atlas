"use client";

export function GlobeBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.07,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "min(50vw, 700px)",
          height: "min(50vw, 700px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 35%, var(--atlas-cream) 0%, var(--atlas-light-grey) 50%, var(--atlas-mid-grey) 100%)",
          border: "2px solid var(--atlas-light-grey)",
          animation: "feedGlobeSpin 120s linear infinite",
          position: "relative",
        }}
      >
        {/* Longitude lines */}
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              inset: "5%",
              borderRadius: "50%",
              border: "1px solid var(--atlas-mid-grey)",
              opacity: 0.3,
              transform: `rotateY(${deg}deg)`,
            }}
          />
        ))}
        {/* Latitude lines */}
        {[-60, -30, 0, 30, 60].map((offset) => (
          <div
            key={offset}
            style={{
              position: "absolute",
              left: "5%",
              right: "5%",
              top: `${50 + offset * 0.4}%`,
              height: 1,
              background: "var(--atlas-mid-grey)",
              opacity: 0.2,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
