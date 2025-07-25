import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const doc = {
      _type: "message",
      ...req.body,
    };

    const result = await client.create(doc);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Sanity create error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
