/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/data-grid|EuiDataGrid}.
 * `*_SELECTOR` values are CSS; `*_TEST_SUBJ` values are `data-test-subj` names.
 */
export const EuiDataGridSelectors = {
  /** Root element (the `.euiDataGrid` div carrying the consumer's `data-test-subj`). */
  ROOT_SELECTOR: '.euiDataGrid',

  /** Root element only while fullscreen mode is active (state class set synchronously). */
  FULL_SCREEN_ROOT_SELECTOR: '.euiDataGrid--fullScreen',

  /** A rendered data row. Rows are virtualized — only a window is mounted. */
  ROW_SELECTOR: '.euiDataGridRow',

  /**
   * A rendered data cell. Cells carry `data-gridcell-column-id` (stable column
   * id, unaffected by column order) and `data-gridcell-row-index`. Header cells
   * carry `data-gridcell-column-id` too, so cell queries must include this
   * class to exclude them.
   */
  ROW_CELL_SELECTOR: '.euiDataGridRowCell',

  /** A column header cell (also carries `data-gridcell-column-id`). */
  HEADER_CELL_SELECTOR: '.euiDataGridHeaderCell',

  /** The header cell's actions button, interactable on focus/hover. */
  HEADER_ACTIONS_BUTTON_SELECTOR: '.euiDataGridHeaderCell__button',

  /** Label of an item inside the header actions menu (matched by `title`). */
  ACTION_LABEL_SELECTOR: '.euiListGroupItem__label',

  FULL_SCREEN_BUTTON_TEST_SUBJ: 'dataGridFullScreenButton',

  /**
   * A column's header actions menu. It renders in a portal, but EUI names it
   * per column id, which keeps lookups safe when several grids coexist.
   */
  headerActionsMenuFor: (columnId: string): string =>
    `[data-test-subj="dataGridHeaderCellActionGroup-${columnId}"]`,

  /** A rendered data cell addressed by column id and row index. */
  cellFor: (columnId: string, rowIndex: number): string =>
    `.euiDataGridRowCell[data-gridcell-column-id="${columnId}"][data-gridcell-row-index="${rowIndex}"]`,

  /** All rendered data cells of a column. */
  columnCellsFor: (columnId: string): string =>
    `.euiDataGridRowCell[data-gridcell-column-id="${columnId}"]`,

  /** A column's header cell. */
  headerCellFor: (columnId: string): string =>
    `.euiDataGridHeaderCell[data-gridcell-column-id="${columnId}"]`,
};
