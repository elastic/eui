# EuiFieldPasswordObject

Playwright Component Object for [EuiFieldPassword](https://eui.elastic.co/docs/components/forms/text/password/).

## Usage

```ts
import { EuiFieldPasswordObject } from '@elastic/eui-test-helpers';

// <EuiFieldPassword type="dual" data-test-subj="myPassword" />
const password = new EuiFieldPasswordObject(page, 'myPassword');
await password.fill('hunter2');
expect(await password.getValue()).toBe('hunter2');
await password.toggleVisibility();
expect(await password.isMasked()).toBe(false);
```

Set `data-test-subj` on `<EuiFieldPassword>`. EUI spreads it onto the native `<input>`, which the component-type guard verifies. The input `type` is `password` while masked and `text` while shown.

The eye button of a `type="dual"` field carries no test subject and an i18n label, so `toggleVisibility()` finds it as the icon button in the append slot of the surrounding form control layout. EUI places it after any consumer `append` content.

## API

| Member | Description |
|---|---|
| `fill(text)` | Replace the text and wait for the input to hold exactly it. Fails if the app transforms the value, for example by trimming it. |
| `getValue()` | The current text of the input, readable even while masked. |
| `clear()` | Empty the input. |
| `isMasked()` | Whether the text is hidden, read from the input `type`. |
| `toggleVisibility()` | Click the eye button of a `type="dual"` field and wait for the input `type` to flip. Fails when the field has no toggle. |

## Deliberately excluded

`prepend` and `append` content, assert on it through `locator`. The lock icon is decoration.
