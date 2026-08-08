import Script from "next/script";
import type { Metadata } from "next";
import { getSocialImage } from "@/sanity/lib/client";
import { body } from "./utils/fonts";
import { ToastContainer } from "react-toastify";

import { PostHogProvider } from "./provider";
import { ParticleProvider, ThemeTransitionProvider } from "./context";
import {
  AmbientCanvas,
  InteractionCanvas,
  GlobalImpactListener,
  TouchCanvas,
  ThemeTransitionOverlay,
} from "./components";
import Banner from "./banner";
import "./globals.css";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Skip the query for the /_not-found page
  if (params.slug === "_not-found") {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const socialImage = await getSocialImage(params.slug);

  return {
    // Existing metadata (for the website)
    title: "D. Heard | Web Experience Specialist",
    description:
      "A modern technologist with a real thing for clean structure and loud ideas.",
    authors: [{ name: "DeQuentin Heard", url: "https://dqheard.com" }],
    //  keywords: ['keyword1', 'keyword2'],

    // Open Graph metadata (for social previews)
    openGraph: {
      title: socialImage?.title || "Default Title",
      description: socialImage?.description || "Default Description",
      images: [
        {
          url: socialImage?.imageUrl || "/images/default-og-image.png",
          width: 1200,
          height: 630,
          alt: socialImage?.imageAlt || "Default alt text",
        },
      ],
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (() => {
            const savedTheme = localStorage.getItem("theme");

            const prefersDark =
              window.matchMedia("(prefers-color-scheme: dark)").matches;

            if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
              document.documentElement.classList.add("dark-mode");
            }
          })();
        `,
          }}
        />
      </head>
      <body className={body.className}>
        <PostHogProvider>
          <ParticleProvider>
            <ThemeTransitionProvider>
              <AmbientCanvas />
              <InteractionCanvas />
              <GlobalImpactListener />
              <TouchCanvas />

              <ThemeTransitionOverlay />

              <div className="container">{children}</div>

              <ToastContainer position="bottom-right" />
              <Banner />
            </ThemeTransitionProvider>
          </ParticleProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
