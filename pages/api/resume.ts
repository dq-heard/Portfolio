import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

type ResumeFileAsset = {
  asset: {
    url: string;
    originalFilename?: string;
  };
};

type ResumeData = {
  name: string;
  file: ResumeFileAsset;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = `*[_type == "resume"][0]{
      name,
      file{
        asset->{url, originalFilename}
      }
    }`;

    const resume: ResumeData = await client.fetch(query);

    if (!resume?.file?.asset?.url) {
      return res.status(404).send("Resume not found");
    }

    const fileUrl = resume.file.asset.url;
    const originalName = resume.file.asset.originalFilename || "resume.pdf";

    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Failed to fetch file from CDN");

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${originalName}"`
    );
    res.send(Buffer.from(buffer));
  } catch (error: unknown) {
    const errMessage =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as Error).message)
        : "Unknown error";

    console.error("Resume download error:", error);

    if (
      errMessage.includes("API request limit") ||
      errMessage.includes("rate limit")
    ) {
      return res.status(429).json({
        fallbackUrl:
          "https://cdn.sanity.io/files/630n408p/production/6e0d8db1aac90706ada8bd3207535578af9d115e.pdf",
        message: "Rate limit exceeded. Serving static resume URL.",
      });
    }

    res.status(500).send("Unable to download resume");
  }
}
