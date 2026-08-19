import { z } from 'astro:content';

export const services = z.object({
  title: z.object({
    ar: z.string(),
    en: z.string(),
    fr: z.string(),
  }),
  slug: z.string(),
  icon: z.string(),
  shortDescription: z.object({
    ar: z.string(),
    en: z.string(),
    fr: z.string(),
  }),
  fullDescription: z.object({
    ar: z.string(),
    en: z.string(),
    fr: z.string(),
  }),
  processSteps: z.array(
    z.object({
      title: z.object({
        ar: z.string(),
        en: z.string(),
        fr: z.string(),
      }),
      description: z.object({
        ar: z.string(),
        en: z.string(),
        fr: z.string(),
      }),
    })
  ),
  gallery: z.array(z.string()),
  comingSoon: z.boolean().default(false),
  order: z.number(),
});

export const projects = z.object({
  title: z.object({
    ar: z.string(),
    en: z.string(),
    fr: z.string(),
  }),
  slug: z.string(),
  category: z.enum(['residential', 'commercial', 'visual-identity', 'company-profile', 'catalog', 'photoshop-rendering']),
  coverImage: z.string(),
  gallery: z.array(z.string()),
  client: z.string().optional(),
  location: z.object({
    ar: z.string().optional(),
    en: z.string().optional(),
    fr: z.string().optional(),
  }).optional(),
  year: z.string().optional(),
  tools: z.array(z.string()).optional(),
  summary: z.object({
    ar: z.string(),
    en: z.string(),
    fr: z.string(),
  }),
  challenge: z.object({
    ar: z.string().optional(),
    en: z.string().optional(),
    fr: z.string().optional(),
  }).optional(),
  outcome: z.object({
    ar: z.string().optional(),
    en: z.string().optional(),
    fr: z.string().optional(),
  }).optional(),
  featured: z.boolean().default(false),
});

export const serviceCollections = {
  services: {
    schema: services,
  },
};

export const projectCollections = {
  projects: {
    schema: projects,
  },
};
