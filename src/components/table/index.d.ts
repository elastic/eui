/// <reference path="./table_pagination/index.d.ts" />
import { CommonProps } from '../common';
import { HorizontalAlignment } from '../../services/alignment';
import { EuiTableRowCellCheckbox as TableRowCellCheckbox } from './table_row_cell_checkbox';
import {
  EuiTableHeaderCellCheckboxScope as TableHeaderCellCheckboxScope,
  EuiTableHeaderCellCheckboxProps as TableHeaderCellCheckboxProps,
  EuiTableHeaderCellCheckbox as TableHeaderCellCheckbox,
} from './table_header_cell_checkbox';

import { FunctionComponent, TdHTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * table header cell checkbox type defs
   *
   * @see './table_header_cell_checkbox.js'
   */

  export type EuiTableHeaderCellCheckboxScope = TableHeaderCellCheckboxScope;
  export interface EuiTableHeaderCellCheckboxProps
    extends TableHeaderCellCheckboxProps {}
  export const EuiTableHeaderCellCheckbox: typeof TableHeaderCellCheckbox;

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

  export interface EuiTableRowCellMobileOptionsShape {
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
    mobileOptions?: EuiTableRowCellMobileOptionsShape &
      EuiTableRowCellSharedPropsShape;
  }

  export const EuiTableRowCell: FunctionComponent<
    CommonProps &
      TdHTMLAttributes<HTMLTableCellElement> &
      EuiTableRowCellSharedPropsShape &
      EuiTableRowCellProps
  >;

  /**
   * table row cell checkbox type defs
   *
   * @see './table_row_cell_checkbox.js'
   */
  export const EuiTableRowCellCheckbox: typeof TableRowCellCheckbox;
}
