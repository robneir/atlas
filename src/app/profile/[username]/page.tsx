"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { USERS } from "@/data/users";
import { CHRONICLES } from "@/data/chronicles";
import { MOCK_AUTH_USERS } from "@/data/mock-auth-users";
import { useAuth } from "@/hooks/useAuth";
import { ProfileHeader } from "@/components/community/ProfileHeader";
import { BadgeDisplay } from "@/components/community/BadgeDisplay";
import { ContributionGrid } from "@/components/community/ContributionGrid";
import StatCards from "@/components/profile/StatCards";
import ContributionHeatmap from "@/components/profile/ContributionHeatmap";
import ImpactChart from "@/components/profile/ImpactChart";
import BreakdownChart from "@/components/profile/BreakdownChart";
import MilestoneBadges from "@/components/profile/MilestoneBadges";
import Link from "next/link";
import type { AuthUser, User } from "@/data/types";

/**
 * Read auth users saved to localStorage (registered via sign-up).
 * Returns an empty array on the server or when the key is absent.
 */
function getLocalAuthUsers(): AuthUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("atlas-auth-users");
    return raw ? (JSON.parse(raw) as AuthUser[]) : [];
  } catch {
    return [];
  }
}

/**
 * Convert an AuthUser to the simpler User shape so existing
 * components (BadgeDisplay, ContributionGrid) keep working.
 */
function authUserToUser(au: AuthUser): User {
  return {
    id: au.id,
    username: au.username,
    displayName: au.displayName,
    avatarUrl: au.avatarUrl ?? "",
    bio: au.bio,
    location: au.location,
    joinedAt: au.joinedAt,
    stats: {
      chronicles: au.stats.chroniclesCreated,
      stars: au.stats.starsReceived,
      contributions: au.stats.totalContributions,
    },
    badges: au.milestones,
    pinnedChronicleIds: [],
  };
}

export default function ProfilePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const { user: currentUser } = useAuth();

  const { user, authUser } = useMemo(() => {
    // 1. Check static USERS array
    const staticUser = USERS.find((u) => u.username === username);
    if (staticUser) {
      return { user: staticUser, authUser: null };
    }

    // 2. Check mock auth users
    const mockAuth = MOCK_AUTH_USERS.find((u) => u.username === username);
    if (mockAuth) {
      return { user: authUserToUser(mockAuth), authUser: mockAuth };
    }

    // 3. Check localStorage auth users
    const localUsers = getLocalAuthUsers();
    const localAuth = localUsers.find((u) => u.username === username);
    if (localAuth) {
      return { user: authUserToUser(localAuth), authUser: localAuth };
    }

    // 4. Check current signed-in user (in case they just signed up)
    if (currentUser && currentUser.username === username) {
      return { user: authUserToUser(currentUser), authUser: currentUser };
    }

    return { user: null, authUser: null };
  }, [username, currentUser]);

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--atlas-cream)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 28px",
        }}
      >
        <h1
          className="font-serif"
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "var(--atlas-black)",
            marginBottom: 12,
          }}
        >
          Profile Not Found
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: 16,
            color: "var(--atlas-dark-grey)",
            marginBottom: 24,
          }}
        >
          The user @{username} does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="font-sans"
          style={{
            fontSize: 14,
            color: "var(--atlas-link)",
            textDecoration: "none",
          }}
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--atlas-cream)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "40px 16px 100px",
        }}
        className="md:!px-7"
      >
        <ProfileHeader user={user} authUser={authUser} />
        <BadgeDisplay badges={user.badges} />
        {authUser && (
          <>
            <div style={{ marginBottom: 24 }}>
              <StatCards stats={authUser.stats} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <ContributionHeatmap activityHistory={authUser.activityHistory} currentStreak={authUser.stats.currentStreak} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 24 }}>
              <div className="md:col-span-2">
                <ImpactChart monthlyStats={authUser.monthlyStats} />
              </div>
              <div>
                <BreakdownChart breakdown={authUser.contributionBreakdown} />
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <MilestoneBadges earnedMilestones={authUser.milestones} stats={authUser.stats} />
            </div>
          </>
        )}
        <ContributionGrid user={user} chronicles={CHRONICLES} />
      </div>
    </div>
  );
}
