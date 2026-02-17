import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionTestimonials',
  title: 'Testimonials',
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
      name: 'testimonialSource',
      title: 'Testimonial Source',
      type: 'string',
      options: {
        list: [
          { title: 'Reference Existing Testimonials', value: 'reference' },
          { title: 'Inline (Custom)', value: 'inline' },
        ],
      },
      initialValue: 'reference',
    }),
    defineField({
      name: 'referencedTestimonials',
      title: 'Select Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      hidden: ({ parent }) => parent?.testimonialSource !== 'reference',
    }),
    defineField({
      name: 'inlineTestimonials',
      title: 'Custom Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: 'personName', title: 'Person Name', type: 'string' }),
            defineField({ name: 'personRole', title: 'Person Role', type: 'string' }),
            defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
          ],
          preview: {
            select: { title: 'personName', subtitle: 'companyName' },
          },
        },
      ],
      hidden: ({ parent }) => parent?.testimonialSource !== 'inline',
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
    select: { heading: 'heading' },
    prepare({ heading }) {
      return { title: heading || 'Testimonials', subtitle: 'Testimonials' };
    },
  },
});
