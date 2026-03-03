import { CHRONICLES } from "@/data/chronicles";
import { USERS } from "@/data/users";
import { ChronicleReader } from "@/components/chronicles/ChronicleReader";
import Link from "next/link";

interface ChroniclePageProps {
  params: Promise<{ id: string }>;
}

export default async function ChroniclePage({ params }: ChroniclePageProps) {
  const { id } = await params;
  const chronicle = CHRONICLES.find((c) => c.id === id);

  if (!chronicle) {
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
          Chronicle Not Found
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: 16,
            color: "var(--atlas-dark-grey)",
            marginBottom: 24,
          }}
        >
          The chronicle you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/chronicles"
          className="font-sans"
          style={{
            fontSize: 14,
            color: "var(--atlas-link)",
            textDecoration: "none",
          }}
        >
          &larr; Back to Chronicles
        </Link>
      </div>
    );
  }

  const author = USERS.find((u) => u.id === chronicle.authorId) ?? USERS[0];

  // Related chronicles: same era, exclude current, max 3
  const relatedChronicles = CHRONICLES.filter(
    (c) => c.era === chronicle.era && c.id !== chronicle.id
  ).slice(0, 3);

  return (
    <ChronicleReader
      chronicle={chronicle}
      author={author}
      relatedChronicles={relatedChronicles}
    />
  );
}
