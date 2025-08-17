import { apiVersion, dataset, projectId } from "../env";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.NEXT_SANITY_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
});
