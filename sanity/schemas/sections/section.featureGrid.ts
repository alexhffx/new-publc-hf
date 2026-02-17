import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionFeatureGrid',
  title: 'Feature Grid',
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
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'href', title: 'Link URL', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string', description: 'e.g. 🏦, 💰, 🛡️' }),
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title: `${icon || '▪️'} ${title || 'Feature'}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'columns',
      title: 'Grid Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: '3',
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
    select: { heading: 'heading', features: 'features' },
    prepare({ heading, features }) {
      return {
        title: heading || 'Feature Grid',
        subtitle: `Feature Grid · ${features?.length || 0} items`,
      };
    },
  },
});
