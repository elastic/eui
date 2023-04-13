<img src="https://repository-images.githubusercontent.com/107422373/b6180480-a1d7-11eb-8a3c-902086232aa7" alt="" />

# Elastic UI Framework

**The Elastic UI Framework is a collection of React UI components for quickly building user interfaces at Elastic.**

Check out our [full documentation site][docs] which contains many examples of components in the EUI framework aesthetic, and how to use them in your products. We also have a [FAQ][faq] that covers common usage questions. For other general questions regarding EUI, check out the [Discussions tab](https://github.com/elastic/eui/discussions).

## Frequently Asked Questions

### What is the Elastic UI Framework?

The Elastic UI Framework (EUI) is a design library in use at Elastic to build React applications that need to share our branding and aesthetics. It distributes typed UI React components and static assets for use in building web layouts. Alongside the React components, we ship theme & style utilities that can be used independently on their own.

The primary goal of this library is to provide reusable UI components that can be used throughout Elastic's web products. As React components, they remove CSS from the process of building UIs. As a single source of truth, the framework allows our designers to make changes to our aesthetic directly in the code. And unit test coverage for the UI components allows us to deliver a stable "API for user interfaces".

### Can I use EUI?

Please see Elastic's licensing FAQ: [I’m using EUI or Elastic Charts in my application outside of Kibana, how does this affect me?](https://www.elastic.co/pricing/faq/licensing#im-using-eui-or-elastic-charts-in-my-application-outside-of-kibana-how-does-this-affect-me)

## What is the versioning, releases and upgrade strategy?

We use [semver](https://semver.org/) for versioning and use that to denote breaking changes in EUI upgrades. Traditionally we consider API changes in our prop names or existing component functionality to be a reason for a breaking change, but do not track the renaming of CSS selectors, mixins or other style changes under this same rigor.

Traditionally releases are made weekly against whatever is in the `main` branch and you can upgrade from NPM as you see fit.

## Can I contribute to EUI?

Yes! We welcome community-contributed PRs, especially around feature requests that the EUI team may not have bandwidth to carry out alone. You can find documentation around creating and submitting new components in [CONTRIBUTING.md](CONTRIBUTING.md).

## Why is EUI open source?

Many of our products themselves are open source and rely upon this library to function. The Elastic UI Framework began as a folder of code in Kibana and we decided it could be used beyond that codebase. It exists as an independent library so that patterns can be shared across teams and design standards can be scaled across our organization. Since most of our products are open source, we treat this one similarly as far as public publishing and conversation even if its usage tends to focus more inward towards Elastic itself.

## What about reporting bugs and feature requests?

Bug reports and feature requests are most welcome, but our roadmap and prioritization is driven primarily by internal Elastic usage.

<!-- TODO: Delete this question once the Emotion migration is complete -->
## What is the status of EUI's theming?

The EUI library was previously built upon Sass and is in the process of migrating to CSS-in-JS (specifically Emotion). While this work is in progress, we ask for your patience with our in-between state in areas such as documentation and setup.


## Running Locally

### Node

We depend upon the version of node defined in [.nvmrc](.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```bash
nvm install
```

### Documentation

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running the following.

```bash
yarn
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```bash
yarn start --port 9000
```

## Wiki

### Consumption

* [Consuming EUI][consuming]
* [Using EUI with react-router](wiki/react-router.md)

### Maintenance / Contributing

[CONTRIBUTING.md](CONTRIBUTING.md)

* [Component design](wiki/component-design.md)
* [Component development](wiki/component-development.md)
  * [Creating components manually](wiki/creating-components-manually.md)
  * [Creating components with Yeoman](wiki/creating-components-yeoman.md)
* [Creating icons](wiki/creating-icons.md)
* [Testing](wiki/testing.md)
  * [Accessibility Testing](wiki/automated-accessibility-testing.md)
* [Documentation](wiki/documentation-guidelines.md)
* [Releasing versions](wiki/releasing-versions.md)

## License

[Dual-licensed under Elastic v2 and Server Side Public License, v 1][license]. Read the [FAQ][faq] for details.

[license]: LICENSE.txt
[faq]: #frequently-asked-questions
[consuming]: wiki/consuming.md
[docs]: https://elastic.github.io/eui/
