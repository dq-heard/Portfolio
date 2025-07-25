export default {
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Subject",
      type: "string",
    },
    {
      name: "certs",
      title: "Certificates",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "course",
              title: "Course",
              type: "string",
            },
            {
              name: "issuer",
              title: "Issuer",
              type: "string",
            },
            {
              name: "focus",
              title: "Focus",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "topics",
                      title: "Topics",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
