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
| `getSelectedOptions()` | Returns selected options as `string[]` of labels. |
| `setSelectedOptions(labels)` | Accepts an array of label strings. Replaces any existing selection. No-op if already matching. |
| `clear()` | Clears all selected options. No-op if nothing is selected. |

