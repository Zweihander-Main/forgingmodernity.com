// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define your collection(s)
const metaCollection = defineCollection({
	schema: z.object({
		shortTitle: z.string(),
		subTitle: z.string(),
		author: z.string(),
	}),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	meta: metaCollection,
};
