import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionTrustBar',
  title: 'Trust Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label Text',
      type: 'string',
      initialValue: 'Trusted by international businesses:',
    }),
    defineField({
      name: 'logos',
      title: 'Client Logos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'clientLogo' }] }],
      description:
        'Pick specific logos for this page, or leave empty to show all client logos.',
    }),
  ],
  preview: {
    select: { label: 'label' },
    prepare({ label }) {
      return { title: label || 'Trust Bar', subtitle: 'Trust Bar' };
    },
  },
});
