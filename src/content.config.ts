import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    videoUrl: z.string(),
    posterUrl: z.string(),
    images: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Luminary Team'),
    coverUrl: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { cases, blog };
