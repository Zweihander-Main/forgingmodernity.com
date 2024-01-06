import { z, defineCollection } from 'astro:content';

const metaCollection = defineCollection({
	schema: z.object({
		shortTitle: z.string(),
		subTitle: z.string(),
		author: z.string(),
		indexDescription: z.string(),
		mapDescription: z.string(),
		authorDescription: z.string(),
		availableText: z.string(),
		canalsMapTitle: z.string(),
		twitterHandle: z.string(),
		url: z.string(),
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
		order: z.number(),
	}),
});

const endorsementsCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		profession: z.string(),
		image: z.string(),
	}),
});

const pagesCollection = defineCollection({});

const canalsCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			x: z.number(),
			y: z.number(),
			width: z.number(),
			height: z.number(),
			scale: z.number(),
			stroke: z.number(),
			pathYAdjust: z.number(),
			path: z.string(),
			image: image(),
		}),
});

const retailersCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		image: z.string(),
		url: z.string(),
		order: z.number(),
	}),
});

export const collections = {
	meta: metaCollection,
	syndication: syndicationCollection,
	reviews: reviewsCollection,
	endorsements: endorsementsCollection,
	pages: pagesCollection,
	canals: canalsCollection,
	retailers: retailersCollection,
};
