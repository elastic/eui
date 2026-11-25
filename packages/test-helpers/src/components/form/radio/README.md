# EuiRadioGroupObject

Playwright Component Object for [EuiRadioGroup](https://eui.elastic.co/docs/components/forms/selection/radio-and-radio-group/).

## Usage

```ts
import { EuiRadioGroupObject } from '@elastic/eui-test-helpers';

const mode = new EuiRadioGroupObject(page, 'myRadioGroup');
await mode.select('Advanced');
expect(await mode.getSelected()).toBe('Advanced');
```

Set `data-test-subj` on `<EuiRadioGroup>`. EUI spreads it onto the group wrapper, a `<div>` or a `<fieldset>` with `legend`, which the component-type guard verifies. Radios are matched by their exact label text.

## API

| Member | Description |
|---|---|
| `inputs` | The radio inputs of the group, in DOM order. |
| `input(label)` | The radio input with exactly this label. |
| `select(label)` | Select the radio with this label and wait for it to be checked. |
| `getSelected()` | The label of the checked radio, `null` when none is. |
| `getOptions()` | The labels of all radios, in DOM order. |

## Deliberately excluded

Selecting by option `id` or `value`. Tests read as the user sees the group, by label. Use `input(label)` with `toBeDisabled()` for disabled options. A single `EuiRadio` outside a group is a native radio, use `getByRole('radio')`.
