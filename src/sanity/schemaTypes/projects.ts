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
  ],
};
