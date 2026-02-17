import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'clientName', maxLength: 96 },
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
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
      name: 'advisoryPillars',
      title: 'Advisory Pillars',
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
      name: 'challenge',
      title: 'The Challenge',
      type: 'blockContent',
    }),
    defineField({
      name: 'advisoryEngagement',
      title: 'The Advisory Engagement',
      type: 'blockContent',
    }),
    defineField({
      name: 'strategy',
      title: 'The Strategy',
      type: 'blockContent',
    }),
    defineField({
      name: 'platformImplementation',
      title: 'Platform Implementation',
      type: 'blockContent',
    }),
    defineField({
      name: 'results',
      title: 'Measurable Results',
      type: 'blockContent',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pullQuoteAttribution',
      title: 'Quote Attribution',
      type: 'string',
      description: 'e.g. "Jane Smith, CFO, Acme Corp"',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
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
  preview: {
    select: { title: 'clientName', subtitle: 'industry', media: 'clientLogo' },
  },
});
