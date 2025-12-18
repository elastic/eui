# EUI Docusaurus theme

`@elastic/eui-docusaurus-theme`

EUI theme for [Docusaurus](https://docusaurus.io/) made for the new EUI [documentation website](https://eui.elastic.co).

## Installation and usage

This package is not yet published to npm.

## Local development

### Prerequisites

This package requires Node.js (check current version in [.nvmrc](/.nvmrc)) to be installed
and [corepack](https://nodejs.org/api/corepack.html) to be enabled.

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

Please note that this package is configured to do incremental builds and sometimes `tsc` may not update
the `lib` directory with your latest changes if you rename or delete files.
If that's the case please run `yarn build`.
