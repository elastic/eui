# Setting up and running EUI locally

The below instructions run EUI's [documentation site](https://eui.elastic.co/) locally, with any changes made in `src/` reflected.

> [!IMPORTANT]
> This repository is a monorepo, meaning that it contains sources of multiple packages within a single git repository. You can find all packages in the [`packages`](../../packages) directory.
> When dealing with EUI ([`@elastic/eui`](https://www.npmjs.com/package/@elastic/eui) package), most of the work will be done from within the [`packages/eui`](../../packages/eui) directory.

## Setup

### Node

We depend upon the version of node defined in [.nvmrc](../../.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/nvm-sh/nvm) is recommended.

To install and use the correct node version with `nvm`:

```shell
nvm install
```

### Dependencies

EUI uses [Yarn v4](https://yarnpkg.com/getting-started/install) for dependency management. We use `npm` for release purposes only.

Unlike Yarn Classic and other package managers, Yarn v4 isn't supposed to be installed globally.
Instead, it utilizes [corepack](https://nodejs.org/api/corepack.html) - a modern way to manage package managers built straight into Node.js.

First, enable corepack:
```shell
corepack enable
```

`yarn` is now configured on your machine, and you can use it just like any other CLI command.
Corepack will always use the right Yarn version, even when switching branches.

With `yarn` set up and ready to go, use it to install EUI dependencies:

```shell
yarn
```

Remember to run `yarn` whenever you're switching branches to ensure all dependencies are installed and have correct versions.

#### Puppeteer issues

If you're on an Apple arm64 machine and receive an error on `yarn` about Puppeteer/the chromium binary not being available, you have two options:

1. If you don't need to run Puppeteer tests locally:
   - Paste `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` into your terminal as an environment variable
2. If you do need need to run Puppeteer locally:
   - [Follow these steps](https://github.com/puppeteer/puppeteer/issues/6622#issuecomment-787912758) to install the Chromium binary globally and update your `~/.zshrc`.

## Running

### Storybook

This is the recommended way to work with components locally.

If running for the first time, build dependant workspaces:

```shell
yarn build:workspaces
```

You can run Storybook with the following command:

```shell
yarn start
```

### Website

If running for the first time, build dependant workspaces:

```
yarn workspace @elastic/eui-website build:workspaces
```

You can run the documentation locally at [http://localhost:3000/](http://localhost:3000/) with the following command:

```shell
yarn workspace @elastic/eui-website start
```

If another process is already listening on port 3000, the next free port will be used. Alternatively, you can specify a port:

```shell
yarn workspace @elastic/eui-website start --port 9000
```

See http://docusaurus.io/docs/cli#docusaurus-cli-commands.

### Updating theme code

Theme specific code lives in standalone workspace packages in the EUI repo. `/eui-theme-common` holds shared code for base theme building and types, while `/eui-theme-borealis` holds theme specific token and style definitions.
When making changes to either of these packages you need to manually build the packages for the updates to be available in your local development environment.

For building both packages at the same time, run the following in `/packages/eui`:
```shell
yarn build:workspaces
```

For building the packages separately, run the following in the respective package directory:
```shell
yarn build
```

## VSCode setup

### Eslint

If you're developing in VSCode and you are using the [`ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VSCode you will notice that ESLint is showing errors about not finding config files _since the monorepo setup changes_.
To fix this add `eslint.workingDirectories` to your VSCode settings and pass all working directories as relative paths.

```json
{
  "eslint.workingDirectories": ["./packages/eui"]
}
```
