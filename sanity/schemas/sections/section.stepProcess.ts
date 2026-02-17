import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionStepProcess',
  title: 'Step Process',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      validation: (Rule) => Rule.min(2).max(6),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Step Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'bgClass',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: '' },
          { title: 'Light Gray', value: 'bg-[#F8FAFB]' },
          { title: 'Light Green', value: 'bg-brand-green-pale' },
        ],
      },
    }),
  ],
  preview: {
    select: { heading: 'heading', steps: 'steps' },
    prepare({ heading, steps }) {
      return {
        title: heading || 'Step Process',
        subtitle: `Step Process · ${steps?.length || 0} steps`,
      };
    },
  },
});
