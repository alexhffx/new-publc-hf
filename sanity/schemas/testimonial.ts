import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
    }),
    defineField({
      name: 'personRole',
      title: 'Person Role',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    }),
    defineField({
      name: 'advisoryPillars',
      title: 'Related Advisory Pillars',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Bank Management', value: 'bank-management' },
          { title: 'Cash Management', value: 'cash-management' },
          { title: 'Risk Management', value: 'risk-management' },
          { title: 'Working Capital', value: 'working-capital' },
          { title: 'Digitalisation', value: 'digitalisation' },
        ],
      },
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'E-Commerce', value: 'e-commerce' },
          { title: 'Travel', value: 'travel' },
          { title: 'Logistics & Wholesale', value: 'logistics' },
          { title: 'Staffing & Recruitment', value: 'staffing' },
          { title: 'Startups & Scaleups', value: 'startups' },
          { title: 'Professional Services', value: 'professional-services' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'personName', subtitle: 'companyName' },
  },
});
