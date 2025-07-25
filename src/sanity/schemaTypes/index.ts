import { type SchemaTypeDefinition } from "sanity";
import header from "./header";
import about from "./about";
import experience from "./experience";
import projects from "./projects";
import skills from "./skills";
import education from "./education";
import contact from "./contact";
import resume from "./resume";
import inbox from "./inbox";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    header,
    about,
    experience,
    projects,
    skills,
    education,
    contact,
    resume,
    inbox,
  ],
};
