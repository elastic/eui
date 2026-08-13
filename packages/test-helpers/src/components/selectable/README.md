# EuiSelectableObject

Playwright Component Object for [EuiSelectable](https://eui.elastic.co/docs/components/forms/selection/selectable/).

## Usage

```ts
import { EuiSelectableObject } from '@elastic/eui-test-helpers';

const selectable = new EuiSelectableObject(page, 'mySelectable');
await selectable.search('logs');
await selectable.selectOption('logs-*');
```

Set `data-test-subj` on the `<EuiSelectable>` (EUI spreads it onto the `.euiSelectable` root, which the component-type guard verifies). When the selectable renders inside a popover, pass the popover as the `scope` and open or close it from your test. The popover is not this component's concern.

## API

| Member | Description |
|---|---|
| `options` | `Locator` for the rendered options, keeping Playwright auto-retry for count and content assertions. The list is virtualized, so `search()` first rather than scanning a long list. |
| `selectOption(label)` | Selects the option with the given label. A no-op if it is already checked. |
| `search(term)` | Types into the search box. Throws if the selectable is not searchable. |

`selectOption(label)` matches the label element and suits lists in their default state. It tolerates the screen-reader state text EUI appends (a checked option reads `<label> . Checked option.`) and `append` badges, and it will not match a different option whose label merely starts with the same text. Once you call `search()`, EUI injects highlight markers into the option's label, so a label match no longer resolves. On a searched list, select via the option's own `data-test-subj` or drive it through `options` directly.
