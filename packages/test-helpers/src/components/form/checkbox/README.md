# EuiCheckboxObject

Playwright Component Object for [EuiCheckbox](https://eui.elastic.co/docs/components/forms/selection/checkboxes-and-radios/).

## Usage

```ts
import { EuiCheckboxObject } from '@elastic/eui-test-helpers';

const checkbox = new EuiCheckboxObject(page, 'myCheckbox');
await checkbox.check();
expect(await checkbox.isChecked()).toBe(true);
```

Set `data-test-subj` on `<EuiCheckbox>`. EUI spreads it onto the native `<input type="checkbox">`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `isChecked()` | Whether the checkbox is checked. `indeterminate` is a separate state, read it through `locator`. |
| `check()` | Check the box, a no-op when it already is. |
| `uncheck()` | Uncheck the box, a no-op when it already is. |
| `toggle()` | Flip the checked state. |

## Deliberately excluded

`EuiCheckboxGroup` and `EuiRadio`. Address their inputs with `getByRole` or wrap each `EuiCheckbox` the group renders. The selection checkboxes EUI tables render have their own `data-test-subj` (`checkboxSelectAll`, `checkboxSelectRow-<id>`), use those.
