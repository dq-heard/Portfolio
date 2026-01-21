import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { body } from "./utils/fonts";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { PostHogProvider } from "./provider";
import Banner from "./banner";

export const metadata: Metadata = {
  title: "D. Heard | Web Content Specialist",
  authors: [{ name: "DeQuentin Heard" }],
  description:
    "A meticulous, self‑taught front end developer with a thing for clean structure and loud ideas.",
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
