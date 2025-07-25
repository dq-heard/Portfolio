import {
  About,
  Experience,
  Projects,
  Skills,
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
  { key: "about", id: "about", component: About },
  { key: "experience", id: "experience", component: Experience },
  { key: "projects", id: "projects", component: Projects },
  { key: "skills", id: "skills", component: Skills },
  { key: "education", id: "education", component: Education },
  { key: "contact", id: "contact", component: Contact },
];
