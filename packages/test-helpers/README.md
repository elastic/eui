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

## Playwright Component Objects

For Playwright/Scout consumers, this package ships **Component Objects** —
semantic wrappers around a single Playwright `Locator` that encapsulate
user-like interactions for a specific EUI component.

```ts
import { EuiComboBoxObject } from '@elastic/eui-test-helpers/playwright';

const combo = new EuiComboBoxObject(page, 'dataViewSelector');
await combo.setSelectedOptions(['logs-*']);
expect(await combo.getSelectedOptions()).toEqual(['logs-*']);
```

The constructor's second argument is the `data-test-subj` set by the
consumer on the `<EuiComboBox>` element (the outer `.euiComboBox` wrapper).

`@playwright/test` is declared as a `peerDependency` — consumers provide
their own version at runtime.

### Adding a new Component Object

1. Add `data-test-subj` constants to `src/components/<name>/selectors.ts`
   (single source of truth — never inline test-subj strings in helpers).
2. Add the Component Object class in `src/components/<name>/object.ts`,
   extending `BaseObject` and importing constants from `selectors.ts`.
3. Add validation tests in `src/components/<name>/object.spec.ts` against
   the component's Storybook story.
4. Re-export the new class from `src/index.ts`.

### Running validation tests locally

The validation tests run against EUI's Storybook. Start it in a separate
terminal first:

```shell
cd packages/eui
yarn build:workspaces   # one-time, builds eui-theme-common + eui-theme-borealis
yarn start              # starts Storybook on http://localhost:6006
```

Wait until Storybook finishes compiling. Then, from the repository root:

```shell
yarn workspace @elastic/eui-test-helpers test
```

This runs `tsc --noEmit` (lint) followed by `playwright test` (the actual
tests). To run only the tests, use `test-unit`. On a fresh checkout you'll
also need to install Playwright's browsers once:

```shell
yarn workspace @elastic/eui-test-helpers exec playwright install chromium
```

After a failed run, open the HTML report (with traces, screenshots, and
the full call log) via:

```shell
yarn workspace @elastic/eui-test-helpers show-report
```

[Cypress]: https://github.com/cypress-io/cypress
[React Testing Library]: https://github.com/testing-library/react-testing-library
[Scout]: https://github.com/elastic/kibana/tree/main/src/platform/packages/shared/kbn-scout
