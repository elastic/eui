/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ComponentType, JSXElementConstructor, ReactNode } from 'react';
import { EuiDataGridCellProps } from './data_grid_cell';
import { EuiListGroupItemProps } from '../list_group';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { ExclusiveUnion } from '../common';

export interface EuiDataGridControlColumn {
  /**
   * Used as the React `key` when rendering content
   */
  id: string;
  /**
   * Component to render in the column header
   */
  headerCellRender: ComponentType;
  /**
   * Component to render for each row in the column
   */
  rowCellRender: EuiDataGridCellProps['renderCellValue'];
  /**
   * Width of the column, uses are unable to change this
   */
  width: number;
}

export interface EuiDataGridColumn {
  /**
   * The unique identifier for this column
   */
  id: string;
  /**
   * A `ReactNode` used when rendering the column header. When providing complicated content, please make sure to utilize CSS to respect truncation as space allows. Check the docs example.
   */
  display?: ReactNode;
  /**
   * A Schema to use for the column. Built-in values are ['boolean', 'currency', 'datetime', 'numeric', 'json'] but can be expanded by defining your own #EuiDataGrid `schemaDetectors` (for in-memory detection). In general, it is advised to pass in a value here when you are sure of the schema ahead of time, so that you don't need to rely on the automatic detection.
   */
  schema?: string;
  /**
   * Defaults to true, always true if cellActions are defined. Defines whether or not the column's cells can be expanded with a popup onClick / keydown.
   */
  isExpandable?: boolean;
  /**
   * Whether this column's width can be changed by the user, defaults to true
   */
  isResizable?: boolean;
  /**
   * Initial width (in pixels) of the column
   */
  initialWidth?: number;
  /**
   * Whether this column is sortable
   */
  isSortable?: boolean;
  /**
   * Default sort direction of the column
   */
  defaultSortDirection?: 'asc' | 'desc';
  /**
   * Display name as text for column. This can be used to display column name in column selector and column sorting where `display` won't be used. If not used `id` will be shown as column name in column selector and column sorting.
   */
  displayAsText?: string;
  /**
   * Configuration of column actions. Set to false to disable or use #EuiDataGridColumnActions to configure the actions displayed in the header cell of the column.
   */
  actions?: false | EuiDataGridColumnActions;
  /**
   * Additional actions displayed as icon on hover / focus, and in the expanded view of the cell containing the value
   */
  cellActions?: EuiDataGridColumnCellAction[];
}

export type EuiDataGridColumnCellAction =
  | JSXElementConstructor<EuiDataGridColumnCellActionProps>
  | ((props: EuiDataGridColumnCellActionProps) => ReactNode);

export interface EuiDataGridColumnActions {
  /**
   * Show/hide/configure the action to hide a column, provided EuiListGroupItemProps are merged
   */
  showHide?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action that switches the actual column with the column to the left side, provided EuiListGroupItemProps are merged
   */
  showMoveLeft?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action that switches the actual column with the column to the right side, provided EuiListGroupItemProps are merged
   */
  showMoveRight?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action to sort ascending by the actual column, provided EuiListGroupItemProps are merged
   */
  showSortAsc?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action to sort descending by the actual column, provided EuiListGroupItemProps are merged
   */
  showSortDesc?: boolean | EuiListGroupItemProps;
  /**
   * Append additional actions
   */
  additional?: EuiListGroupItemProps[];
}

export interface EuiDataGridColumnCellActionProps {
  /**
   * The index of the row that contains cell's data
   */
  rowIndex: number;
  /**
   * The id of the column that contains the cell's data
   */
  columnId: string;
  /**
   * React component representing the action displayed in the cell
   */
  // Component: ComponentType<EuiButtonEmptyProps | EuiButtonProps>;
  Component: typeof EuiButtonEmpty | typeof EuiButtonIcon;
  /**
   * Determines whether the cell's action is displayed expanded (in the Popover)
   */
  isExpanded: boolean;
  /**
   * Closes the popover if a cell is expanded.
   * The prop is provided for an expanded cell only.
   */
  closePopover: () => void;
}

export interface EuiDataGridColumnVisibility {
  /**
   * An array of #EuiDataGridColumn `id`s dictating the order and visibility of columns.
   */
  visibleColumns: string[];
  /**
   * A callback for when a column's visibility or order is modified by the user.
   */
  setVisibleColumns: (visibleColumns: string[]) => void;
}

export interface EuiDataGridColumnWidths {
  [key: string]: number;
}
// Types for styling options, passed down through the `gridStyle` prop
export type EuiDataGridStyleFontSizes = 's' | 'm' | 'l';
export type EuiDataGridStyleBorders = 'all' | 'horizontal' | 'none';
export type EuiDataGridStyleHeader = 'shade' | 'underline';
export type EuiDataGridStyleFooter = 'shade' | 'overline' | 'striped';
export type EuiDataGridStyleRowHover = 'highlight' | 'none';
export type EuiDataGridStyleCellPaddings = 's' | 'm' | 'l';

export interface EuiDataGridStyle {
  /**
   * Size of fonts used within the row and column cells
   */
  fontSize?: EuiDataGridStyleFontSizes;
  /**
   * Border uses for the row and column cells
   */
  border?: EuiDataGridStyleBorders;
  /**
   * If set to true, rows will alternate zebra striping for clarity
   */
  stripes?: boolean;
  /**
   * Visual style for the column headers. Recommendation is to use the `underline` style in times when #EuiDataGrid `toolbarVisibility` is set to `false`.
   */
  header?: EuiDataGridStyleHeader;
  /**
   * Visual style for the column footers.
   */
  footer?: EuiDataGridStyleFooter;
  /**
   * Will define what visual style to show on row hover
   */
  rowHover?: EuiDataGridStyleRowHover;
  /**
   * Defines the padding with the row and column cells
   */
  cellPadding?: EuiDataGridStyleCellPaddings;
  /**
   * If set to true, the footer row will be sticky
   */
  stickyFooter?: boolean;
}

export interface EuiDataGridToolBarVisibilityColumnSelectorOptions {
  /**
   * When `false`, removes the ability to show & hide columns through the UI
   */
  allowHide?: boolean;
  /**
   * When `false`, removes the ability to re-order columns through the UI
   */
  allowReorder?: boolean;
}

export interface EuiDataGridToolBarVisibilityOptions {
  /**
   * Allows the ability for the user to hide fields and sort columns, boolean or a #EuiDataGridToolBarVisibilityColumnSelectorOptions
   */
  showColumnSelector?:
    | boolean
    | EuiDataGridToolBarVisibilityColumnSelectorOptions;
  /**
   * Allows the ability for the user to set the grid density. If on, this merges against what is provided in #EuiDataGridStyle
   */
  showStyleSelector?: boolean;
  /**
   * Allows the ability for the user to sort rows based upon column values
   */
  showSortSelector?: boolean;
  /**
   * Allows user to be able to full screen the data grid. If set to `false` make sure your grid fits within a large enough panel to still show the other controls.
   */
  showFullScreenSelector?: boolean;
  /**
   * Will place any passed node into the toolbar in front of the fullscreen button. Recommend using EuiButtonEmpty with the props shown in the examples.
   */
  additionalControls?: ReactNode;
}

// ideally this would use a generic to enforce `pageSize` exists in `pageSizeOptions`,
// but TypeScript's default understanding of an array is number[] unless `as const` is used
// which defeats the generic's purpose & functionality as it would check for `number` in `number[]`
export interface EuiDataGridPaginationProps {
  /**
   * The index of the current page, starts at 0 for the first page
   */
  pageIndex: number;
  /**
   * How many rows should initially be shown per page
   */
  pageSize: number;
  /**
   * An array of page sizes the user can select from.
   * Leave this prop undefined or use an empty array to hide "Rows per page" select button
   */
  pageSizeOptions?: number[];
  /**
   * A callback for when the user changes the page size selection
   */
  onChangeItemsPerPage: (itemsPerPage: number) => void;
  /**
   * A callback for when the current page index changes
   */
  onChangePage: (pageIndex: number) => void;
}

export interface EuiDataGridSorting {
  /**
   * A function that receives updated column sort details in response to user interactions in the toolbar controls
   */
  onSort: (columns: EuiDataGridSorting['columns']) => void;
  /**
   * An array of the column ids currently being sorted and their sort direction. The array order determines the sort order. `{ id: 'A'; direction: 'asc' }`
   */
  columns: Array<{
    id: string;
    direction: 'asc' | 'desc';
  }>;
}

export interface EuiDataGridInMemory {
  /**
    Given the data flow Sorting->Pagination:
    Each step can be performed by service calls or in-memory by the grid.
    However, we cannot allow any service calls after an in-memory operation.
    E.g. if Pagination requires a service call the grid cannot perform
    in-memory Sorting. This means a single value representing the
    service / in-memory boundary can be used. Thus there are four states for in-memory's level:
    * "enhancements" - no in-memory operations, but use the available data to enhance the grid
    * "pagination" - only pagination is performed in-memory
    * "sorting" - sorting & pagination is performed in-memory
 */
  level: 'enhancements' | 'pagination' | 'sorting';
  /**
   * An array of column ids for the in-memory processing to skip
   */
  skipColumns?: string[];
}

export type EuiDataGridFocusedCell = [number, number];

export interface EuiDataGridInMemoryValues {
  [key: string]: { [key: string]: string };
}

export interface EuiDataGridPopoverContentProps {
  /**
   * your `cellValueRenderer` as a ReactElement; allows wrapping the rendered content: `({children}) => <div>{children}</div>`
   */
  children: ReactNode;
  /**
   * div element the cell contents have been rendered into; useful for processing the rendered text
   */
  cellContentsElement: HTMLDivElement;
}
export type EuiDataGridPopoverContent = ComponentType<
  EuiDataGridPopoverContentProps
>;
export interface EuiDataGridPopoverContents {
  [key: string]: EuiDataGridPopoverContent;
}

export interface EuiDataGridOnColumnResizeData {
  columnId: string;
  width: number;
}

export type EuiDataGridOnColumnResizeHandler = (
  data: EuiDataGridOnColumnResizeData
) => void;

export type EuiDataGridRowHeightOption =
  | number
  | ExclusiveUnion<{ lineCount: number }, { height: number }>;

export interface EuiDataGridRowHeightsOptions {
  /**
   * Defines the default size for all rows. It can be line count or just height.
   */
  defaultHeight?: EuiDataGridRowHeightOption;
  /**
   * Defines the height for a specific row. It can be line count or just height.
   */
  rowHeights?: Record<number, EuiDataGridRowHeightOption>;
}
