# EuiFieldTextObject

Playwright Component Object for [EuiFieldText](https://eui.elastic.co/docs/components/forms/text/).

## Usage

```ts
import { EuiFieldTextObject } from '@elastic/eui-test-helpers';

const name = new EuiFieldTextObject(page, 'myField');
await name.fill('logs');
expect(await name.getValue()).toBe('logs');
```

Set `data-test-subj` on `<EuiFieldText>`. EUI spreads it onto the native `<input type="text">`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `fill(text)` | Replace the text and wait for the input to hold exactly it. Fails if the app transforms the value, for example by trimming it. |
| `getValue()` | The current text of the input. |
| `clear()` | Empty the input. |

## Deliberately excluded

`prepend`, `append` and `icon`. They are consumer content outside the input, assert on them through `locator`. `EuiFieldNumber`, `EuiFieldPassword` and `EuiTextArea` are different inputs, Playwright handles them natively. Use `EuiFieldSearchObject` for the search variant since it submits on Enter.
