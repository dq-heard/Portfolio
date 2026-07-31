import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dq-heard.vercel.app",
      lastModified: new Date(),
    },
  ];
}
