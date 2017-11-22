🚨 **WARNING** While open source, the intended consumers of this repository are Elastic products. Read the [FAQ][faq] for details.

# Elastic UI Framework [![Build Status][ci-badge]][ci-site]

> The Elastic UI Framework is a collection of React UI components for quickly building user interfaces
> at Elastic. Not using React? No problem! You can still use the CSS behind each component.

You should check out our [living style guide][docs], which contains many examples on how components in the EUI framework look and feel, and how to use them in your products.

## Installation

To install the Elastic UI Framework, use the `npm` CLI.

```
npm install @elastic/eui
```

## Running locally

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running.

```
npm start
```

## Goals

The primary goal of this library is to provide reusable UI components that can be used throughout
Elastic's web products. As React components, they remove CSS from the process of building UIs.
As a single source of truth, the framework allows our designers to make changes to our look-and-feel
directly in the code. And unit test coverage for the UI components allows us to deliver a stable
"API for user interfaces".

## Contributing

You can find documentation around creating and submitting new components in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[Apache Licensed.][license] Read the [FAQ][faq] for details.

[license]: LICENSE.md
[faq]: FAQ.md
[docs]: https://elastic.github.io/eui/
[ci-badge]: https://travis-ci.org/elastic/eui.svg?branch=master
[ci-site]: https://travis-ci.org/elastic/eui
