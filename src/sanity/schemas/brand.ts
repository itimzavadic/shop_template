import { defineType, defineField } from 'sanity';

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  description: 'Featured brands like "MHL. By Margaret Howell", "Metalwood", "ERL", "Larriet" (DESIGN.MD §11)',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Brand',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});