import { ReactElement, ReactNode } from 'react';
import { Direction, HorizontalAlignment } from '../../services';
import { Pagination } from './pagination_bar';
import { Action } from './action_types';
import { Primitive } from '../../services/sort/comparators';

export type ItemId<T> = string | ((item: T) => string);
export type EuiTableDataType =
  | 'auto'
  | 'string'
  | 'number'
  | 'boolean'
  | 'date';

export interface EuiTableFooterProps<T> {
  items: T[];
  pagination?: Pagination;
}
export interface EuiTableFieldDataColumnType<T> {
  field: keyof T | string; // supports outer.inner key paths
  name: ReactNode;
  description?: string;
  dataType?: EuiTableDataType;
  width?: string;
  sortable?: boolean | ((item: T) => Primitive);
  isExpander?: boolean;
  textOnly?: boolean;
  align?: HorizontalAlignment;
  truncateText?: boolean;
  isMobileHeader?: boolean;
  mobileOptions?: {
    show?: boolean;
    only?: boolean;
    render?: (item: T) => ReactNode;
    header?: boolean;
  };
  hideForMobile?: boolean;
  render?: (value: any, record: T) => ReactNode;
  footer?:
    | string
    | ReactElement
    | ((props: EuiTableFooterProps<T>) => ReactNode);
}

export interface EuiTableComputedColumnType<T> {
  render: (record: T) => ReactNode;
  name?: ReactNode;
  description?: string;
  sortable?: (item: T) => Primitive;
  width?: string;
  truncateText?: boolean;
  isExpander?: boolean;
  align?: HorizontalAlignment;
}

export interface EuiTableActionsColumnType<T> {
  actions: Array<Action<T>>;
  name?: ReactNode;
  description?: string;
  width?: string;
}

export interface EuiTableSortingType<T> {
  sort?: {
    field: keyof T;
    direction: Direction;
  };
  allowNeutralSort?: boolean;
}

export interface EuiTableSelectionType<T> {
  onSelectionChange?: (selection: T[]) => void;
  selectable?: (item: T) => boolean;
  selectableMessage?: (selectable: boolean, item: T) => string;
}
