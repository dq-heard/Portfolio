export default {
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    {
      name: "heading1",
      title: "Info Heading",
      type: "string",
    },
    {
      name: "heading2",
      title: "Message Heading",
      type: "string",
    },
    {
      name: "info",
      title: "Contact Info",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Heading", type: "string" },
            { name: "value", title: "Value", type: "string" },
            { name: "icon", title: "Icon Name", type: "string" },
          ],
        },
      ],
    },
  ],
};
