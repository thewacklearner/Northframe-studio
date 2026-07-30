import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/portfolio',
  }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    description: z.string(),
    website: z.string().url(),
    services: z.array(z.string()).default([]),
    status: z.string().default('Live'),
    order: z.number().default(999),
    featured: z.boolean().default(false),
  }),
});

export const collections = { portfolio };
