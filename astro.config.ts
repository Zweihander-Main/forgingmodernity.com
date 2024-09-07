import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import purgecss from 'astro-purgecss';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.forgingmodernity.com/',
	integrations: [
		icon({
			include: {
				mdi: ['cart'],
				lucide: ['pointer'],
			},
		}),
		svelte(),
		purgecss({
			fontFace: false,
			variables: true,
			safelist: [
				/leaflet-pane/,
				/leaflet-map/,
				/leaflet-control/,
				/leaflet-bar/,
				/leaflet-disabled/,
				/leaflet-top/,
				/leaflet-left/,
				/parchment/,
			],
		}),
		sitemap(),
	],
	vite: {
		resolve: {
			alias: [
				{
					// this is required for the SCSS modules
					find: /^~(.*)$/,
					replacement: 'src/$1',
				},
			],
		},
	},
});
