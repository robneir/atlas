# Atlas Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a stunning, mock-data history platform (Atlas) with Next.js, shadcn/ui, Tailwind, and Mapbox — focused entirely on design/UX.

**Architecture:** Next.js App Router with shared layout (TopBar, ThemeProvider). Each page is a route under `src/app/`. Components are isolated per feature domain. All data is mocked in `src/data/`. Theme uses CSS custom properties toggled via `data-theme` attribute. Mapbox GL JS for the map. Every page must feel spacious — match the Audubon Explorer aesthetic exactly.

**Tech Stack:** Next.js 15, React 19, shadcn/ui, Tailwind CSS v4, Mapbox GL JS, TypeScript, Playfair Display + Source Sans 3 + Noto Serif (Google Fonts)

**Design Reference:** See `docs/plans/2026-03-03-atlas-design.md` and the HTML mockup at `index.html` in the project root.

**Quality Gate:** After each phase, run dual UX/UI review agents before proceeding to the next phase. UX agent checks flows, spacing, accessibility. UI agent checks visual consistency with Audubon reference.

---

## Phase 1: Project Scaffold & Design System

### Task 1: Create Next.js project

**Files:**
- Create: `atlas/` (entire project directory)

**Step 1: Scaffold the project**

```bash
cd /Users/robertneir
npx create-next-app@latest atlas --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

**Step 2: Install dependencies**

```bash
cd /Users/robertneir/atlas
npm install mapbox-gl @mapbox/mapbox-gl-geocoder
npm install -D @types/mapbox-gl
```

**Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Select: New York style, Slate base color, CSS variables = yes.

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js project with Tailwind, shadcn/ui, Mapbox"
```

---

### Task 2: Set up fonts & design tokens

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Add Google Fonts to layout**

In `src/app/layout.tsx`, import Playfair Display, Source Sans 3, and Noto Serif via `next/font/google`:

```tsx
import { Playfair_Display, Source_Sans_3, Noto_Serif } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
});
```

Apply to `<html>` tag: `className={`${playfair.variable} ${sourceSans.variable} ${notoSerif.variable}`}`

Set body font-family in Tailwind config to `var(--font-source-sans)`.

**Step 2: Define CSS custom properties in globals.css**

Add the full light/dark color system from the design doc (see `docs/plans/2026-03-03-atlas-design.md` Color Palette section). Copy the exact tokens. Include both `:root` (light) and `[data-theme="dark"]` blocks.

Key variables:
- `--white`, `--off-white`, `--cream`, `--light-grey`, `--mid-grey`, `--dark-grey`, `--charcoal`, `--black`
- `--accent: #D1401F`, `--accent-hover: #b8361a`, `--link: #D1401F`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Font family variables: `--font-playfair`, `--font-source-sans`, `--font-noto-serif`

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add design tokens, fonts, light/dark theme CSS variables"
```

---

### Task 3: Build ThemeProvider & ThemeToggle

**Files:**
- Create: `src/components/layout/ThemeProvider.tsx`
- Create: `src/components/layout/ThemeToggle.tsx`
- Create: `src/hooks/useTheme.ts`

**Step 1: Create useTheme hook**

Manages `data-theme` attribute on `<html>`. Reads/writes localStorage for persistence. Default = light.

**Step 2: Create ThemeProvider**

Wraps children, initializes theme from localStorage on mount (avoids flash).

**Step 3: Create ThemeToggle**

Pill button with moon/sun icon. Calls `useTheme().toggle()`. Styled as a 36px circle with border matching the mockup.

**Step 4: Verify toggle works**

Run `npm run dev`, click toggle, confirm colors switch.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add theme provider, toggle, and useTheme hook"
```

---

### Task 4: Build TopBar component

**Files:**
- Create: `src/components/layout/TopBar.tsx`
- Modify: `src/app/layout.tsx` (add TopBar to layout)

**Step 1: Build TopBar matching the mockup exactly**

- Fixed top, 54px height, translucent white bg with backdrop-blur
- Left: "Atlas" logo (Playfair Display, 26px, font-weight-900)
- Center: Nav items (Atlas, Chronicles, Echoes, Discover) with icons
- Right: "Choose Era" outlined button, "Contribute" coral button, ThemeToggle, hamburger menu
- All buttons are `white-space: nowrap` pill buttons
- Nav items highlight with bold text on active route (use `usePathname()`)

**Step 2: Add TopBar to root layout**

**Step 3: Verify visually** — compare against the mockup screenshot

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add TopBar with navigation, theme toggle, and action buttons"
```

---

### Task 5: Create mock data types & files

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/events.ts`
- Create: `src/data/figures.ts`
- Create: `src/data/chronicles.ts`
- Create: `src/data/users.ts`
- Create: `src/data/connections.ts`
- Create: `src/lib/eras.ts`

**Step 1: Define types**

```typescript
// src/data/types.ts
export type Era = "ancient" | "classical" | "medieval" | "renaissance" | "enlightenment" | "modern" | "contemporary";

export interface HistoricalEvent {
  id: string;
  title: string;
  date: string;        // "October 1, 331 BC"
  year: number;        // -331
  era: Era;
  location: string;    // "Present-day Erbil, Iraq"
  coordinates: [number, number]; // [lng, lat]
  description: string;
  relatedChronicleIds: string[];
  relatedFigureIds: string[];
}

export interface HistoricalFigure {
  id: string;
  name: string;
  title: string;       // "King of Macedonia"
  era: Era;
  birthYear: number;
  deathYear: number;
  portraitUrl: string;
  coordinates: [number, number];
  bio: string;
  keyFacts: string[];
  sampleDialogue: Array<{ role: "user" | "figure"; content: string }>;
}

export interface Chronicle {
  id: string;
  title: string;
  excerpt: string;
  content: string;     // Markdown
  authorId: string;
  era: Era;
  stars: number;
  createdAt: string;
  tags: string[];
  relatedEventIds: string[];
  coordinates: [number, number];
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  location: string;
  joinedAt: string;
  stats: {
    chronicles: number;
    stars: number;
    contributions: number;
  };
  badges: string[];
  pinnedChronicleIds: string[];
}

export interface Connection {
  fromEventId: string;
  toEventId: string;
  description: string;
}
```

**Step 2: Create era config**

```typescript
// src/lib/eras.ts
export const ERA_CONFIG = {
  ancient:       { label: "Ancient",       color: "#8b6914", range: [-10000, -500] },
  classical:     { label: "Classical",     color: "#cd853f", range: [-500, 500] },
  medieval:      { label: "Medieval",      color: "#8b7355", range: [500, 1400] },
  renaissance:   { label: "Renaissance",   color: "#6b8e6b", range: [1400, 1600] },
  enlightenment: { label: "Enlightenment", color: "#7b9eb8", range: [1600, 1800] },
  modern:        { label: "Modern",        color: "#8fa4c4", range: [1800, 1945] },
  contemporary:  { label: "Contemporary",  color: "#b088c4", range: [1945, 2025] },
} as const;
```

**Step 3: Create mock data files**

Populate each file with 10-20 realistic entries. Events should span all eras and be geographically diverse. Figures should be well-known historical characters. Chronicles should have engaging titles and excerpts (like the mockup: "The Silk Road's Hidden Cities", "Code Breakers of Bletchley", etc.). Users should have realistic profiles.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add TypeScript types, era config, and mock data"
```

---

## Phase 2: Atlas Landing Page (Home)

### Task 6: Build the landing page (Welcome hero)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/atlas/WelcomeHero.tsx`
- Create: `src/components/atlas/MapBackground.tsx`

**Step 1: Create MapBackground**

For v1, use a CSS-gradient simulated map (matching the mockup). Later this becomes the real Mapbox map. Full-screen fixed position, warm earth tones in light mode, dark terrain in dark mode.

**Step 2: Create WelcomeHero**

Floating over the map (no background panel). Contains:
- "W E L C O M E" spaced label
- "Explore the History of Everything" — Playfair Display h1
- Description paragraph with bold "every civilization"
- Coral "Explore History Near Me" + bordered "Take a tour" buttons
- Bottom-left: "Open Source & Community-Driven" callout

Must match the Audubon layout exactly — text floats, no panel.

**Step 3: Build the home page**

Compose MapBackground + WelcomeHero + MapLensesCard + DataProvidersCard + MapControls + PartnersBar.

**Step 4: Verify visually** — compare side-by-side with Audubon reference

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: build Atlas landing page matching Audubon Explorer layout"
```

---

### Task 7: Build Map Lenses card & Map Controls

**Files:**
- Create: `src/components/atlas/MapLensesCard.tsx`
- Create: `src/components/atlas/MapControls.tsx`
- Create: `src/components/atlas/PartnersBar.tsx`
- Create: `src/components/atlas/DataProvidersCard.tsx`

**Step 1:** MapLensesCard — Collapsible white card (top right). Header "Map Lenses" in coral. Expandable to show toggle switches for Events, People, Stories, Connections.

**Step 2:** MapControls — Right edge. Search, fullscreen, zoom +/- buttons. White cards with shadow.

**Step 3:** PartnersBar — Fixed bottom bar with "Community Partners" + partner name logos.

**Step 4:** DataProvidersCard — Bottom right. Shows contributor stats. Collapsible.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add map lenses, controls, partners bar, and data card"
```

---

### Task 8: Integrate Mapbox GL JS

**Files:**
- Create: `src/components/atlas/MapView.tsx`
- Create: `src/hooks/useMapInteraction.ts`
- Modify: `src/app/page.tsx` (replace CSS map with real Mapbox)

**Step 1:** Create MapView component wrapping Mapbox GL JS. Use a warm/light map style (e.g., `mapbox://styles/mapbox/light-v11` or a custom style matching the warm earthy tones). Fill entire viewport behind all UI.

**Step 2:** Add mock event pins to the map as GeoJSON source. Pins are small dots matching the mockup style.

**Step 3:** Create useMapInteraction hook — handles click events on pins, manages selected event state.

**Step 4:** Verify map loads and pins appear.

**Step 5: Commit**

NOTE: Mapbox requires a token. Use an environment variable `NEXT_PUBLIC_MAPBOX_TOKEN`. For the mockup, use a free-tier token or fallback to the CSS gradient map.

```bash
git add -A && git commit -m "feat: integrate Mapbox GL JS with event pins"
```

---

### Task 9: Build Time Scrubber

**Files:**
- Create: `src/components/atlas/TimeScrubber.tsx`
- Create: `src/hooks/useTimeScrubber.ts`

**Step 1:** Build TimeScrubber bar — fixed bottom (above PartnersBar). Contains: play button, current year display (Playfair Display), era name label, draggable track with era color segments, year tick labels.

**Step 2:** Create useTimeScrubber hook — manages current year state, play/pause animation, era calculation from year.

**Step 3:** When year changes, filter visible map pins to only show events in the selected era range.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add time scrubber with era segments and year navigation"
```

---

### Task 10: Build Event Detail Card

**Files:**
- Create: `src/components/atlas/EventDetailCard.tsx`
- Create: `src/components/shared/EraTag.tsx`

**Step 1:** EraTag — Small pill component. Takes an era, renders with the correct color from ERA_CONFIG.

**Step 2:** EventDetailCard — Slide-up card when a map pin is clicked. Contains: EraTag, date, title (Playfair Display), location, description, action buttons (View Timeline, Read Chronicle, Chat with [Figure]). Animate in with `slideUp` keyframe. White card with shadow-lg.

**Step 3:** Wire up pin click → show EventDetailCard with selected event data.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add event detail card with slide-up animation"
```

---

### Task 11: "This Day in History" banner

**Files:**
- Create: `src/components/atlas/DailyBanner.tsx`

**Step 1:** Floating pill banner. Shows "TODAY" in coral + a historical fact for today's date + "Explore →" link. White background, rounded, shadow-md. Positioned above the map near the top.

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add This Day in History floating banner"
```

---

**>>> QUALITY GATE: Run dual UX/UI review on Phase 2 <<<**

---

## Phase 3: Chronicles

### Task 12: Chronicles listing page

**Files:**
- Create: `src/app/chronicles/page.tsx`
- Create: `src/components/chronicles/ChronicleCard.tsx`
- Create: `src/components/chronicles/StarButton.tsx`

**Step 1:** ChronicleCard — Card with title (Noto Serif), excerpt, star count, author, era tag. Hover shows subtle background. Matches the sidebar cards from the earlier mockup.

**Step 2:** StarButton — Reusable star/unstar toggle with count.

**Step 3:** Chronicles page — Slides in as a panel over the map (or full page with map dimmed). Grid/list of ChronicleCards. Filter/sort controls at top (era, popularity, date). Spacious layout.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Chronicles listing page with cards and star button"
```

---

### Task 13: Chronicle reader page

**Files:**
- Create: `src/app/chronicles/[id]/page.tsx`
- Create: `src/components/chronicles/ChronicleReader.tsx`

**Step 1:** ChronicleReader — Cinematic reading experience. Wide column of text (max 680px). Playfair Display title, author info, star count, era tag. Markdown content rendered with rich typography. Embedded mini-map showing related locations. Related chronicles sidebar.

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add Chronicle reader with cinematic reading experience"
```

---

## Phase 4: Echoes

### Task 14: Echoes gallery page

**Files:**
- Create: `src/app/echoes/page.tsx`
- Create: `src/components/echoes/FigureCard.tsx`

**Step 1:** FigureCard — Portrait image, name, title, era, short bio. Hover effect. Links to chat.

**Step 2:** Echoes page — Grid of FigureCards. "Chat with History" heading. Filter by era. Spacious grid with generous gaps.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Echoes gallery page with figure cards"
```

---

### Task 15: Chat with historical figure

**Files:**
- Create: `src/app/echoes/[id]/page.tsx`
- Create: `src/components/echoes/ChatPanel.tsx`
- Create: `src/components/echoes/FigurePortrait.tsx`

**Step 1:** FigurePortrait — Large portrait with name, title, era, key facts sidebar.

**Step 2:** ChatPanel — Chat UI with message bubbles. Uses mock `sampleDialogue` data. Input field at bottom (disabled in v1 with "Coming soon" placeholder). Messages alternate user/figure with appropriate styling.

**Step 3:** Layout — Split view: portrait/info on left, chat on right. Map visible in background.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Echoes chat page with figure portrait and mock dialogue"
```

---

## Phase 5: Discover

### Task 16: Discover page

**Files:**
- Create: `src/app/discover/page.tsx`
- Create: `src/components/discover/TrendingSection.tsx`
- Create: `src/components/discover/ThisDaySection.tsx`
- Create: `src/components/discover/FeaturedCollections.tsx`
- Create: `src/components/discover/EraExplorer.tsx`
- Create: `src/components/community/Leaderboard.tsx`
- Create: `src/components/community/ActivityFeed.tsx`

**Step 1:** Build each section as a standalone component. Each should be spacious with clear headings.

**Step 2:** Compose into the Discover page. Vertical scroll with generous spacing between sections. Sections: Trending Chronicles, This Day in History, Featured Collections, Explore by Era, Most Talked To (Echoes), Community Leaderboard, Activity Feed.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Discover page with trending, collections, and community sections"
```

---

**>>> QUALITY GATE: Run dual UX/UI review on Phases 3-5 <<<**

---

## Phase 6: Vault, Profile & Community

### Task 17: Vault page

**Files:**
- Create: `src/app/vault/page.tsx`
- Create: `src/components/vault/CalendarView.tsx`
- Create: `src/components/vault/DateEntry.tsx`

**Step 1:** Calendar/timeline view. Browse by year → month → day. Each date shows what was added and what happened in history. Two view modes: calendar grid + chronological list.

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add Vault archive page with calendar and list views"
```

---

### Task 18: Profile page

**Files:**
- Create: `src/app/profile/[username]/page.tsx`
- Create: `src/components/community/ProfileHeader.tsx`
- Create: `src/components/community/BadgeDisplay.tsx`
- Create: `src/components/community/ContributionGrid.tsx`

**Step 1:** ProfileHeader — Avatar, name, bio, location, join date, followers, stats (chronicles, stars, contributions).

**Step 2:** BadgeDisplay — Row of earned badges with tooltips.

**Step 3:** ContributionGrid — Pinned chronicles at top, then full grid of all contributions. GitHub-style activity heatmap.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Profile page with stats, badges, and contributions"
```

---

## Phase 7: Onboarding & Search

### Task 19: Global onboarding

**Files:**
- Create: `src/components/onboarding/WelcomeScene.tsx`
- Create: `src/components/onboarding/InterestPicker.tsx`
- Create: `src/hooks/useOnboarding.ts`

**Step 1:** useOnboarding hook — tracks completion state in localStorage.

**Step 2:** WelcomeScene — Full-screen overlay. Cinematic animation (CSS-driven): map zooms in, title fades, description appears. "Begin Exploring" CTA.

**Step 3:** InterestPicker — Select favorite eras, regions, topics. Multi-select pills. "Continue" button.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add global onboarding with welcome scene and interest picker"
```

---

### Task 20: Per-section intros

**Files:**
- Create: `src/components/onboarding/SectionIntro.tsx`
- Create: `src/hooks/useSectionIntro.ts`

**Step 1:** useSectionIntro — tracks which sections have been introduced (localStorage).

**Step 2:** SectionIntro — Reusable overlay. Takes title, description, key points. Glass/blur background. "Get Started" dismissal button. Staggered fade-in animation.

**Step 3:** Add SectionIntro to each main page (Chronicles, Echoes, Discover, Vault) with section-specific content.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add per-section intro overlays for first-time visitors"
```

---

### Task 21: Search (The Oracle)

**Files:**
- Create: `src/components/layout/SearchModal.tsx`
- Create: `src/hooks/useSearch.ts`

**Step 1:** SearchModal — Command palette style (CMD+K). Full-screen overlay with centered search input. Results grouped by type: Events, Chronicles, Figures, Contributors. Uses fuzzy search across mock data.

**Step 2:** useSearch — filters mock data based on query string.

**Step 3:** Wire up CMD+K shortcut and search icon in TopBar.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add search modal (The Oracle) with CMD+K shortcut"
```

---

**>>> QUALITY GATE: Final dual UX/UI review on all phases <<<**

---

## Phase 8: Polish & Review

### Task 22: Animations & transitions

- Page transitions between sections (smooth slide in/out)
- Card hover effects (subtle lift + shadow increase)
- Map pin hover/selection animations
- Skeleton loading states for all data-dependent components
- Smooth scroll behavior

### Task 23: Responsive design

- Test and adjust for tablet and mobile viewports
- Collapsible sidebar panels on smaller screens
- Touch-friendly map controls
- Mobile-friendly navigation (bottom tab bar on mobile)

### Task 24: Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation (tab, enter, escape for modals)
- Color contrast compliance (both light and dark modes)
- Screen reader testing

### Task 25: Final cleanup

- Remove any unused imports/components
- Verify all mock data is realistic and diverse
- Check all links/navigation works
- Test light/dark mode on every page
- Lighthouse audit for performance

---

## Build Sequence Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1 | 1-5 | Project setup, design system, TopBar, mock data |
| 2 | 6-11 | Atlas landing page, map, time scrubber, event cards |
| 3 | 12-13 | Chronicles listing + reader |
| 4 | 14-15 | Echoes gallery + chat |
| 5 | 16 | Discover page |
| 6 | 17-18 | Vault + Profile |
| 7 | 19-21 | Onboarding + Search |
| 8 | 22-25 | Polish, responsive, a11y, cleanup |

Each phase ends with a quality gate (dual UX/UI review).
