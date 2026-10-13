export default {
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "desc",
      title: "Description",
      type: "string",
    },
    {
      name: "demo",
      title: "Demo Link",
      type: "string",
    },
    {
      name: "code",
      title: "Code Link",
      type: "string",
    },
    {
      name: "imgUrl",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "tech",
      title: "Technologies",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web Admin", value: "web-admin" },
          { title: "Front End", value: "front-end" },
          { title: "E-mail Dev", value: "email-dev" },
        ],
        layout: "radio",
      },
    },
    {
      name: "emailTemplates",
      title: "Email Templates",
      type: "array",
      // Explicitly type 'parent' to fix the implicit any warning
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category !== "email-dev",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Tab Label (e.g., 1. Index)",
              type: "string",
            },
            {
              name: "fileName",
              title: "File Name (e.g., index.html)",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
