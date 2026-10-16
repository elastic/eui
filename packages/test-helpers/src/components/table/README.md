# EuiTableObject

Playwright Component Object for [EuiTable](https://eui.elastic.co/docs/components/tabular-content/tables/), the low level table built from `EuiTableHeader`, `EuiTableRow` and `EuiTableRowCell`. `EuiBasicTableObject` extends it for `EuiBasicTable` and `EuiInMemoryTable`, use that one when the table has field based columns.

## Usage

```ts
import { EuiTableObject } from '@elastic/eui-test-helpers';

const table = new EuiTableObject(page, 'myTable');
await expect(table.rows).toHaveCount(3);
await expect(table.column(1)).toHaveText(['Running', 'Finished', 'Archived']);
await expect(table.cell(0, 1)).toHaveText('Running');
```

Set `data-test-subj` on `<EuiTable>`. EUI spreads it onto the `<table>`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `rows` | `Locator` for the body rows, excluding EUI's own "no items found" or error-message row. |
| `headerCells` | `Locator` for the header cells, in column order. |
| `column(index)` | `Locator` for one column's cells across all body rows, by 0-based position. |
| `cell(row, column)` | `Locator` for one body cell, by 0-based row and column position. |

Columns are addressed by position because a plain `EuiTable` has no field names. `column` and `cell` match both `<td>` and `<th>` since EUI renders a row header cell as `<th scope="row">`.

## Deliberately excluded

Sorting, selection and pagination are not covered. Sorting and selection are consumer wiring on a plain table, and pagination is a separate component.
