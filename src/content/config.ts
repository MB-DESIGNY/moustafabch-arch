import { defineConfig, collection } from 'astro:content';
import { z } from 'astro/zod';

export const config = defineConfig({
	collections: {
		services: collection({
			type: 'data',
			schema: z.object({
				title: z.record(z.string()),
				slug: z.string(),
				icon: z.string(),
				description: z.record(z.string()),
				longDescription: z.record(z.string()).optional(),
				features: z.array(z.record(z.string())).optional(),
				comingSoon: z.boolean().optional(),
				order: z.number(),
			}),
		}),
		projects: collection({
			type: 'data',
			schema: z.object({
				title: z.record(z.string()),
				slug: z.string(),
				coverImage: z.string(),
				gallery: z.array(z.string()).optional(),
				category: z.record(z.string()),
				location: z.record(z.string()),
				year: z.number(),
				client: z.record(z.string()).optional(),
				description: z.record(z.string()),
				challenges: z.array(z.record(z.string())).optional(),
				solutions: z.array(z.record(z.string())).optional(),
				featured: z.boolean().optional(),
				order: z.number(),
			}),
		}),
	},
});
