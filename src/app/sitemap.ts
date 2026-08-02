import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.dqheard.com",
      lastModified: new Date(),
    },
  ];
}
