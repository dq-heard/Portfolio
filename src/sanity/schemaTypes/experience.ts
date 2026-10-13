export default {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    { name: "role", title: "Role / Title", type: "string" },
    { name: "company", title: "Company / Organization", type: "string" },
    {
      name: "period",
      title: "Time Period (e.g., 2023 — Present)",
      type: "string",
    },
    { name: "order", title: "Display Order", type: "number" },
    {
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
    },
    {
      name: "highlights",
      title: "Key Highlights / Outcomes",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "keyDeliverable",
      title: "Key Project Note",
      type: "string",
      description: "What was accomplished here?",
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
