# EuiButtonEmptyObject

Playwright Component Object for [EuiButtonEmpty](https://eui.elastic.co/docs/components/navigation/buttons/button/).

## Usage

```ts
import { EuiButtonEmptyObject } from '@elastic/eui-test-helpers';

const cancel = new EuiButtonEmptyObject(page, 'cancelButton');
await cancel.click();
```

Set `data-test-subj` on `<EuiButtonEmpty>`. EUI spreads it onto the `<button>` or `<a>`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `click()` | Click the element. What follows is up to the consumer. |
| `getText()` | The visible text, trimmed. Empty for an icon-only button. Screen reader only text, as the external link suffix, is left out. |
| `isDisabled()` | Whether the element is disabled, through the native attribute or `aria-disabled`. |
| `isLoading()` | Whether EUI's loading spinner replaces the icon. A spinner inside the children does not count. |

## Deliberately excluded

`color`, `size`, `flush` and `iconType`. They are presentation, assert on them through `locator` if a test needs to.
