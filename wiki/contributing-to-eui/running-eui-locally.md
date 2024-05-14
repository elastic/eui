# Setting up and running EUI locally

The below instructions run EUI's [documentation site](https://eui.elastic.co/) locally, with any changes made in `src/` reflected. On local, EUI's favicon will be gray instead of colored.

> [!IMPORTANT]
> This repository is a monorepo, meaning that it contains sources of multiple packages within a single git repository. You can find all packages in the [`packages`](../../packages) directory.
> When dealing with EUI ([`@elastic/eui`](https://www.npmjs.com/package/@elastic/eui) package), most of the work will be done from within the [`packages/eui`](../../packages/eui) directory.

## Set up

### Node

We depend upon the version of node defined in [.nvmrc](../../.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/nvm-sh/nvm) is recommended.

To install and use the correct node version with `nvm`:

```shell
nvm install
```

### Dependencies

EUI uses `yarn` for dependency management. We use `npm` for release purposes only.

EUI only uses [yarn@v1 (classic)](https://classic.yarnpkg.com/en/docs/install), and not yarn v2 or above. Ensure you are on the correct version via `yarn -v` before installing all dependencies:

```shell
yarn
```

#### Puppeteer issues

If you're on an Apple arm64 machine and receive an error on `yarn` about Puppeteer/the chromium binary not being available, you have two options:

1. If you don't need to run Puppeteer tests locally:
   - Paste `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` into your terminal as an environment variable
2. If you do need need to run Puppeteer locally:
   - [Follow these steps](https://github.com/puppeteer/puppeteer/issues/6622#issuecomment-787912758) to install the Chromium binary globally and update your `~/.zshrc`.

## Running

Go to `packages/eui` directory:

```shell
cd packages/eui
```

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) with the following command:

```shell
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```shell
yarn start --port 9000
```

## Troubleshooting

### Eslint

If you're developing in VSCode and you are using the [`ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VSCode you will notice that ESLint is showing errors about not finding config files _since the monorepo setup changes_.
To fix this add `eslint.workingDirectories` to your VSCode settings and pass all working directories as relative paths.

```json
{
  "eslint.workingDirectories": ["./packages/eui"]
}
```
