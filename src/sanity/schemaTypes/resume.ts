import { defineType, defineField } from "sanity";

export default defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    { name: "name", title: "File Name", type: "string" },
    { name: "prompt", title: "Prompt", type: "string" },
    { name: "icon", title: "Icon Name", type: "string" },
    defineField({
      name: "file",
      title: "Resume File",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: "resumeFile",
    },
    prepare({ media }) {
      return {
        media: media || null,
      };
    },
  },
});
