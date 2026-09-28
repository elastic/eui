# EuiToolTipObject

Playwright Component Object for [EuiToolTip](https://eui.elastic.co/docs/components/display/tooltip/).

## Usage

```ts
import { EuiToolTipObject } from '@elastic/eui-test-helpers';

const toolTip = new EuiToolTipObject(page, 'myToolTip');
await page.getByRole('button', { name: 'Save' }).hover();
await expect(toolTip.locator).toHaveText('Saves the dashboard');
```

Set `data-test-subj` on `EuiToolTip` itself. EUI forwards it to the tooltip popover, not the trigger. The popover renders in a portal and is only mounted while shown, so `locator` resolves to zero elements until the trigger is hovered or focused, and again once it is not. Retrying assertions on `locator` cover both without a wait.

## API

This object exposes no members beyond `locator`. Showing and hiding go through the trigger with Playwright's own `hover()`, `focus()` and `blur()`.

## Deliberately out of scope

- **The trigger**: it is the consumer's own element, so target it directly. `EuiToolTip` only wraps it in a plain `span`.
- **Hiding with Escape**: it bubbles to page level handlers such as modals and flyouts. Blur or move the mouse off the trigger instead.
