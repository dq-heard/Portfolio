import { Hero, Bio, Exp, Skill, Edu, Work, Chat, Resume } from "./types";

export const queryMap = {
  header: {
    query: `*[_type == "header"][0]`,
    type: {} as Hero,
  },
  about: {
    query: `*[_type == "about"][0]`,
    type: {} as Bio,
  },
  experience: {
    query: `*[_type == "experience"]`,
    type: {} as Exp[],
  },
  projects: {
    query: `*[_type == "projects"] | order(_updatedAt desc)`,
    type: {} as Work[],
  },
  skills: {
    query: `*[_type == "skills"]`,
    type: {} as Skill[],
  },
  education: {
    query: `*[_type == "education"]`,
    type: {} as Edu[],
  },
  contact: {
    query: `*[_type == "contact"][0]`,
    type: {} as Chat,
  },
  resume: {
    query: '*[_type == "resume"][0]',
    type: {} as Resume,
  },
};
