# Atlas — Design Document

**Date:** 2026-03-03
**Status:** Approved for implementation
**Version:** v1 (mock data prototype)

## Vision

Atlas is the greatest history platform ever built — an open-source, community-driven platform where anyone can explore, contribute, and discover the history of everything. Think Wikipedia meets Audubon Explorer meets GitHub, but for all of human history.

People hundreds of years from now should be able to visit Atlas and understand what was created, when, and by whom.

## v1 Scope

**v1 is entirely design/UX focused with mock data.** No real backend, no real AI, no real database. Every piece of data is mocked. The goal is to build a stunning, interactive frontend experience that validates the concept and demonstrates the vision.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **Fonts:** Playfair Display (headings), Source Sans 3 (body), Noto Serif (accents)
- **Map:** Mapbox GL JS
- **Theme:** Light mode (default) + Dark mode toggle
- **Data:** Mock data in TypeScript files

## Design System

### Color Palette (Light Mode — Default)

Modeled directly after the [Audubon Bird Migration Explorer](https://explorer.audubon.org/).

| Token | Value | Usage |
|-------|-------|-------|
| `--white` | `#ffffff` | Card backgrounds |
| `--off-white` | `#fafaf8` | Subtle surface |
| `--cream` | `#f5f3ef` | Page background |
| `--light-grey` | `#e8e5e0` | Borders, dividers |
| `--mid-grey` | `#b5b0a8` | Secondary text, metadata |
| `--dark-grey` | `#6b6560` | Body text |
| `--charcoal` | `#3a3530` | Strong body text |
| `--black` | `#1a1714` | Headings |
| `--accent` | `#D1401F` | Primary accent (coral/red-orange) |
| `--accent-hover` | `#b8361a` | Accent hover state |
| `--link` | `#D1401F` | Links |

### Dark Mode

Full dark mode via CSS custom property overrides on `[data-theme="dark"]`. Toggle in the top bar (moon/sun icon). Dark mode inverts the greyscale spectrum while keeping the coral accent warm.

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display (hero) | Playfair Display | 700 | 42px |
| Heading (h1-h3) | Playfair Display | 700 | 22-36px |
| Subheading | Noto Serif | 700 | 16px |
| Body | Source Sans 3 | 400/500 | 15-18px |
| Caption/meta | Source Sans 3 | 500 | 12-13px |
| Labels | Source Sans 3 | 600-700 | 10-13px, uppercase, letter-spaced |
| UI elements | Source Sans 3 | 600 | 14-15px |

### Spacing & Layout

- Generous whitespace throughout — the app must feel spacious
- Spacing scale: 4px base
- Panels use 16-28px internal padding
- Cards: 10px border radius, `shadow-md` on hover
- Buttons: 999px border radius (pill), 13-26px padding
- All text on single lines for buttons (white-space: nowrap)

### Core UX Principle

**The map never leaves.** The map is the full-screen canvas. All content floats over it or slides in from the edges. Navigation between sections (Atlas, Chronicles, Echoes, Discover) slides panels in/out over the map. You can always go back to the map easily.

## Navigation

### Top Bar (Persistent)

- **Logo:** "Atlas" — Playfair Display, 26px, bold
- **Nav items:** Atlas, Chronicles, Echoes, Discover — with small icons
- **Right side:** "Choose Era" (outlined), "Contribute" (coral), dark mode toggle, hamburger menu
- Translucent white background with backdrop blur

### Experiences & Pages

| Name | Subtitle | Access | Description |
|------|----------|--------|-------------|
| **Atlas** | *Explore the Map* | Home/default | Full-screen Mapbox map with time scrubber, lenses, pins |
| **Chronicles** | *Stories* | Nav bar | Community-written historical narratives, starred like GitHub repos |
| **Echoes** | *Chat with History* | Nav bar | AI-powered conversations with historical figures |
| **Discover** | *Trending* | Nav bar | Trending content, latest additions, featured collections, community activity |
| **Vault** | *The Archive* | Via Discover/dates | Browse history by year, month, day |
| **Nexus** | *How History Connects* | Map lens | Graph visualization of event connections |
| **Time Machine** | *Any Date, Everywhere* | Time scrubber | Global snapshot for any date in history |
| **Collections** | *Your Library* | Profile | User-curated bundles of content |
| **Profile** | *Your Legacy* | Avatar/menu | Contributor pages with stats, badges, work |
| **Community** | *The People* | Via Discover | Leaderboard, quests, activity feed |
| **Onboarding** | *Welcome to Atlas* | First visit | Cinematic intro + per-section intros |
| **Search** | *The Oracle* | Top bar | Natural language search across all content |

## Landing Page (Home)

Modeled directly after Audubon Explorer's landing page:

- Full-screen warm map fills entire viewport
- "W E L C O M E" spaced label
- "Explore the History of Everything" — large Playfair Display serif heading
- Intro paragraph with bold "every civilization"
- Coral "Explore History Near Me" CTA + "Take a tour" secondary button
- "Open Source & Community-Driven" callout in coral
- "Map Lenses" collapsed card (top right)
- "Community Contributors" data card (bottom right)
- Map controls (search, fullscreen, zoom) on right edge
- "Community Partners" bar at bottom
- NO left sidebar panel — content floats directly over the map

## 5 Core Features

### 1. Atlas (Interactive Map Explorer)

The centerpiece. Full-screen Mapbox map with:

- **Map Lenses:** Toggle layers — Events, People, Stories, Connections (Nexus)
- **Era Filters:** Ancient, Classical, Medieval, Renaissance, Enlightenment, Modern, Contemporary
- **Time Scrubber:** Bottom bar with play button, current year, era name, draggable timeline (10,000 BC to 2025)
- **Event Pins:** Click any pin to see a slide-up detail card with: era tag, date, title, location, description, and actions (View Timeline, Read Chronicle, Chat with [Figure])
- **Connection Threads:** Dashed lines between related events when Nexus lens is active
- **"This Day in History"** floating banner

### 2. Chronicles (Community-Curated Stories)

Wikipedia meets Medium for history:

- Contributors write historical narratives (markdown editor)
- Stories are starred like GitHub repos
- Cinematic reading experience with embedded maps and timelines
- Each Chronicle links to map locations, timelines, and historical figures
- Sortable/filterable by era, region, topic, popularity, date

### 3. Echoes (Talk with Historical Figures)

AI-powered conversations with historical characters:

- Select a figure from a gallery
- See their portrait, era context, and key facts
- Chat interface with pre-written dialogue trees (mock data in v1)
- Figures are positioned at their historical locations on the map
- Community can contribute to figure knowledge bases

### 4. Discover (Trending & Community)

The front page of Atlas:

- **Trending Chronicles:** Most starred this week
- **This Day in History:** Rich visual cards
- **Latest Additions:** Real-time feed of new content
- **Featured Collections:** Curated playlists of related content
- **Most Talked To:** Popular Echoes figures
- **Rising Contributors:** New active members
- **Explore by Era:** Visual era selector
- **Community section:** Leaderboard, quests, activity feed

### 5. Vault (Living Archive by Date)

The permanent record:

- Browse by year, month, day
- See what was added to Atlas on any given date
- Who contributed it and what happened in history that day
- Calendar view + list view
- Everything is timestamped and attributed

## Contributor System

- **Profiles:** Avatar, bio, location, join date, followers
- **Reputation:** Stars received, contributions, accuracy score, badges
- **Badges:** "Renaissance Expert", "First Chronicle", "100 Contributions", etc.
- **Published work:** Chronicles, timeline entries, Echoes figures
- **Pinned work:** 3-5 pieces pinned to profile top
- **Activity timeline:** Chronological feed of all contributions
- **AI-first verification:** AI fact-checks contributions, flags inaccuracies, scores confidence. Humans review edge cases.

## Onboarding

- **Global onboarding:** Cinematic first-visit experience — globe rotates, zooms in, timeline unfolds. User picks interests (eras, regions, topics). Profile setup. Ends with "History is waiting. Where will you begin?"
- **Per-section intros:** Reusable `SectionIntro` component. Each section shows a clean glass overlay the first time visited, explaining what it is. Dismissed to localStorage. Non-intrusive.

## Project Structure

```
atlas/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (topbar, theme provider)
│   │   ├── page.tsx                  # Atlas (home/map landing)
│   │   ├── chronicles/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── echoes/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── discover/page.tsx
│   │   ├── vault/page.tsx
│   │   ├── profile/[username]/page.tsx
│   │   └── onboarding/page.tsx
│   ├── components/
│   │   ├── layout/                   # TopBar, ThemeToggle, SearchBar
│   │   ├── atlas/                    # MapView, TimeScrubber, MapPin, LensToggle, EventCard
│   │   ├── chronicles/               # ChronicleCard, ChronicleReader, StarButton
│   │   ├── echoes/                   # FigurePortrait, ChatPanel, FigureCard
│   │   ├── timeline/                 # Timeline, TimelineEvent, EraMarker
│   │   ├── community/                # Leaderboard, ActivityFeed, ContributorCard, BadgeDisplay
│   │   ├── shared/                   # EraTag, DateDisplay, CollectionCard, StatCounter
│   │   └── onboarding/              # SectionIntro, WelcomeScene, InterestPicker
│   ├── data/                         # Mock data (events, figures, chronicles, users, etc.)
│   ├── hooks/                        # useTimeScrubber, useMapInteraction, useLens, useTheme, etc.
│   ├── lib/                          # dates, eras, cn utility
│   └── styles/                       # globals.css, theme variables
├── public/
│   ├── figures/                      # Historical figure portraits
│   └── events/                       # Event imagery
└── docs/plans/
```

**Architecture principles:**
- Each page is its own directory with isolated components
- Shared components in `components/shared/` are truly reusable
- Mock data centralized in `data/` — easy to swap for real API later
- Custom hooks encapsulate stateful logic
- Theme via CSS custom properties + `data-theme` attribute

## Quality Process

**Dual UX/UI Review Required:**

Before any feature is built, two independent review passes must occur:

1. **UX Review (Agent A):** Evaluates information architecture, user flows, interaction patterns, accessibility, and spaciousness. Ensures the experience feels like a deep, rich platform — not a cramped web app.

2. **UI Review (Agent B):** Evaluates visual design, color usage, typography hierarchy, spacing, alignment, glass/shadow effects, and consistency with the Audubon-inspired design system.

Both reviewers must sign off before implementation proceeds. Disagreements are resolved by comparing against the Audubon reference and the design principles in this document.

## References

- [Audubon Bird Migration Explorer](https://explorer.audubon.org/) — Primary design reference (fonts, colors, layout, spaciousness)
- [Herasight](https://www.herasight.com/) — Clean/simple aesthetic reference
- [Apple Liquid Glass](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) — Dark mode glass effects
- [History of Everything App](https://apps.apple.com/pk/app/the-history-of-everything/id1441257460) — Timeline interaction reference
- [Hello History](https://www.hellohistory.ai/) — Echoes (talk with figures) reference

## Mockup

The HTML mockup is at `/Users/robertneir/epoch-mockup/index.html`. Serves both light and dark modes with a toggle.
