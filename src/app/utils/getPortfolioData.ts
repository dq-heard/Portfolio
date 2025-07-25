import { client } from "@/sanity/lib/client";
import { queryMap } from "./queryMap";
import type {
  PortfolioData,
  Hero,
  Bio,
  Exp,
  Skill,
  Edu,
  Work,
  Chat,
  Resume,
} from "./types";

export async function getPortfolioData(): Promise<PortfolioData> {
  const entries = await Promise.all(
    Object.entries(queryMap).map(async ([key, { query }]) => {
      const result = await client.fetch(query);
      return [key, result];
    })
  );

  const rawData = Object.fromEntries(entries);

  const props: PortfolioData = {
    header: rawData.header as Hero,
    about: rawData.about as Bio,
    experience: rawData.experience as Exp[],
    projects: rawData.projects as Work[],
    skills: rawData.skills as Skill[],
    education: rawData.education as Edu[],
    contact: {
      contact: rawData.contact as Chat,
      resume: rawData.resume as Resume,
    },
  };

  return props;
}
