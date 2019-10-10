import { EuiDataGridSchema } from './data_grid_schema';

export interface EuiDataGridColumn {
  id: string;
  // allow devs to pass arbitrary dataType strings, but internally keep the code matching against the known types
  dataType?: EuiDataGridSchema['*']['columnType'];
}

export interface EuiDataGridColumnVisibility {
  visibleColumns: string[];
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
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[];
  onChangeItemsPerPage: (itemsPerPage: number) => void;
  onChangePage: (pageIndex: number) => void;
}

export interface EuiDataGridSorting {
  onSort: (columns: EuiDataGridSorting['columns']) => void;
  columns: Array<{ id: string; direction: 'asc' | 'desc' }>;
}

export interface EuiDataGridInMemory {
  /**
    Given the data flow Filtering->Sorting->Pagination:
    Each step can be performed by service calls or in-memory by the grid.
    However, we cannot allow any service calls after an in-memory operation.
    E.g. if Pagination requires a service call the grid cannot perform
    in-memory Filtering or Sorting. This means a single value representing the
    service / in-memory boundary can be used. Thus there are four states for in-memory's level:
    * "enhancements" - no in-memory operations, but use the available data to enhance the grid
    * "pagination" - only pagination is performed in-memory
    * "sorting" - sorting & pagination is performed in-memory
    * "filtering" - all operations are performed in-memory, no service calls
 */
  level: 'enhancements' | 'pagination' | 'sorting' | 'filtering';
  /**
   * Array of column ids for in-memory processing to skip
   */
  skipColumns?: string[];
}

export interface EuiDataGridInMemoryValues {
  [key: string]: { [key: string]: string };
}
