import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { sedgwick } from "./utils/fonts";
import { ToastContainer } from "react-toastify";
import { PostHogProvider } from "./_providers/PostHogProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "D. (Quentin) Heard",
  description:
    "I'm a meticulous, self-taught programmer working hard to establish myself as a brand builder.",
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
      <body className={sedgwick.className}>
        <ParticleCanvas />
        <PostHogProvider>
          <div className="container">{children}</div>
        </PostHogProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
