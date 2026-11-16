# EuiButtonObject

Playwright Component Object for [EuiButton](https://eui.elastic.co/docs/components/navigation/buttons/button/).

## Usage

```ts
import { EuiButtonObject } from '@elastic/eui-test-helpers';

const save = new EuiButtonObject(page, 'saveButton');
expect(await save.isDisabled()).toBe(false);
await save.click();
```

Set `data-test-subj` on `<EuiButton>`. EUI spreads it onto the `<button>` or `<a>`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `click()` | Click the element. What follows is up to the consumer. |
| `getText()` | The visible text, trimmed. Empty for an icon-only button. |
| `isDisabled()` | Whether the element is disabled, through the native attribute or `aria-disabled`. |
| `isLoading()` | Whether the loading spinner replaces the icon. |

## Deliberately excluded

`color`, `fill`, `size` and `iconType`. They are presentation, assert on them through `locator` if a test needs to. `EuiButtonEmpty`, `EuiButtonIcon` and `EuiButtonGroup` have their own objects.
