import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const interiors = defineCollection({
	loader: glob({ base: './src/content/interiors', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			mainPhoto: image().optional(),
			position: z.number(),
			images: z.array(z.string().optional()).optional(),
			interiorDesign: z.string().optional(),
			photography: z.string().optional(),
			styling: z.string().optional(),
			produced: z.string().optional(),
			updatedDate: z.coerce.date().optional(),
		}),
});


const before_after = defineCollection({
	loader: glob({ base: './src/content/before-after', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			before: z.string(),
			after: z.string(),
		}),
});


const press = defineCollection({
	loader: glob({ base: './src/content/press', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			type: z.string(),
			link: z.string().url().optional(),
			pubDate: z.string(),
			heroImage:  image().optional(),
		}),
});


const clients = defineCollection({
	loader: glob({ base: './src/content/clients', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			image: image().optional(),
			title: z.string(),
			link: z.string().url().optional(),
		}),
});

export const collections = { interiors, before_after, press, clients };