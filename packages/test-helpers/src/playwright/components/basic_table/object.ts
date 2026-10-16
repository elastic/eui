/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import type { ObjectScope } from '../../base_object';
import { EuiTableObject } from '../table/object';
import { EuiBasicTableSelectors } from '../../../components/basic_table/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/tabular-content/tables/ EuiBasicTable}
 * (also covers `EuiInMemoryTable`, which renders a `EuiBasicTable` underneath and
 * passes the `data-test-subj` straight through — there is no separate object for it).
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `<EuiBasicTable>`/`<EuiInMemoryTable>` (EUI spreads it onto the `.euiBasicTable`
 * root). Extends `EuiTableObject`, so `rows`, `headerCells`, `column` and `cell`
 * are available too. See the package README for what's deliberately excluded.
 */
export class EuiBasicTableObject extends EuiTableObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiBasicTableSelectors.ROOT_SELECTOR);
  }

  /**
   * The cells of the given field-data column, one per row, as a `Locator` for
   * retrying content/count assertions (e.g.
   * `expect(await table.cells('status')).toHaveText(['Running'])`).
   *
   * Resolves the column's position from EUI's own header cell
   * (`tableHeaderCell_<field>_<index>`, matched exactly so a column named e.g.
   * `status` doesn't also match a `status_detail` header) via its native
   * `cellIndex`, then reads the cell at that position in every row — the same
   * positional alignment EUI itself relies on, so it holds regardless of a
   * leading selection-checkbox column. Matches both `<td>` and `<th>`: EUI
   * renders the `rowHeader` column's body cell as a `<th scope="row">` for
   * accessibility, not a `<td>`. Throws if no column with that `field` is
   * rendered.
   *
   * EUI generates a computed column's header test-subj from its `name` using
   * this exact same `tableHeaderCell_<name>_<index>` shape (there's no `field`
   * to key on), so a computed column whose `name` happens to equal another
   * column's `field` can resolve ambiguously — this method can't distinguish
   * the two from the DOM alone. Not expected in practice; call it out if you
   * hit it.
   */
  async cells(field: string): Promise<Locator> {
    const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const cellIndex = await this.root.evaluate(
      (tableEl, { prefix, pattern, field: originalField }) => {
        const regex = new RegExp(`^${prefix}${pattern}_\\d+$`);
        const headers = Array.from(tableEl.querySelectorAll('thead th, thead td'));
        const header = headers.find((el) =>
          regex.test(el.getAttribute('data-test-subj') ?? '')
        ) as HTMLTableCellElement | undefined;
        if (!header) {
          throw new Error(
            `EuiBasicTableObject.cells: no column with field "${originalField}" found in this table's header.`
          );
        }
        return header.cellIndex;
      },
      { prefix: EuiBasicTableSelectors.HEADER_CELL_SELECTOR_PREFIX, pattern: escaped, field }
    );
    return this.rows.locator(`:is(td, th):nth-child(${cellIndex + 1})`);
  }
}
