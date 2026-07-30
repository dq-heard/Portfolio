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
      <body className={body.className}>
        <PostHogProvider>
          <ParticleProvider>
            <AmbientCanvas />
            <InteractionCanvas />
            <GlobalImpactListener />

            <TouchCanvas />

            <div className="container">{children}</div>

            <ToastContainer position="bottom-right" />
            <Banner />
          </ParticleProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
