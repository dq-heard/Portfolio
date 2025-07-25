export default {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "name",
      title: "Company",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "tasks",
      title: "Tasks",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
