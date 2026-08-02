export default {
  name: "socialImage",
  title: "Social Image",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Allows cropping and focus points
      },
    },
    {
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
    },
  ],
};
