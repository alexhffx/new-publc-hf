import { defineType, defineField } from 'sanity';

const columnFields = [
  defineField({
    name: 'contentType',
    title: 'Content Type',
    type: 'string',
    options: {
      list: [
        { title: 'Rich Text', value: 'text' },
        { title: 'Image', value: 'image' },
      ],
    },
    initialValue: 'text',
  }),
  defineField({
    name: 'richText',
    title: 'Rich Text Content',
    type: 'blockContent',
    hidden: ({ parent }) => parent?.contentType !== 'text',
  }),
  defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    options: { hotspot: true },
    hidden: ({ parent }) => parent?.contentType !== 'image',
  }),
  defineField({
    name: 'imageAlt',
    title: 'Image Alt Text',
    type: 'string',
    hidden: ({ parent }) => parent?.contentType !== 'image',
  }),
];

export default defineType({
  name: 'sectionTwoColumn',
  title: 'Two Column',
  type: 'object',
  fields: [
    defineField({
      name: 'leftColumn',
      title: 'Left Column',
      type: 'object',
      fields: columnFields,
    }),
    defineField({
      name: 'rightColumn',
      title: 'Right Column',
      type: 'object',
      fields: columnFields,
    }),
    defineField({
      name: 'verticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'items-start' },
          { title: 'Center', value: 'items-center' },
          { title: 'Bottom', value: 'items-end' },
        ],
      },
      initialValue: 'items-center',
    }),
    defineField({
      name: 'columnGap',
      title: 'Column Gap',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'gap-8' },
          { title: 'Medium', value: 'gap-12' },
          { title: 'Large', value: 'gap-16' },
        ],
      },
      initialValue: 'gap-12',
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
    prepare() {
      return { title: 'Two Column Layout', subtitle: 'Two Column' };
    },
  },
});
