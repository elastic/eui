# EuiCardObject

Playwright Component Object for [EuiCard](https://eui.elastic.co/docs/components/display/card/).

## Usage

```ts
import { EuiCardObject } from '@elastic/eui-test-helpers';

const card = new EuiCardObject(page, 'myCard');
expect(await card.getTitle()).toBe('Logs');
await card.click();
```

Set `data-test-subj` on `<EuiCard>`. EUI spreads it onto the panel, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `selectButton` | `Locator` for the `selectable` toggle button, absent on plain cards. |
| `getTitle()` | The title text. |
| `getDescription()` | The description text, or `null` when the card has none. |
| `click()` | Click the card, which follows `href` or fires `onClick`. |
| `isSelected()` | Whether the `selectable` toggle is checked. |
| `toggleSelected()` | Click the `selectable` toggle and wait for it to flip. |

## Deliberately excluded

`children`, `footer`, `betaBadgeProps` and `icon`. They are consumer content, so assert on them through `locator`. `EuiCheckableCard` is a different component built on a radio or checkbox.
