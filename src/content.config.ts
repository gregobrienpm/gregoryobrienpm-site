import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// "blog" backs the site's written pieces (the Notes/Think section per
// design-direction.md). Duplicate this pattern with its own base path if
// Watch or Stream end up wanting their own typed collection later.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
