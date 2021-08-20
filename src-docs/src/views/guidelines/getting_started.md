## Installation

To install the Elastic UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```
yarn add @elastic/eui
```

Note that EUI has [several `peerDependencies` requirements](https://github.com/elastic/eui/package.json) that will also need to be installed if starting with a blank project. You can read more about other ways to [consume EUI](https://github.com/elastic/eui/blob/master/https://github.com/elastic/eui/wiki/consuming.md).

```js
yarn add @elastic/eui @elastic/datemath moment prop-types
```

!{spacer{"size": "xxl"}}

## Running Locally

### Node

We depend upon the version of node defined in [.nvmrc](https://github.com/elastic/eui/.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```js
nvm install
```

### Documentation

You can run the documentation locally at `http://localhost:8030/` by running the following.

```js
yarn
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```js
yarn start --port 9000
```

!{spacer{"size": "xxl"}}


## Wiki

To learn more about how to consume or contribute to EUI, read our wiki.

### Consumption

* [Consuming EUI](https://github.com/elastic/eui/blob/master/wiki/consuming.md)
* [Using EUI with react-router](https://github.com/elastic/eui/wiki/react-router.md)

### Maintenance / Contributing

[Contributing](https://github.com/elastic/eui/blob/master/CONTRIBUTING.md)

* [Component design](https://github.com/elastic/eui/wiki/component-design.md)
* [Component development](https://github.com/elastic/eui/wiki/component-development.md)
  * [Creating components manually](https://github.com/elastic/eui/wiki/creating-components-manually.md)
  * [Creating components with Yeoman](https://github.com/elastic/eui/wiki/creating-components-yeoman.md)
* [Creating icons](https://github.com/elastic/eui/wiki/creating-icons.md)
* [Theming](https://github.com/elastic/eui/wiki/theming.md)
* [Testing](https://github.com/elastic/eui/wiki/testing.md)
  * [Accessibility Testing](https://github.com/elastic/eui/wiki/automated-accessibility-testing.md)
* [Documentation](https://github.com/elastic/eui/wiki/documentation-guidelines.md)
* [Releasing versions](https://github.com/elastic/eui/wiki/releasing-versions.md)
