import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'glossaryEntry',
  title: 'Glossary Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      type: 'blockContent',
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'glossaryEntry' }] }],
    }),
  ],
  orderings: [
    {
      title: 'Alphabetical',
      name: 'alpha',
      by: [{ field: 'term', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'term' },
  },
});
