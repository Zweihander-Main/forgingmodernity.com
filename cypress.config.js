import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000/',
		specPattern: 'cypress/e2e',
		viewportWidth: 1200,
		viewportHeight: 600,
	},
});
