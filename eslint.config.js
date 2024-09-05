import globals from 'globals';
import eslint from '@eslint/js';
import tselint from 'typescript-eslint';
// import prettier from 'eslint-config-prettier';
// // TODO Remove prettier plugin?
// import svelte from 'eslint-plugin-svelte';
// import eslintPluginAstro from 'eslint-plugin-astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default tselint.config(
	{
		ignores: [
			'/*.ts',
			'/*.cjs',
			'cypress.config.js',
			'svelte.config.js',
			'test',
			'cypress',
		],
	},
	eslint.configs.recommended,
	...tselint.configs.strictTypeChecked,
	// ...tselint.configs.stylisticTypeChecked, // TODO enable
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			ecmaVersion: 2023,
			sourceType: 'commonjs',
			parser: tselint.parser,
			parserOptions: {
				project: 'tsconfig.json',
				extraFileExtensions: ['.astro', '.svelte'],
			},
		},
		plugins: {
			'@typescript-eslint': tselint.plugin,
		},
		rules: {
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'no-console': [
				'error',
				{
					allow: ['warn', 'error', 'debug'],
				},
			],
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'react/prop-types': 0,
			'@typescript-eslint/unbound-method': [
				'error',
				{
					ignoreStatic: true,
				},
			],
			'a11y-no-noninteractive-element-interactions': 0,
			// TODO remove
			'@typescript-eslint/restrict-template-expressions': 0,
			'@typescript-eslint/no-unnecessary-condition': 0,
			'@typescript-eslint/no-confusing-void-expression': 0,
		},
	},
	// TODO keep attacking this:
	...compat.config({
		overrides: [
			{
				files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
				extends: ['plugin:prettier/recommended'],
			},
			{
				files: ['*.astro'],
				parser: 'astro-eslint-parser',
				parserOptions: {
					parser: '@typescript-eslint/parser',
					extraFileExtensions: ['.astro'],
				},
				extends: [
					'plugin:astro/recommended',
					'plugin:prettier/recommended',
				],
			},
			{
				files: ['*.svelte'],
				parser: 'svelte-eslint-parser',
				parserOptions: {
					parser: '@typescript-eslint/parser',
				},
				extends: ['plugin:svelte/recommended'],
			},
		],
	})
);
