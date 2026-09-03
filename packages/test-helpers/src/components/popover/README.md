# EuiPopoverObject

Playwright Component Object for [EuiPopover](https://eui.elastic.co/docs/components/containers/popover/).

## Usage

```ts
import { EuiPopoverObject } from '@elastic/eui-test-helpers';

const popover = new EuiPopoverObject(page, 'myPopoverToggle');
await popover.open();
await popover.close();
```

Set `data-test-subj` on the toggle button (the `button` prop's own element), not on `EuiPopover` itself — `EuiPopover` spreads unrecognized props onto its outer anchor wrapper, not the toggle. `EuiPopover` only manages `aria-expanded`/`aria-controls` on a button-like toggle (a `<button>` or `role="button"`), which the component-type guard also relies on, so a non-button toggle is not supported.

## API

| Member | Description |
|---|---|
| `open()` | Opens the popover. A no-op if it is already open. |
| `close()` | Closes the popover. A no-op if it is already closed. |

Both read `aria-expanded` synchronously, which `EuiPopover` sets on the toggle from mount regardless of open state, so no wait or retry is needed to decide whether to click.

## Deliberately out of scope

- **Reading open state**: assert directly on `locator`, e.g. `expect(popover.locator).toHaveAttribute('aria-expanded', 'true')`.
- **The popover panel**: not this component's concern. Scope another Component Object (e.g. `EuiSelectableObject`) to the panel's own `data-test-subj` for its contents.
