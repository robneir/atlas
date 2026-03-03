"use client";

import { useSectionIntro } from "@/hooks/useSectionIntro";

interface SectionIntroProps {
  sectionKey: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  onDismiss?: () => void;
}

export function SectionIntro({
  sectionKey,
  title,
  subtitle,
  description,
  features,
  onDismiss,
}: SectionIntroProps) {
  const { hasSeenIntro, dismissIntro } = useSectionIntro(sectionKey);

  if (hasSeenIntro) return null;

  const handleDismiss = () => {
    dismissIntro();
    onDismiss?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Introduction to ${title}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "sectionIntroFadeIn 0.3s ease-out forwards",
        padding: 20,
      }}
      onClick={handleDismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 480,
          width: "100%",
          backgroundColor: "var(--atlas-white)",
          borderRadius: 10,
          boxShadow: "var(--atlas-shadow-lg)",
          padding: "44px 40px 36px",
          animation: "sectionIntroCardIn 0.4s ease-out 0.1s forwards",
          opacity: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Subtitle label */}
        <span
          className="font-sans"
          style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--atlas-accent)",
            margin: 0,
          }}
        >
          {subtitle}
        </span>

        {/* Title */}
        <h2
          className="font-serif"
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "var(--atlas-black)",
            margin: 0,
            marginTop: 8,
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="font-sans"
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--atlas-dark-grey)",
            margin: 0,
            marginTop: 16,
          }}
        >
          {description}
        </p>

        {/* Features list */}
        <ul
          className="font-sans"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {features.map((feature, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--atlas-charcoal)",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "var(--atlas-accent)",
                  marginTop: 6,
                }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Dismiss button */}
        <button
          className="font-sans section-intro-cta"
          onClick={handleDismiss}
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#ffffff",
            background: "var(--atlas-accent)",
            border: "none",
            borderRadius: 999,
            padding: "13px 28px",
            cursor: "pointer",
            marginTop: 28,
            alignSelf: "flex-start",
            whiteSpace: "nowrap",
            transition: "background 0.2s ease, transform 0.15s ease",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
