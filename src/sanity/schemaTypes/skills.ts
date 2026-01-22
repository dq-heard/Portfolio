export default {
  name: "skills",
  title: "Skills",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Front End", value: "frontend" },
          { title: "Core Web", value: "coreweb" },
          { title: "Workflow", value: "workflow" },
          { title: "Data Tools", value: "datatools" },
          { title: "Back End", value: "backend" },
        ],
      },
    },
  ],
};
