/// <reference path="./table_pagination/index.d.ts" />

declare module '@elastic/eui' {

  import { ReactNode } from 'react';

  interface EuiTableProps {
    compressed?: boolean,
    className?: string,
    children?: ReactNode
  }
  export class EuiTable extends React.Component<EuiTableProps, any> {
  }

  export interface EuiTableBodyProps {
    children?: ReactNode,
    className?: string
  }
  export class EuiTableBody extends React.Component<EuiTableProps, any> {
  }

  interface EuiTableHeaderProps {
    children?: ReactNode,
    className?: string
  }
  export class EuiTableHeader extends React.Component<EuiTableHeaderProps, any> {
  }

  interface EuiTableHeaderButtonProps {
    children?: ReactNode,
    className?: string,
    iconType?: IconType
  }
  export class EuiTableHeaderButton extends React.Component<EuiTableHeaderButtonProps, any> {
  }

  interface EuiTableHeaderCellProps {
    children?: ReactNode,
    className?: string,
    align?: HorizontalAlignment,
    width?: string,
    onSort?: () => void,
    isSorted?: boolean,
    isSortAscending?: boolean,
    scope?: 'col'| 'row' | 'colgroup' | 'rowgroup'
  }
  export class EuiTableHeaderCell extends React.Component<EuiTableHeaderCellProps, any> {
  }

  interface EuiTableHeaderCellCheckboxProps {
    children?: ReactNode,
    className?: string,
    width?: string,
    scope?: 'col' | 'row' | 'colgroup' | 'rowgroup'
  }
  export class EuiTableHeaderCellCheckbox extends React.Component<EuiTableHeaderCellCheckboxProps, any> {
  }

  interface EuiTableRowProps {
    children?: ReactNode,
    className?: string,
    isSelected?: boolean,
    [key: string]: any
  }
  export class EuiTableRow extends React.Component<EuiTableRowProps, any> {
  }

  interface EuiTableRowCellProps {
    truncateText?: boolean,
    align?: HorizontalAlignment,
    className?: string,
    textOnly?: boolean,
    [key: string]: any
  }
  export class EuiTableRowCell extends React.Component<EuiTableRowCellProps, any> {
  }

  interface EuiTableRowCellCheckboxProps {
    children?: ReactNode,
    className?: string
  }
  export class EuiTableRowCellCheckbox extends React.Component<EuiTableRowCellCheckboxProps, any> {
  }

}
