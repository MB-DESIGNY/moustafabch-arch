import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }),
    slug: z.string(),
    icon: z.string().optional(),
    shortDescription: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }),
    fullDescription: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }).optional(),
    processSteps: z.array(z.object({
      title: z.object({
        ar: z.string(),
        en: z.string(),
        fr: z.string()
      }),
      description: z.object({
        ar: z.string(),
        en: z.string(),
        fr: z.string()
      })
    })).optional(),
    gallery: z.array(z.string()).optional(),
    comingSoon: z.boolean().default(false),
    order: z.number()
  })
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }),
    slug: z.string(),
    category: z.enum(['residential', 'commercial', 'visual-identity', 'company-profile', 'catalog', 'photoshop-rendering']),
    coverImage: z.string(),
    gallery: z.array(z.string()).optional(),
    client: z.string().optional(),
    location: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }).optional(),
    year: z.string().optional(),
    tools: z.array(z.string()).optional(),
    summary: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }),
    challenge: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }).optional(),
    outcome: z.object({
      ar: z.string(),
      en: z.string(),
      fr: z.string()
    }).optional(),
    featured: z.boolean().default(false)
  })
});

export const collections = {
  services,
  projects
};
