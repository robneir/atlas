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
