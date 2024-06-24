# EUI documentation website

This package contains sources of the upcoming new EUI documentation website
built with [Docusaurus](https://docusaurus.io/), an open-source documentation
platform powered by React.

This is a **private** package and is not meant to be published to npm.
If you're looking for EUI components or utilities, check out our other [packages](../).

## Local development

### Prerequisites

Like other packages in this repository, this package requires Node.js (check version in [.nvmrc](/.nvmrc)) 
to be installed and [corepack](https://nodejs.org/api/corepack.html) enabled.

### Installing dependencies

Please run `yarn` to install dependencies:

```shell
yarn
```

### Building helper packages

Before you run scripts, it's mandatory to build all local dependency packages:

```shell
yarn workspaces foreach -Rpt --from @elastic/eui-website run build
```

### Running the development server

Run a local development server with hot reloading capabilities:

```shell
yarn start
```

Please note that this command does not watch for changes in other packages' sources
(e.g., the [theme](../docusaurus-theme) package). Please check out each package's
README to see if watch mode is available and how to use it.

### Building the website

This step is usually unnecessary to run locally unless you're testing production builds.

```shell
yarn build
```

### Running type checks

```shell
yarn typecheck
```
