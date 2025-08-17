"use client";
import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";

export function cookieConsentGiven() {
  return localStorage.getItem("cookie_consent") || "undecided";
}

export default function Banner() {
  const [consentGiven, setConsentGiven] = useState("");
  const posthog = usePostHog();

  useEffect(() => {
    setConsentGiven(cookieConsentGiven());
  }, []);

  useEffect(() => {
    if (consentGiven !== "") {
      posthog.set_config({
        persistence: consentGiven === "yes" ? "localStorage+cookie" : "memory",
      });
    }
  }, [consentGiven]);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookie_consent", "yes");
    setConsentGiven("yes");
  };

  const handleDeclineCookies = () => {
    localStorage.setItem("cookie_consent", "no");
    setConsentGiven("no");
  };

  return (
    <div className="cookie-banner-wrapper" aria-live="polite">
      {consentGiven === "undecided" && (
        <div className="cookie-banner sliding" role="dialog" aria-modal="true">
          <p className="cookie-text">
            I use cookies to understand how you use my site.
            <br />
            <br />
            By accepting, you take part in helping me improve it.
          </p>
          <div className="cookie-buttons">
            <button className="glass-button" onClick={handleDeclineCookies}>
              Decline
            </button>
            <button
              className="glass-button accept"
              onClick={handleAcceptCookies}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
