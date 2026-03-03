export type Era =
  | "ancient"
  | "classical"
  | "medieval"
  | "renaissance"
  | "enlightenment"
  | "modern"
  | "contemporary";

export interface HistoricalEvent {
  id: string;
  title: string;
  date: string;
  year: number;
  era: Era;
  location: string;
  coordinates: [number, number];
  description: string;
  relatedChronicleIds: string[];
  relatedFigureIds: string[];
}

export interface HistoricalFigure {
  id: string;
  name: string;
  title: string;
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
  content: string;
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
  password: string; // plain text (mock only)
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
  votes: Record<string, "up" | "down">;
}

export interface Milestone {
  id: string;
  label: string;
  description: string;
  icon: string;
  threshold?: number;
  field?: string;
}
