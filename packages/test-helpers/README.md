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

This library is versioned independently from `@elastic/eui`. Because the helpers target EUI's component DOM and `data-test-subj`s, pick a version compatible with the `@elastic/eui` version you're testing against.

```shell
yarn add --dev @elastic/eui-test-helpers
```

## Playwright Component Objects

For Playwright/Scout consumers, this package ships **Component Objects** —
semantic wrappers around a single Playwright `Locator` that encapsulate
user-like interactions for a specific EUI component.

```ts
import { EuiComboBoxObject } from '@elastic/eui-test-helpers';

const comboBox = new EuiComboBoxObject(page, 'dataViewSelector');
await comboBox.setSelectedOptions(['logs-*']);
expect(await comboBox.getSelectedOptions()).toEqual(['logs-*']);
```

Every Component Object constructor takes `(scope, testSubj)`:
- `scope` — a Playwright `Page` or `Locator` to search within
- `testSubj` — the `data-test-subj` value you set on the component's root element in your app

`@playwright/test` is declared as a `peerDependency` — consumers provide
their own version at runtime.

### Available Component Objects

| Component | Documentation |
|---|---|
| `EuiComboBoxObject` | [src/components/combo_box/README.md](src/components/combo_box/README.md) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for design principles, directory structure, and how to add new Component Objects.

[Cypress]: https://github.com/cypress-io/cypress
[React Testing Library]: https://github.com/testing-library/react-testing-library
[Scout]: https://github.com/elastic/kibana/tree/main/src/platform/packages/shared/kbn-scout
