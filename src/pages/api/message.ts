import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nickname, startTime, ...rest } = req.body;

  // Honeypot check
  if (nickname && nickname.trim() !== "") {
    return res.status(400).json({ success: false, spam: true });
  }

  // Time-based honeypot check
  if (typeof startTime !== "number" || Date.now() - startTime < 1500) {
    return res.status(400).json({ success: false, spam: true });
  }

  try {
    const doc = {
      _type: "message",
      ...rest, // excludes nickname + startTime
    };

    const result = await client.create(doc);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Sanity create error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
