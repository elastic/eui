# EuiFormRowObject

Playwright Component Object for [EuiFormRow](https://eui.elastic.co/docs/components/forms/layouts/row/).

## Usage

```ts
import { EuiFormRowObject } from '@elastic/eui-test-helpers';

const row = new EuiFormRowObject(page, 'nameRow');
expect(await row.getLabel()).toBe('Name');
expect(await row.getErrors()).toEqual(['Name is required']);
```

Set `data-test-subj` on `<EuiFormRow>`. EUI spreads it onto the row element, which the component-type guard verifies. Drive the field inside with its own Component Object, for example `EuiFieldTextObject`. Only the row's own label, errors and help texts are read, a nested row inside the field, as an inline `EuiColorPicker` renders, is left out.

## API

| Member | Description |
|---|---|
| `label` | `Locator` for the label, absent without `label`. |
| `errors` | `Locator` for the error texts, absent unless `isInvalid` with `error`. |
| `helpTexts` | `Locator` for the help texts, absent without `helpText`. |
| `getLabel()` | The label text, or an empty string without `label`. |
| `getHelpTexts()` | The help texts, in order. Empty without `helpText`. |
| `getErrors()` | The errors, in order. Empty unless `isInvalid` with `error`. |
| `isInvalid()` | Whether the row is invalid. True when the label is marked invalid or an error is shown. A row without a label and without `error` cannot be told apart from a valid one. |

## Deliberately excluded

The field itself, `display`, `fullWidth` and `isDisabled`. The field has its own Component Object and `EuiFormRow` only forwards `isDisabled` to it. `EuiDescribedFormGroup` wraps rows, address its rows by their own `data-test-subj`.
