import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'fxAcademyModule',
  title: 'FX Academy Module',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'moduleNumber',
      title: 'Module Number',
      type: 'number',
      description: 'For ordering (1, 2, 3...)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'relatedGlossaryTerms',
      title: 'Related Glossary Terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'glossaryEntry' }] }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Module Number',
      name: 'moduleNumber',
      by: [{ field: 'moduleNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'moduleNumber' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Module ${subtitle}` };
    },
  },
});
