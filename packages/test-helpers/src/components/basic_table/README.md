# EuiBasicTableObject

Playwright Component Object for [EuiBasicTable](https://eui.elastic.co/docs/components/tabular-content/tables/). Also covers `EuiInMemoryTable`, which renders a `EuiBasicTable` underneath and passes the `data-test-subj` straight through — there is no separate object for it.

## Usage

```ts
import { EuiBasicTableObject } from '@elastic/eui-test-helpers';

const table = new EuiBasicTableObject(page, 'myTable');
expect(await table.rows).toHaveCount(3);
expect(await table.cells('status')).toHaveText(['Running', 'Finished', 'Archived']);
```

Set `data-test-subj` on the `<EuiBasicTable>`/`<EuiInMemoryTable>` (EUI spreads it onto the `.euiBasicTable` root, which the component-type guard verifies).

## API

| Member | Description |
|---|---|
| `rows` | `Locator` for the table's data rows, excluding EUI's own "no items found"/error-message row. |
| `cells(field)` | `Locator` for a field-data column's cells across all rows, resolved from EUI's own header `data-test-subj`. |

`rows` excludes EUI's empty/error message row by filtering out any row whose cell carries a `colspan` — real data rows don't set one, EUI's own placeholder row always does (it spans every column).

`cells(field)` resolves the column's position from the header cell EUI renders as `tableHeaderCell_<field>_<index>` (matched exactly, so a column named `status` won't also match a `status_detail` header), then reads the cell at that position in every row. This holds regardless of a leading selection-checkbox column, since the checkbox column is a real cell in both the header and body rows, and it matches both `<td>` and `<th>` since EUI renders a `rowHeader` column's body cell as `<th scope="row">`. Throws if no column with that `field` is rendered.

## Deliberately excluded

Row actions (consumer-supplied popovers/buttons), sorting, and pagination are not covered. They are either app-specific wiring rather than EUI-internal DOM knowledge, or had no evidenced consumer need at the time this was written. Open an issue with a concrete use case if you need one of them.
