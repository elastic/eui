# EuiDraggableObject

Playwright Component Object for [EuiDraggable](https://eui.elastic.co/docs/components/drag-and-drop/), keyboard-reordering items instead of simulating a mouse drag.

## Usage

```ts
import { EuiDraggableObject } from '@elastic/eui-test-helpers';

const item = new EuiDraggableObject(page, 'myItemDragHandle');
await item.reorder(2); // move 2 positions later
await item.reorder(-1); // move 1 position earlier
```

Set `data-test-subj` on the item's own drag handle (the element EUI's `provided.dragHandleProps` are spread onto), not on the `EuiDraggable` item wrapper.

## API

| Member | Description |
|---|---|
| `reorder(steps)` | Focuses the handle, lifts it, moves it `steps` positions (`ArrowDown` for positive, `ArrowUp` for negative), drops it. |

`reorder` drives `EuiDraggable` (which wraps `@hello-pangea/dnd`) via its keyboard interaction — the library's own accessible alternative to a mouse drag, and one that doesn't require simulating drag events. It does not wait for a settle signal after dropping: EUI doesn't expose a synchronous, stable one (the `euiDraggable--isDragging` class some consumers checked for hasn't existed since this styling moved to Emotion — that check was always a no-op). Assert the resulting order with a retrying `expect`, which settles on its own.
