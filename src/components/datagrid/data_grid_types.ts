export interface EuiDataGridColumn {
  name: string;
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
