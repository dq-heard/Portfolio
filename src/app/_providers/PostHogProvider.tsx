"use client";

import { useEffect, Suspense } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import PostHogPageView from "../components/PostHogPageView";
import { posthogKey, posthogHost } from "@/app/env";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 [PostHog] Skipped init in dev mode");
      return;
    }

    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: true,
      debug: true,
    });

    console.log("📊 [PostHog] Initialized with host:", posthogHost);
  }, []);

  if (process.env.NODE_ENV === "development") return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
