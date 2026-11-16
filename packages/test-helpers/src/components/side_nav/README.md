# EuiSideNavObject

Playwright Component Object for [EuiSideNav](https://eui.elastic.co/docs/components/navigation/side-nav/).

## Usage

```ts
import { EuiSideNavObject } from '@elastic/eui-test-helpers';

const sideNav = new EuiSideNavObject(page, 'mySideNav');
await sideNav.expand('Data');
await sideNav.select('Index Management');
```

Set `data-test-subj` on `<EuiSideNav>`. EUI spreads it onto the `<nav>`, which the component-type guard verifies. Items are addressed by their exact label.

## API

| Member | Description |
|---|---|
| `getItems()` | The labels of every rendered item, in document order. |
| `item(label)` | `Locator` for the clickable element of the item with exactly this label. |
| `select(label)` | Click the item. Selection is owned by the consumer, usually a route change, so nothing is asserted afterwards. |
| `getSelected()` | The label of the selected item, or `null`. |
| `expand(label)` | Expand an accordion item (children, no link or click handler) and wait for its children. No-op if already open. |

Closed branches are not in the DOM at all, so `item()` and `getItems()` only see what is rendered. Expand the parent first.

## Deliberately excluded

The mobile toggle (`isOpenOnMobile`), the responsive variant is a Kibana layout concern. Custom `renderItem` output is supported only as far as it keeps EUI's item classes.
