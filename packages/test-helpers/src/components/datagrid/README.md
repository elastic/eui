# EuiDataGridObject

Playwright Component Object for [EuiDataGrid](https://eui.elastic.co/docs/components/tables/data-grid/).

## Usage

```ts
import { EuiDataGridObject } from '@elastic/eui-test-helpers';

const dataGrid = new EuiDataGridObject(page, 'myDataGrid');
await expect(dataGrid.rows).toHaveCount(10);
await expect(dataGrid.cells('name').filter({ hasText: 'my-rule' })).toBeVisible();
```

Set `data-test-subj` on the `<EuiDataGrid>` itself — EUI spreads it onto the `.euiDataGrid` element, and the Component Object verifies that (the component-type guard throws otherwise). EUI also toggles state classes such as fullscreen on that element, so a wrapper subj would not work. When the subj is not unique on the page (e.g. portal-rendered duplicates), narrow with the `scope` constructor parameter instead of pointing the subj at a wrapper.

## API

| Member | Description |
|---|---|
| `rows` | `Locator` for the rendered rows, keeping Playwright auto-retry for count/content assertions. For a paginated grid this is the current page. Rows are virtualized: on a grid too tall for its container this is only the visible window, never the full data set. |
| `cell(rowIndex, columnId)` | `Locator` for a single data cell. The column id is stable against column reordering and horizontal virtualization. |
| `cells(columnId)` | `Locator` for every rendered data cell of a column (excludes the header cell). |
| `doActionOnColumn(columnId, actionLabel)` | Opens the column's header actions and clicks the action with the given visible label (e.g. `'Hide column'`). Handles the hover/focus dance the actions button requires and the portal-rendered menu (scoped per column id, safe with multiple grids). |
| `openFullScreenMode()` / `closeFullScreenMode()` | Toggles fullscreen via the toolbar button and settles on the synchronously-set state class. Blurs the button afterwards so its tooltip does not cover the grid. |
