# EuiSuperSelectObject

Playwright Component Object for [EuiSuperSelect](https://eui.elastic.co/docs/components/forms/selection/super-select/).

## Usage

```ts
import { EuiSuperSelectObject } from '@elastic/eui-test-helpers';

const superSelect = new EuiSuperSelectObject(page, 'mySuperSelect');
await superSelect.selectOptionByValue('warning');
expect(await superSelect.getSelectedValue()).toBe('warning');
```

Set `data-test-subj` on the `<EuiSuperSelect>` — EUI spreads it onto the control `<button>` (`.euiSuperSelectControl`), which the component-type guard verifies.

## API

| Method | Description |
|---|---|
| `selectOptionByValue(value)` | Selects the option whose `value` matches. Works on any EuiSuperSelect without extra test hooks (EUI renders each option with `id={String(value)}`) and is the preferred method when the value is a stable code constant — it is immune to i18n and display changes. |
| `selectOptionByLabel(label)` | Selects the option by its visible label. Use for dynamic, data-driven option content where the test cannot know the value. Note the dropdown shows `dropdownDisplay` when the consumer provides it, which can differ from the committed `inputDisplay` text. |
| `getSelectedValue()` | The committed selection's `value`, read from the hidden form input EUI renders next to the control (the visible button text shows the label, not the value). |

Both select methods open the dropdown if needed and wait for it to close after the click.
