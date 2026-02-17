import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionCta',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'label', title: 'Button Label', type: 'string' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA (optional)',
      type: 'object',
      fields: [
        { name: 'label', title: 'Button Label', type: 'string' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'bgClass',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          { title: 'Default (gradient)', value: '' },
          { title: 'Light Gray', value: 'bg-[#F8FAFB]' },
        ],
      },
    }),
  ],
  preview: {
    select: { headline: 'headline' },
    prepare({ headline }) {
      return { title: headline || 'CTA Section', subtitle: 'CTA' };
    },
  },
});
