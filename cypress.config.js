import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		retries: {
			runMode: 3,
			openMode: 0,
		},
		baseUrl: 'http://localhost:4321/',
		specPattern: 'cypress/e2e',
		viewportWidth: 1200,
		viewportHeight: 600,
		setupNodeEvents(on, config) {
			on('task', {
				log(message) {
					console.log(message);
					return null;
				},
				table(message) {
					console.table(message);
					return null;
				},
			});
		},
	},
});
