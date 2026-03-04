# Community Feed Homepage — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Substack-meets-Twitter community feed as the new Atlas homepage, with 30 rich mock posts across 8 content types, three-column layout, and an animated globe background.

**Architecture:** New `/` route renders the feed page. Current map page moves to `/map`. Feed is a client component with left sidebar nav, center scrollable feed, and right sidebar with trending/leaderboard. Background is a lightweight CSS animated globe at ~10% opacity.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, lucide-react icons, existing Atlas design system (CSS custom properties).

---

### Task 1: Add FeedPost type and 30 mock posts

**Files:**
- Modify: `src/data/types.ts` — add FeedPostType and FeedPost types
- Create: `src/data/feed-posts.ts` — 30 mock posts

**Step 1: Add types to `src/data/types.ts`**

Append after the existing types:

```typescript
export type FeedPostType =
  | "thought"
  | "chronicle"
  | "recreation"
  | "map-annotation"
  | "debate"
  | "source"
  | "correction"
  | "team";

export interface FeedPost {
  id: string;
  type: FeedPostType;
  authorId: string;
  isTeam: boolean;
  content: string;
  title?: string;
  media?: {
    type: "image" | "video" | "3d" | "document";
    url: string;
    thumbnail?: string;
  };
  metadata?: {
    readTime?: string;
    era?: Era;
    coordinates?: [number, number];
    location?: string;
    chronicleId?: string;
    pollFor?: number;
    pollAgainst?: number;
    argumentCount?: number;
    sourceType?: string;
    sourceOrigin?: string;
    correctedField?: string;
    correctedEventId?: string;
    oldValue?: string;
    newValue?: string;
  };
  score: number;
  commentCount: number;
  createdAt: string;
}
```

**Step 2: Create `src/data/feed-posts.ts` with 30 mock posts**

Distribution: ~8 thoughts, 5 chronicles, 4 recreations, 4 map annotations, 3 debates, 3 sources, 2 corrections, 1 team post.

Use existing user IDs (`usr-001` through `usr-010`). Use `authorId: "atlas-team"` with `isTeam: true` for team posts.

All content must be historically accurate, engaging, and varied. Use real historical facts. Timestamps should use ISO dates spread across the last 3 days. Scores should range from 5 to 300+. Comment counts from 0 to 67.

For media URLs, use Unsplash placeholder paths like `https://images.unsplash.com/photo-<id>?w=600&h=400&fit=crop` with real photo IDs of historical places/artifacts.

**Step 3: Commit**

```bash
git add src/data/types.ts src/data/feed-posts.ts
git commit -m "feat: add FeedPost types and 30 mock feed posts"
```

---

### Task 2: Move map page to `/map` route

**Files:**
- Create: `src/app/map/page.tsx` — new map page (content from current `src/app/page.tsx`)
- Modify: `src/app/page.tsx` — will be replaced in Task 6

**Step 1: Create `src/app/map/page.tsx`**

Copy the entire current content of `src/app/page.tsx` into `src/app/map/page.tsx`. Keep all imports and the component exactly as-is. Just rename the export from `Home` to `MapPage`.

**Step 2: Update TopBar nav**

In `src/components/layout/TopBar.tsx`, update the `navItems` array:
- Change the first item from `{ label: "Atlas", href: "/", icon: Globe }` to `{ label: "Home", href: "/", icon: Home }` (import Home icon from lucide-react)
- Add a new item: `{ label: "Map", href: "/map", icon: Globe }` after "Home"

Also update the `isActive` logic: the current pathname check for `"/"` should use exact match only.

**Step 3: Commit**

```bash
git add src/app/map/page.tsx src/components/layout/TopBar.tsx
git commit -m "feat: move interactive map to /map route, update nav"
```

---

### Task 3: Create animated globe background component

**Files:**
- Create: `src/components/feed/GlobeBackground.tsx`
- Modify: `src/app/globals.css` — add globe rotation keyframe

**Step 1: Add keyframe to `src/app/globals.css`**

Add before the `/* Ensure all interactive elements */` comment:

```css
/* Feed globe background */
@keyframes feedGlobeSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Step 2: Create `src/components/feed/GlobeBackground.tsx`**

A lightweight CSS-only animated globe. Uses a radial gradient circle with longitude/latitude lines drawn as CSS borders, rotating slowly. Fixed position, pointer-events-none, ~10% opacity. No Mapbox, no canvas — pure CSS.

The component should render a `div` with:
- `position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.08`
- A large circular element centered on the page (50vw × 50vw, max 700px)
- Radial gradient using `--atlas-light-grey` and `--atlas-cream` for earth tones
- `animation: feedGlobeSpin 120s linear infinite`

**Step 3: Commit**

```bash
git add src/components/feed/GlobeBackground.tsx src/app/globals.css
git commit -m "feat: add animated globe background for feed page"
```

---

### Task 4: Create FeedPostCard component

**Files:**
- Create: `src/components/feed/FeedPostCard.tsx`

**Step 1: Build the shared card component**

This is the main component. It receives a `FeedPost` and renders the appropriate card based on `post.type`.

Structure:
```
┌─────────────────────────────────────────┐
│ [Avatar] Name · RoleBadge · Timestamp   │
│                                         │
│ [TYPE BADGE] (if not "thought")         │
│                                         │
│ [Content area — varies by type]         │
│                                         │
│ ▲ score ▼   💬 comments   🔗 Share     │
└─────────────────────────────────────────┘
```

Props:
```typescript
interface FeedPostCardProps {
  post: FeedPost;
}
```

Key implementation details:
- Look up author from `USERS` array by `post.authorId`. For team posts (`isTeam: true`), use hardcoded "Atlas Team" with a globe icon avatar.
- Role badge: look up user in `MOCK_AUTH_USERS` for role; default to "explorer" if not found.
- Type badge colors: chronicle=#3b82f6, recreation=#8b5cf6, map-annotation=#10b981, debate=#f59e0b, source=#6366f1, correction=#64748b, team=var(--atlas-accent). No badge for thoughts.
- Timestamp: use `formatRelativeTime()` helper (e.g., "2h ago", "1d ago")
- Content rendering per type:
  - **thought**: Just the text content. If `media` exists, show image below.
  - **chronicle**: Embed card with title, read time, era tag, excerpt.
  - **recreation**: Gradient placeholder box with play icon, title, type label, then author commentary.
  - **map-annotation**: Location pin icon, location name, era, description, "View on Map" link.
  - **debate**: Title as question, visual poll bar (two colored segments), argument count, "Join" button.
  - **source**: Source card with title, origin, type label, then commentary.
  - **correction**: Muted card showing what changed (field, old→new), then reasoning.
  - **team**: Same as thought but with globe icon avatar and "Official" verified badge.
- Footer: reuse VoteButtons component (pass `post.id` and `post.score`), then comment icon + count, then share button.
- Card styling: white bg, `--atlas-shadow-sm`, borderRadius 4, padding 20px, marginBottom 12px.

**Step 2: Create `formatRelativeTime` helper**

Add a small helper at the top of the file or in a utils file:
```typescript
function formatRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d`;
}
```

**Step 3: Commit**

```bash
git add src/components/feed/FeedPostCard.tsx
git commit -m "feat: add FeedPostCard with 8 content type renderers"
```

---

### Task 5: Create left sidebar, right sidebar, and feed banner/composer

**Files:**
- Create: `src/components/feed/LeftSidebar.tsx`
- Create: `src/components/feed/RightSidebar.tsx`
- Create: `src/components/feed/FeedBanner.tsx`
- Create: `src/components/feed/FeedComposer.tsx`
- Create: `src/components/feed/CreateMenu.tsx`

**Step 1: LeftSidebar.tsx**

Fixed left sidebar (desktop only, hidden on mobile via `hidden lg:flex`). Contains:
- Vertical nav links matching TopBar: Home, Map, Chronicles, Echoes, Discover, Profile
- Each link: icon + label, active state highlighted
- "Create" button at bottom: accent color, full width, opens CreateMenu

Use `usePathname()` from `next/navigation` for active state. Style: `width: 220px`, fixed position, top below TopBar (54px), left 0, full height.

**Step 2: RightSidebar.tsx**

Fixed right sidebar (desktop only, hidden on mobile via `hidden xl:flex`). Contains:
- Search button (triggers `atlas:open-search`)
- "Trending This Week" section: top 4 posts sorted by score. Each shows title/content snippet + score.
- "Top Contributors" section: reuses data from existing Leaderboard pattern. Top 5 users by stats.

Style: `width: 300px`, fixed position, top below TopBar, right 0, scrollable.

**Step 3: FeedBanner.tsx**

Logged-out banner shown at the top of the feed. Uses `useAuth()` to check if signed in — if signed in, returns null.

Content: "Where history comes alive." + subtitle + "Join the Community" button (opens auth modal via `useAuth().openAuthModal()`).

Style: `--atlas-cream` bg, subtle border, padding 24px, borderRadius 4.

**Step 4: FeedComposer.tsx**

Logged-in composer. Uses `useAuth()` — if not signed in, returns null.

Shows: user avatar (from auth context), "What's on your mind?" placeholder text in an input-like div, "Post" button. Clicking anywhere opens a "Coming soon" toast or the CreateMenu.

**Step 5: CreateMenu.tsx**

Dropdown menu listing all 7 content creation options:
- Write a Thought, Publish a Chronicle, Share a Recreation, Add a Map Annotation, Start a Debate, Share a Source, Submit a Correction

Each item: icon + label. Clicking any item: if not logged in → auth modal. If logged in → show a simple "Coming soon" message.

Uses a `useState` for open/closed. Renders as absolute positioned dropdown from the Create button.

**Step 6: Commit**

```bash
git add src/components/feed/
git commit -m "feat: add feed layout components (sidebars, banner, composer, create menu)"
```

---

### Task 6: Build the feed homepage at `/`

**Files:**
- Modify: `src/app/page.tsx` — replace with community feed page

**Step 1: Replace `src/app/page.tsx`**

New page component:

```typescript
"use client";

import { useState, useMemo } from "react";
import { FEED_POSTS } from "@/data/feed-posts";
import { GlobeBackground } from "@/components/feed/GlobeBackground";
import { LeftSidebar } from "@/components/feed/LeftSidebar";
import { RightSidebar } from "@/components/feed/RightSidebar";
import { FeedBanner } from "@/components/feed/FeedBanner";
import { FeedComposer } from "@/components/feed/FeedComposer";
import { FeedPostCard } from "@/components/feed/FeedPostCard";

type FeedTab = "for-you" | "following";

export default function Home() {
  const [activeTab, setActiveTab] = useState<FeedTab>("for-you");

  const posts = useMemo(() => {
    // For now, both tabs show all posts. "Following" would filter
    // by followed users once that system exists.
    return [...FEED_POSTS].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [activeTab]);

  return (
    <>
      <GlobeBackground />
      <div className="flex min-h-screen">
        <LeftSidebar />
        {/* Main feed column */}
        <main
          className="flex-1 mx-auto w-full"
          style={{
            maxWidth: 640,
            padding: "24px 16px 100px",
          }}
        >
          <FeedBanner />
          <FeedComposer />

          {/* Tabs */}
          <div className="flex gap-0 mb-4 font-sans" style={{ borderBottom: "1px solid var(--atlas-light-grey)" }}>
            <button onClick={() => setActiveTab("for-you")} ...>For You</button>
            <button onClick={() => setActiveTab("following")} ...>Following</button>
          </div>

          {/* Feed */}
          {posts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </main>
        <RightSidebar />
      </div>
    </>
  );
}
```

Key layout details:
- Left sidebar: fixed, 220px wide, desktop only (lg:)
- Main feed: centered, max-width 640px, with left padding to account for sidebar
- Right sidebar: fixed, 300px wide, desktop only (xl:)
- On mobile: full-width feed, no sidebars

**Step 2: Verify build**

```bash
npm run build
```

Expected: builds successfully with no errors.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: replace homepage with community feed"
```

---

### Task 7: Add floating Create FAB for mobile

**Files:**
- Create: `src/components/feed/CreateFAB.tsx`
- Modify: `src/app/page.tsx` — add FAB

**Step 1: Create floating action button**

A `lg:hidden` fixed button (bottom-right, above the PartnersBar area) with a "+" icon. Clicking opens the CreateMenu as a bottom sheet or dropdown.

Style: 56×56px circle, `--atlas-accent` background, white "+" icon, `--atlas-shadow-lg`, `z-50`.

**Step 2: Add to page.tsx**

Import and render `<CreateFAB />` inside the page, after the main feed.

**Step 3: Commit**

```bash
git add src/components/feed/CreateFAB.tsx src/app/page.tsx
git commit -m "feat: add floating Create button for mobile feed"
```

---

### Task 8: Final build verification and cleanup

**Files:**
- Possibly modify: any file with import/type errors

**Step 1: Run build**

```bash
npm run build
```

Fix any TypeScript or build errors.

**Step 2: Visual check**

Open `http://localhost:3000` in the browser. Verify:
- Feed renders with 30 posts
- Globe rotates subtly in background
- Left sidebar shows nav + Create button (desktop)
- Right sidebar shows trending + contributors (desktop)
- Cards render correctly for all 8 post types
- Vote buttons work
- Tabs switch (both show same data for now)
- Mobile: sidebar hidden, FAB visible
- `/map` route shows the old map page

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: community feed homepage — complete with 30 mock posts"
```
