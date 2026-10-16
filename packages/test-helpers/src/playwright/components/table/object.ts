/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiTableSelectors } from '../../../components/table/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/tabular-content/tables/ EuiTable},
 * the low level table built from `EuiTableHeader`, `EuiTableRow` and
 * `EuiTableRowCell`. `EuiBasicTableObject` extends this for the
 * `EuiBasicTable` and `EuiInMemoryTable` wrappers.
 *
 * `testSubj` must be set on `EuiTable` itself, EUI spreads it onto the
 * `<table>`. Columns are addressed by position since a plain table has no
 * field names.
 */
export class EuiTableObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiTableSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /**
   * The body rows. Excludes EUI's own "no items found" row, whose single cell
   * spans every column with `colspan`. Real data rows never set it.
   */
  public get rows(): Locator {
    return this.root
      .locator(EuiTableSelectors.ROW_SELECTOR)
      .filter({ hasNot: this.root.page().locator('td[colspan]') });
  }

  /** The header cells, in column order. */
  public get headerCells(): Locator {
    return this.root.locator(EuiTableSelectors.HEADER_CELL_SELECTOR);
  }

  /**
   * The cells of one column across all body rows, by 0-based position.
   * Matches both `<td>` and `<th>`, EUI renders a row header cell as
   * `<th scope="row">`.
   */
  public column(index: number): Locator {
    return this.rows.locator(`:is(td, th):nth-child(${index + 1})`);
  }

  /** One body cell by 0-based row and column position. */
  public cell(row: number, column: number): Locator {
    return this.rows.nth(row).locator(`:is(td, th):nth-child(${column + 1})`);
  }
}
