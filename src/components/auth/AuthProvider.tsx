"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/hooks/useAuth";
import { MOCK_AUTH_USERS } from "@/data/mock-auth-users";
import { AuthModal } from "@/components/auth/AuthModal";
import type { AuthUser } from "@/data/types";

const USERS_KEY = "atlas-auth-users";
const CURRENT_KEY = "atlas-auth-current";

/* ── localStorage helpers ─────────────────────────────── */

function getStoredUsers(): AuthUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw) as AuthUser[];
  } catch {
    // localStorage may be unavailable or corrupted
  }
  return [];
}

function getStoredCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (raw) return JSON.parse(raw) as AuthUser;
  } catch {
    // localStorage may be unavailable or corrupted
  }
  return null;
}

function persistUsers(users: AuthUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // localStorage may be unavailable
  }
}

function persistCurrentUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_KEY);
    }
  } catch {
    // localStorage may be unavailable
  }
}

/* ── AuthProvider ──────────────────────────────────────── */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Seed mock users on first mount if no users exist in localStorage
  useEffect(() => {
    let storedUsers = getStoredUsers();
    if (storedUsers.length === 0) {
      storedUsers = MOCK_AUTH_USERS;
      persistUsers(storedUsers);
    }
    setUsers(storedUsers);

    const currentUser = getStoredCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  /* ── signIn ─────────────────────────────────────────── */

  const signIn = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!found) {
        return { success: false, error: "No account found with that email." };
      }
      if (found.password !== password) {
        return { success: false, error: "Incorrect password." };
      }
      setUser(found);
      persistCurrentUser(found);
      return { success: true };
    },
    [users]
  );

  /* ── signUp ─────────────────────────────────────────── */

  const signUp = useCallback(
    (data: {
      email: string;
      password: string;
      displayName: string;
    }): { success: boolean; error?: string } => {
      const exists = users.some(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
      );
      if (exists) {
        return { success: false, error: "An account with that email already exists." };
      }

      const username = data.displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ".")
        .replace(/(^\.)|(\.$)/g, "");

      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        username,
        bio: "",
        location: "",
        role: "explorer",
        joinedAt: new Date().toISOString(),
        stats: {
          totalContributions: 0,
          starsReceived: 0,
          votesCast: 0,
          currentStreak: 0,
          starredSuggestions: 0,
          chroniclesCreated: 0,
        },
        activityHistory: [],
        monthlyStats: [],
        contributionBreakdown: {
          votes: 0,
          stars: 0,
          corrections: 0,
          chronicles: 0,
        },
        milestones: [],
        starredItems: [],
        votes: {},
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      persistUsers(updatedUsers);
      setUser(newUser);
      persistCurrentUser(newUser);
      return { success: true };
    },
    [users]
  );

  /* ── signOut ────────────────────────────────────────── */

  const signOut = useCallback(() => {
    setUser(null);
    persistCurrentUser(null);
  }, []);

  /* ── updateProfile ──────────────────────────────────── */

  const updateProfile = useCallback(
    (
      updates: Partial<
        Pick<AuthUser, "displayName" | "bio" | "location" | "avatarUrl">
      >
    ) => {
      if (!user) return;

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      persistCurrentUser(updatedUser);

      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
      persistUsers(updatedUsers);
    },
    [user, users]
  );

  /* ── toggleStar ─────────────────────────────────────── */

  const toggleStar = useCallback(
    (itemId: string) => {
      if (!user) return;

      const starred = user.starredItems.includes(itemId);
      const updatedStarredItems = starred
        ? user.starredItems.filter((id) => id !== itemId)
        : [...user.starredItems, itemId];

      const updatedUser = { ...user, starredItems: updatedStarredItems };
      setUser(updatedUser);
      persistCurrentUser(updatedUser);

      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
      persistUsers(updatedUsers);
    },
    [user, users]
  );

  /* ── castVote ───────────────────────────────────────── */

  const castVote = useCallback(
    (itemId: string, direction: "up" | "down") => {
      if (!user) return;

      const currentVote = user.votes[itemId];
      const updatedVotes = { ...user.votes };

      if (currentVote === direction) {
        // Toggle off if same direction
        delete updatedVotes[itemId];
      } else {
        updatedVotes[itemId] = direction;
      }

      const updatedUser = { ...user, votes: updatedVotes };
      setUser(updatedUser);
      persistCurrentUser(updatedUser);

      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
      persistUsers(updatedUsers);
    },
    [user, users]
  );

  /* ── openAuthModal ──────────────────────────────────── */

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  /* ── Context value ──────────────────────────────────── */

  const value = useMemo(
    () => ({
      user,
      isSignedIn: user !== null,
      signIn,
      signUp,
      signOut,
      updateProfile,
      toggleStar,
      castVote,
      openAuthModal,
    }),
    [user, signIn, signUp, signOut, updateProfile, toggleStar, castVote, openAuthModal]
  );

  const modalValue = useMemo(
    () => ({ authModalOpen, setAuthModalOpen }),
    [authModalOpen]
  );

  return (
    <AuthContext value={value}>
      <AuthModalContext value={modalValue}>
        {children}
        <AuthModal />
      </AuthModalContext>
    </AuthContext>
  );
}

// Exported for AuthModal to consume (Task 5).
// AuthModal will import { useAuthModal } from this file.

interface AuthModalContextValue {
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

export const AuthModalContext = createContext<AuthModalContextValue>({
  authModalOpen: false,
  setAuthModalOpen: () => {},
});

export function useAuthModal(): AuthModalContextValue {
  return useContext(AuthModalContext);
}
