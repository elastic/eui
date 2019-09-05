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
