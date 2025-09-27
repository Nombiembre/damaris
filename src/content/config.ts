import { defineCollection, z } from 'astro:content';

const diary = defineCollection({
  schema: z.object({
    date: z.date(),
    heroImage: z.string().optional(),
    theme: z.enum(["love"]).optional(),
  }),
});

const observatory = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { diary, observatory };
