# Community Feed Homepage — Design Document

**Date:** 2026-03-03
**Status:** Approved

## Summary

Replace the current map homepage with a Substack-meets-Twitter community feed. The feed becomes the primary landing page at `/`, showing user-generated history content. The interactive map moves to `/map`. A subtle animated globe rotates behind the feed at ~10% opacity to maintain the "history app" atmosphere.

## Goals

- Make Atlas community-first: the feed is the first thing users see
- Support 8 content types that let users contribute in different ways
- Feel like a real, active community (30 rich mock posts)
- Encourage content creation with a prominent "Create" button
- Maintain the globe/history atmosphere even on the feed page

## Route Changes

| Before | After |
|--------|-------|
| `/` (map homepage) | `/` (community feed) |
| — | `/map` (interactive map, moved from `/`) |
| `/discover` | stays as-is |

Update TopBar nav links accordingly.

## Page Layout

Three-column layout on desktop, single-column on mobile.

### Left Sidebar (desktop only)
- Nav links: Home, Map, Chronicles, Echoes, Discover, Profile
- "Create" button at the bottom (accent color CTA)
- Same items as TopBar but vertical; provides quick access without scrolling up

### Center: Main Feed
- **Logged-out state:** Banner at top — "Where history comes alive. Join a community of explorers, historians, and curious minds." with "Join the Community" CTA (opens auth modal)
- **Logged-in state:** "What's on your mind?" composer at top (avatar + text input + post button)
- **Tabs:** "For You" | "Following" (For You = all content ranked; Following = only followed users, chronological)
- **Feed cards:** Scrollable list of post cards, all 8 types mixed together
- Infinite scroll or "Load more" at bottom

### Right Sidebar (desktop only)
- Search bar (triggers `atlas:open-search`)
- "Trending This Week" — top 3-4 posts by vote count
- "Top Contributors" — top 5 users by activity
- For logged-in users: "Suggested Follows" — 3 users to follow

### Background
- Subtle CSS/SVG animated globe rotating slowly behind the feed at ~10% opacity
- Gives the "you're inside a history app" feel without Mapbox overhead

## Post Types (8 total)

### 1. Thought (short-form)
- Free text, up to ~500 chars
- Optional image/link attachment
- Like Twitter/Substack Notes

### 2. Chronicle (long-form article)
- Title, excerpt preview, read time, era tag, star count
- Links to full chronicle page at `/chronicles/[id]`
- Card shows embedded preview with "Read more"

### 3. Recreation (3D/video experience)
- Thumbnail/gradient placeholder with play button
- Title, description, duration/type label
- "3D Experience," "AI Video," "Virtual Tour" etc.
- Author's commentary text below the media

### 4. Map Annotation
- Location name, coordinates, era
- Description of what was pinned
- "View on Map" link → `/map` centered on coordinates

### 5. Debate
- Question/prompt as the title
- Visual poll bar showing for/against percentages
- Argument count, time remaining
- "Join" CTA

### 6. Source Find
- Source title, origin (e.g., "French National Archives")
- Type label: Primary Source, Artifact, Document, etc.
- Author commentary below

### 7. Correction
- What was corrected (event/chronicle title)
- What changed (old value -> new value)
- Citation/reasoning
- Subtle visual style (muted, informational)

### 8. Atlas Team (official)
- Posted by "Atlas Team" account with verified badge
- Announcements: new features, new Echoes figures, milestones
- Same card structure but with a subtle team badge/accent

## Shared Card Structure

Every post card contains:
- **Header:** Avatar, display name, role badge (Explorer/Contributor/Historian/Official), timestamp
- **Type label:** Colored badge — "CHRONICLE," "RECREATION," "DEBATE," etc. (Thoughts have no label)
- **Content area:** Type-specific layout (see above)
- **Footer:** Upvote/Downvote buttons + score, Comment count, Share button

## Data Model

```typescript
type FeedPostType =
  | "thought"
  | "chronicle"
  | "recreation"
  | "map-annotation"
  | "debate"
  | "source"
  | "correction"
  | "team";

interface FeedPost {
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

## Mock Data Requirements

- 30 posts total, covering all 8 types
- Distribution: ~8 thoughts, 5 chronicles, 4 recreations, 4 map annotations, 3 debates, 3 sources, 2 corrections, 1 team post
- Use existing mock users (10 users + Atlas Team account)
- All content should be historically accurate and engaging
- Varied timestamps (from "2m ago" to "3d ago")
- Realistic vote scores and comment counts
- Images referenced as placeholder URLs (Unsplash or similar)

## Engagement Actions

- **Upvote/Downvote:** Reddit-style. Reuses existing VoteButtons component pattern.
- **Comment:** Shows count, links to detail view (future)
- **Share:** Copy link to clipboard

## Create Button Flow

Clicking "Create" opens a menu with options:
- Write a Thought
- Publish a Chronicle
- Share a Recreation
- Add a Map Annotation
- Start a Debate
- Share a Source
- Submit a Correction

All are mock/non-functional in this phase — they open the auth modal if not logged in, or show a "Coming soon" state if logged in.

## Mobile Considerations

- Left sidebar hidden (TopBar + hamburger handles nav)
- Right sidebar stacks below the feed (or accessible via a drawer)
- Composer becomes a floating "+" FAB (floating action button) bottom-right
- Cards are full-width
- Banner is more compact
