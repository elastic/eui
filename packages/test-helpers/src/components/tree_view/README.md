# EuiTreeViewObject

Playwright Component Object for [EuiTreeView](https://eui.elastic.co/docs/components/navigation/tree-view/).

## Usage

```ts
import { EuiTreeViewObject } from '@elastic/eui-test-helpers';

const treeView = new EuiTreeViewObject(page, 'myTreeView');
await treeView.items.filter({ hasText: 'Item One' }).click();
await expect(treeView.items).toHaveCount(2);
```

Set `data-test-subj` on `EuiTreeView` itself, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `items` | `Locator` for the node buttons of this level, in order. A node with children carries `aria-expanded`, which reflects open state synchronously. A leaf has no `aria-expanded`. |

`items` reads direct children of the root only. A nested `EuiTreeView` renders its own `.euiTreeView` inside an expanded node, so a plain descendant search would mix levels.

## Deliberately out of scope

- **Nested levels**: `EuiTreeView` gives nested trees no `data-test-subj` of their own, so there is nothing to scope a second object to. Reach nested nodes through a plain locator under the expanded node until a consumer needs more.
- **Expand and collapse methods**: clicking a node toggles it and `aria-expanded` updates synchronously, so `items.nth(i).click()` plus a retrying assertion is enough.
