export default {
  name: "socialImage",
  title: "Social Image",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Allows cropping and focus points
      },
    },
  ],
};
