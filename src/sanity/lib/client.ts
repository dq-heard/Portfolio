import { apiVersion, dataset, projectId } from "../env";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.NEXT_SANITY_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
});

interface SocialImage {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export async function getSocialImage(
  slug: string = ""
): Promise<SocialImage | null> {
  const query = `*[_type == "socialImage" && slug.current == $slug]{
    title,
    description,
    "imageUrl": image.asset->url,
    imageAlt
  }`;

  const result = await client.fetch<SocialImage | null>(query, { slug });
  return result;
}
