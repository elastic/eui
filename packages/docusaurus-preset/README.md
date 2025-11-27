# `@elastic/eui-docusaurus-preset`

EUI custom [Docusaurus](https://docusaurus.io/) preset made for the EUI [documentation website](https://eui.elastic.co).

## Overview

The preset comes with themes and plugins configured.

### Themes

| Theme                           | Description                                        |
|---------------------------------|----------------------------------------------------|
| `@docusaurus/theme-classic`     | Base Docusaurus theme (required for compatibility) |
| `@elastic/eui-docusaurus-theme` | EUI custom theme for Docusaurus                    |

### Plugins

| Plugin                                 | Description.                                                        | Enabled by default?       |
|----------------------------------------|---------------------------------------------------------------------|---------------------------|
| `ignore-styles-plugin`                 | Prevents Infima and some inherited styles from polluting global CSS | Yes                       |
| `@docusaurus/plugin-content-docs`      | Documentation pages support                                         | Yes (configurable)        |
| `@docusaurus/plugin-content-pages`     | Static pages support                                                | Yes (configurable)        |
| `@docusaurus/plugin-svgr`              | SVG import support                                                  | Yes (configurable)        |
| `@docusaurus/plugin-content-blog`      | Blog support                                                        | Yes (configurable)        |
| `@docusaurus/plugin-sitemap`           | Sitemap generation (for SEO)                                        | Only in production builds |
| `@docusaurus/plugin-google-analytics`  | Google Analytics integration                                        | If configured             |
| `@docusaurus/plugin-google-tag-manager`| Google Tag Manager integration                                      | If configured             |
| `@docusaurus/plugin-google-gtag`       | Google Global Site Tag integration                                  | If configured             |

## Usage

The EUI preset uses the [preset constructor](https://docusaurus.io/docs/using-plugins#creating-presets) to define the theme (`@elastic/eui-docusaurus-theme`) and plugins.

To use it in your Docusaurus project, install the preset and the theme:

```shell
# npm
npm install @elastic/eui-docusaurus-preset @elastic/eui-docusaurus-theme

# pnpm
pnpm add @elastic/eui-docusaurus-preset @elastic/eui-docusaurus-theme

# Yarn
yarn add @elastic/eui-docusaurus-preset @elastic/eui-docusaurus-theme
```

and in your `docusaurus.config.ts` file, add:

```ts
const config: Config = {
    // ...
    presets: [
        [
            require.resolve("@elastic/eui-docusaurus-preset"),
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                },
            } satisfies Preset.Options,
        ],
    ],
    // ...
}
```

### Theme only

Docusaurus uses Infima, its default CSS framework, to style the classic theme (`@docusaurus/theme-classic`). The EUI Docusaurus theme is based on the classic theme, but Infima's global styles often override or conflict with EUI's design system, leading to inconsistent appearance. The `ignore-styles-plugin` disables Infima's styles, ensuring the EUI theme displays correctly. For this reason, we highly recommend using the preset rather than the standalone theme.

If you prefer to use only the theme, refer to [Theme only](../docusaurus-theme/README.md#theme-only) section in `@elastic/eui-docusaurus-theme`.

## Local development

### Prerequisites

This package requires:

- Node.js (check current version in [.nvmrc](../../.nvmrc)),
- [corepack](https://nodejs.org/api/corepack.html).

### Installing dependencies

Please run `yarn` to install dependencies:

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

In the root, run the following commands to build and pack the preset and theme locally:

```shell
# Build packages
yarn workspace @elastic/eui-docusaurus-theme build
yarn workspace @elastic/eui-docusaurus-preset build

# Pack packages
cd packages/docusaurus-theme
yarn pack --filename docusaurus-theme.tgz

cd ../docusaurus-preset
yarn pack --filename docusaurus-preset.tgz
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

and add the locally packed packages:

```shell
# npm
npm install /path/to/eui/packages/docusaurus-preset/docusaurus-preset.tgz /path/to/eui/packages/docusaurus-theme/docusaurus-theme.tgz

# pnpm
pnpm add /path/to/eui/packages/docusaurus-preset/docusaurus-preset.tgz /path/to/eui/packages/docusaurus-theme/docusaurus-theme.tgz

# Yarn
yarn add /path/to/eui/packages/docusaurus-preset/docusaurus-preset.tgz /path/to/eui/packages/docusaurus-theme/docusaurus-theme.tgz
```

Configure Docusaurus to use the locally built preset as outlined in the [Usage section](#usage).

#### Making changes

When you make changes to the preset or theme, rebuild and repack the packages.

Then reinstall the packages in your project to update the changes.

Restart your Docusaurus development server:

```shell
# npm
npm run start

# pnpm
pnpm start

# Yarn
yarn start
```
