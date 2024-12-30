import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'resumeFile',
      title: 'Resume File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'resumeFile',
    },
    prepare({media}) {
      return {
        media: media ? media : null,
      }
    },
  },
})
