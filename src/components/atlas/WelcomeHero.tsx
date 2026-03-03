"use client";

import { Sparkles, Info } from "lucide-react";
import "./map-background.css";

/**
 * Floating welcome text that sits directly over the MapBackground.
 * No background panel — text floats on the map, matching the
 * Audubon Bird Migration Explorer layout.
 */
export function WelcomeHero() {
  return (
    <>
      {/* ── Hero text panel (floating, no bg) ──────────────── */}
      <section
        aria-label="Welcome to Atlas"
        className="welcome-hero-section fixed top-[54px] left-0 bottom-0 z-10 flex w-full md:w-[440px] flex-col justify-end md:justify-center px-5 pb-[180px] md:px-[60px] md:pb-0"
      >
        {/* Welcome label */}
        <span
          className="mb-3 md:mb-4 font-sans text-[12px] md:text-[13px] font-bold uppercase tracking-[0.14em]"
          style={{ color: "var(--atlas-charcoal)", textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}
        >
          WELCOME
        </span>

        {/* Headline */}
        <h1
          className="mb-4 md:mb-5 font-serif text-[30px] md:text-[42px] font-bold leading-[1.1]"
          style={{ color: "var(--atlas-black)", textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}
        >
          Explore the
          <br />
          History of
          <br />
          Everything
        </h1>

        {/* Intro paragraph */}
        <p
          className="mb-5 md:mb-7 font-sans text-[15px] md:text-[18px] leading-[1.55]"
          style={{ color: "var(--atlas-charcoal)", textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}
        >
          This is your guide to the stories of{" "}
          <strong>every civilization</strong>, person, and event — told by a
          community of historians, researchers, and curious minds.
        </p>

        {/* Action buttons — stack vertically on mobile */}
        <div className="mb-8 md:mb-20 flex flex-col sm:flex-row gap-3">
          {/* Explore button — coral pill */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-[22px] md:px-[26px] py-[12px] md:py-[13px] text-[14px] md:text-[15px] font-semibold text-white transition-all duration-250 ease-out hover:shadow-md"
            style={{
              backgroundColor: "var(--atlas-accent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--atlas-accent-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--atlas-accent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Sparkles size={16} />
            Explore History Near Me
          </button>

          {/* Tour button — outlined pill */}
          <button
            type="button"
            className="tour-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-[22px] md:px-[26px] py-[12px] md:py-[13px] text-[14px] md:text-[15px] font-semibold transition-all duration-250 ease-out"
            style={{
              border: "1.5px solid var(--atlas-light-grey)",
              backgroundColor: "rgba(255,255,255,0.5)",
              color: "var(--atlas-charcoal)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-mid-grey)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.8)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--atlas-light-grey)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Info size={16} />
            Take a tour
          </button>
        </div>
      </section>

      {/* ── Open Source callout ─────────────────────────────── */}
      <div
        className="fixed bottom-[100px] left-4 md:left-[60px] z-10 max-w-[320px] md:max-w-[360px] hidden md:block"
      >
        <p
          className="mb-2 font-accent text-[15px] font-bold"
          style={{ color: "var(--atlas-accent)", textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}
        >
          Open Source &amp; Community-Driven
        </p>
        <p
          className="font-sans text-[14px] leading-[1.55]"
          style={{ color: "var(--atlas-charcoal)", textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}
        >
          Atlas is built by contributors — historians, educators, and curious
          minds sharing knowledge openly.{" "}
          <a
            href="#"
            className="underline underline-offset-2 transition-colors hover:opacity-80"
            style={{ color: "var(--atlas-link)" }}
          >
            Learn more about the project.
          </a>
        </p>
      </div>
    </>
  );
}
