# EUI Test Helpers

`@elastic/eui-test-helpers` is a library of EUI components test helpers for [Cypress](https://github.com/cypress-io/cypress) 
and [React Testing Library](https://github.com/testing-library/react-testing-library).
It provides assertion, find, and query functions to make testing EUI components easier and more reliable by exposing
a stable API eliminating guesswork. Say goodbye to finding CSS selectors that _seem_ right.

> [!NOTE]
> This library is in early stages of development and is missing many useful utilities. Please contribute or 
> [open a feature request](https://github.com/elastic/eui/issues/new?template=feature_request.md) if you notice 
> anything missing!

This library provides utilities to EUI components that are non-trivial to write tests for, usually because of going
beyond what the native experience looks like, making it more complicated for test frameworks
to have built-in utilities for. A good example is `EuiComboBox` which resembles the native `<select>` but ships with
additional features like search, multi-option selection, and a custom UI.

You should keep using the ways of testing UI recommended by your testing framework whenever possible, and reach out for
`@elastic/eui-test-helpers` only when testing selected EUI components this library was made to help with.
This approach ensures you go the most maintenance-free path possible.

## Installation

This library's versioning is following `@elastic/eui` and must be kept in sync to ensure correct functionality.

```shell
yarn add --dev @elastic/eui-test-helpers
```
