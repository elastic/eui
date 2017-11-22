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

## Contributing

You can find documentation around creating and submitting new components in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[Apache Licensed.][license] Read the [FAQ][faq] for details.

## Goals

### Dynamic, interactive documentation

By having a "living style guide", we relieve our designers of the burden of creating and maintaining
static style guides. This also makes it easier for our engineers to translate mockups, prototypes,
and wireframes into products.

### Copy-pasteable UI

Engineers can copy and paste sample code into their projects to quickly get reliable, consistent results.

### Remove CSS from the day-to-day

The CSS portion of this framework means engineers don't need to spend mental cycles translating a
design into CSS. These cycles can be spent on the things critical to the identity of the specific
project they're working on, like architecture and business logic.

If they use the React components, engineers won't even need to _look at_ CSS -- it will be encapsulated
behind the React components' interfaces.

### More UI tests mean fewer UI bugs

By covering our UI components with great unit tests and having those tests live within the framework
itself, we can rest assured that our UI layer is tested and remove some of that burden from our
integration/end-to-end tests.

[license]: LICENSE.md
[faq]: FAQ.md
[docs]: https://elastic.github.io/eui/
[ci-badge]: https://travis-ci.org/elastic/eui.svg?branch=master
[ci-site]: https://travis-ci.org/elastic/eui
