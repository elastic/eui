export interface EuiDataGridStyle {
  fontSize?: EuiDataGridStyleFontSizes;
  border?: EuiDataGridStyleBorders;
  stripes?: boolean;
  header?: EuiDataGridStyleHeader;
  rowHighlight?: EuiDataGridStyleRowHighlight;
  cellPadding?: EuiDataGridStyleCellPaddings;
}

export type EuiDataGridStyleFontSizes = 's' | 'm' | 'l';

export type EuiDataGridStyleBorders = 'all' | 'horizontalOnly' | 'none';

export type EuiDataGridStyleHeader = 'pronounced' | 'minimal' | 'none';

export type EuiDataGridStyleRowHighlight = 'pronounced' | 'minimal' | 'none';

export type EuiDataGridStyleCellPaddings = 's' | 'm' | 'l';
