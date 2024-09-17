import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import purgecss from 'astro-purgecss';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
	site: 'https://www.forgingmodernity.com/',
	build: {
		inlineStylesheets: 'never', // required for purgecss
	},
	integrations: [
		icon({
			include: {
				mdi: ['cart'],
				lucide: ['pointer'],
			},
		}),
		svelte(),
		purgecss({
			keyframes: false,
			fontFace: false,
			variables: true,
			safelist: {
				greedy: [
					/.*astro.*/,
					/leaflet-pane/,
					/leaflet-map/,
					/leaflet-control/,
					/leaflet-bar/,
					/leaflet-disabled/,
					/leaflet-top/,
					/leaflet-left/,
					/parchment/,
				],
			},
			content: [process.cwd() + '/src/**/*.{astro,svelte}'],
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
