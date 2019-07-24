# Elastic UI Framework

> The Elastic UI Framework is a collection of React UI components for quickly building user interfaces
> at Elastic. Not using React? No problem! You can still use the CSS behind each component.

You should check out our [living style guide][docs], which contains many examples on how components in the EUI framework aesthetic, and how to use them in your products. We also have a [FAQ][faq] that covers common usage questions.

## Installation

To install the Elastic UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```
yarn add @elastic/eui
```

Note that EUI itself has some dependencies itself mostly around management of dates and times. If you are installing it into a blank project you will need to install the following with it. You can read more about other ways to [consume EUI][consuming].

```
yarn add @elastic/eui @elastic/datemath moment
```


## Running Locally

### Node

We depend upon the version of node defined in [.nvmrc](.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```
nvm install
```

### Documentation

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running.

```
yarn
yarn start
```

## Goals

The primary goal of this library is to provide reusable UI components that can be used throughout
Elastic's web products. As React components, they remove CSS from the process of building UIs.
As a single source of truth, the framework allows our designers to make changes to our aesthetic
directly in the code. And unit test coverage for the UI components allows us to deliver a stable
"API for user interfaces".

## Contributing

You can find documentation around creating and submitting new components in [CONTRIBUTING.md](CONTRIBUTING.md).

## Wiki

### Consumption

* [Consuming EUI][consuming]
* [Using EUI with react-router][react-router]

### Maintenance

* [Component design][component-design]
* [Component development][component-development]
  * [Creating components manually][creating-components-manually]
  * [Creating components with Yeoman][creating-components-yeoman]
  * [Testing][testing]
* [Theming][theming]
* [Releasing versions][releasing-versions]

## License

[Apache Licensed.][license] Read the [FAQ][faq] for details.

[license]: LICENSE.md
[faq]: FAQ.md
[consuming]: wiki/consuming.md
[component-design]: wiki/component-design.md
[component-development]: wiki/component-development.md
[creating-components-manually]: wiki/creating-components-manually.md
[creating-components-yeoman]: wiki/creating-components-yeoman.md
[releasing-versions]: wiki/releasing-versions.md
[testing]: wiki/testing.md
[theming]: wiki/theming.md
[react-router]: wiki/react-router.md
[docs]: https://elastic.github.io/eui/
