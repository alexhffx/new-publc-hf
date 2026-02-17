import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionTeamGrid',
  title: 'Team Grid',
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
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      description: 'Select specific team members. Leave empty to show all.',
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
    select: { heading: 'heading' },
    prepare({ heading }) {
      return { title: heading || 'Team Grid', subtitle: 'Team Grid' };
    },
  },
});
