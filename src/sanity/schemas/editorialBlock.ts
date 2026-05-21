import { defineType, defineField } from 'sanity';

export const editorialBlock = defineType({
  name: 'editorialBlock',
  title: 'Editorial Block',
  type: 'document',
  description: 'Editorial content blocks like "Winter \'28", "Staff Selects" — combining image and descriptive text (DESIGN.MD §8, §9)',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Winter \'28"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short editorial description',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      description: 'Rich text content for editorial sections',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'SHOP NOW',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});