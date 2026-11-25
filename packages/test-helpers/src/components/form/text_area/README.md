# EuiTextAreaObject

Playwright Component Object for [EuiTextArea](https://eui.elastic.co/docs/components/forms/text/).

## Usage

```ts
import { EuiTextAreaObject } from '@elastic/eui-test-helpers';

const description = new EuiTextAreaObject(page, 'myTextArea');
await description.fill('first line\nsecond line');
expect(await description.getValue()).toBe('first line\nsecond line');
```

Set `data-test-subj` on `<EuiTextArea>`. EUI spreads it onto the native `<textarea>`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `fill(text)` | Replace the text and wait for the textarea to hold exactly it. Fails if the app transforms the value, for example by trimming it. |
| `getValue()` | The current text of the textarea. |
| `clear()` | Empty the textarea. |

## Deliberately excluded

The `isClearable` button. `clear()` empties the textarea directly, the button is reachable through `selectors.textArea.CLEAR_BUTTON_TEST_SUBJ` when a test needs to click it. `icon` is decoration.
