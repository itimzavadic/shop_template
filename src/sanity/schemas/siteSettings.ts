import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'UNIVERSE',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      initialValue: 'ОДЕЖДА • ТРЕНДЫ • СТИЛЬ • МАНЕРА',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'menuItems',
      title: 'Navigation Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'link', title: 'Link', type: 'string' },
          ],
        },
      ],
    }),
  ],
});