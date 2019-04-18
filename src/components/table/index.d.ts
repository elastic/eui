/// <reference path="./table_pagination/index.d.ts" />
/// <reference path="./mobile/index.d.ts" />
import { CommonProps, NoArgCallback } from '../common';
import { IconType } from '../icon';
import { HorizontalAlignment } from '../../services/alignment';

import {
  FunctionComponent,
  HTMLAttributes,
  TableHTMLAttributes,
  ButtonHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  ReactNode
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

  export const EuiTable: FunctionComponent<
    CommonProps & TableHTMLAttributes<HTMLTableElement> & EuiTableProps
  >;

  /**
   * table body type defs
   *
   * @see './table_body.js'
   */

  export interface EuiTableBodyProps {}

  export const EuiTableBody: FunctionComponent<CommonProps & EuiTableBodyProps>;

  /**
   * table header type defs
   *
   * @see './table_header.js'
   */

  export interface EuiTableHeaderProps {}

  export const EuiTableHeader: FunctionComponent<CommonProps & EuiTableHeaderProps>;

  /**
   * table header button type defs
   *
   * @see './table_header_button.js'
   */

  export interface EuiTableHeaderButtonProps {
    iconType?: IconType;
  }

  export const EuiTableHeaderButton: FunctionComponent<
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
    isMobileHeader?: boolean;
    hideForMobile?: boolean;
    mobileOptions?: {
      show?: boolean;
      only?: boolean;
    };
  }

  export const EuiTableHeaderCell: FunctionComponent<
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

  export const EuiTableHeaderCellCheckbox: FunctionComponent<
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

  export const EuiTableRow: FunctionComponent<
    CommonProps & EuiTableRowProps & HTMLAttributes<HTMLTableRowElement>
  >;

  /**
   * table row cell type defs
   *
   * @see './table_row_cell.js'
   */

  interface EuiTableRowCellSharedPropsShape {
    align?: HorizontalAlignment;
    showOnHover?: boolean;
    textOnly?: boolean;
    truncateText?: boolean;
  }

  export type EuiTableRowCellMobileOptionsShape = {
    show?: boolean;
    only?: boolean;
    render?: ReactNode;
    header?: ReactNode | boolean;
    enlarge?: boolean;
    fullWidth?: boolean;
  }

  export interface EuiTableRowCellProps {
    hasActions?: boolean;
    header?: string;
    hideForMobile?: boolean;
    isExpander?: boolean;
    isMobileFullWidth?: boolean;
    isMobileHeader?: boolean;
    mobileOptions?: EuiTableRowCellMobileOptionsShape & EuiTableRowCellSharedPropsShape;
  }

  export const EuiTableRowCell: FunctionComponent<
    CommonProps & TdHTMLAttributes<HTMLTableCellElement> & EuiTableRowCellSharedPropsShape & EuiTableRowCellProps
  >;

  /**
   * table row cell checkbox type defs
   *
   * @see './table_row_cell_checkbox.js'
   */

  export interface EuiTableRowCellCheckboxProps {}

  export const EuiTableRowCellCheckbox: FunctionComponent<
    CommonProps &
      TdHTMLAttributes<HTMLTableCellElement> &
      EuiTableRowCellCheckboxProps
  >;
}
