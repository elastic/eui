/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/tabular-content/tables/|EuiTable}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiTableSelectors = {
  /** The `<table>` element carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiTable',

  /** A body row. Also matches EUI's own empty/error message row, callers must exclude those. */
  ROW_SELECTOR: '.euiTableRow',

  /** A body cell. */
  ROW_CELL_SELECTOR: '.euiTableRowCell',

  /** A header cell, including the selection checkbox cell which has its own class. */
  HEADER_CELL_SELECTOR: 'thead > tr > :is(th, td)',
};
