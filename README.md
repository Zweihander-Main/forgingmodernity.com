# [ForgingModernity.com](https://www.forgingmodernity.com/)

[![Build-badge](https://img.shields.io/github/actions/workflow/status/Zweihander-Main/forgingmodernity.com/test.yml?branch=master&logo=github&style=flat-square)](https://github.com/Zweihander-Main/forgingmodernity.com/actions?query=workflow%3A%22Run+E2E+tests+on+new+code+in+master%22)

> Astro+Svelte marketing site for the book Forging Modernity

![Screenshot of ForgingModernity.com](./docs/forgingmodernity.jpg)

## Technologies used:

-   Astro (v4)
-   Svelte
-   Leaflet
-   Typescript + Zod
-   Sass
-   Vitest
-   Cypress + Axe
-   pnpm
-   Github Actions (E2E testing) + Husky pre-commit hooks

## Dev workflow

### Notes:

-   Cloudflare builds from `cloudflare`
    -   `cloudflare` branch is protected from push/merge without E2E test passing

### Workflow for development:

1. Pre-commit hooks run on code: all lint runners
2. Push to `master` branch
3. E2E tests run on new code
4. If passed, branch pushed into `cloudflare`

## Scripts

-   `pnpm dev`: Build and serve development version
-   `pnpm build`: Build to production (outputs to `dist` folder)
-   `pnpm preview`: Previews `dist` folder
-   `pnpm serve`: Build and serve production
-   `pnpm test`: Run vitest
-   `pnpm test:coverage`: Generate coverage reports
-   `pnpm test:watch`: Run vitest in watch mode
-   `pnpm test:debug`: Run vitest and allow node-based debugging
-   `pnpm test:e2e`: Run cypress E2E tests
-   `pnpm test:e2e:run`: Run cypress on production build
-   `pnpm test:e2e:dev`: Open cypress dashboard on development build
-   `pnpm test:e2e:dev:prod`: Open cypress dashboard on production build
-   `pnpm cy:run`: Run cypress
-   `pnpm cy:open`: Open cypress dashboard
-   `pnpm lint`: Run all lint tools
-   `pnpm lint:js`: Run ESLint
-   `pnpm lint:css`: Run Stylelint
-   `pnpm lint:format`: Run prettier in check mode
-   `pnpm lint:svelte`: Run svelte-check
-   `pnpm lint:astro`: Run astro check
-   `pnpm format`: Auto-format using prettier
-   `pnpm cloudflare`: Script to run as cloudflare that builds and generates public coverage reports
-   `pnpm prepare`: Prepare husky

## Possible improvements

-   Suggestions welcome!

## Available for Hire

I'm available for freelance, contracts, and consulting both remotely and in the Hudson Valley, NY (USA) area. [Some more about me](https://www.zweisolutions.com/about.html) and [what I can do for you](https://www.zweisolutions.com/services.html).

Feel free to drop me a message at:

```
hi [a+] zweisolutions {●} com
```

## License

Code (outside the `/src/content`, `/src/assets`, and `/public` folders) is licensed under [MIT](./LICENSE)

Content underneath the `/src/content`, `/src/assets` and `/public` folders is Copyright 2023-2024 of the author Martin Hutchinson unless otherwise stated, All Rights Reserved.
