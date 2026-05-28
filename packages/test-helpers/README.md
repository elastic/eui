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

## Scope

**What this library is for:** enabling consumer end-to-end tests to set up and tear down component state reliably, so the test can focus on its actual assertion — not on navigating EUI's DOM.

**What this library is NOT for:** testing EUI component behavior. EUI already has RTL unit tests, Cypress E2E tests, and Loki VRT tests for that. If you want to add a public method specifically to exercise an EUI feature (e.g. "click the clear button to verify `onChange` fires"), that belongs in EUI's own suite. The validation tests here verify that **the helper itself works** — they are not a substitute for EUI's own tests and must not duplicate them.

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

---

## Design principles

These principles apply to every Component Object in this package.

### Minimal public API
Keep methods `private` until a genuine external use case emerges. More public methods mean more surface to keep stable and more ways for callers to couple to internal EUI DOM details.

### Configuration-agnostic public methods (smart auto-detection)
Public methods must work across every supported prop configuration without the caller specifying which variant they are in. Probe the DOM to detect configuration and dispatch to the right internal strategy — try not to add a new public method per variant. The caller always writes `await comboBox.clear()`; how it clears is an implementation detail.

### Single source of truth for selectors
Every `data-test-subj` value and CSS selector lives in `selectors.ts`. Never inline test-subject strings in helpers or spec files.

### Read synchronous DOM state — not async side-effects
Prefer CSS classes set synchronously in EUI's render function over async icon loads (`data-icon-type`), deferred `aria-*` attributes, or animations. Use `expect.poll()` only when unavoidable — and always document why.

### Scoped locators for multi-instance safety
Scope every locator to `this.root`, never to `page`. For portal elements, use the `${testSubj}-optionsList` pattern to prevent cross-instance bleed.

### Keyboard events scoped to the element
Use `locator.press()` not `page.keyboard.press()`. Avoid `Escape` — it bubbles to page-level handlers (modals, flyouts). Prefer clicking the toggle button or calling `locator.blur()` to close dropdowns.

---

## Adding a new Component Object

1. **Selectors** — add `data-test-subj` constants to
   `src/components/<name>/selectors.ts`. Never inline test-subj strings
   anywhere else.
2. **Object** — add the class in `src/components/<name>/object.ts`, extending
   `BaseObject`. Import constants from `selectors.ts`. Keep the public
   surface minimal; implement detection logic inside public methods rather
   than exposing variant-specific methods.
3. **Validation tests** — add specs in
   `src/components/<name>/object.spec.ts` (default config) and
   `src/components/<name>/object.props.spec.ts` (non-default prop
   configurations that alter the DOM or interaction model). See the
   test-writing guidelines below.
4. **Re-export** — export the new class from `src/index.ts`.

---

## Running validation tests locally

The validation tests run against EUI's Storybook. Start it first:

```shell
yarn workspace @elastic/eui build:workspaces   # one-time, builds eui-theme-common + eui-theme-borealis
yarn workspace @elastic/eui start              # starts Storybook on http://localhost:6006
```

Wait until Storybook finishes compiling. Then, from the repository root:

```shell
yarn workspace @elastic/eui-test-helpers test
```

This runs `tsc --noEmit` (type-check) followed by `playwright test`. To run
only the Playwright tests, use `test-unit`. On a fresh checkout, install
Playwright's browsers once:

```shell
yarn workspace @elastic/eui-test-helpers exec playwright install chromium
```

After a failed run, open the HTML report (with traces, screenshots, and
the full call log):

```shell
yarn workspace @elastic/eui-test-helpers show-report
```

[Cypress]: https://github.com/cypress-io/cypress
[React Testing Library]: https://github.com/testing-library/react-testing-library
[Scout]: https://github.com/elastic/kibana/tree/main/src/platform/packages/shared/kbn-scout
