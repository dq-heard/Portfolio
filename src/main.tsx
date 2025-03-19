import React from "react";
import ReactDOM from "react-dom/client";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";
import "./index.css";

const isPosthogEnabled = import.meta.env.POSTHOG_ENABLED !== "false";
const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isPosthogEnabled ? (
      <PostHogProvider
        apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
        options={options}
      >
        <App />
      </PostHogProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
