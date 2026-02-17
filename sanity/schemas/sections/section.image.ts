import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Contained (with padding)', value: 'contained' },
          { title: 'Full Width', value: 'full' },
        ],
      },
      initialValue: 'contained',
    }),
    defineField({
      name: 'bgClass',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: '' },
          { title: 'Light Gray', value: 'bg-[#F8FAFB]' },
        ],
      },
    }),
  ],
  preview: {
    select: { alt: 'alt', media: 'image' },
    prepare({ alt, media }) {
      return { title: alt || 'Image Section', subtitle: 'Image', media };
    },
  },
});
