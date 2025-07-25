export const posthogKey = assertValue(
  process.env.NEXT_PUBLIC_POSTHOG_KEY,
  "Missing PostHog API key"
);

export const posthogHost = assertValue(
  process.env.NEXT_PUBLIC_POSTHOG_HOST,
  "Missing PostHog Host"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === "") {
    throw new Error(errorMessage);
  }
  return v;
}
