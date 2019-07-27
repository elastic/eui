export interface EuiDataGridStyle {
  size?: EuiDataGridStyleSizes;
  border?: EuiDataGridStyleBorders;
  stripes?: boolean;
  header?: EuiDataGridStyleHeader;
  rowHighlight?: EuiDataGridStyleRowHighlight;
}

export type EuiDataGridStyleSizes = 's' | 'm' | 'l';

export type EuiDataGridStyleBorders = 'all' | 'horizontalOnly' | 'none';

export type EuiDataGridStyleHeader = 'pronounced' | 'minimal' | 'none';

export type EuiDataGridStyleRowHighlight = 'pronounced' | 'minimal' | 'none';
