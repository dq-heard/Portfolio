import { useMemo } from "react";
import { PortfolioData } from "@/app/utils/types";

export function usePortfolioData(data: Partial<PortfolioData>) {
  return useMemo(() => {
    return {
      header: data.header ?? null,
      skills: data.skills ?? [],
      about: data.about ?? null,
      experience: data.experience ?? [],
      projects: data.projects ?? [],
      education: data.education ?? [],
      contact: data.contact ?? null,
    };
  }, [data]);
}
