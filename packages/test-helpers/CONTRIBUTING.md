# Contributing to `@elastic/eui-test-helpers`

## Scope

**What this library is for:** enabling consumer end-to-end tests to set up and tear down component state reliably, so the test can focus on its actual assertion — not on navigating EUI's DOM.

**What this library is NOT for:** testing EUI component behavior. EUI already has RTL unit tests, Cypress E2E tests, and Loki VRT tests for that. If you want to add a public method specifically to exercise an EUI feature (e.g. "click the clear button to verify `onChange` fires"), that belongs in EUI's own suite. The validation tests here verify that **the helper itself works** — they are not a substitute for EUI's own tests and must not duplicate them.

## Directory structure

```
src/
  playwright/
    base_object.ts                     # shared Playwright base class
    components/
      <name>/
        object.ts                      # Component Object (Playwright)
        object.spec.ts                 # validation tests — default config
        object.props.spec.ts           # validation tests — non-default props
        object.multiple_instances.spec.ts  # optional — multi-instance scoping
  components/
    <name>/
      selectors.ts                     # framework-agnostic test-subj constants
      README.md                        # component-level API docs
  storybook.ts                         # framework-agnostic Storybook URL builder
  selectors.ts                         # package-level generic selectors
  index.ts                             # public exports
```

## Design principles

### Minimal public API
Keep methods `private` until a genuine external use case emerges. More public methods mean more surface to keep stable and more ways for callers to couple to internal EUI DOM details.

### Configuration-agnostic public methods (smart auto-detection)
Public methods must work across every supported prop configuration without the caller specifying which variant they are in. Probe the DOM to detect configuration and dispatch to the right internal strategy — try not to add a new public method per variant. The caller always writes `await comboBox.clear()`; how it clears is an implementation detail.

### Single source of truth for selectors
Every `data-test-subj` value and CSS selector lives in `src/components/<name>/selectors.ts`. Never inline test-subject strings in helpers or spec files.

### Read synchronous DOM state — not async side-effects
Prefer CSS classes set synchronously in EUI's render function over async icon loads (`data-icon-type`), deferred `aria-*` attributes, or animations. Use `expect.poll()` only when unavoidable — and always document why.

### Read by a stable class, not an overridable `data-test-subj`
Some components spread a consumer-supplied `data-test-subj` onto an inner element *after* their own default — e.g. an `EuiComboBox` option's `data-test-subj` lands on its rendered pill and overrides the pill's `euiComboBoxPill` subj. A read keyed on that default then silently returns nothing. When an element always carries a stable EUI class, read it by class (`.euiComboBoxPill`) rather than by a `data-test-subj` the consumer can clobber. Keep the `data-test-subj` constant for targeting-by-value, but don't rely on it for enumerating internal elements.

### Account for virtualization in reads
Collection components (combo box, data grid, selectable) virtualize their options — items mount and unmount as the list scrolls, so the full set is never guaranteed to be in the DOM. A method that reads, matches, or enumerates items must not assume it can see everything: require an explicit search term (or exact-text / accessible-name match) so the target is filtered into the DOM before asserting, rather than returning only the currently-rendered subset. See the `optionFor` note in `src/components/combo_box/selectors.ts`.

### Scoped locators for multi-instance safety
Scope every locator to `this.root`, never to `page`. For portal elements, use the `${testSubj}-optionsList` pattern to prevent cross-instance bleed.

### Keyboard events scoped to the element
Use `locator.press()` not `page.keyboard.press()`. Avoid `Escape` — it bubbles to page-level handlers (modals, flyouts). Prefer clicking the toggle button or calling `locator.blur()` to close dropdowns.

### Subclassing readiness
Declare internal getters `protected` rather than `private` so that subclasses can access them without duplication. EUI's own component hierarchy makes this relevant — `EuiInMemoryTable` builds on `EuiBasicTable` which builds on `EuiTable`; `EuiBetaBadge` builds on `EuiBadge`. A future `EuiInMemoryTableObject` should be able to extend `EuiBasicTableObject` and reuse its locators.

## Adding a new Component Object

1. **Selectors** — add `data-test-subj` constants to `src/components/<name>/selectors.ts`. Never inline test-subj strings anywhere else.
2. **Object** — add the class in `src/playwright/components/<name>/object.ts`, extending `BaseObject`. Import constants from `selectors.ts`. Keep the public surface minimal; implement detection logic inside public methods rather than exposing variant-specific methods.
3. **Validation tests** — follow the spec file structure below.
4. **Re-export** — export the new class from `src/index.ts`.
5. **Docs** — add a `src/components/<name>/README.md` documenting the public API and auto-detection behavior.

### Spec file structure

One file per concern — either the default behavior or a family of related non-default configurations. Not one file per story, not one file per method.

- `object.spec.ts` — default config only; tests grouped by public method in nested `describe` blocks.
- `object.props.spec.ts` — all non-default configurations that alter the DOM or interaction model; each configuration gets its own `describe` + `beforeEach`. Can span multiple Storybook stories.
- `object.multiple_instances.spec.ts` — only when multiple instances can coexist on the same page.

Name instances after the component (`comboBox`, `datePicker`, etc.) and append a number for multi-instance tests (`comboBox1`, `comboBox2`). Use `storyUrl()` from `src/storybook.ts` — never inline `/iframe.html` strings.

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

This runs `tsc --noEmit` (type-check) followed by `playwright test`. To run only the Playwright tests, use `test-e2e`. On a fresh checkout, install Playwright's browsers once:

```shell
yarn workspace @elastic/eui-test-helpers exec playwright install chromium
```

After a failed run, open the HTML report (with traces, screenshots, and the full call log):

```shell
yarn workspace @elastic/eui-test-helpers show-report
```

> The local workflow above is unchanged: Playwright's `webServer` is configured with `reuseExistingServer` (off in CI), so when you already have the dev server on `:6006` it is reused. In CI — where no dev server runs — `webServer` serves EUI's prebuilt static Storybook from `packages/eui/storybook-static`. That directory is a gitignored build artifact, so it must be produced first with `yarn workspace @elastic/eui build-storybook` (the `test-helpers` CI task does this automatically).

## Validating against Kibana before publishing

The Storybook validation tests prove a helper works in isolation. They do **not** prove it works against a real consumer, where production DOM, parent-controlled state, and stricter test assertions surface issues Storybook can't. Validate against Kibana (the primary Scout consumer) *before* publishing — don't publish and fix the fallout later.

**1. Prototype the Component Object in Kibana first.** Build it in Kibana's `kbn-scout` package, iterating against real specs, before porting it here:

- Add the object under `src/platform/packages/shared/kbn-scout/src/playwright/eui_components/`, then register it on the `page.components` fixture so specs call `page.components.<name>(testSubj)` (the combo box is the reference: `page.components.comboBox('myComboBox')`).
- Write/convert the Scout specs that use it and run them locally.

Iterating in Kibana means you exercise the helper against the DOM it must actually support, not a curated story.

**2. Open a draft Kibana PR and run CI.** Local runs cover a slice; CI runs every stateful/serverless lane. Trigger it and confirm the specs that use the helper pass across lanes.

**3. Port to EUI and publish via a snapshot.** Once proven, move the object into this package (with `selectors.ts`, validation specs, and a README per [Adding a new Component Object](#adding-a-new-component-object)) and open the EUI PR. To run the *published* helper through Kibana CI you need a **snapshot** — Kibana CI installs from the npm registry, not a git ref, and this package is one workspace in the EUI monorepo, so you can't point Kibana at an EUI branch or commit.

- **Nightly:** EUI auto-publishes a snapshot on weekdays under the `snapshot` dist-tag (see [`.github/workflows/update_kibana_dependencies.yml`](../../.github/workflows/update_kibana_dependencies.yml) for the schedule and dist-tag). Pin Kibana's `@elastic/eui-test-helpers` to that exact version.
- **On demand:** label the EUI PR `ci:regression-integration-test-kibana` to build a snapshot from the PR head and kick off the Kibana integration chain (requires write/label access on `elastic/eui`).

Repin Kibana to the official release before merging its PR — snapshots are moving prereleases and get pruned.

**4. Read first-attempt failures, not just the final status.** Scout retries a failed spec once, so a lane can be green overall while its first attempt failed. A first-attempt failure in a spec that uses your helper often points to helper flakiness (a race or timing bug the retry hides) — inspect those and fix before publishing.

## CI integration

These tests run in EUI's Buildkite CI on every PR, with flake detection when a component changes. See [Testing → EUI test helpers](../../wiki/contributing-to-eui/testing/eui-test-helpers.md) in the wiki.

Flake detection correlates a component to its helper **by directory path**: a change under `packages/eui/src/components/<name>`, the helper's specs in `src/playwright/components/<name>`, or its selectors in `src/components/<name>` re-runs that helper's specs. `<name>` is the path relative to the components directory and may be nested (e.g. `form/super_select`), matching the EUI source layout. Keep that directory parity when adding a Component Object and no extra wiring is needed.
