/// <reference path="./table_pagination/index.d.ts" />
/// <reference path="../common.d.ts" />
/// <reference path="../icon/index.d.ts" />
/// <reference path="../../services/alignment.d.ts" />

import {
  SFC,
  HTMLAttributes,
  TableHTMLAttributes,
  ButtonHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes
} from 'react';
import { EuiTableRowCellProps } from '@elastic/eui';

declare module '@elastic/eui' {
  /**
   * table type defs
   *
   * @see './table.js'
   */

  export interface EuiTableProps {
    compressed?: boolean;
  }

  export const EuiTable: SFC<
    CommonProps & TableHTMLAttributes<HTMLTableElement> & EuiTableProps
  >;

  /**
   * table body type defs
   *
   * @see './table_body.js'
   */

  export interface EuiTableBodyProps {}

  export const EuiTableBody: SFC<CommonProps & EuiTableBodyProps>;

  /**
   * table header type defs
   *
   * @see './table_header.js'
   */

  export interface EuiTableHeaderProps {}

  export const EuiTableHeader: SFC<CommonProps & EuiTableHeaderProps>;

  /**
   * table header button type defs
   *
   * @see './table_header_button.js'
   */

  export interface EuiTableHeaderButtonProps {
    iconType?: IconType;
  }

  export const EuiTableHeaderButton: SFC<
    CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> &
      EuiTableHeaderButtonProps
  >;

  /**
   * table header cell type defs
   *
   * @see './table_header_cell.js'
   */

  export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

  export interface EuiTableHeaderCellProps {
    align?: HorizontalAlignment;
    width?: string;
    onSort?: NoArgCallback<void>;
    isSorted?: boolean;
    isSortAscending?: boolean;
    scope?: TableHeaderCellScope;
  }

  export const EuiTableHeaderCell: SFC<
    CommonProps &
      ThHTMLAttributes<HTMLTableHeaderCellElement> &
      EuiTableHeaderCellProps
  >;

  /**
   * table header cell checkbox type defs
   *
   * @see './table_header_cell_checkbox.js'
   */

  export type EuiTableHeaderCellCheckboxScope =
    | 'col'
    | 'row'
    | 'colgroup'
    | 'rowgroup';

  export interface EuiTableHeaderCellCheckboxProps {
    width?: string;
    scope?: EuiTableHeaderCellCheckboxScope;
  }

  export const EuiTableHeaderCellCheckbox: SFC<
    CommonProps &
      TdHTMLAttributes<HTMLTableCellElement> &
      EuiTableHeaderCellCheckboxProps
  >;

  /**
   * table row type defs
   *
   * @see './table_row.js'
   */

  export interface EuiTableRowProps {
    isSelected?: boolean;
  }

  export const EuiTableRow: SFC<
    CommonProps &
      AnyProps & // at least according to the contract of table_row.js
      EuiTableRowProps
  >;

  /**
   * table row cell type defs
   *
   * @see './table_row_cell.js'
   */

  export interface EuiTableRowCellProps {
    truncateText?: boolean;
    align?: HorizontalAlignment;
    textOnly?: boolean;
  }

  export const EuiTableRowCell: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiTableRowCellProps
  >;

  /**
   * table row cell checkbox type defs
   *
   * @see './table_row_cell_checkbox.js'
   */

  export interface EuiTableRowCellCheckboxProps {}

  export const EuiTableRowCellCheckbox: SFC<
    CommonProps &
      TdHTMLAttributes<HTMLTableCellElement> &
      EuiTableRowCellCheckboxProps
  >;
}
