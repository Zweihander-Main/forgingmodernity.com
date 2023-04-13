/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

export default getViteConfig({
	test: {
		globals: true,
		exclude: [...configDefaults.exclude, 'cypress/**/*'],
	},
});
