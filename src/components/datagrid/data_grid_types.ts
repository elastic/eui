export interface EuiDataGridColumn {
  id: string;
}

export interface EuiDataGridColumnWidths {
  [key: string]: number;
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

/*
Given the data flow Filtering->Sorting->Pagination:
Each step can be performed by service calls or in-memory by the grid.
However, we cannot allow any service calls after an in-memory operation.
E.g. if Pagination requires a service call the grid cannot perform
in-memory Filtering or Sorting. This means a single value representing the
service / in-memory boundary can be used. Thus there are four states for in-memory:
* false - all service calls
* "pagination" - only pagination is performed in-memory
* "sorting" - sorting & pagination is performed in-memory
* "filtering" - all operations are performed in-memory, no service calls
 */
export type EuiDataGridInMemory =
  | false
  | 'pagination'
  | 'sorting'
  | 'filtering';

export interface EuiDataGridInMemoryValues {
  [key: string]: { [key: string]: string };
}
