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

const reviewsCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		source: z.string(),
		link: z.optional(z.string().url()),
	}),
});

const endorsementsCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		profession: z.string(),
	}),
});

const pagesCollection = defineCollection({});

const canalsCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		x: z.number(),
		y: z.number(),
		width: z.number(),
		height: z.number(),
		scale: z.number(),
		stroke: z.number(),
		pathYAdjust: z.number(),
		path: z.string(),
		imageSrc: z.string(),
	}),
});

export const collections = {
	meta: metaCollection,
	syndication: syndicationCollection,
	reviews: reviewsCollection,
	endorsements: endorsementsCollection,
	pages: pagesCollection,
	canals: canalsCollection,
};
