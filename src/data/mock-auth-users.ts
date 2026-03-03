import type { AuthUser, DailyActivity, MonthlyStats } from "./types";

/* ── Seeded PRNG ──────────────────────────────────────── */

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 0x100000000;
  };
}

/* ── Activity History Generator ───────────────────────── */

/**
 * Generates 365 DailyActivity entries ending at "today" (2026-03-03).
 * `density` controls how likely any given day has activity (0–1).
 */
export function generateActivityHistory(
  username: string,
  density: number
): DailyActivity[] {
  const rng = seededRandom(`activity-${username}`);
  const entries: DailyActivity[] = [];
  const end = new Date("2026-03-03");

  for (let i = 364; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);

    const hasActivity = rng() < density;
    const count = hasActivity ? Math.floor(rng() * 8) + 1 : 0;

    entries.push({ date, count });
  }

  return entries;
}

/* ── Monthly Stats Generator ──────────────────────────── */

/**
 * Generates 12 MonthlyStats entries for the past 12 months.
 * `scale` multiplies the base random values (higher = more active).
 */
export function generateMonthlyStats(
  username: string,
  scale: number
): MonthlyStats[] {
  const rng = seededRandom(`monthly-${username}`);
  const entries: MonthlyStats[] = [];
  const now = new Date("2026-03-01");

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const month = d.toISOString().slice(0, 7);

    entries.push({
      month,
      starsReceived: Math.floor(rng() * 20 * scale),
      votesCast: Math.floor(rng() * 40 * scale),
    });
  }

  return entries;
}

/* ── Mock Users ───────────────────────────────────────── */

export const MOCK_AUTH_USERS: AuthUser[] = [
  // ── Dr. Elena Vasquez — Historian (heavy activity) ──
  {
    id: "user-elena",
    email: "elena@example.com",
    password: "password123",
    displayName: "Dr. Elena Vasquez",
    username: "elena.vasquez",
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=elena",
    bio: "Professor of Ancient Mediterranean History. Passionate about connecting forgotten narratives to the broader human story.",
    location: "Barcelona, Spain",
    role: "historian",
    joinedAt: "2024-06-15T00:00:00Z",
    stats: {
      totalContributions: 1247,
      starsReceived: 342,
      votesCast: 589,
      currentStreak: 45,
      starredSuggestions: 73,
      chroniclesCreated: 28,
    },
    activityHistory: generateActivityHistory("elena.vasquez", 0.85),
    monthlyStats: generateMonthlyStats("elena.vasquez", 3),
    contributionBreakdown: {
      votes: 589,
      stars: 342,
      corrections: 288,
      chronicles: 28,
    },
    milestones: [
      "first-vote",
      "100-votes",
      "first-star",
      "50-stars",
      "10-day-streak",
      "30-day-streak",
      "first-chronicle",
      "5-chronicles",
      "contributor",
      "historian",
    ],
    starredItems: [
      "evt-rosetta-stone",
      "evt-fall-of-rome",
      "chr-silk-road",
      "chr-byzantine-art",
      "fig-cleopatra",
    ],
    votes: {
      "evt-rosetta-stone": "up",
      "evt-fall-of-rome": "up",
      "chr-silk-road": "up",
      "evt-pompeii": "up",
      "chr-byzantine-art": "down",
    },
  },

  // ── Marcus Chen — Contributor (moderate activity) ──
  {
    id: "user-marcus",
    email: "marcus@example.com",
    password: "password123",
    displayName: "Marcus Chen",
    username: "marcus.chen",
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=marcus",
    bio: "History enthusiast and software developer. Fascinated by the intersections of technology and civilization.",
    location: "San Francisco, CA",
    role: "contributor",
    joinedAt: "2025-01-10T00:00:00Z",
    stats: {
      totalContributions: 312,
      starsReceived: 87,
      votesCast: 156,
      currentStreak: 12,
      starredSuggestions: 24,
      chroniclesCreated: 6,
    },
    activityHistory: generateActivityHistory("marcus.chen", 0.5),
    monthlyStats: generateMonthlyStats("marcus.chen", 1.5),
    contributionBreakdown: {
      votes: 156,
      stars: 87,
      corrections: 63,
      chronicles: 6,
    },
    milestones: [
      "first-vote",
      "100-votes",
      "first-star",
      "50-stars",
      "10-day-streak",
      "first-chronicle",
      "5-chronicles",
      "contributor",
    ],
    starredItems: [
      "evt-moon-landing",
      "chr-industrial-revolution",
      "fig-ada-lovelace",
    ],
    votes: {
      "evt-moon-landing": "up",
      "chr-industrial-revolution": "up",
      "evt-printing-press": "up",
    },
  },

  // ── Sara Okonkwo — Explorer (light activity) ──
  {
    id: "user-sara",
    email: "sara@example.com",
    password: "password123",
    displayName: "Sara Okonkwo",
    username: "sara.okonkwo",
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=sara",
    bio: "Just getting started! Excited to learn more about world history.",
    location: "Lagos, Nigeria",
    role: "explorer",
    joinedAt: "2026-02-01T00:00:00Z",
    stats: {
      totalContributions: 18,
      starsReceived: 3,
      votesCast: 11,
      currentStreak: 2,
      starredSuggestions: 4,
      chroniclesCreated: 0,
    },
    activityHistory: generateActivityHistory("sara.okonkwo", 0.15),
    monthlyStats: generateMonthlyStats("sara.okonkwo", 0.3),
    contributionBreakdown: {
      votes: 11,
      stars: 3,
      corrections: 4,
      chronicles: 0,
    },
    milestones: ["first-vote", "first-star"],
    starredItems: ["evt-great-wall", "fig-mansa-musa"],
    votes: {
      "evt-great-wall": "up",
      "fig-mansa-musa": "up",
    },
  },
];
