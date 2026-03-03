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
      return;
    }
    if (user) {
      router.push(`/profile/${user.username}`);
    }
  }, [isSignedIn, user, openAuthModal, router]);

  return null;
}
