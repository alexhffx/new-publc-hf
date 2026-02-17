import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionRichText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Narrow (prose)', value: 'max-w-3xl' },
          { title: 'Medium', value: 'max-w-5xl' },
          { title: 'Wide', value: 'max-w-7xl' },
        ],
      },
      initialValue: 'max-w-3xl',
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
    select: { content: 'content' },
    prepare({ content }) {
      const text = content?.[0]?.children?.[0]?.text || 'Rich Text Section';
      return { title: text.substring(0, 60), subtitle: 'Rich Text' };
    },
  },
});
