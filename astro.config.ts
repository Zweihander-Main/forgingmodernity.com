import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import svelte from '@astrojs/svelte';
import purgecss from 'astro-purgecss';

// https://astro.build/config
export default defineConfig({
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
