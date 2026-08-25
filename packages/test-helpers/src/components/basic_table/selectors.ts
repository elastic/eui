/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/tabular-content/tables/|EuiBasicTable}
 * (also covers `EuiInMemoryTable`, which renders a `EuiBasicTable` underneath).
 * `*_SELECTOR` values are CSS.
 */
export const EuiBasicTableSelectors = {
  /** Root element (the `.euiBasicTable` container carrying the consumer's `data-test-subj`). */
  ROOT_SELECTOR: '.euiBasicTable',

  /** A data row. Also matches EUI's own empty/error message row — callers must exclude those. */
  ROW_SELECTOR: '.euiTableRow',

  /**
   * A field-data column's header cell. `%s` is the column's `field`. EUI appends a
   * positional index (`tableHeaderCell_<field>_<index>`), so this is a prefix match.
   */
  HEADER_CELL_SELECTOR_PREFIX: 'tableHeaderCell_',
};
