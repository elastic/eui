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
| `getSelectedOptions()` | Returns selected options as `string[]` of labels. Pills are read by the `.euiComboBoxPill` class, so combos that stamp a per-option `data-test-subj` (which overrides the pill's own) are still read correctly. |
| `setSelectedOptions(labels, { timeout? })` | Accepts an array of label strings. Selects existing options — replaces any existing selection, no-op if already matching. Types each label to filter, then selects by accessible name. `timeout` (default `2500`ms) bounds how long each option is awaited after typing; raise it for slow / server-backed combos. |
| `setCustomSelectedOptions(labels, { timeout? })` | Creates free-text values via `onCreateOption` (tags, custom field names, date formats) and selects them. Use this instead of `setSelectedOptions` when the values don't pre-exist as options — the created value is a selection, not a reusable option, so it won't appear in `getAvailableOptions()`. `timeout` defaults to `2500`ms. |
| `getAvailableOptions()` | Opens the dropdown and returns the available (unselected) option labels as `string[]`. |
| `clear()` | Clears all selected options. No-op if nothing is selected. |

The Component Object verifies the `data-test-subj` element is actually an `EuiComboBox` (via the `.euiComboBox` class) and throws a clear error otherwise — so pointing it at a different component that happens to share a `data-test-subj` fails loudly instead of silently misbehaving.

