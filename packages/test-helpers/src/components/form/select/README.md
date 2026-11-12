# EuiSelectObject

Playwright Component Object for [EuiSelect](https://eui.elastic.co/docs/components/forms/selection/select/).

## Usage

```ts
import { EuiSelectObject } from '@elastic/eui-test-helpers';

const select = new EuiSelectObject(page, 'mySelect');
await select.selectOptionByValue('option-2');
expect(await select.getSelectedLabel()).toBe('Option 2');
```

Set `data-test-subj` on `<EuiSelect>`. EUI spreads it onto the native `<select>`, which the component-type guard verifies. For the custom dropdown see `EuiSuperSelectObject`.

## API

| Member | Description |
|---|---|
| `selectOptionByValue(value)` | Select the option with this `value` and wait for it to be the selection. |
| `selectOptionByLabel(label)` | Select the option with this visible label, its `label` attribute if set, otherwise its text. |
| `getSelectedValue()` | The `value` of the selected option. |
| `getSelectedLabel()` | The visible label of the selected option, its `label` or else its `text`. |

## Deliberately excluded

`hasNoInitialSelection`. With it `getSelectedValue()` returns an empty string until something is chosen, which is the native behaviour. `prepend` and `append` are consumer content, assert on them through `locator`.
