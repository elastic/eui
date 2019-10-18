import { FunctionComponent, ReactNode } from 'react';

export interface EuiDataGridColumn {
  /**
   * unique identifier for this column
   */
  id: string;
  /**
   * ReactNode used when rendering the column header
   */
  display?: ReactNode;
  /**
   * schema data type for this column, built-in values are ['boolean', 'currency', 'datetime', 'numeric', 'json'] but can be expanded by #EuiDataGrid `schemaDetectors` (for in-memory detection), or pass whatever string you want
   */
  dataType?: string;
  /**
   * whether or not the column's cells can be expanded, defaults to expandable
   */
  isExpandable?: boolean;
}

export interface EuiDataGridColumnVisibility {
  /**
   * array of #DataGridColumn `id` dictating which columns are visible and their order
   */
  visibleColumns: string[];
  /**
   * callback when a column's visibility or order is modified by the user
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
export type EuiDataGridStyleRowHover = 'highlight' | 'none';
export type EuiDataGridStyleCellPaddings = 's' | 'm' | 'l';

export interface EuiDataGridStyle {
  fontSize?: EuiDataGridStyleFontSizes;
  border?: EuiDataGridStyleBorders;
  stripes?: boolean;
  header?: EuiDataGridStyleHeader;
  rowHover?: EuiDataGridStyleRowHover;
  cellPadding?: EuiDataGridStyleCellPaddings;
}

// ideally this would use a generic to enforce `pageSize` exists in `pageSizeOptions`,
// but TypeScript's default understanding of an array is number[] unless `as const` is used
// which defeats the generic's purpose & functionality as it would check for `number` in `number[]`
export interface EuiDataGridPaginationProps {
  /**
   * index of the current page, starts at 0 for the first page
   */
  pageIndex: number;
  /**
   * how many rows to show per page
   */
  pageSize: number;
  /**
   * array of page sizes users can select from
   */
  pageSizeOptions: number[];
  /**
   * callback when a user changes the page size selection
   */
  onChangeItemsPerPage: (itemsPerPage: number) => void;
  /**
   * callback when the current page index changes
   */
  onChangePage: (pageIndex: number) => void;
}

export interface EuiDataGridSorting {
  /**
   * receives updated column sort details in response to user interactions
   */
  onSort: (columns: EuiDataGridSorting['columns']) => void;
  /**
   * column ids being sorted by and their sort direction; array order determines sort order
   */
  columns: Array<{ id: string; direction: 'asc' | 'desc' }>;
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
   * array of column ids for in-memory processing to skip
   */
  skipColumns?: string[];
}

export interface EuiDataGridInMemoryValues {
  [key: string]: { [key: string]: string };
}

export type EuiDataGridExpansionFormatter = FunctionComponent<{}>;
export interface EuiDataGridExpansionFormatters {
  [key: string]: EuiDataGridExpansionFormatter;
}
