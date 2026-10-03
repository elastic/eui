# EuiContextMenuObject

Playwright Component Object for [EuiContextMenu](https://eui.elastic.co/docs/components/navigation/context-menu/), or a standalone `EuiContextMenuPanel`, the more common Kibana pattern (a single panel inside a popover, no multi panel wrapper).

## Usage

```ts
import { EuiContextMenuObject } from '@elastic/eui-test-helpers';

const contextMenu = new EuiContextMenuObject(page, 'myContextMenu');
await contextMenu.items.filter({ hasText: 'Delete' }).click();
```

Set `data-test-subj` on the `<EuiContextMenu>` or the `<EuiContextMenuPanel>` itself, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `items` | `Locator` for the items in the current panel. |

When the root is a standalone panel, `items` is that panel's items. When it is an `EuiContextMenu`, `items` resolves to the last `.euiContextMenuPanel` in the DOM. During a panel transition (navigating to a nested panel or back) the outgoing panel can briefly still be in the DOM alongside the incoming one, and the incoming one always renders after it, so this avoids matching stale items from a panel that is on its way out.

## Deliberately out of scope

- **Clicking an item by label**: every real consumer already gives its own items a stable `data-test-subj`, so click those directly. `items` is for the cases where filtering by content is genuinely needed, e.g. `items.filter({ hasText: label })`.
