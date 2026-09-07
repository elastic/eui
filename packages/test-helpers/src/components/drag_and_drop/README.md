# EuiDraggableObject

Playwright Component Object for [EuiDraggable](https://eui.elastic.co/docs/components/drag-and-drop/), keyboard-reordering items instead of simulating a mouse drag.

## Usage

```ts
import { EuiDraggableObject } from '@elastic/eui-test-helpers';

const item = new EuiDraggableObject(page, 'myItemDragHandle');
await item.reorder(2); // move 2 positions later
await item.reorder(-1); // move 1 position earlier
```

Set `data-test-subj` on the item's own drag handle — the element EUI's `provided.dragHandleProps` are spread onto. With the default `customDragHandle={false}`, that's the `<EuiDraggable>` item itself (as in the usage example above and the `Playground` story), since EUI spreads `dragHandleProps` onto the same element as `draggableProps` in that case. Only with a `customDragHandle` does the handle become a distinct inner element, and `data-test-subj` must move there instead. The component-type guard checks for the `data-rfd-drag-handle-draggable-id` attribute `@hello-pangea/dnd` spreads onto an *enabled* handle, since the handle markup itself is consumer-defined, not a fixed EUI class. A disabled draggable's handle lacks that attribute, so pointing this object at one throws the same "wrong component" error as pointing it at a non-handle element — a disabled item can't be reordered either way.

## API

| Member | Description |
|---|---|
| `reorder(steps)` | Focuses the handle, lifts it, moves it `steps` positions (`ArrowDown` for positive, `ArrowUp` for negative), drops it. |

`reorder` drives `EuiDraggable` (which wraps `@hello-pangea/dnd`) via its keyboard interaction — the library's own accessible alternative to a mouse drag, and one that doesn't require simulating drag events. It does not wait for a settle signal after dropping: EUI doesn't expose a synchronous, stable one (the `euiDraggable--isDragging` class some consumers checked for hasn't existed since this styling moved to Emotion — that check was always a no-op). Assert the resulting order with a retrying `expect`, which settles on its own.
