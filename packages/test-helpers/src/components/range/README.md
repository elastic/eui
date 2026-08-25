# EuiRangeObject

Playwright Component Object for [EuiRange](https://eui.elastic.co/docs/components/forms/range-controls/) and `EuiDualRange`.

## Usage

```ts
import { EuiRangeObject } from '@elastic/eui-test-helpers';

const range = new EuiRangeObject(page, 'myRange');
await range.slider.fill('50'); // or press arrow keys, drag, etc.
```

Set `data-test-subj` on the `<EuiRange>`/`<EuiDualRange>` (EUI spreads it onto the native range slider, which the component-type guard verifies).

## Why this exists

On a plain `EuiRange` rendered with `showInput`, EUI spreads the *same* `data-test-subj` onto both the native slider and the visible number input. A plain `page.getByTestId(x)` then resolves to two elements and throws in Playwright's strict mode. That is a real, non-obvious EUI gap this component exists to hide.

## API

| Member | Description |
|---|---|
| `slider` | `Locator` for the native `<input type="range">`. Always resolves to exactly one element. |
| `numberInput` | `Locator` for the visible number input. Only present on a plain `EuiRange` with `showInput` set, resolves to zero elements otherwise. |

## Deliberately out of scope

- **`EuiDualRange`'s min/max number inputs**: rendered only with `showInput`, and need their own `data-test-subj` via `minInputProps`/`maxInputProps`. That is the consumer's own test-subj to target directly, not ambiguous the way the plain `EuiRange` case is.
- **`EuiDualRange`'s `inputWithPopover` open/close**: its popover only opens by clicking a number input, not the delimiter between them. That is a real EUI behavioral quirk, but a single documented fact rather than DOM ambiguity, and popover mechanics are already exposed synchronously by `EuiPopover` itself (`aria-expanded`/`aria-controls`). Drive it from your test directly.
- **Reading the current value**: use `slider.inputValue()` or `numberInput.inputValue()` directly, no wrapper needed.
