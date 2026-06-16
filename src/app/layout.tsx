import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { body } from "./utils/fonts";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { PostHogProvider } from "./provider";
import Banner from "./banner";

export const metadata: Metadata = {
  title: "D. Heard | Front End Engineer",
  authors: [{ name: "DeQuentin Heard" }],
  description:
    "A meticulous, self‑taught web developer with a real thing for clean structure and loud ideas.",
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
          <ParticleCanvas />
          <div className="container">{children}</div>
          <ToastContainer position="bottom-right" />
          <Banner />
        </PostHogProvider>
      </body>
    </html>
  );
}
