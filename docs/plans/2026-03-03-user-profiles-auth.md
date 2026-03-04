# User Profiles & Authentication — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add mock authentication (localStorage-based) with sign-up/sign-in modals, Reddit-style voting, starring, three-tier contributions, and profile pages with rich GitHub-style data visualizations and tier progression.

**Architecture:** AuthProvider context (mirrors ThemeProvider pattern) persists user state in localStorage. Modal-based auth flows triggered by interaction gates. All content readable without auth; interactions (vote, star, contribute) require sign-in. Profile pages feature contribution heatmaps, area charts, donut charts, stat cards, milestone badges, and tier progression bars.

**Tech Stack:** React 19, Next.js 16 App Router, localStorage, Recharts (area/donut charts), CSS custom properties (atlas design system), Lucide React icons.

**Design Doc:** `docs/plans/2026-03-03-user-profiles-auth-design.md`

---

## Task 1: Install Recharts

**Files:**
- Modify: `package.json`

**Step 1: Install recharts**

```bash
npm install recharts
```

**Step 2: Verify installation**

```bash
npm run build
```
Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add recharts for profile data visualizations"
```

---

## Task 2: Extend Types & Auth Data Model

**Files:**
- Modify: `src/data/types.ts`

**Context:** The existing `User` type has basic fields. We need `UserRole`, extended user profile fields for auth, voting, and chart data. Keep the existing `User` interface intact and add new types alongside it.

**Step 1: Add new types to `src/data/types.ts`**

Add after the existing `User` interface (after line 66):

```typescript
/* ── Auth & Profile Types ─────────────────────────────── */

export type UserRole = "explorer" | "contributor" | "historian";

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  starsReceived: number;
  votesCast: number;
}

export interface AuthUser {
  id: string;
  email: string;
  password: string; // plain text (mock only, never do this in production)
  displayName: string;
  username: string;
  avatarUrl?: string;
  bio: string;
  location: string;
  role: UserRole;
  joinedAt: string;
  stats: {
    totalContributions: number;
    starsReceived: number;
    votesCast: number;
    currentStreak: number;
    starredSuggestions: number;
    chroniclesCreated: number;
  };
  activityHistory: DailyActivity[];
  monthlyStats: MonthlyStats[];
  contributionBreakdown: {
    votes: number;
    stars: number;
    corrections: number;
    chronicles: number;
  };
  milestones: string[];
  starredItems: string[];
  votes: Record<string, "up" | "down">; // itemId → vote direction
}

export interface Milestone {
  id: string;
  label: string;
  description: string;
  icon: string; // lucide icon name
  threshold?: number; // number needed to earn
  field?: string; // which stat field to check
}
```

**Step 2: Verify**

```bash
npm run build
```
Expected: Build succeeds. Existing code unaffected since we only added new types.

**Step 3: Commit**

```bash
git add src/data/types.ts
git commit -m "feat: add AuthUser, UserRole, and profile data types"
```

---

## Task 3: Create Mock Auth Data

**Files:**
- Create: `src/data/mock-auth-users.ts`
- Create: `src/data/milestones.ts`

**Context:** Generate 3 mock users (one per tier) with realistic activity history, monthly stats, and milestones. The activity data generator should produce 365 days of heatmap data and 12 months of chart data, seeded by username for consistency.

**Step 1: Create milestones data at `src/data/milestones.ts`**

```typescript
import type { Milestone } from "./types";

export const MILESTONES: Milestone[] = [
  { id: "first-vote", label: "First Vote", description: "Cast your first vote", icon: "ArrowUp", threshold: 1, field: "votesCast" },
  { id: "100-votes", label: "Century Voter", description: "Cast 100 votes", icon: "ArrowUp", threshold: 100, field: "votesCast" },
  { id: "first-star", label: "First Star", description: "Star your first item", icon: "Star", threshold: 1, field: "starsReceived" },
  { id: "50-stars", label: "Star Collector", description: "Receive 50 stars", icon: "Star", threshold: 50, field: "starsReceived" },
  { id: "10-day-streak", label: "On a Roll", description: "10-day contribution streak", icon: "Flame", threshold: 10, field: "currentStreak" },
  { id: "30-day-streak", label: "Dedicated", description: "30-day contribution streak", icon: "Flame", threshold: 30, field: "currentStreak" },
  { id: "first-chronicle", label: "First Chronicle", description: "Create your first chronicle", icon: "BookOpen", threshold: 1, field: "chroniclesCreated" },
  { id: "5-chronicles", label: "Storyteller", description: "Create 5 chronicles", icon: "BookOpen", threshold: 5, field: "chroniclesCreated" },
  { id: "contributor", label: "Contributor", description: "Reach Contributor tier", icon: "Award" },
  { id: "historian", label: "Verified Historian", description: "Reach Verified Historian tier", icon: "Shield" },
];
```

**Step 2: Create mock auth users at `src/data/mock-auth-users.ts`**

```typescript
import type { AuthUser, DailyActivity, MonthlyStats } from "./types";

/** Seeded PRNG for consistent mock data per username */
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return () => {
    hash = (hash * 16807 + 0) % 2147483647;
    return (hash & 0x7fffffff) / 0x7fffffff;
  };
}

function generateActivityHistory(username: string, density: number): DailyActivity[] {
  const rng = seededRandom(username);
  const today = new Date();
  const history: DailyActivity[] = [];

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const r = rng();
    let count = 0;
    if (r < density) {
      count = Math.floor(rng() * 8) + 1;
    }
    history.push({ date: dateStr, count });
  }
  return history;
}

function generateMonthlyStats(username: string, scale: number): MonthlyStats[] {
  const rng = seededRandom(username + "-monthly");
  const stats: MonthlyStats[] = [];
  const today = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    stats.push({
      month,
      starsReceived: Math.floor(rng() * 30 * scale) + Math.floor(scale * 5),
      votesCast: Math.floor(rng() * 50 * scale) + Math.floor(scale * 10),
    });
  }
  return stats;
}

export const MOCK_AUTH_USERS: AuthUser[] = [
  {
    id: "auth-001",
    email: "elena@example.com",
    password: "password123",
    displayName: "Dr. Elena Vasquez",
    username: "elena-vasquez",
    bio: "Medieval history researcher. Passionate about preserving untold stories of the past.",
    location: "Madrid, Spain",
    role: "historian",
    joinedAt: "2024-03-15T00:00:00Z",
    stats: {
      totalContributions: 847,
      starsReceived: 2340,
      votesCast: 1523,
      currentStreak: 42,
      starredSuggestions: 28,
      chroniclesCreated: 24,
    },
    activityHistory: generateActivityHistory("elena-vasquez", 0.75),
    monthlyStats: generateMonthlyStats("elena-vasquez", 3),
    contributionBreakdown: { votes: 1523, stars: 456, corrections: 89, chronicles: 24 },
    milestones: ["first-vote", "100-votes", "first-star", "50-stars", "10-day-streak", "30-day-streak", "first-chronicle", "5-chronicles", "contributor", "historian"],
    starredItems: ["chr-001", "chr-003", "chr-005", "evt-001", "evt-004"],
    votes: { "chr-001": "up", "chr-002": "up", "chr-004": "down", "evt-001": "up", "evt-003": "up" },
  },
  {
    id: "auth-002",
    email: "marcus@example.com",
    password: "password123",
    displayName: "Marcus Chen",
    username: "marcus-chen",
    bio: "History enthusiast and aspiring writer. Focused on East Asian civilizations.",
    location: "San Francisco, CA",
    role: "contributor",
    joinedAt: "2025-01-10T00:00:00Z",
    stats: {
      totalContributions: 234,
      starsReceived: 89,
      votesCast: 412,
      currentStreak: 7,
      starredSuggestions: 12,
      chroniclesCreated: 3,
    },
    activityHistory: generateActivityHistory("marcus-chen", 0.5),
    monthlyStats: generateMonthlyStats("marcus-chen", 1.5),
    contributionBreakdown: { votes: 412, stars: 167, corrections: 34, chronicles: 3 },
    milestones: ["first-vote", "100-votes", "first-star", "10-day-streak", "first-chronicle", "contributor"],
    starredItems: ["chr-002", "chr-006", "evt-002"],
    votes: { "chr-001": "up", "chr-003": "up", "evt-002": "up" },
  },
  {
    id: "auth-003",
    email: "sara@example.com",
    password: "password123",
    displayName: "Sara Okonkwo",
    username: "sara-okonkwo",
    bio: "Just started exploring! Love learning about ancient civilizations.",
    location: "Lagos, Nigeria",
    role: "explorer",
    joinedAt: "2026-02-01T00:00:00Z",
    stats: {
      totalContributions: 18,
      starsReceived: 3,
      votesCast: 27,
      currentStreak: 2,
      starredSuggestions: 2,
      chroniclesCreated: 0,
    },
    activityHistory: generateActivityHistory("sara-okonkwo", 0.15),
    monthlyStats: generateMonthlyStats("sara-okonkwo", 0.3),
    contributionBreakdown: { votes: 27, stars: 12, corrections: 2, chronicles: 0 },
    milestones: ["first-vote", "first-star"],
    starredItems: ["chr-001"],
    votes: { "chr-001": "up" },
  },
];
```

**Step 3: Verify**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/data/milestones.ts src/data/mock-auth-users.ts
git commit -m "feat: add mock auth users and milestone definitions"
```

---

## Task 4: Create AuthContext & AuthProvider

**Files:**
- Create: `src/hooks/useAuth.ts`
- Create: `src/components/auth/AuthProvider.tsx`
- Modify: `src/app/layout.tsx` (wrap with AuthProvider)

**Context:** Follow the exact same pattern as `useTheme.ts` + `ThemeProvider.tsx`. Context defined in hooks, provider defined in components. Provider reads from localStorage on mount, includes FOUC prevention script.

**Step 1: Create auth context hook at `src/hooks/useAuth.ts`**

```typescript
"use client";

import { createContext, useContext } from "react";
import type { AuthUser } from "@/data/types";

export interface AuthContextValue {
  user: AuthUser | null;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (data: { email: string; password: string; displayName: string }) => { success: boolean; error?: string };
  signOut: () => void;
  updateProfile: (updates: Partial<Pick<AuthUser, "displayName" | "bio" | "location" | "avatarUrl">>) => void;
  toggleStar: (itemId: string) => void;
  castVote: (itemId: string, direction: "up" | "down") => void;
  openAuthModal: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

**Step 2: Create AuthProvider at `src/components/auth/AuthProvider.tsx`**

```typescript
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/hooks/useAuth";
import type { AuthUser, DailyActivity, MonthlyStats } from "@/data/types";
import { MOCK_AUTH_USERS } from "@/data/mock-auth-users";

const USERS_KEY = "atlas-auth-users";
const CURRENT_USER_KEY = "atlas-auth-current";

function getStoredUsers(): AuthUser[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function getStoredCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return null;
}

function saveUsers(users: AuthUser[]) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch { /* ignore */ }
}

function saveCurrentUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch { /* ignore */ }
}

/** Seed mock users into localStorage on first visit */
function ensureMockUsers() {
  const existing = getStoredUsers();
  if (existing.length === 0) {
    saveUsers(MOCK_AUTH_USERS);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Initialize on mount
  useEffect(() => {
    ensureMockUsers();
    const current = getStoredCurrentUser();
    if (current) setUser(current);
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email);
    if (!found) return { success: false, error: "No account found with that email" };
    if (found.password !== password) return { success: false, error: "Incorrect password" };
    setUser(found);
    saveCurrentUser(found);
    return { success: true };
  }, []);

  const signUp = useCallback((data: { email: string; password: string; displayName: string }) => {
    const users = getStoredUsers();
    if (users.find((u) => u.email === data.email)) {
      return { success: false, error: "An account with that email already exists" };
    }

    const username = data.displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const today = new Date().toISOString();

    const newUser: AuthUser = {
      id: `auth-${Date.now()}`,
      email: data.email,
      password: data.password,
      displayName: data.displayName,
      username,
      bio: "",
      location: "",
      role: "explorer",
      joinedAt: today,
      stats: { totalContributions: 0, starsReceived: 0, votesCast: 0, currentStreak: 0, starredSuggestions: 0, chroniclesCreated: 0 },
      activityHistory: [] as DailyActivity[],
      monthlyStats: [] as MonthlyStats[],
      contributionBreakdown: { votes: 0, stars: 0, corrections: 0, chronicles: 0 },
      milestones: [],
      starredItems: [],
      votes: {},
    };

    const updated = [...users, newUser];
    saveUsers(updated);
    setUser(newUser);
    saveCurrentUser(newUser);
    return { success: true };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    saveCurrentUser(null);
  }, []);

  const updateProfile = useCallback((updates: Partial<Pick<AuthUser, "displayName" | "bio" | "location" | "avatarUrl">>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      saveCurrentUser(updated);
      // Also update in users list
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx >= 0) {
        users[idx] = updated;
        saveUsers(users);
      }
      return updated;
    });
  }, []);

  const toggleStar = useCallback((itemId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const starred = prev.starredItems.includes(itemId);
      const updated = {
        ...prev,
        starredItems: starred
          ? prev.starredItems.filter((id) => id !== itemId)
          : [...prev.starredItems, itemId],
      };
      saveCurrentUser(updated);
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx >= 0) { users[idx] = updated; saveUsers(users); }
      return updated;
    });
  }, []);

  const castVote = useCallback((itemId: string, direction: "up" | "down") => {
    setUser((prev) => {
      if (!prev) return prev;
      const currentVote = prev.votes[itemId];
      const newVotes = { ...prev.votes };

      if (currentVote === direction) {
        // Toggle off
        delete newVotes[itemId];
      } else {
        newVotes[itemId] = direction;
      }

      const updated = { ...prev, votes: newVotes };
      saveCurrentUser(updated);
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx >= 0) { users[idx] = updated; saveUsers(users); }
      return updated;
    });
  }, []);

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  const value = useMemo(() => ({
    user,
    isSignedIn: user !== null,
    signIn,
    signUp,
    signOut,
    updateProfile,
    toggleStar,
    castVote,
    openAuthModal,
  }), [user, signIn, signUp, signOut, updateProfile, toggleStar, castVote, openAuthModal]);

  return (
    <AuthContext value={value}>
      {children}
      {/* AuthModal will be rendered here in Task 5 */}
    </AuthContext>
  );
}

// Export modal state for AuthModal to consume
export { type AuthUser };
```

**Step 3: Wrap app with AuthProvider in `src/app/layout.tsx`**

Add import at top:
```typescript
import { AuthProvider } from "@/components/auth/AuthProvider";
```

Wrap children inside ThemeProvider (after ThemeProvider opening, before OnboardingWrapper):
```tsx
<ThemeProvider>
  <AuthProvider>
    <a href="#main-content" ...>Skip to main content</a>
    <OnboardingWrapper />
    <TopBar />
    <SearchWrapper />
    <main id="main-content" className="pt-[54px]">{children}</main>
  </AuthProvider>
</ThemeProvider>
```

**Step 4: Verify**

```bash
npm run build
```
Expected: Build succeeds. App renders normally with no visible changes.

**Step 5: Commit**

```bash
git add src/hooks/useAuth.ts src/components/auth/AuthProvider.tsx src/app/layout.tsx
git commit -m "feat: add AuthProvider with localStorage persistence"
```

---

## Task 5: Create AuthModal (Sign In / Sign Up)

**Files:**
- Create: `src/components/auth/AuthModal.tsx`
- Modify: `src/components/auth/AuthProvider.tsx` (render AuthModal)
- Modify: `src/app/globals.css` (add modal animation if needed)

**Context:** Follow the SearchModal pattern: fixed overlay with glass effect, card centered, keyboard navigation (Escape to close), backdrop click to close. Two tabs: Sign In and Sign Up. Uses atlas design system tokens.

**Step 1: Create AuthModal at `src/components/auth/AuthModal.tsx`**

Build a complete modal component with:
- Glass overlay backdrop (`rgba(0,0,0,0.50)`, `backdrop-filter: blur(8px)`)
- Centered card (max-width 420px, `searchScaleIn` animation)
- Tab switcher: "Sign In" | "Sign Up" (pill-style toggles)
- **Sign Up form:** Display Name, Email, Password, Confirm Password fields
- **Sign In form:** Email, Password fields
- Client-side validation (required, email format, passwords match, min 6 chars)
- Error display (inline, red text below form)
- Submit button (accent pill button)
- Tab-switch link ("Don't have an account? Sign up" / "Already have an account? Sign in")
- Close on Escape, backdrop click, X button
- Uses `useAuth()` context for `signIn()` and `signUp()` methods
- On successful auth: close modal

Form styling: atlas design system — `font-sans`, `var(--atlas-*)` colors, rounded inputs with border `var(--atlas-light-grey)`, focus border `var(--atlas-accent)`.

**Step 2: Wire AuthModal into AuthProvider**

In `AuthProvider.tsx`, add state and render:
- `authModalOpen` state (already defined in the provider)
- Pass `authModalOpen` and `setAuthModalOpen` as close handler
- Render `<AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />` inside the provider, after `{children}`

**Step 3: Verify**

```bash
npm run dev
```
- Open browser console, run: `window.dispatchEvent(new CustomEvent("atlas:open-auth"))`
- Or temporarily add a button that calls `openAuthModal()`
- Verify modal opens, tabs switch, form validates, sign up creates user, sign in works

**Step 4: Commit**

```bash
git add src/components/auth/AuthModal.tsx src/components/auth/AuthProvider.tsx
git commit -m "feat: add AuthModal with sign-in and sign-up forms"
```

---

## Task 6: TopBar Auth Integration

**Files:**
- Modify: `src/components/layout/TopBar.tsx`

**Context:** When signed out, show "Sign In" button where "Contribute" currently is on desktop. When signed in, show avatar circle (initials) that opens a dropdown menu (Profile, Settings, Sign Out). "Contribute" button stays visible for all users. On mobile, these appear in the hamburger dropdown.

**Step 1: Add auth state to TopBar**

Import `useAuth` and read `user`, `isSignedIn`, `signOut`, `openAuthModal`.

**Step 2: Desktop changes**

- Replace current "Contribute" button with conditional rendering:
  - **Signed out:** "Sign In" text button (outlined pill, same style as "Choose Era") + "Contribute" button (triggers `openAuthModal`)
  - **Signed in:** "Contribute" button (stays) + Avatar circle (40px, initials, `getAvatarColor()` background)
- Avatar click → dropdown menu with: "Profile" (link to `/profile`), "Sign Out" (calls `signOut()`)
- Dropdown: absolute positioned, right-aligned, same style as mobile dropdown (white bg, shadow-lg, rounded-12, border)

**Step 3: Mobile changes**

- In hamburger dropdown menu, add after nav items:
  - **Signed out:** "Sign In" button (full-width outlined pill)
  - **Signed in:** User info row (avatar + name + tier badge) + "Profile" link + "Sign Out" button
- "Contribute" stays in dropdown for both states

**Step 4: Verify**

```bash
npm run dev
```
- Check desktop: signed-out shows "Sign In" button; click opens modal; sign in; see avatar appear
- Check mobile: hamburger shows appropriate state
- Sign out: avatar disappears, "Sign In" returns

**Step 5: Commit**

```bash
git add src/components/layout/TopBar.tsx
git commit -m "feat: add auth state to TopBar with avatar and user menu"
```

---

## Task 7: Create VoteButtons Component

**Files:**
- Create: `src/components/shared/VoteButtons.tsx`

**Context:** Reddit-style vertical vote buttons with up arrow, score, down arrow. Uses `useAuth()` for vote state and auth gating. Placed on left side of content cards.

**Step 1: Create VoteButtons at `src/components/shared/VoteButtons.tsx`**

```typescript
"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface VoteButtonsProps {
  itemId: string;
  initialScore?: number;
}
```

Component behavior:
- Vertical layout: `flexDirection: "column"`, `alignItems: "center"`, `gap: 0`
- Up arrow (ChevronUp, 18px): default `var(--atlas-mid-grey)`, upvoted `var(--atlas-accent)`
- Score number (14px, font-semibold): between arrows
- Down arrow (ChevronDown, 18px): default `var(--atlas-mid-grey)`, downvoted `#6366f1` (indigo)
- `initialScore` defaults to 1
- Score adjusts based on current user's vote from `user.votes[itemId]`
- Click handlers: if not signed in → `openAuthModal()`, else → `castVote(itemId, direction)`
- Hover: arrow color lightens on hover
- Transition: `color 0.15s`
- Width: 32px fixed (compact column)

**Step 2: Verify**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/components/shared/VoteButtons.tsx
git commit -m "feat: add Reddit-style VoteButtons component"
```

---

## Task 8: Add VoteButtons to Content Cards

**Files:**
- Modify: `src/components/chronicles/ChronicleCard.tsx`
- Modify: `src/components/atlas/EventDetailCard.tsx`

**Context:** Add VoteButtons to the left side of ChronicleCard and to EventDetailCard. The card layout needs to become a flex row with vote column on the left.

**Step 1: Update ChronicleCard**

Wrap the existing `<article>` content in a flex container:
```tsx
<article style={{ display: "flex", gap: 8 }}>
  <VoteButtons itemId={chronicle.id} initialScore={chronicle.stars} />
  <div style={{ flex: 1, minWidth: 0 }}>
    {/* ...existing card content... */}
  </div>
</article>
```

Remove the StarButton from the top row (replaced by votes). Keep EraTag.

**Step 2: Update EventDetailCard**

Add VoteButtons below the action buttons section:
```tsx
<div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
  <VoteButtons itemId={event.id} initialScore={Math.floor(Math.random() * 50) + 1} />
  <StarButton itemId={event.id} />
</div>
```

**Step 3: Verify**

```bash
npm run dev
```
- Chronicles page: vote arrows appear on left of each card
- Atlas page: click event pin, vote arrows appear in detail card
- Sign out: clicking arrows opens auth modal
- Sign in: clicking arrows toggles vote state

**Step 4: Commit**

```bash
git add src/components/chronicles/ChronicleCard.tsx src/components/atlas/EventDetailCard.tsx
git commit -m "feat: add vote buttons to chronicle and event cards"
```

---

## Task 9: Make StarButton Auth-Aware

**Files:**
- Modify: `src/components/chronicles/StarButton.tsx`

**Context:** The existing StarButton is stateless (takes `starred` and `onToggle` props). Make it auth-aware: read star state from `useAuth()`, gate behind auth. Keep backward compatibility for any existing usage.

**Step 1: Update StarButton**

Add an optional `itemId` prop. When `itemId` is provided:
- Read star state from `user.starredItems.includes(itemId)`
- `onToggle` calls `toggleStar(itemId)` from auth context
- If not signed in, clicking calls `openAuthModal()`

When `itemId` is NOT provided, fall back to existing props-based behavior (backward compat).

**Step 2: Verify**

```bash
npm run dev
```
- Star buttons work when signed in (toggle state)
- Star buttons open auth modal when signed out

**Step 3: Commit**

```bash
git add src/components/chronicles/StarButton.tsx
git commit -m "feat: make StarButton auth-aware with optional itemId prop"
```

---

## Task 10: Create Contribute Panel

**Files:**
- Create: `src/components/auth/ContributeModal.tsx`

**Context:** A modal that shows users what they can contribute based on their tier. Triggered by the "Contribute" button in TopBar. If signed out → opens auth modal instead. Uses same glass overlay pattern as AuthModal.

**Step 1: Create ContributeModal at `src/components/auth/ContributeModal.tsx`**

Layout:
- Glass overlay + centered card (same pattern as AuthModal)
- Current tier badge at top (colored pill: Explorer=grey, Contributor=blue, Historian=gold)
- Section: "What you can do" — checklist of available actions for current tier
- Section: "Unlock more" — progress toward next tier with progress bar
- Each action item: icon + label + description, with checkmark if available, lock if not

Tier actions table:

**Explorer:**
- ✅ Star content you love
- ✅ Upvote & downvote contributions
- ✅ Suggest corrections & report errors
- 🔒 Create chronicles (Contributor)
- 🔒 Add events to the atlas (Contributor)
- 🔒 Review submissions (Historian)
- Progress: "X/5 starred suggestions to reach Contributor"

**Contributor:**
- All explorer actions ✅
- ✅ Create chronicles
- ✅ Add events to the atlas
- ✅ Write figure bios
- 🔒 Edits go live immediately (Historian)
- 🔒 Review community submissions (Historian)
- Progress: "Apply for Verified Historian review"

**Historian:**
- All actions ✅
- "You've reached the highest tier. Your contributions help preserve history for future generations."

**Step 2: Wire into TopBar**

"Contribute" button click:
- Signed out → `openAuthModal()`
- Signed in → opens ContributeModal (use state in TopBar or dispatch custom event)

**Step 3: Verify**

```bash
npm run dev
```
- Sign in as Explorer (sara@example.com / password123) → see explorer-level panel
- Sign in as Historian (elena@example.com / password123) → see full access
- Sign out → Contribute opens auth modal

**Step 4: Commit**

```bash
git add src/components/auth/ContributeModal.tsx src/components/layout/TopBar.tsx
git commit -m "feat: add Contribute modal with tier-based action display"
```

---

## Task 11: Profile Page — Header & Tier Progression

**Files:**
- Create: `src/app/profile/page.tsx` (own profile route)
- Modify: `src/app/profile/[username]/page.tsx` (make it client component, auth-aware)
- Modify: `src/components/community/ProfileHeader.tsx` (add tier badge, progression card)

**Context:** `/profile` shows the signed-in user's own profile. `/profile/[username]` shows any user's public profile. The ProfileHeader needs tier badge pills and a progression card with progress bar.

**Step 1: Create own-profile route at `src/app/profile/page.tsx`**

```typescript
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OwnProfilePage() {
  const { user, isSignedIn, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      openAuthModal();
      router.push("/");
    }
  }, [isSignedIn, openAuthModal, router]);

  if (!user) return null;

  // Redirect to username-based profile
  router.push(`/profile/${user.username}`);
  return null;
}
```

**Step 2: Update ProfileHeader**

Add after the stats row:
- **Tier Badge:** Colored pill next to display name — Explorer (grey bg `var(--atlas-mid-grey)`, white text), Contributor (blue bg `#3b82f6`), Historian (gold bg `#f59e0b`)
- **Progression Card:** Below stats, full-width card:
  - Current tier label + icon
  - Progress bar (filled portion in tier color, unfilled in `var(--atlas-light-grey)`)
  - Requirements text: "3/5 starred suggestions to Contributor" or "Apply for Verified Historian" or "Max tier — impact message"
  - Progress bar height: 8px, rounded

Accept an optional `authUser` prop (type `AuthUser | null`) to show the tier/progression. When not provided (viewing someone else's profile), show basic info from the existing `User` type.

**Step 3: Update profile/[username] page**

Make it a client component. Try to find user in both mock auth users (localStorage) and existing USERS array. Show the enhanced profile when viewing an auth user.

**Step 4: Verify**

```bash
npm run dev
```
- Navigate to `/profile` when signed in → redirects to `/profile/elena-vasquez`
- See tier badge, progression card
- Navigate to `/profile` when signed out → redirects home, auth modal opens

**Step 5: Commit**

```bash
git add src/app/profile/page.tsx src/app/profile/[username]/page.tsx src/components/community/ProfileHeader.tsx
git commit -m "feat: add tier badge, progression card, and own-profile route"
```

---

## Task 12: Profile Page — Data Visualizations

**Files:**
- Create: `src/components/profile/ContributionHeatmap.tsx`
- Create: `src/components/profile/ImpactChart.tsx`
- Create: `src/components/profile/BreakdownChart.tsx`
- Create: `src/components/profile/StatCards.tsx`
- Create: `src/components/profile/MilestoneBadges.tsx`
- Modify: `src/app/profile/[username]/page.tsx` (integrate charts)

**Context:** This is the richest task. Five visualization components that make the profile feel like a GitHub/Duolingo dashboard. Use Recharts for area chart and pie/donut chart. Heatmap and stat cards are custom CSS.

**Step 1: Create ContributionHeatmap**

GitHub-style 52-week × 7-day grid. Props: `activityHistory: DailyActivity[]`.
- Uses existing heatmap pattern from `ContributionGrid.tsx` but enhanced:
  - Tooltip on hover showing "X contributions on [date]" (CSS tooltip, no library)
  - Month labels above columns (Jan, Feb, etc.)
  - Day labels on left (Mon, Wed, Fri)
  - Current streak display above grid
- Colors: 5-level scale using atlas accent tones (same `HEATMAP_COLORS` from ContributionGrid)
- Card wrapper: white bg, rounded-10, shadow-sm, padding 20px

**Step 2: Create ImpactChart**

Area chart showing cumulative impact over 12 months. Props: `monthlyStats: MonthlyStats[]`.
- Recharts `AreaChart` with `ResponsiveContainer`
- Two areas: "Stars Received" (accent color, fill opacity 0.3) and "Votes Cast" (charcoal, fill opacity 0.15)
- X-axis: month labels (short format)
- Y-axis: auto-scaled
- Tooltip: custom styled with atlas tokens
- Grid: subtle dotted lines
- Card wrapper: white bg, rounded-10, shadow-sm, padding 20px
- Title: "Impact Over Time" in font-accent

**Step 3: Create BreakdownChart**

Donut/ring chart showing contribution types. Props: `breakdown: { votes, stars, corrections, chronicles }`.
- Recharts `PieChart` with `Pie` (inner radius for donut effect)
- 4 segments with atlas-compatible colors:
  - Votes: `var(--atlas-accent)` / `#D1401F`
  - Stars: `#f59e0b` (amber)
  - Corrections: `#3b82f6` (blue)
  - Chronicles: `#10b981` (emerald)
- Center: total contributions number (large, bold)
- Legend below chart with colored dots + labels
- Card wrapper: white bg, rounded-10, shadow-sm, padding 20px
- Title: "Contribution Breakdown" in font-accent

**Step 4: Create StatCards**

4 highlight cards in a grid. Props: `stats` from `AuthUser`.
- Grid: 2×2 on mobile, 4×1 on desktop
- Each card: icon (top, muted color) + large number + label
  - Total Contributions (layers icon)
  - Stars Received (star icon)
  - Current Streak (flame icon) — show "days" suffix
  - Community Rank (trophy icon) — mock rank based on contributions
- Card: white bg, rounded-10, shadow-sm, padding 16px, text-center

**Step 5: Create MilestoneBadges**

Badge display with earned/unearned states. Props: `earnedMilestones: string[]`.
- Grid of badge circles (48px)
- Earned: accent bg + white icon, subtle glow shadow
- Unearned: light-grey bg + mid-grey icon, 40% opacity
- Tooltip on hover: milestone name + description + "X more to unlock" for unearned
- Use MILESTONES data from `src/data/milestones.ts`
- Card wrapper: white bg, rounded-10, shadow-sm, padding 20px
- Title: "Milestones" in font-accent

**Step 6: Integrate into profile page**

In `src/app/profile/[username]/page.tsx`, when viewing an auth user, render:
1. ProfileHeader (with tier badge + progression)
2. StatCards
3. ContributionHeatmap
4. Two-column layout (desktop): ImpactChart (left, wider) + BreakdownChart (right)
5. MilestoneBadges
6. Existing ContributionGrid (pinned chronicles, published chronicles)

On mobile, everything stacks vertically.

**Step 7: Verify**

```bash
npm run dev
```
- Sign in as elena@example.com → go to profile
- See: stat cards, heatmap with colored cells, area chart with two lines, donut chart, milestone badges
- Check mobile: all charts stack, remain readable
- Check dark mode: colors adapt

**Step 8: Commit**

```bash
git add src/components/profile/ src/app/profile/[username]/page.tsx
git commit -m "feat: add profile data visualizations (heatmap, charts, stats, milestones)"
```

---

## Task 13: Final Polish & Auth Gating

**Files:**
- Modify: `src/components/echoes/FigureCard.tsx` (add vote/star buttons)
- Modify: various components as needed for auth gate consistency

**Context:** Ensure all interactive elements consistently gate behind auth. Add vote buttons to FigureCard. Verify the complete flow end-to-end.

**Step 1: Add VoteButtons and StarButton to FigureCard**

Add a small vote + star row at the bottom of FigureCard, before or after the bio excerpt.

**Step 2: End-to-end verification**

Manual test checklist:
- [ ] Sign up with new account → lands as Explorer
- [ ] Sign in with existing account → correct tier shown
- [ ] TopBar: signed-out shows "Sign In", signed-in shows avatar
- [ ] Avatar dropdown: Profile link works, Sign Out works
- [ ] Vote arrows on Chronicles, Events, Echoes cards
- [ ] Star buttons on cards
- [ ] Signed-out: clicking vote/star opens auth modal
- [ ] Contribute button: signed-out → auth modal, signed-in → contribute panel
- [ ] Profile page: all charts render, tier progression shows, milestones display
- [ ] Dark mode: all new components look correct
- [ ] Mobile: all new UI elements responsive

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add auth gating to all interactive elements, polish UI"
```

---

## Summary of Files

| Action | File |
|--------|------|
| Modify | `package.json` (add recharts) |
| Modify | `src/data/types.ts` (add AuthUser, UserRole, etc.) |
| Create | `src/data/mock-auth-users.ts` |
| Create | `src/data/milestones.ts` |
| Create | `src/hooks/useAuth.ts` |
| Create | `src/components/auth/AuthProvider.tsx` |
| Create | `src/components/auth/AuthModal.tsx` |
| Create | `src/components/auth/ContributeModal.tsx` |
| Create | `src/components/shared/VoteButtons.tsx` |
| Create | `src/components/profile/ContributionHeatmap.tsx` |
| Create | `src/components/profile/ImpactChart.tsx` |
| Create | `src/components/profile/BreakdownChart.tsx` |
| Create | `src/components/profile/StatCards.tsx` |
| Create | `src/components/profile/MilestoneBadges.tsx` |
| Create | `src/app/profile/page.tsx` |
| Modify | `src/app/layout.tsx` (add AuthProvider) |
| Modify | `src/components/layout/TopBar.tsx` (auth state) |
| Modify | `src/components/chronicles/ChronicleCard.tsx` (vote buttons) |
| Modify | `src/components/chronicles/StarButton.tsx` (auth-aware) |
| Modify | `src/components/atlas/EventDetailCard.tsx` (vote buttons) |
| Modify | `src/components/echoes/FigureCard.tsx` (vote/star) |
| Modify | `src/app/profile/[username]/page.tsx` (charts integration) |
| Modify | `src/components/community/ProfileHeader.tsx` (tier badge, progression) |

## Dependency Order

```
Task 1 (recharts) ──→ Task 2 (types) ──→ Task 3 (mock data) ──→ Task 4 (AuthProvider)
                                                                        │
                    ┌───────────────────────────────────────────────────┘
                    ├──→ Task 5 (AuthModal)
                    ├──→ Task 6 (TopBar auth)
                    ├──→ Task 7 (VoteButtons) ──→ Task 8 (add to cards)
                    ├──→ Task 9 (StarButton auth)
                    ├──→ Task 10 (ContributeModal)
                    ├──→ Task 11 (Profile header + progression)
                    ├──→ Task 12 (Profile charts) ──→ Task 13 (polish)
```

Tasks 5-12 depend on Task 4 but are mostly independent of each other.
