# EuiSwitchObject

Playwright Component Object for [EuiSwitch](https://eui.elastic.co/docs/components/forms/selection/switch/).

## Usage

```ts
import { EuiSwitchObject } from '@elastic/eui-test-helpers';

const toggle = new EuiSwitchObject(page, 'mySwitch');
await toggle.check();
expect(await toggle.isChecked()).toBe(true);
```

Set `data-test-subj` on `<EuiSwitch>`. EUI spreads it onto the `<button role="switch">`, which the component-type guard verifies. The switch is a button, not an input, so Playwright's `check()` does not apply and this object reads `aria-checked` instead.

## API

| Member | Description |
|---|---|
| `isChecked()` | Whether the switch is on, read from `aria-checked`. |
| `check()` | Turn the switch on, a no-op when it already is. |
| `uncheck()` | Turn the switch off, a no-op when it already is. |
| `toggle()` | Flip the switch and wait for `aria-checked` to follow. |

## Deliberately excluded

The label. Assert on it through `locator` or `getByLabel`. The `selectable` switch of `EuiCard` is covered by `EuiCardObject`.
