import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoDescription: z.string().optional(),
    socialCaption: z.string().optional(),
    pubDate: z.coerce.date(),
    author: z.string(),
    image: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = {
  blog,
  legal,
};