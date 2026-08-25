# EuiFilterButtonObject

Playwright Component Object for [EuiFilterButton](https://eui.elastic.co/docs/components/forms/filter-group/).

## Usage

```ts
import { EuiFilterButtonObject } from '@elastic/eui-test-helpers';

const filterButton = new EuiFilterButtonObject(page, 'myFilterButton');
await expect(filterButton.locator).toHaveClass(/euiFilterButton-hasActiveFilters/);
await expect(filterButton.notificationBadge).toHaveText('2');
```

Set `data-test-subj` on the `<EuiFilterButton>` (EUI spreads it onto the button itself, which the component-type guard verifies).

## API

| Member | Description |
|---|---|
| `locator` | Inherited root `Locator`. Assert the button's active/selected state directly on it, e.g. `toHaveClass(/euiFilterButton-hasActiveFilters/)` or `toHaveClass(/euiFilterButton-isSelected/)`. Both are synchronous CSS classes EUI sets, not async state. |
| `notificationBadge` | `Locator` for the filter-count badge. Only present when the consumer passes `numFilters` or `numActiveFilters`. |

## Deliberately out of scope

This component does not own opening or closing a popover the button triggers, or reading/selecting options inside it:

- **Popover mechanics**: `EuiPopover` already sets `aria-expanded`/`aria-controls` on its toggle button synchronously itself. Drive open/close from your test directly against those, or the popover's own `isOpen` prop in your app.
- **Option selection**: when the popover content is an `EuiSelectable`, scope [`EuiSelectableObject`](../selectable/README.md) to it instead of reimplementing option matching here.
