# EuiButtonIconObject

Playwright Component Object for [EuiButtonIcon](https://eui.elastic.co/docs/components/navigation/buttons/button/).

## Usage

```ts
import { EuiButtonIconObject } from '@elastic/eui-test-helpers';

const remove = new EuiButtonIconObject(page, 'removeRow');
expect(await remove.isLoading()).toBe(false);
await remove.click();
```

Set `data-test-subj` on `<EuiButtonIcon>`. EUI spreads it onto the `<button>` or `<a>`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `click()` | Click the element. What follows is up to the consumer. |
| `getText()` | The visible text, trimmed. Empty for an icon-only button. Screen reader only text, as the external link suffix, is left out. |
| `isDisabled()` | Whether the element is disabled, through the native attribute or `aria-disabled`. |
| `isLoading()` | Whether EUI's loading spinner replaces the icon. A spinner inside the children does not count. |

## Deliberately excluded

`iconType`, `display`, `color` and `size`. They are presentation, assert on them through `locator` if a test needs to. The accessible name comes from `aria-label`, read it through `locator`.
