import { defineType, defineField } from 'sanity';

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  description: 'Featured collections/categories like "Latest Footwear", "Latest Arrivals", "Staff Selects" (DESIGN.MD §11)',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'shopifyCollectionHandle',
      title: 'Shopify Collection Handle',
      type: 'string',
      description: 'The handle of the corresponding Shopify collection to pull products from',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'type',
      title: 'Collection Type',
      type: 'string',
      options: {
        list: [
          { title: 'Product Grid', value: 'productGrid' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Hero', value: 'hero' },
        ],
      },
      initialValue: 'productGrid',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});