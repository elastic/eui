import { ReactNode } from 'react';
import { HorizontalAlignment, PropertySort } from '../../services';
import { Pagination } from './pagination_bar';
import { Action } from './action_types';

export type Item = any;
export type ItemId = string | ((item: Item) => string);
export type DataType = 'auto' | 'string' | 'number' | 'boolean' | 'date';

export interface FooterProps {
  items: Item[];
  pagination?: Pagination;
}
export interface FieldDataColumnType {
  field: string;
  name: ReactNode;
  description?: string;
  dataType?: DataType;
  width?: string;
  sortable?: boolean | ((item: Item) => number | string);
  isExpander?: boolean;
  textOnly?: boolean;
  align?: HorizontalAlignment;
  truncateText?: boolean;
  isMobileHeader?: boolean;
  mobileOptions?: {
    show?: boolean;
    only?: boolean;
    render?: (item: Item) => ReactNode;
    header?: boolean;
  };
  hideForMobile?: boolean;
  render?: (value: any, record: any) => ReactNode;
  footer?: string | React.ReactElement | ((props: FooterProps) => ReactNode);
}

export interface ComputedColumnType {
  render: (record: any) => ReactNode;
  name?: ReactNode;
  description?: string;
  sortable?: (item: Item) => number | string;
  width?: string;
  truncateText?: boolean;
}

export interface ActionsColumnType {
  actions: Action[];
  name?: ReactNode;
  description?: string;
  width?: string;
}

export interface SortingType {
  sort?: PropertySort;
  allowNeutralSort?: boolean;
}

export interface SelectionType {
  onSelectionChange?: (selection: Item) => void;
  selectable?: (item: Item) => boolean;
  selectableMessage?: (selectable: boolean, item: Item) => string;
}
