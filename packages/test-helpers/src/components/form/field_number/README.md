# EuiFieldNumberObject

Playwright Component Object for [EuiFieldNumber](https://eui.elastic.co/docs/components/forms/numeric/).

## Usage

```ts
import { EuiFieldNumberObject } from '@elastic/eui-test-helpers';

const limit = new EuiFieldNumberObject(page, 'myNumber');
await limit.fill(42);
expect(await limit.getValue()).toBe('42');
```

Set `data-test-subj` on `<EuiFieldNumber>`. EUI spreads it onto the native `<input type="number">`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `fill(value)` | Replace the value, a number or a string, and wait for the input to hold exactly it. Fails if the app transforms the value, for example by clamping it to `min` or `max`. |
| `getValue()` | The current value as the input holds it, an empty string when blank. |
| `clear()` | Empty the input. |

## Deliberately excluded

`min`, `max`, `step` and the browser validity state. They are native input behavior, read them through `locator` with `getAttribute` or `evaluate`. `icon`, `prepend` and `append` are consumer content outside the input, assert on them through `locator`.
