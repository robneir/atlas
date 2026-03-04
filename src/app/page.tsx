"use client";

import { useState, useMemo } from "react";
import { FEED_POSTS } from "@/data/feed-posts";
import { GlobeBackground } from "@/components/feed/GlobeBackground";
import { LeftSidebar } from "@/components/feed/LeftSidebar";
import { RightSidebar } from "@/components/feed/RightSidebar";
import { FeedBanner } from "@/components/feed/FeedBanner";
import { FeedComposer } from "@/components/feed/FeedComposer";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { CreateFAB } from "@/components/feed/CreateFAB";

type FeedTab = "for-you" | "following";

export default function Home() {
  const [activeTab, setActiveTab] = useState<FeedTab>("for-you");

  const posts = useMemo(() => {
    // Both tabs show all posts for now. "Following" would filter by followed users.
    return [...FEED_POSTS].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, []);

  return (
    <>
      <GlobeBackground />
      <div className="flex min-h-screen">
        <LeftSidebar />

        {/* Main feed column */}
        <main
          className="flex-1 relative z-10 mx-auto w-full lg:ml-[220px]"
          style={{
            maxWidth: 640,
            padding: "24px 16px 100px",
          }}
        >
          <FeedBanner />
          <FeedComposer />

          {/* Tabs */}
          <div
            className="flex gap-0 font-sans"
            style={{
              borderBottom: "1px solid var(--atlas-light-grey)",
              marginBottom: 16,
            }}
          >
            {(["for-you", "following"] as FeedTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="cursor-pointer transition-colors"
                style={{
                  padding: "12px 20px",
                  fontSize: 15,
                  fontWeight: activeTab === tab ? 700 : 500,
                  color:
                    activeTab === tab
                      ? "var(--atlas-black)"
                      : "var(--atlas-mid-grey)",
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === tab
                    ? "2px solid var(--atlas-black)"
                    : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {tab === "for-you" ? "For You" : "Following"}
              </button>
            ))}
          </div>

          {/* Feed posts */}
          {posts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </main>

        <RightSidebar />
      </div>

      <CreateFAB />
    </>
  );
}
