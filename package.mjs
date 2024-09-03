import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import parser from "astro-eslint-parser";
import svelte3 from "eslint-plugin-svelte3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2023,
        sourceType: "commonjs",

        parserOptions: {
            project: "tsconfig.json",
            extraFileExtensions: [".astro", ".svelte"],
        },
    },

    rules: {
        quotes: ["error", "single"],
        semi: ["error", "always"],

        "no-console": ["error", {
            allow: ["warn", "error", "debug"],
        }],

        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "react/prop-types": 0,

        "@typescript-eslint/unbound-method": ["error", {
            ignoreStatic: true,
        }],

        "a11y-no-noninteractive-element-interactions": 0,
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
).map(config => ({
    ...config,
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
})), ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:astro/recommended",
    "plugin:prettier/recommended",
).map(config => ({
    ...config,
    files: ["**/*.astro"],
})), {
    files: ["**/*.astro"],

    languageOptions: {
        parser: parser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            parser: "@typescript-eslint/parser",
            extraFileExtensions: [".astro"],
        },
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
).map(config => ({
    ...config,
    files: ["**/*.svelte"],
})), {
    files: ["**/*.svelte"],

    plugins: {
        svelte3,
        "@typescript-eslint": typescriptEslint,
    },

    settings: {
        "svelte3/typescript": true,
    },

    processor: "svelte3/svelte3",
}];