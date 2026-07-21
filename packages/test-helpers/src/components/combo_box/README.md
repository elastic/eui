# EuiComboBoxObject

Playwright Component Object for [EuiComboBox](https://eui.elastic.co/docs/components/forms/selection/combo-box/).

## Usage

```ts
import { EuiComboBoxObject } from '@elastic/eui-test-helpers';

const comboBox = new EuiComboBoxObject(page, 'myComboBox');
await comboBox.setSelectedOptions(['Option A', 'Option B']);
expect(await comboBox.getSelectedOptions()).toEqual(['Option A', 'Option B']);
```

Set `data-test-subj` on the outer `<EuiComboBox>` wrapper (`.euiComboBox`), not on the inner `comboBoxInput`.

## API

EuiComboBox has two selection modes that affect how the methods behave:

- **Pill mode** — `singleSelection={false}` (default) or `singleSelection={true}`: selected options render as pill elements.
- **Plain-text mode** — `singleSelection={{ asPlainText: true }}`: the selected option's label appears directly in the search input.

| Method | Description |
|---|---|
| `getSelectedOptions()` | Returns the selected option labels as `string[]`. |
| `setSelectedOptions(labels, { timeout? })` | Selects existing options (replaces the current selection; no-op if already matching). `timeout` (default `2500`ms) bounds how long each option is awaited after typing — raise it for async / fetch-as-you-type combos. |
| `setCustomSelectedOptions(labels, { timeout? })` | Creates free-text values via `onCreateOption`. Use instead of `setSelectedOptions` when the values don't pre-exist as options. `timeout` defaults to `2500`ms. |
| `getAllVisibleOptions()` | Opens the dropdown and returns the labels of the currently visible options as `string[]` (virtualized lists mount only a subset). |
| `clear()` | Clears all selected options. No-op if nothing is selected. |

The Component Object verifies the `data-test-subj` element is actually an `EuiComboBox` (via the `.euiComboBox` class) and throws a clear error otherwise — so pointing it at a different component that happens to share a `data-test-subj` fails loudly instead of silently misbehaving.

