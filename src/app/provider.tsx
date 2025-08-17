"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { cookieConsentGiven } from "./banner";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        console.warn("PostHog key is missing.");
        return;
      }

      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        person_profiles: "identified_only",
        capture_pageleave: true,
        capture_exceptions: true,
        session_recording: {
          maskAllInputs: false,
        },
        persistence:
          cookieConsentGiven() === "yes" ? "localStorage+cookie" : "memory",
      });
    } catch (error) {
      console.error("Failed to initialize PostHog:", error);
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url =
        typeof window !== "undefined"
          ? window.location.origin + pathname
          : pathname;

      const queryString = searchParams?.toString();
      if (queryString) {
        url += "?" + queryString;
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
