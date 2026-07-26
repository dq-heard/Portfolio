import {
  Skills,
  About,
  Projects,
  Experience,
  Education,
  Contact,
} from "@/app/sections";

export type SectionKey =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "contact";

export const sectionMap: {
  key: SectionKey;
  id: string | null;
  component: React.ComponentType<any>;
}[] = [
  { key: "skills", id: "skills", component: Skills },
  { key: "about", id: "about", component: About },
  { key: "projects", id: "projects", component: Projects },
  { key: "experience", id: "experience", component: Experience },
  { key: "education", id: "education", component: Education },
  { key: "contact", id: "contact", component: Contact },
];
