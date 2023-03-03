import { defineConfig } from 'astro/config';
import image from '@astrojs/image';

export default defineConfig({
	integrations: [
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
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
