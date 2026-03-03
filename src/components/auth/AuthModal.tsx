"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthProvider";
import { useAuth } from "@/hooks/useAuth";

/* ------------------------------------------------------------------ */
/*  AuthModal                                                          */
/* ------------------------------------------------------------------ */

type TabMode = "signin" | "signup";

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen } = useAuthModal();
  const { signIn, signUp } = useAuth();

  const [tab, setTab] = useState<TabMode>("signin");
  const [animating, setAnimating] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firstInputRef = useRef<HTMLInputElement>(null);

  /* ── Reset & focus when modal opens ──────────────────── */

  useEffect(() => {
    if (authModalOpen) {
      setAnimating(true);
      setError("");
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTab("signin");
      requestAnimationFrame(() => {
        firstInputRef.current?.focus();
      });
    }
  }, [authModalOpen]);

  /* ── Escape key ──────────────────────────────────────── */

  useEffect(() => {
    if (!authModalOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setAuthModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [authModalOpen, setAuthModalOpen]);

  /* ── Close helper ────────────────────────────────────── */

  const close = useCallback(() => {
    setAuthModalOpen(false);
  }, [setAuthModalOpen]);

  /* ── Tab switch ──────────────────────────────────────── */

  const switchTab = useCallback((newTab: TabMode) => {
    setTab(newTab);
    setError("");
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  /* ── Validation ──────────────────────────────────────── */

  function validate(): string | null {
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";

    if (tab === "signup") {
      if (!displayName.trim()) return "Display name is required.";
      if (password !== confirmPassword) return "Passwords do not match.";
    }

    return null;
  }

  /* ── Submit ──────────────────────────────────────────── */

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (tab === "signin") {
      const result = signIn(email.trim(), password);
      if (!result.success) {
        setError(result.error ?? "Sign in failed.");
        return;
      }
    } else {
      const result = signUp({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      });
      if (!result.success) {
        setError(result.error ?? "Sign up failed.");
        return;
      }
    }

    // Success — close and clear
    close();
  }

  /* ── Render ──────────────────────────────────────────── */

  if (!authModalOpen) return null;

  return (
    <div
      className="fixed inset-0"
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
      style={{
        zIndex: 200,
        animation: animating ? "searchFadeIn 0.15s ease-out" : undefined,
      }}
      onAnimationEnd={() => setAnimating(false)}
    >
      {/* Glass overlay backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.50)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Centered card */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 420,
          marginTop: "min(15vh, 120px)",
          background: "var(--atlas-white)",
          borderRadius: 12,
          boxShadow: "var(--atlas-shadow-lg)",
          overflow: "hidden",
          animation: animating ? "searchScaleIn 0.15s ease-out" : undefined,
        }}
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute cursor-pointer flex items-center justify-center"
          style={{
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "var(--atlas-mid-grey)",
            zIndex: 1,
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div
          style={{
            padding: "32px 32px 0 32px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: 24,
              fontWeight: 700,
              color: "var(--atlas-black)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Welcome to Atlas
          </h2>
          <p
            style={{
              fontFamily: "var(--font-source-sans), sans-serif",
              fontSize: 14,
              color: "var(--atlas-mid-grey)",
              margin: "8px 0 0 0",
              lineHeight: 1.5,
            }}
          >
            {tab === "signin"
              ? "Sign in to explore and contribute to history."
              : "Create an account to join the community."}
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="flex"
          style={{
            margin: "24px 32px 0 32px",
            background: "var(--atlas-off-white)",
            borderRadius: 9999,
            padding: 4,
          }}
        >
          <button
            type="button"
            onClick={() => switchTab("signin")}
            className="flex-1 cursor-pointer"
            style={{
              padding: "8px 0",
              borderRadius: 9999,
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-source-sans), sans-serif",
              background:
                tab === "signin" ? "var(--atlas-accent)" : "transparent",
              color:
                tab === "signin"
                  ? "#ffffff"
                  : "var(--atlas-dark-grey)",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchTab("signup")}
            className="flex-1 cursor-pointer"
            style={{
              padding: "8px 0",
              borderRadius: 9999,
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-source-sans), sans-serif",
              background:
                tab === "signup" ? "var(--atlas-accent)" : "transparent",
              color:
                tab === "signup"
                  ? "#ffffff"
                  : "var(--atlas-dark-grey)",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ padding: "24px 32px 32px 32px" }}
        >
          {/* Sign Up: Display Name */}
          {tab === "signup" && (
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="auth-displayname"
                style={{
                  display: "block",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--atlas-charcoal)",
                  marginBottom: 6,
                }}
              >
                Display Name
              </label>
              <input
                ref={tab === "signup" ? firstInputRef : undefined}
                id="auth-displayname"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
                autoComplete="name"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  fontSize: 15,
                  border: "1.5px solid var(--atlas-light-grey)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "var(--atlas-black)",
                  background: "var(--atlas-white)",
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-accent)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--atlas-light-grey)";
                }}
              />
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="auth-email"
              style={{
                display: "block",
                fontFamily: "var(--font-source-sans), sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--atlas-charcoal)",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              ref={tab === "signin" ? firstInputRef : undefined}
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              style={{
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "var(--font-source-sans), sans-serif",
                fontSize: 15,
                border: "1.5px solid var(--atlas-light-grey)",
                borderRadius: 8,
                padding: "12px 16px",
                color: "var(--atlas-black)",
                background: "var(--atlas-white)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--atlas-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--atlas-light-grey)";
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: tab === "signup" ? 16 : 0 }}>
            <label
              htmlFor="auth-password"
              style={{
                display: "block",
                fontFamily: "var(--font-source-sans), sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--atlas-charcoal)",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete={tab === "signin" ? "current-password" : "new-password"}
              style={{
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "var(--font-source-sans), sans-serif",
                fontSize: 15,
                border: "1.5px solid var(--atlas-light-grey)",
                borderRadius: 8,
                padding: "12px 16px",
                color: "var(--atlas-black)",
                background: "var(--atlas-white)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--atlas-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--atlas-light-grey)";
              }}
            />
          </div>

          {/* Sign Up: Confirm Password */}
          {tab === "signup" && (
            <div>
              <label
                htmlFor="auth-confirm-password"
                style={{
                  display: "block",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--atlas-charcoal)",
                  marginBottom: 6,
                }}
              >
                Confirm Password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                autoComplete="new-password"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  fontSize: 15,
                  border: "1.5px solid var(--atlas-light-grey)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "var(--atlas-black)",
                  background: "var(--atlas-white)",
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-accent)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--atlas-light-grey)";
                }}
              />
            </div>
          )}

          {/* Error message */}
          {error && (
            <p
              role="alert"
              style={{
                fontFamily: "var(--font-source-sans), sans-serif",
                fontSize: 13,
                color: "#dc2626",
                margin: "16px 0 0 0",
                lineHeight: 1.4,
              }}
            >
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="cursor-pointer"
            style={{
              width: "100%",
              marginTop: 24,
              padding: "12px 0",
              borderRadius: 9999,
              border: "none",
              background: "var(--atlas-accent)",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-source-sans), sans-serif",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--atlas-accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--atlas-accent)";
            }}
          >
            {tab === "signin" ? "Sign In" : "Create Account"}
          </button>

          {/* Tab-switch link */}
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-source-sans), sans-serif",
              fontSize: 13,
              color: "var(--atlas-mid-grey)",
              margin: "20px 0 0 0",
              lineHeight: 1.4,
            }}
          >
            {tab === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("signup")}
                  className="cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "var(--atlas-accent)",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("signin")}
                  className="cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "var(--atlas-accent)",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
