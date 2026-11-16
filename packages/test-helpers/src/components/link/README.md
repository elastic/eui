# EuiLinkObject

Playwright Component Object for [EuiLink](https://eui.elastic.co/docs/components/navigation/link/).

## Usage

```ts
import { EuiLinkObject } from '@elastic/eui-test-helpers';

const docs = new EuiLinkObject(page, 'docsLink');
expect(await docs.getHref()).toContain('elastic.co');
await docs.click();
```

Set `data-test-subj` on `<EuiLink>`. EUI spreads it onto the `<a>`, or onto the `<button>` it renders without `href`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `click()` | Click the element. What follows is up to the consumer. |
| `getText()` | The visible text, trimmed. Empty for an icon-only button. |
| `isDisabled()` | Whether the element is disabled, through the native attribute or `aria-disabled`. |
| `getHref()` | The `href`, or an empty string when the link renders as a button. |

## Deliberately excluded

`color`, `external` and `target`. They are presentation or navigation details, assert on them through `locator` if a test needs to.
