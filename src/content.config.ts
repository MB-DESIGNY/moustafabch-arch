import { defineCollection, z } from 'astro:content';

export const collections = {
  services: defineCollection({
    type: 'data',
    schema: ({ slug }) => z.object({
      title: z.record(z.string()), // Multilingual: { ar: string, en: string, fr: string }
      description: z.record(z.string()),
      icon: z.string(),
      order: z.number().default(0),
      comingSoon: z.boolean().default(false),
      fullDescription: z.record(z.string()).optional(),
      features: z.record(z.array(z.string())).optional(),
    }),
  }),
  projects: defineCollection({
    type: 'data',
    schema: ({ slug }) => z.object({
      title: z.record(z.string()),
      category: z.record(z.string()),
      description: z.record(z.string()),
      coverImage: z.string(),
      featured: z.boolean().default(false),
      client: z.string().optional(),
      location: z.record(z.string()).optional(),
      year: z.number().optional(),
      fullDescription: z.record(z.string()).optional(),
      gallery: z.array(z.string()).optional(),
    }),
  }),
};
