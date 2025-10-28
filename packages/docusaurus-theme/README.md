# `@elastic/eui-docusaurus-theme`

EUI custom [Docusaurus](https://docusaurus.io/) theme made for the EUI [documentation website](https://eui.elastic.co).

## Usage

The EUI theme uses the [Swizzling](https://docusaurus.io/docs/swizzling/) technique to swap the theme component with
custom implementation that includes EUI components and tokens.

### Prerequisites

Before you get started with installing the preset, update your Docusaurus setup to be compatible
with `@elastic/eui-docusaurus-theme`:

1. Install required packages

    ```shell
    yarn add @emotion/react @emotion/css @elastic/charts
    ```

2. Configure TypeScript

    You need to add `jsxImportSource` and `moduleResolution` to your project's `tsconfig.json`:

    ```diff
    {
        // This file is not used in compilation. It is here just for a nice editor experience.
        "extends": "@docusaurus/tsconfig",
        "compilerOptions": {
            "baseUrl": ".",
    +        "jsxImportSource": "@emotion/react",
    +        "moduleResolution": "nodenext"
        }
    }
    ```

3. Configure Babel

    Add `@babel/preset-react` to allow Emotion to handle `importSource`.

    ```diff
    module.exports = {
        presets: [
            require.resolve('@docusaurus/core/lib/babel/preset'),
    +       [
    +            '@babel/preset-react',
    +            { runtime: 'automatic', importSource: '@emotion/react' },
    +       ],
        ],
    };
    ```

### Installing the preset (recommended)

```shell
# npm
npm install @elastic/eui-docusaurus-preset

# pnpm
pnpm add @elastic/eui-docusaurus-preset

# Yarn
yarn add @elastic/eui-docusaurus-preset
```

and in your `docusaurus.config.ts` file, add:

```ts
const config: Config = {
    // ...
    presets: [
        require.resolve('@elastic/eui-docusaurus-preset'),
        // ...
    ],
    // ...
}
```

### Theme only

Docusaurus uses Infima, its default CSS framework, to style the classic theme (`@docusaurus/theme-classic`). The EUI Docusaurus theme is based on the classic theme, but Infima's global styles often override or conflict with EUI's design system, leading to inconsistent appearance. The `ignore-styles-plugin` disables Infima's styles, ensuring the EUI theme displays correctly. For this reason, we highly recommend using the preset rather than the standalone theme.

If you prefer to use only the theme, install the package:

```shell
# npm
npm install @elastic/eui-docusaurus-theme

# pnpm
pnpm add @elastic/eui-docusaurus-theme

# Yarn
yarn add @elastic/eui-docusaurus-theme
```

and in your `docusaurus.config.ts` file, add:

```ts
const config: Config = {
    // ...
    themes: [
        require.resolve('@docusaurus/theme-classic'), // Required for compatibility
        require.resolve('@elastic/eui-docusaurus-theme'),
    ],
    // ...
}
```

## Features

### Right-side nav links

To achieve similar right-side nav links as on the [EUI docs](https://eui.elastic.co/), you have to use the `component` property that has a value of `"changelog" | "github" | "figma"`.

```ts
themeConfig: {
    // ...
    navbar: {
      // ...
      items: [
        // ...
        // Use component: "changelog" | "github" | "figma"
        {
          href: "https://github.com/elastic/eui/tree/main/packages/eui/changelogs",
          label: "EUI Changelog",
          position: "right",
          component: "changelog",
        },
        {
          href: "https://github.com/elastic/eui",
          label: "GitHub",
          position: "right",
          component: "github",
        },
        {
          href: "https://www.figma.com/community/file/964536385682658129",
          label: "Figma",
          position: "right",
          component: "figma",
        },
      ],
    },
    // ...
}
```

## Local development

### Prerequisites

This package requires:

- Node.js (check current version in [.nvmrc](../../.nvmrc)),
- [corepack](https://nodejs.org/api/corepack.html).

### Installing dependencies

Install dependencies by running:

```shell
yarn
```

### Building the package

```shell
yarn build
```

### Building in watch mode

Run the following command to build this package whenever a file is edited:

```shell
yarn start
```

:::warning
Please note that this package is configured to do incremental builds and sometimes `tsc` may not update the `lib` directory with your latest changes if you rename or delete files.

If that's the case please run `yarn build`.
:::

### Test with EUI documentation website

Run the following command from the root of the mono-repository to run the website:

```shell
yarn workspace @elastic/eui-website start
```

You can pair it with the watch mode when modifying the Docusaurus theme.

### Test locally with your own Docusaurus project

You should have a Docusaurus project running. If you want to test EUI theme with a fresh project, you should create a [Docusaurus scaffolded project website](https://docusaurus.io/docs/installation).

Run the following command to create a Docusaurus project:

```shell
npx create-docusaurus@latest my-website classic --typescript
```

Install `yalc` globally if you haven't already:

```shell
npm install -g yalc
```

In the root of the mono-repository, run the following commands to build and publish the preset locally:

```shell
yarn workspace @elastic/eui-docusaurus-preset build

# Publish the preset locally
cd packages/docusaurus-preset
yalc publish
```

In your project, install EUI dependencies:

```shell
# npm
npm install @elastic/eui @elastic/charts @emotion/react @emotion/css moment

# pnpm
pnpm add @elastic/eui @elastic/charts @emotion/react @emotion/css moment

# Yarn
yarn add @elastic/eui @elastic/charts @emotion/react @emotion/css moment
```

and add the locally published packages:

```shell
yalc add @elastic/eui-docusaurus-preset

# npm
npm install

# pnpm
pnpm install

# Yarn
yarn
```

Configure Docusaurus to use the locally built preset as outlined in the [Usage section](#usage).

#### Making changes

When you make changes to the theme, rebuild and republish the packages:

```shell
# From the mono-repository root
yarn workspace @elastic/eui-docusaurus-theme build
yarn workspace @elastic/eui-docusaurus-preset build

cd packages/docusaurus-preset  
yalc publish --push
```

The `--push` flag automatically updates all projects using these packages.

Restart your Docusaurus development server:

```shell
# npm
npm run start

# pnpm
pnpm start

# Yarn
yarn start
```

When you're done testing, remove the locally published packages from your project:

```shell
# In your project
yalc remove @elastic/eui-docusaurus-preset

# npm
npm install

# pnpm
pnpm install

# Yarn
yarn
```
