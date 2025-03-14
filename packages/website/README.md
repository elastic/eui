# EUI documentation website

This package contains sources of the upcoming new EUI documentation website built with [Docusaurus](https://docusaurus.io/), an open-source documentation platform powered by React.

This is a **private** package and is not meant to be published to npm. If you're looking for EUI components or utilities, check out our other [packages](../).

## Local development

### Prerequisites

Like other packages in this repository, this package requires Node.js (check version in [.nvmrc](/.nvmrc)) to be installed and [corepack](https://nodejs.org/api/corepack.html) enabled.

### Installing dependencies

Please run `yarn` to install dependencies:

```shell
yarn
```

### Building helper packages

Before you run scripts, it's mandatory to build all local dependency packages:

```shell
yarn workspace @elastic/eui-website build:workspaces
```

This builds all EUI packages, docgen data for the prop tables and the Docusaurus theme.

### Running the development server

Run a local development server with hot reloading capabilities:

```shell
yarn workspace @elastic/eui-website start
```

:::warning
This command does not watch for changes in other packages' sources (e.g., the [theme](../docusaurus-theme) package). Please check out each package's README to see if watch mode is available and how to use it.
:::

### Building the website

This step is usually unnecessary to run locally unless you're testing production builds.

```shell
yarn workspace @elastic/eui-website build
```

You can serve the built static files for local testing by running

```shell
yarn workspace @elastic/eui-website serve
```

### Running type checks

```shell
yarn workspace @elastic/eui-website typecheck
```

## Documentation search

We use [lunr.js](https://github.com/olivernn/lunr.js) for local search on our documentation site. Lunr generates search indexes when the site is being built that we later fetch as JSON objects in runtime to provide users with accurate search results. This approach allows us to have version-specific search experience without the need to run a search server.

Because the search index is generated in build time, it means that searching is not possible when running the development server. Please refer to the [Building the website](#building-the-website) section to learn how to build the documentation site locally and serve it to use local search.

## Links

For external links, we use `<a>` tag to open them in a new tab, while for internal links (between documentation pages) we use [relative file paths](https://docusaurus.io/docs/markdown-features/links) as recommended by Docusaurus. 

## Troubleshooting

### The dev server failing after pushing to remote

Currently, we build some dependencies on pre-push necessary to run the tests with the latest state. This can cause some build folders to be removed and the server to fail.

To fix it, you have to remove all dependencies and build folders, reinstall and rebuild. You can do it with this command from the root directory:

`yarn clean && yarn && yarn workspace @elastic/eui-website build:workspaces && yarn workspace @elastic/eui-website start`
