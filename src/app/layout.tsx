import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { body } from "./utils/fonts";
import { ToastContainer } from "react-toastify";

import { PostHogProvider } from "./provider";
import Banner from "./banner";
import { ParticleProvider } from "./context/ParticleContext";
import GlobalImpactListener from "./components/animations/GlobalImpactListener";
import "./globals.css";
import ImpactCanvas from "./components/animations/ImpactCanvas";

export const metadata: Metadata = {
  title: "D. Heard | Web Experience Specialist",
  authors: [{ name: "DeQuentin Heard" }],
  description:
    "A modern technologist with a real thing for clean structure and loud ideas.",
};

const ParticleCanvas = dynamic(
  () => import("./components/animations/ParticleCanvas")
);

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
            <ParticleCanvas />
            <ImpactCanvas />
            <GlobalImpactListener />
            <div className="container">{children}</div>
            <ToastContainer position="bottom-right" />
            <Banner />
          </ParticleProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
