import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionLatestPosts',
  title: 'Latest Blog Posts',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Latest insights',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'numberOfPosts',
      title: 'Number of Posts',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(12),
      initialValue: 3,
    }),
    defineField({
      name: 'showViewAllLink',
      title: 'Show "View All" Link',
      type: 'boolean',
      initialValue: true,
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
    select: { heading: 'heading', numberOfPosts: 'numberOfPosts' },
    prepare({ heading, numberOfPosts }) {
      return {
        title: heading || 'Latest Posts',
        subtitle: `Latest Posts · ${numberOfPosts || 3} posts`,
      };
    },
  },
});
