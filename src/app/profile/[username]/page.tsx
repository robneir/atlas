import { USERS } from "@/data/users";
import { CHRONICLES } from "@/data/chronicles";
import { ProfileHeader } from "@/components/community/ProfileHeader";
import { BadgeDisplay } from "@/components/community/BadgeDisplay";
import { ContributionGrid } from "@/components/community/ContributionGrid";
import Link from "next/link";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = USERS.find((u) => u.username === username);

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
        <ProfileHeader user={user} />
        <BadgeDisplay badges={user.badges} />
        <ContributionGrid user={user} chronicles={CHRONICLES} />
      </div>
    </div>
  );
}
