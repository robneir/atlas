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
