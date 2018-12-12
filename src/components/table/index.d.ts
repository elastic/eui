/// <reference path="./table_pagination/index.d.ts" />
import { CommonProps, NoArgCallback } from '../common';
import { IconType } from '../icon';
import { HorizontalAlignment } from '../../services/alignment';

import {
  SFC,
  HTMLAttributes,
  TableHTMLAttributes,
  ButtonHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes
} from 'react';

declare module '@elastic/eui' {
  /**
   * table type defs
   *
   * @see './table.js'
   */

  export interface EuiTableProps {
    compressed?: boolean;
    responsive?: boolean;
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
    CommonProps & EuiTableRowProps & HTMLAttributes<HTMLTableRowElement>
  >;

  /**
   * table row cell type defs
   *
   * @see './table_row_cell.js'
   */

  export interface EuiTableRowCellProps {
    align?: HorizontalAlignment;
    hasActions?: boolean;
    header?: string;
    hideForMobile?: boolean;
    isExpander?: boolean;
    isMobileFullWidth?: boolean;
    isMobileHeader?: boolean;
    showOnHover?: boolean;
    textOnly?: boolean;
    truncateText?: boolean;
  }

  export const EuiTableRowCell: SFC<
    CommonProps & TdHTMLAttributes<HTMLTableCellElement> & EuiTableRowCellProps
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
