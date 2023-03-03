import { z, defineCollection } from 'astro:content';

const metaCollection = defineCollection({
	schema: z.object({
		shortTitle: z.string(),
		subTitle: z.string(),
		author: z.string(),
	}),
});

const syndicationCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		link: z.string(),
	}),
});

const pagesCollection = defineCollection({});

export const collections = {
	meta: metaCollection,
	syndication: syndicationCollection,
	index: pagesCollection,
};
