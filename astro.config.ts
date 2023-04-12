import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import svelte from '@astrojs/svelte';
import purgecss from 'astro-purgecss';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.forgingmodernity.com/',
	integrations: [
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
		}),
		svelte(),
		purgecss({
			fontFace: false,
			variables: true,
			safelist: [/leaflet-pane/, /leaflet-map/],
		}),
		sitemap(),
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "./src/styles/mixins" as m;
@use "./src/styles/variables" as v;`,
				},
			},
		},
	},
});
