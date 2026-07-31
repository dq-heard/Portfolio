import type { Metadata } from "next";
import { body } from "./utils/fonts";
import { ToastContainer } from "react-toastify";

import { PostHogProvider } from "./provider";
import { ParticleProvider } from "./context/ParticleContext";
import {
  AmbientCanvas,
  InteractionCanvas,
  GlobalImpactListener,
  TouchCanvas,
} from "./components";
import Banner from "./banner";
import "./globals.css";

export const metadata: Metadata = {
  title: "D. Heard | Web Experience Specialist",
  authors: [{ name: "DeQuentin Heard" }],
  description:
    "A modern technologist with a real thing for clean structure and loud ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={body.className} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (() => {
              const savedTheme = localStorage.getItem("theme");
      
              const prefersDark =
                window.matchMedia("(prefers-color-scheme: dark)").matches;
      
              if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
                document.body.classList.add("dark-mode");
              }
            })();
          `,
          }}
        />
        <PostHogProvider>
          <ParticleProvider>
            <AmbientCanvas />
            <InteractionCanvas />
            <GlobalImpactListener />

            <TouchCanvas />

            <main className="container">{children}</main>

            <ToastContainer position="bottom-right" />
            <Banner />
          </ParticleProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
