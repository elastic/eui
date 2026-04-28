# EUI Test Helpers

`@elastic/eui-test-helpers` is a library of test helpers to use when testing EUI components
with [Cypress], [React Testing Library], or [Scout]. It provides assertion, find, and query helpers to make interacting
with EUI components easy and reliable. Say goodbye to finding CSS selectors to query that _seem_ right.

> [!NOTE]
> This library is in early stages of development and is missing many useful utilities. Please contribute or
> [open a feature request](https://github.com/elastic/eui/issues/new?template=feature_request.md) if you notice
> anything missing!

This library provides utilities to EUI components that are non-trivial to write tests for. Please use the built-in
methods for testing simple, native-like components that are provided by your testing framework of choice.

## Installation

This library's versioning is following `@elastic/eui` and must be kept in sync to ensure correct functionality.

```shell
yarn add --dev @elastic/eui-test-helpers
```

[Cypress]: https://github.com/cypress-io/cypress
[React Testing Library]: https://github.com/testing-library/react-testing-library
[Scout]: https://github.com/elastic/kibana/tree/main/src/platform/packages/shared/kbn-scout
