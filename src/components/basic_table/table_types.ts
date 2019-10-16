import { ReactElement, ReactNode } from 'react';
import { Direction, HorizontalAlignment } from '../../services';
import { Pagination } from './pagination_bar';
import { Action } from './action_types';

export type ItemId<T> = string | ((item: T) => string);
export type DataType = 'auto' | 'string' | 'number' | 'boolean' | 'date';

export interface FooterProps<T> {
  items: T[];
  pagination?: Pagination;
}
export interface FieldDataColumnType<T> {
  field: keyof T | string; // supports outer.inner key paths
  name: ReactNode;
  description?: string;
  dataType?: DataType;
  width?: string;
  sortable?: boolean | ((item: T) => number | string);
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
  footer?: string | ReactElement | ((props: FooterProps<T>) => ReactNode);
}

export interface ComputedColumnType<T> {
  render: (record: T) => ReactNode;
  name?: ReactNode;
  description?: string;
  sortable?: (item: T) => number | string;
  width?: string;
  truncateText?: boolean;
}

export interface ActionsColumnType<T> {
  actions: Array<Action<T>>;
  name?: ReactNode;
  description?: string;
  width?: string;
}

export interface SortingType<T> {
  sort?: {
    field: keyof T;
    direction: Direction;
  };
  allowNeutralSort?: boolean;
}

export interface SelectionType<T> {
  onSelectionChange?: (selection: T[]) => void;
  selectable?: (item: T) => boolean;
  selectableMessage?: (selectable: boolean, item: T) => string;
}
