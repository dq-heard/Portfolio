import { client } from "../sanity/lib/client";

export async function fetchSanityData<T>(query: string): Promise<T> {
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    throw error;
  }
}
