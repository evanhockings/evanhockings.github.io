import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(), // may contain <em>
    date: z.coerce.date(),
    description: z.string(),
  }),
});

export const collections = { blog };
