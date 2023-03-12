import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import svelte from '@astrojs/svelte';

export default defineConfig({
	integrations: [
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
		}),
		svelte(),
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
