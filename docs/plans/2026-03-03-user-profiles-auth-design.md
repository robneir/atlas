# User Profiles & Authentication — Design Document

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add mock authentication (localStorage-based) with sign-up/sign-in modals, user profiles with rich data visualizations, Reddit-style voting, starring, and a three-tier contribution system that gamifies participation.

**Architecture:** AuthProvider context (same pattern as ThemeProvider) stores user state in localStorage. Modal-based auth flows. All content remains readable without sign-in; interactions (vote, star, contribute) gate behind auth. Profile pages feature GitHub-style contribution heatmaps, charts, and tier progression.

**Tech Stack:** React 19, Next.js App Router, localStorage, CSS custom properties (atlas design system), Recharts or lightweight chart lib for data viz.

---

## 1. Auth State & Data Model

### AuthProvider Context (`src/contexts/AuthContext.tsx`)
- Wraps app in `layout.tsx` alongside ThemeProvider
- Stores current user in state + localStorage
- Provides: `user`, `isSignedIn`, `signIn()`, `signUp()`, `signOut()`, `updateProfile()`
- FOUC prevention: inline script reads localStorage before hydration (same pattern as theme)

### User Type (extend `src/data/types.ts`)
```typescript
export type UserRole = "explorer" | "contributor" | "historian";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  joinedAt: string; // ISO date
  stats: {
    totalContributions: number;
    starsReceived: number;
    votesCast: number;
    currentStreak: number; // days
    starredSuggestions: number; // for tier progression
  };
  activityHistory: DailyActivity[]; // for heatmap
  contributionBreakdown: {
    votes: number;
    stars: number;
    corrections: number;
    chronicles: number;
  };
  milestones: string[]; // earned badge IDs
  starredItems: string[]; // IDs of starred content
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  count: number;
}
```

### Mock Data
- Pre-built mock users in `src/data/mock-users.ts`
- Generate realistic activity history (past 365 days) with varying density
- Sign-up creates a new user with empty stats; mock data seeds realistic profiles for demo

---

## 2. Sign-Up & Sign-In Modals

### AuthModal (`src/components/auth/AuthModal.tsx`)
- Glass overlay backdrop (consistent with SearchModal, SectionIntro patterns)
- Two tabs: **Sign In** | **Sign Up**
- Slide/fade animation on open (searchScaleIn keyframe pattern)
- Close on backdrop click, Escape key, or X button

### Sign-Up Tab
- Fields: Display Name, Email, Password, Confirm Password
- Client-side validation only (required fields, email format, password match)
- On submit: creates user object, stores in localStorage, closes modal
- Default role: "explorer"
- No email verification (mock system)

### Sign-In Tab
- Fields: Email, Password
- Checks against localStorage-stored users
- Error state: "No account found" or "Incorrect password"
- "Don't have an account? Sign up" link switches tabs

### Trigger Points
- "Sign In" button in TopBar
- Clicking vote arrows when signed out
- Clicking star when signed out
- Clicking "Contribute" when signed out
- Navigating to `/profile` when signed out

---

## 3. Signed-In TopBar & User Menu

### TopBar Changes
- **Signed out:** "Sign In" text button appears (replaces or sits near Contribute)
- **Signed in:** Avatar circle (initials or image) replaces Sign In button
- Clicking avatar → dropdown menu: Profile, Settings, Sign Out

### "Contribute" Button Behavior
- Visible to ALL users (signed in or out)
- **Signed out:** Opens sign-in modal
- **Signed in:** Opens Contribute panel/modal showing tier-appropriate actions

### Contribute Panel Content by Tier

| Tier | Actions Available |
|------|------------------|
| **Explorer** | Star & vote on content, suggest corrections, report errors. Shows progression: "X/5 starred suggestions to reach Contributor" |
| **Contributor** | Everything above + create chronicles, add events, write figure bios. Edits queued for review. |
| **Verified Historian** | Everything above + edits go live immediately, review community submissions, curate featured content. |

### Mobile
- Avatar replaces "Sign In" in hamburger dropdown
- Same dropdown menu items (Profile, Settings, Sign Out)

---

## 4. Reddit-Style Voting System

### Vote UI Component (`src/components/shared/VoteButtons.tsx`)
- Vertical layout: ▲ arrow, net score, ▼ arrow
- Placed on **left side** of content cards (Reddit convention)
- Arrow states: default (grey), upvoted (accent color), downvoted (blue/purple)
- Clicking active vote toggles it off
- Score starts at 1 for all content

### Where Voting Appears
- Chronicle cards (Chronicles page)
- Event detail cards (Atlas page)
- Figure cards (Echoes page)
- Any community contribution card

### Auth Gating
- **Signed out:** Arrows visible but disabled/muted. Clicking opens sign-in modal.
- **Signed in:** Fully interactive

### Data Storage
- Vote state stored in localStorage per user per item
- `{ [itemId]: "up" | "down" | null }`

---

## 5. Starring System

### Star UI Component (`src/components/shared/StarButton.tsx`)
- Outline star icon (☆) → filled star (★) on click
- Small "star count" next to it
- Appears on cards and detail views

### Auth Gating
- Same as voting: visible but disabled when signed out, prompts sign-in

### Data Storage
- Starred item IDs stored in user profile in localStorage

---

## 6. Profile Page

### Route: `/profile` (own) and `/profile/[userId]` (public view)

### Header Section
- Large avatar circle (initials or image)
- Display name + tier badge pill (Explorer=grey, Contributor=blue, Verified Historian=gold)
- Member since date, short bio
- Edit Profile button (own profile only)

### Tier Progression Card
- Current tier icon + label
- Progress bar toward next tier
- Specific requirements listed:
  - Explorer → Contributor: "3/5 starred suggestions" (progress bar at 60%)
  - Contributor → Historian: "Apply for review" + qualifications checklist
  - Historian: "Max level" — impact messaging: "You've helped preserve X events"

### Data Visualizations

**1. Contribution Heatmap (GitHub-style)**
- 52-week grid, 7 rows (days of week)
- Color intensity: no activity → light → medium → dark (using atlas accent color scale)
- Tooltip on hover: "X contributions on [date]"
- Shows current streak prominently

**2. Impact Over Time (Area/Line Chart)**
- X-axis: months, Y-axis: cumulative count
- Two lines: stars received, votes cast
- Filled area under curves
- Shows growth trajectory

**3. Contribution Breakdown (Donut/Ring Chart)**
- Segments: votes cast, stars given, corrections submitted, chronicles created
- Each segment in a distinct atlas palette color
- Center shows total contributions number

**4. Stat Cards (At-a-Glance)**
- 4 small cards above charts:
  - Total Contributions (number)
  - Stars Received (number)
  - Current Streak (days, with flame icon)
  - Community Rank (position)

**5. Milestone Badges**
- Visual badge row with earned/unearned states
- Examples: "First Vote", "100 Votes", "10-Day Streak", "First Chronicle", "50 Stars Received"
- Unearned badges shown as locked/greyed with "X more to unlock" tooltip

### Tabs Below Charts
- **Starred Items** — grid of starred content cards
- **My Contributions** — list of user's votes, corrections, chronicles
- **Settings** (own profile only) — edit display name, bio, avatar, password

---

## 7. Protected Routes & Auth Gates

### No Hard Route Blocking
- All content pages (Atlas, Chronicles, Echoes, Discover) fully readable without sign-in
- Auth gates are interaction-level, not page-level

### Interaction Gates (open sign-in modal)
- Vote arrows (when signed out)
- Star button (when signed out)
- "Contribute" button (when signed out)
- `/profile` route → redirect to home + open sign-in modal

### Auth State Persistence
- User object stored in localStorage key `atlas-auth-user`
- All registered users stored in `atlas-auth-users` (array)
- AuthProvider reads on mount, provides throughout app

---

## Design Tokens & Visual Notes

- Auth modal uses existing glass overlay pattern (`backdrop-filter: blur(8px)`)
- Tier badge colors: Explorer `var(--atlas-mid-grey)`, Contributor `#3b82f6`, Historian `#f59e0b`
- Vote arrows use `var(--atlas-dark-grey)` default, `var(--atlas-accent)` for upvote, `#6366f1` for downvote
- Charts use atlas color palette: accent, charcoal, mid-grey, cream
- All new components follow existing atlas design system (CSS custom properties, font-sans/font-serif, dark mode via `[data-theme="dark"]`)
- Animations consistent with existing patterns (searchScaleIn, eventCardSlideUp)
