/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactElement, ReactNode, TdHTMLAttributes } from 'react';
import { HorizontalAlignment } from '../../services';
import { Pagination } from './pagination_bar';
import { Action } from './action_types';
import { Primitive } from '../../services/sort/comparators';
import { CommonProps } from '../common';
import {
  EuiTableRowCellProps,
  EuiTableRowCellMobileOptionsShape,
} from '../table/table_row_cell';

export type ItemId<T> = string | number | ((item: T) => string);
export type ItemIdResolved = string | number;

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
export interface EuiTableFieldDataColumnType<T>
  extends CommonProps,
    TdHTMLAttributes<HTMLTableDataCellElement> {
  /**
   * A field of the item (may be a nested field)
   */
  // type hack used for better autocomplete support
  // https://github.com/microsoft/TypeScript/issues/29729
  field: keyof T | (string & {}); // supports outer.inner key paths
  /**
   * The display name of the column
   */
  name: ReactNode;
  /**
   * A description of the column (will be presented as a title over the column header)
   */
  description?: string;
  /**
   * Describes the data types of the displayed value (serves as a rendering hint for the table)
   */
  dataType?: EuiTableDataType;
  /**
   * A CSS width property. Hints for the required width of the column (e.g. "30%", "100px", etc..)
   */
  width?: string;
  /**
   * Defines whether the user can sort on this column. If a function is provided, this function returns the value to sort against
   */
  sortable?: boolean | ((item: T) => Primitive);
  isExpander?: boolean;
  /**
   * Creates a text wrapper around cell content that helps word break or truncate
   * long text correctly.
   */
  textOnly?: boolean;
  /**
   * Defines the horizontal alignment of the column
   */
  align?: HorizontalAlignment;
  /**
   * Indicates whether this column should truncate overflowing text content.
   * - Set to `true` to enable single-line truncation.
   * - To enable multi-line truncation, use a configuration object with `lines`
   * set to a number of lines to truncate to.
   */
  truncateText?: EuiTableRowCellProps['truncateText'];
  mobileOptions?: Omit<EuiTableRowCellMobileOptionsShape, 'render'> & {
    render?: (item: T) => ReactNode;
  };
  /**
   * Describe a custom renderer function for the content
   */
  render?: (value: any, record: T) => ReactNode;
  /**
   * Content to display in the footer beneath this column
   */
  footer?:
    | string
    | ReactElement
    | ((props: EuiTableFooterProps<T>) => ReactNode);
  /**
   * Disables the user's ability to change the sort but still shows the current direction
   */
  readOnly?: boolean;
}

export interface EuiTableComputedColumnType<T>
  extends CommonProps,
    TdHTMLAttributes<HTMLTableDataCellElement> {
  /**
   * A function that computes the value for each item and renders it
   */
  render: (record: T) => ReactNode;
  /**
   * The display name of the column
   */
  name?: ReactNode;
  /**
   * A description of the column (will be presented as a title over the column header
   */
  description?: string;
  /**
   * If provided, allows this column to be sorted on. Must return the value to sort against.
   */
  sortable?: (item: T) => Primitive;
  /**
   * A CSS width property. Hints for the required width of the column
   */
  width?: string;
  /**
   * Indicates whether this column should truncate its content when it doesn't fit
   */
  truncateText?: boolean;
  isExpander?: boolean;
  align?: HorizontalAlignment;
  /**
   * Disables the user's ability to change the sort but still shows the current direction
   */
  readOnly?: boolean;
}

export interface EuiTableActionsColumnType<T extends object> {
  /**
   * An array of one of the objects: #DefaultItemAction or #CustomItemAction
   */
  actions: Array<Action<T>>;
  /**
   * The display name of the column
   */
  name?: ReactNode;
  /**
   * A description of the column (will be presented as a title over the column header
   */
  description?: string;
  /**
   * A CSS width property. Hints for the required width of the column
   */
  width?: string;
}

export interface EuiTableSortingType<T> {
  /**
   * Indicates the property/field to sort on
   */
  sort?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
  /**
   * Enables/disables unsorting of table columns. Supported by EuiInMemoryTable.
   */
  allowNeutralSort?: boolean;
  /**
   * Enables the default sorting ability for each column.
   */
  enableAllColumns?: boolean;
  /**
   * Disables the user's ability to change the sort but still shows the current direction
   */
  readOnly?: boolean;
}

export interface EuiTableSelectionType<T> {
  /**
   * A callback that will be called whenever the item selection changes.
   *
   * Required if `selected` is passed.
   */
  onSelectionChange?: (selection: T[]) => void;
  /**
   * A callback that is called per item to indicate whether it is selectable
   */
  selectable?: (item: T) => boolean;
  /**
   * A callback that is called per item to retrieve a message for its selectable state.
   * We display these messages as a tooltip on an unselectable checkbox
   */
  selectableMessage?: (selectable: boolean, item: T) => string;
  /**
   * Sets initially selected items. Use for uncontrolled selection behavior (checkbox
   * will only change from user input, and not from developer control).
   *
   * This prop will be ignored if `selected` is passed.
   */
  initialSelected?: T[];
  /**
   * Used for controlled selection behavior, e.g. when you want to programmatically
   * control which selection checkboxes are checked, and which are not.
   */
  selected?: T[];
}
