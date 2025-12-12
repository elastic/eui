/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  Fragment,
  HTMLAttributes,
  ReactNode,
  ContextType,
} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {
  Direction,
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  SortDirection,
  RenderWithEuiTheme,
  OverrideCopiedTabularContent,
  tabularCopyMarkers,
} from '../../services';
import { CommonProps } from '../common';
import { isFunction } from '../../services/predicate';
import { get } from '../../services/objects';
import { EuiCheckbox } from '../form';

import { EuiComponentDefaultsContext } from '../provider/component_defaults';
import { euiTablePaginationDefaults } from '../table/table_pagination';
import {
  EuiTable,
  EuiTableProps,
  EuiTableBody,
  EuiTableFooter,
  EuiTableFooterCell,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTableHeaderMobile,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
  EuiTableSortMobile,
} from '../table';
import { euiTableCaptionStyles } from '../table/table.styles';

import { CollapsedItemActions } from './collapsed_item_actions';
import { ExpandedItemActions } from './expanded_item_actions';

import { Pagination, PaginationBar } from './pagination_bar';
import { EuiIcon } from '../icon';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';
import { EuiDelayRender } from '../delay_render';

import { htmlIdGenerator } from '../../services/accessibility';
import { Action, CustomItemAction } from './action_types';
import {
  EuiTableActionsColumnType,
  EuiTableComputedColumnType,
  EuiTableDataType,
  EuiTableFieldDataColumnType,
  EuiTableFooterProps,
  ItemId,
  EuiTableSelectionType,
  EuiTableSortingType,
  ItemIdResolved,
} from './table_types';
import { EuiTableSortMobileProps } from '../table/mobile/table_sort_mobile';

import {
  euiBasicTableBodyLoading,
  safariLoadingWorkaround,
} from './basic_table.styles';

type DataTypeProfiles = Record<
  EuiTableDataType,
  {
    align: typeof LEFT_ALIGNMENT | typeof RIGHT_ALIGNMENT;
    render: (value: any) => string;
  }
>;

const dataTypesProfiles: DataTypeProfiles = {
  auto: {
    align: LEFT_ALIGNMENT,
    render: (value: any) => formatAuto(value),
  },
  string: {
    align: LEFT_ALIGNMENT,
    render: (value: any) => formatText(value),
  },
  number: {
    align: RIGHT_ALIGNMENT,
    render: (value: number | null) => formatNumber(value),
  },
  boolean: {
    align: LEFT_ALIGNMENT,
    render: (value: boolean) => formatBoolean(value),
  },
  date: {
    align: LEFT_ALIGNMENT,
    render: (value: moment.MomentInput) => formatDate(value),
  },
};

const DATA_TYPES = Object.keys(dataTypesProfiles);

interface ItemIdToExpandedRowMap {
  [id: string]: ReactNode;
}

export function getItemId<T>(item: T, itemId?: ItemId<T>) {
  if (itemId) {
    if (isFunction(itemId)) {
      return itemId(item);
    }
    // @ts-ignore never mind about the index signature
    return item[itemId];
  }
}

function getRowProps<T>(item: T, rowProps: RowPropsCallback<T>) {
  if (rowProps) {
    if (isFunction(rowProps)) {
      return rowProps(item);
    }
    return rowProps;
  }

  return {};
}

function getCellProps<T extends object>(
  item: T,
  column: EuiBasicTableColumn<T>,
  cellProps: CellPropsCallback<T>
) {
  if (cellProps) {
    if (isFunction(cellProps)) {
      return cellProps(item, column);
    }
    return cellProps;
  }

  return {};
}

function getColumnFooter<T extends object>(
  column: EuiBasicTableColumn<T>,
  { items, pagination }: EuiTableFooterProps<T>
) {
  const { footer } = column as EuiTableFieldDataColumnType<T>;
  if (footer) {
    if (isFunction(footer)) {
      return footer({ items, pagination });
    }
    return footer;
  }

  return undefined;
}

export type EuiBasicTableColumn<T extends object> =
  | EuiTableFieldDataColumnType<T>
  | EuiTableComputedColumnType<T>
  | EuiTableActionsColumnType<T>;

export interface Criteria<T> {
  /**
   * If the shown items represents a page (slice) into a bigger set, this describes this page
   */
  page?: {
    index: number;
    size: number;
  };
  /**
   * If the shown items are sorted, this describes the sort criteria
   */
  sort?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
}

export interface CriteriaWithPagination<T> extends Criteria<T> {
  /**
   * If the shown items represents a page (slice) into a bigger set, this describes this page
   */
  page: {
    index: number;
    size: number;
  };
}

type CellPropsCallback<T extends object> = (
  item: T,
  column: EuiBasicTableColumn<T>
) => object;
type RowPropsCallback<T> = (item: T) => object;

interface BasicTableProps<T extends object>
  extends Omit<EuiTableProps, 'onChange'> {
  /**
   * Describes how to extract a unique ID from each item, used for selections & expanded rows
   */
  itemId?: ItemId<T>;
  /**
   * Row expansion uses the itemId prop to identify each row
   */
  itemIdToExpandedRowMap?: ItemIdToExpandedRowMap;
  /**
   * A list of objects to appear in the table - an item per row
   */
  items: T[];
  /**
   * Applied to `EuiTableRowCell`
   */
  cellProps?: object | CellPropsCallback<T>;
  /**
   * An array of one of the objects: {@link EuiTableFieldDataColumnType}, {@link EuiTableComputedColumnType} or {@link EuiTableActionsColumnType}.
   */
  columns: Array<EuiBasicTableColumn<T>>;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Provides a description of the table’s content. If no description is provided, the table will default to the name Data Table.
   */
  tableCaption?: string;
  /**
   * Indicates which column should be used as the identifying cell in each row. Should match a "field" prop in FieldDataColumn
   */
  rowHeader?: string;
  /**
   * Provides an infinite loading indicator
   */
  loading?: boolean;
  /**
   * Message to display if table is empty
   */
  noItemsMessage?: ReactNode;
  /**
   * Called whenever pagination or sorting changes (this property is required when either pagination or sorting is configured).
   * See {@link Criteria} or {@link CriteriaWithPagination}
   */
  onChange?: (criteria: Criteria<T>) => void;
  /**
   * Configures {@link Pagination}
   */
  pagination?: undefined;
  /**
   * Applied to `EuiTableRow`
   */
  rowProps?: object | RowPropsCallback<T>;
  /**
   * Configures {@link EuiTableSelectionType}
   */
  selection?: EuiTableSelectionType<T>;
  /**
   * Configures {@link EuiTableSortingType}
   */
  sorting?: EuiTableSortingType<T>;
  /**
   * Sets the table-layout CSS property. Note that auto tableLayout prevents truncateText from working properly.
   */
  tableLayout?: 'fixed' | 'auto';
}

type BasicTableWithPaginationProps<T extends object> = Omit<
  BasicTableProps<T>,
  'pagination' | 'onChange'
> & {
  pagination: Pagination;
  onChange?: (criteria: CriteriaWithPagination<T>) => void;
};

export type EuiBasicTableProps<T extends object> = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  (BasicTableProps<T> | BasicTableWithPaginationProps<T>);

interface State<T> {
  initialSelectionRendered: boolean;
  selection: T[];
}

interface SortOptions {
  isSorted?: boolean;
  isSortAscending?: boolean;
  onSort?: () => void;
  allowNeutralSort?: boolean;
  readOnly?: boolean;
}

function hasPagination<T extends object>(
  x: EuiBasicTableProps<T>
): x is BasicTableWithPaginationProps<T> {
  return x.hasOwnProperty('pagination') && !!x.pagination;
}

export class EuiBasicTable<T extends object = any> extends Component<
  EuiBasicTableProps<T>,
  State<T>
> {
  static contextType = EuiComponentDefaultsContext;
  declare context: ContextType<typeof EuiComponentDefaultsContext>;

  static defaultProps = {
    tableLayout: 'fixed',
    noItemsMessage: (
      <EuiI18n token="euiBasicTable.noItemsMessage" default="No items found" />
    ),
  };

  static getDerivedStateFromProps<T extends object>(
    nextProps: EuiBasicTableProps<T>,
    prevState: State<T>
  ) {
    if (!nextProps.selection) {
      // next props don't have a selection, reset our state
      return { selection: [] };
    }

    const controlledSelection = nextProps.selection.selected;
    const unfilteredSelection = controlledSelection ?? prevState.selection;

    // Ensure we're not including selections that aren't in the
    // current `items` array (affected by pagination)
    const { itemId, items } = nextProps;
    const selection = unfilteredSelection.filter(
      (selectedItem: T) =>
        items.findIndex(
          (item: T) =>
            getItemId(item, itemId) === getItemId(selectedItem, itemId)
        ) !== -1
    );

    // If some selected items were filtered out, update state and callback
    if (selection.length !== unfilteredSelection.length) {
      nextProps.selection.onSelectionChange?.(selection);
      return { selection };
    }

    // Always update selection state from props if controlled
    if (controlledSelection) {
      return { selection };
    }

    return null;
  }

  constructor(props: EuiBasicTableProps<T>) {
    super(props);
    this.state = {
      // used for checking if  initial selection is rendered
      initialSelectionRendered: false,
      selection: [],
    };
  }

  componentDidMount() {
    this.getInitialSelection();
  }

  componentDidUpdate() {
    this.getInitialSelection();
  }

  get pageSize() {
    return (
      this.props.pagination?.pageSize ??
      this.context.EuiTablePagination?.itemsPerPage ??
      euiTablePaginationDefaults.itemsPerPage
    );
  }

  get isSelectionControlled() {
    return !!this.props.selection?.selected;
  }

  getInitialSelection() {
    if (this.isSelectionControlled) return;

    if (
      this.props.selection &&
      this.props.selection.initialSelected &&
      !this.state.initialSelectionRendered &&
      this.props.items.length > 0
    ) {
      this.setState({
        selection: this.props.selection.initialSelected,
        initialSelectionRendered: true,
      });
    }
  }

  buildCriteria(props: EuiBasicTableProps<T>): Criteria<T> {
    const criteria: Criteria<T> = {};
    if (hasPagination(props)) {
      criteria.page = {
        index: props.pagination.pageIndex,
        size: this.pageSize,
      };
    }
    if (props.sorting) {
      criteria.sort = props.sorting.sort;
    }
    return criteria;
  }

  changeSelection(changedSelection: T[]) {
    const { selection } = this.props;
    if (!selection) return;

    selection.onSelectionChange?.(changedSelection);

    if (!this.isSelectionControlled) {
      this.setState({ selection: changedSelection });
    }
  }

  clearSelection() {
    this.changeSelection([]);
  }

  onPageSizeChange(size: number) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    const criteria: CriteriaWithPagination<T> = {
      ...currentCriteria,
      page: {
        index: 0, // when page size changes, we take the user back to the first page
        size,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(criteria);
    }
  }

  onPageChange(index: number) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    const criteria: CriteriaWithPagination<T> = {
      ...currentCriteria,
      page: {
        ...currentCriteria.page!,
        index,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(criteria);
    }
  }

  onColumnSortChange(column: EuiBasicTableColumn<T>) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    let direction: Direction = SortDirection.ASC;
    if (
      currentCriteria &&
      currentCriteria.sort &&
      (currentCriteria.sort.field ===
        (column as EuiTableFieldDataColumnType<T>).field ||
        currentCriteria.sort.field === column.name)
    ) {
      direction = SortDirection.reverse(currentCriteria.sort.direction);
    }
    const criteria: Criteria<T> = {
      ...currentCriteria,
      // resetting the page if the criteria has one
      page: !currentCriteria.page
        ? undefined
        : {
            index: 0,
            size: currentCriteria.page.size,
          },
      sort: {
        field: ((column as EuiTableFieldDataColumnType<T>).field ||
          column.name) as keyof T,
        direction,
      },
    };
    if (this.props.onChange) {
      // @ts-ignore complex relationship between pagination's existence and criteria, the code logic ensures this is correctly maintained
      this.props.onChange(criteria);
    }
  }

  tableId = htmlIdGenerator('__table')();

  render() {
    const {
      className,
      loading,
      items,
      itemId,
      columns,
      pagination,
      sorting,
      selection,
      onChange,
      error,
      noItemsMessage,
      compressed,
      itemIdToExpandedRowMap,
      responsiveBreakpoint,
      rowProps,
      cellProps,
      tableCaption,
      rowHeader,
      tableLayout,
      hasBackground,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiBasicTable',
      { 'euiBasicTable-loading': loading },
      className
    );

    const table = this.renderTable();
    const paginationBar = this.renderPaginationBar();

    return (
      <div className={classes} {...rest}>
        {table}
        {paginationBar}
      </div>
    );
  }

  renderTable() {
    const {
      compressed,
      responsiveBreakpoint,
      tableLayout,
      hasBackground,
      loading,
    } = this.props;

    return (
      <>
        <EuiTableHeaderMobile responsiveBreakpoint={responsiveBreakpoint}>
          {this.renderSelectAll(true)}
          {this.renderTableMobileSort()}
        </EuiTableHeaderMobile>
        <OverrideCopiedTabularContent>
          <EuiTable
            id={this.tableId}
            tableLayout={tableLayout}
            responsiveBreakpoint={responsiveBreakpoint}
            compressed={compressed}
            hasBackground={hasBackground}
            css={loading && safariLoadingWorkaround}
          >
            {this.renderTableCaption()}
            {this.renderTableHead()}
            {this.renderTableBody()}
            {this.renderTableFooter()}
          </EuiTable>
        </OverrideCopiedTabularContent>
      </>
    );
  }

  renderTableMobileSort() {
    const { columns, sorting } = this.props;
    const items: EuiTableSortMobileProps['items'] = [];

    if (!sorting) {
      return null;
    }

    columns.forEach((column: EuiBasicTableColumn<T>, index: number) => {
      if (
        (column as EuiTableFieldDataColumnType<T>).field &&
        sorting.sort &&
        !!sorting.enableAllColumns &&
        (column as EuiTableFieldDataColumnType<T>).sortable == null
      ) {
        column = {
          ...(column as EuiTableFieldDataColumnType<T>),
          sortable: true,
        };
      }

      if (
        !(column as EuiTableFieldDataColumnType<T>).sortable ||
        (column as EuiTableFieldDataColumnType<T>)?.mobileOptions?.show ===
          false
      ) {
        return;
      }

      const sortDirection = this.resolveColumnSortDirection(column);

      items.push({
        name: column.name,
        key: `_data_s_${String(
          (column as EuiTableFieldDataColumnType<T>).field
        )}_${index}`,
        onSort: this.resolveColumnOnSort(column),
        isSorted: !!sortDirection,
        isSortAscending: sortDirection
          ? SortDirection.isAsc(sortDirection)
          : undefined,
      });
    });

    return items.length ? <EuiTableSortMobile items={items} /> : null;
  }

  renderTableCaption() {
    const { items, pagination, tableCaption } = this.props;
    const itemCount = items.length;
    const totalItemCount = pagination ? pagination.totalItemCount : itemCount;
    const page = pagination ? pagination.pageIndex + 1 : 1;
    const pageCount = pagination
      ? Math.ceil(pagination.totalItemCount / this.pageSize)
      : 1;

    let itemCountPart: React.ReactNode = null;
    if (!itemCount) {
      itemCountPart = `${this.props.noItemsMessage},`;
    } else if (pagination && totalItemCount > 0) {
      itemCountPart = (
        <p>
          <EuiI18n
            token="euiBasicTable.caption.itemCountPart.withTotalItemCount"
            default="Showing {itemCount} of {totalItemCount} data rows."
            values={{ itemCount, totalItemCount }}
          />
        </p>
      );
    }

    let paginationPart: React.ReactNode = null;
    if (pagination && pageCount > 1) {
      paginationPart = (
        <p>
          <EuiI18n
            token="euiBasicTable.caption.paginationPart.withPageCount"
            default="Page {page} of {pageCount}."
            values={{ page, pageCount }}
          />
        </p>
      );
    }

    return (
      <EuiScreenReaderOnly>
        <caption css={euiTableCaptionStyles} className="euiTableCaption">
          {tabularCopyMarkers.hiddenNoCopyBoundary}
          <EuiDelayRender>
            <p>
              {tableCaption || (
                <EuiI18n
                  token="euiBasicTable.caption.tableName"
                  default="Data table"
                />
              )}
              {itemCount === 0 && (
                <>
                  {' '}
                  <EuiI18n
                    token="euiBasicTable.caption.emptyState"
                    default="(empty)"
                  />
                </>
              )}
              {','}
            </p>
            {itemCountPart}
            {paginationPart}
          </EuiDelayRender>
          {tabularCopyMarkers.hiddenNoCopyBoundary}
        </caption>
      </EuiScreenReaderOnly>
    );
  }

  selectAllIdGenerator = htmlIdGenerator('_selection_column-checkbox');

  renderSelectAll = (isMobile: boolean) => {
    const { items, selection } = this.props;

    if (!selection) {
      return;
    }

    const selectableItems = items.filter(
      (item: T) => !selection.selectable || selection.selectable(item)
    );

    const checked =
      this.state.selection &&
      selectableItems.length > 0 &&
      this.state.selection.length === selectableItems.length;

    const indeterminate =
      !checked &&
      this.state.selection &&
      selectableItems.length > 0 &&
      this.state.selection.length > 0;

    const disabled = selectableItems.length === 0;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked && !indeterminate) {
        this.changeSelection(selectableItems);
      } else {
        this.changeSelection([]);
      }
    };

    return (
      <EuiI18n
        tokens={['euiBasicTable.selectAllRows', 'euiBasicTable.deselectRows']}
        defaults={['Select all rows', 'Deselect rows']}
      >
        {([selectAllRows, deselectRows]: string[]) => (
          <EuiCheckbox
            id={this.selectAllIdGenerator()}
            checked={checked}
            indeterminate={indeterminate}
            disabled={disabled}
            onChange={onChange}
            data-test-subj="checkboxSelectAll"
            aria-label={checked || indeterminate ? deselectRows : selectAllRows}
            title={checked || indeterminate ? deselectRows : selectAllRows}
            label={isMobile ? selectAllRows : null}
          />
        )}
      </EuiI18n>
    );
  };

  renderTableHead() {
    const { columns, selection } = this.props;

    const headers: ReactNode[] = [];

    if (selection) {
      headers.push(
        <EuiTableHeaderCellCheckbox
          key="_selection_column_h"
          append={this.renderCopyChar(-1)}
        >
          {this.renderSelectAll(false)}
        </EuiTableHeaderCellCheckbox>
      );
    }

    columns.forEach((column: EuiBasicTableColumn<T>, index: number) => {
      const {
        field,
        width,
        name,
        nameTooltip,
        align,
        dataType,
        sortable,
        mobileOptions,
        readOnly,
        description,
      } = column as EuiTableFieldDataColumnType<T>;

      const columnAlign = align || this.getAlignForDataType(dataType);

      const sharedProps = {
        width,
        tooltipProps: nameTooltip,
        description,
        mobileOptions,
        align: columnAlign,
        append: this.renderCopyChar(index),
      };

      // actions column
      if ((column as EuiTableActionsColumnType<T>).actions) {
        headers.push(
          <EuiTableHeaderCell
            {...sharedProps}
            key={`_actions_h_${index}`}
            align="right"
          >
            {name}
          </EuiTableHeaderCell>
        );
        return;
      }

      // computed column
      if (!(column as EuiTableFieldDataColumnType<T>).field) {
        const sorting: SortOptions = {};
        // computed columns are only sortable if their `sortable` is a function
        if (this.props.sorting && typeof sortable === 'function') {
          const sortDirection = this.resolveColumnSortDirection(column);
          sorting.isSorted = !!sortDirection;
          sorting.isSortAscending = sortDirection
            ? SortDirection.isAsc(sortDirection)
            : undefined;
          sorting.onSort = this.resolveColumnOnSort(column);
          sorting.readOnly = this.props.sorting.readOnly || readOnly;
        }
        headers.push(
          <EuiTableHeaderCell
            {...sharedProps}
            key={`_computed_column_h_${index}`}
            data-test-subj={`tableHeaderCell_${
              typeof name === 'string' ? name : ''
            }_${index}`}
            {...sorting}
          >
            {name}
          </EuiTableHeaderCell>
        );
        return;
      }

      // field data column
      const sorting: SortOptions = {};
      if (this.props.sorting) {
        if (
          this.props.sorting.sort &&
          !!this.props.sorting.enableAllColumns &&
          (column as EuiTableFieldDataColumnType<T>).sortable == null
        ) {
          column = {
            ...(column as EuiTableFieldDataColumnType<T>),
            sortable: true,
          };
        }

        const { sortable } = column as EuiTableFieldDataColumnType<T>;

        if (sortable) {
          const sortDirection = this.resolveColumnSortDirection(column);
          sorting.isSorted = !!sortDirection;
          sorting.isSortAscending = sortDirection
            ? SortDirection.isAsc(sortDirection)
            : undefined;
          sorting.onSort = this.resolveColumnOnSort(column);
          sorting.readOnly = this.props.sorting.readOnly || readOnly;
        }
      }
      headers.push(
        <EuiTableHeaderCell
          {...sharedProps}
          key={`_data_h_${String(field)}_${index}`}
          data-test-subj={`tableHeaderCell_${String(field)}_${index}`}
          {...sorting}
        >
          {name}
        </EuiTableHeaderCell>
      );
    });

    return <EuiTableHeader>{headers}</EuiTableHeader>;
  }

  renderTableFooter() {
    const { items, columns, pagination, selection } = this.props;

    const footers = [];
    let hasDefinedFooter = false;

    if (selection) {
      // Create an empty cell to compensate for additional selection column
      footers.push(
        <EuiTableFooterCell key="_selection_column_f">
          {undefined}
        </EuiTableFooterCell>
      );
    }

    columns.forEach((column: EuiBasicTableColumn<T>) => {
      const footer = getColumnFooter(column, { items, pagination });
      const { mobileOptions, field, align } =
        column as EuiTableFieldDataColumnType<T>;

      if (mobileOptions?.only) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <EuiTableFooterCell
            key={`footer_${String(field)}_${footers.length - 1}`}
            align={align}
          >
            {footer}
          </EuiTableFooterCell>
        );
        hasDefinedFooter = true;
      } else {
        // Footer is undefined, so create an empty cell to preserve layout
        footers.push(
          <EuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={align}
          >
            {undefined}
          </EuiTableFooterCell>
        );
      }
    });

    return footers.length && hasDefinedFooter ? (
      <EuiTableFooter>{footers}</EuiTableFooter>
    ) : null;
  }

  renderTableBody() {
    const { error, loading, items } = this.props;

    let content: ReactNode;

    if (error) {
      content = this.renderErrorMessage(error);
    } else if (items.length === 0) {
      content = this.renderEmptyMessage();
    } else {
      content = items.map((item: T, index: number) => {
        // if there's pagination the item's index must be adjusted to the where it is in the whole dataset
        const tableItemIndex =
          hasPagination(this.props) && this.pageSize > 0
            ? this.props.pagination.pageIndex * this.pageSize + index
            : index;
        return this.renderItemRow(item, tableItemIndex, index);
      });
    }

    return (
      <RenderWithEuiTheme>
        {(theme) => (
          <EuiTableBody css={loading && euiBasicTableBodyLoading(theme)}>
            {content}
          </EuiTableBody>
        )}
      </RenderWithEuiTheme>
    );
  }

  renderErrorMessage(error: string) {
    const colSpan = this.props.columns.length + (this.props.selection ? 1 : 0);
    return (
      <EuiTableRow>
        <EuiTableRowCell
          align="center"
          colSpan={colSpan}
          mobileOptions={{ width: '100%' }}
        >
          <EuiIcon type="minusInCircle" color="danger" /> {error}
        </EuiTableRowCell>
      </EuiTableRow>
    );
  }

  renderEmptyMessage() {
    const { columns, selection, noItemsMessage } = this.props;
    const colSpan = columns.length + (selection ? 1 : 0);
    return (
      <EuiTableRow>
        <EuiTableRowCell
          align="center"
          colSpan={colSpan}
          mobileOptions={{ width: '100%' }}
        >
          {noItemsMessage}
        </EuiTableRowCell>
      </EuiTableRow>
    );
  }

  renderItemRow(item: T, rowIndex: number, displayedRowIndex: number) {
    const { columns, selection, rowHeader, itemIdToExpandedRowMap } =
      this.props;

    const cells = [];

    const { itemId: itemIdCallback } = this.props;
    const itemId: ItemIdResolved =
      getItemId(item, itemIdCallback) != null
        ? getItemId(item, itemIdCallback)
        : rowIndex;
    const selected = !selection
      ? false
      : this.state.selection &&
        !!this.state.selection.find(
          (selectedItem: T) =>
            getItemId(selectedItem, itemIdCallback) === itemId
        );

    let rowSelectionDisabled = false;
    if (selection) {
      const [checkboxCell, isDisabled] = this.renderItemSelectionCell(
        itemId,
        item,
        selected,
        displayedRowIndex
      );
      cells.push(checkboxCell);
      rowSelectionDisabled = !!isDisabled;
    }

    let hasActions: 'custom' | boolean = false;
    columns.forEach((column: EuiBasicTableColumn<T>, columnIndex: number) => {
      const columnActions = (column as EuiTableActionsColumnType<T>).actions;

      if (columnActions) {
        const hasCustomActions = columnActions.some(
          (action) => !!(action as CustomItemAction<T>).render
        );
        cells.push(
          this.renderItemActionsCell(
            itemId,
            item,
            column as EuiTableActionsColumnType<T>,
            columnIndex,
            rowIndex,
            hasCustomActions
          )
        );
        // A table theoretically could have both custom and default action items
        // If it has both, default action mobile row styles take precedence over custom
        hasActions = !hasActions && hasCustomActions ? 'custom' : true;
      } else if ((column as EuiTableFieldDataColumnType<T>).field) {
        const fieldDataColumn = column as EuiTableFieldDataColumnType<T>;
        cells.push(
          this.renderItemFieldDataCell(
            itemId,
            item,
            column as EuiTableFieldDataColumnType<T>,
            columnIndex,
            fieldDataColumn.field === rowHeader
          )
        );
      } else {
        cells.push(
          this.renderItemComputedCell(
            itemId,
            item,
            column as EuiTableComputedColumnType<T>,
            columnIndex
          )
        );
      }
    });

    // Occupy full width of table, taking checkbox & mobile only columns into account.
    let expandedRowColSpan = selection ? columns.length + 1 : columns.length;

    const mobileOnlyCols = columns.reduce<number>((num, column) => {
      return (column as EuiTableFieldDataColumnType<T>)?.mobileOptions?.only
        ? num + 1
        : num + 0; // BWC only
    }, 0);

    expandedRowColSpan = expandedRowColSpan - mobileOnlyCols;

    // We'll use the ID to associate the expanded row with the original.
    const hasExpandedRow = itemIdToExpandedRowMap?.hasOwnProperty(itemId);
    const expandedRowId = hasExpandedRow
      ? `row_${itemId}_expansion`
      : undefined;
    const expandedRow = hasExpandedRow ? (
      <EuiTableRow
        id={expandedRowId}
        isExpandedRow={true}
        hasSelection={!!selection}
      >
        <EuiTableRowCell
          colSpan={expandedRowColSpan}
          textOnly={false}
          append={tabularCopyMarkers.hiddenNewline}
        >
          {itemIdToExpandedRowMap![itemId]}
        </EuiTableRowCell>
      </EuiTableRow>
    ) : undefined;

    const { rowProps: rowPropsCallback } = this.props;
    const rowProps = getRowProps(item, rowPropsCallback as RowPropsCallback<T>);
    const row = (
      <EuiTableRow
        aria-owns={expandedRowId}
        hasSelection={!!selection}
        isSelectable={!rowSelectionDisabled}
        isSelected={selected}
        hasActions={hasActions}
        isExpandable={hasExpandedRow}
        {...rowProps}
      >
        {cells}
      </EuiTableRow>
    );

    return (
      <Fragment key={`row_${itemId}`}>
        {row}
        {expandedRow}
      </Fragment>
    );
  }

  renderItemSelectionCell(
    itemId: ItemId<T>,
    item: T,
    selected: boolean,
    displayedRowIndex: number
  ) {
    const { selection } = this.props;
    const key = `_selection_column_${itemId}`;
    const checked = selected;
    const disabled = selection!.selectable && !selection!.selectable(item);
    const title =
      selection!.selectableMessage &&
      selection!.selectableMessage(!disabled, item);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selection, item]);
      } else {
        const { itemId: itemIdCallback } = this.props;
        this.changeSelection(
          this.state.selection.reduce((selection: T[], selectedItem: T) => {
            if (getItemId(selectedItem, itemIdCallback) !== itemId) {
              selection.push(selectedItem);
            }
            return selection;
          }, [])
        );
      }
    };
    return [
      <EuiTableRowCellCheckbox key={key} append={this.renderCopyChar(-1)}>
        <EuiI18n
          token="euiBasicTable.selectThisRow"
          default="Select row {index}"
          values={{ index: displayedRowIndex + 1 }}
        >
          {(selectThisRow: string) => (
            <EuiCheckbox
              id={`${this.tableId}${key}-checkbox`}
              disabled={disabled}
              checked={checked}
              onChange={onChange}
              title={title || selectThisRow}
              aria-label={title || selectThisRow}
              data-test-subj={`checkboxSelectRow-${itemId}`}
            />
          )}
        </EuiI18n>
      </EuiTableRowCellCheckbox>,
      disabled,
    ];
  }

  renderItemActionsCell(
    itemId: ItemIdResolved,
    item: T,
    column: EuiTableActionsColumnType<T>,
    columnIndex: number,
    rowIndex: number,
    hasCustomActions: boolean
  ) {
    // Disable all actions if any row(s) are selected
    const allDisabled = this.state.selection.length > 0;

    let actualActions = column.actions.filter(
      (action: Action<T>) => !action.available || action.available(item)
    );
    if (actualActions.length > 2) {
      if (allDisabled) {
        // If all actions are disabled, do not show any actions but the popover toggle
        actualActions = [];
      } else {
        // if any of the actions `isPrimary`, add them inline as well, but only the first 2,
        // which we'll force to only show on hover for desktop views
        const primaryActions = actualActions.filter(
          (action) => action.isPrimary
        );
        actualActions = primaryActions.slice(0, 2).map((action) => ({
          ...action,
          showOnHover: true,
        }));
      }

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the configured actions

      actualActions.push({
        name: 'All actions',
        render: (item: T) => (
          <CollapsedItemActions
            className="euiBasicTable__collapsedActions"
            actions={column.actions}
            actionsDisabled={allDisabled}
            itemId={itemId}
            item={item}
            displayedRowIndex={rowIndex}
          />
        ),
      });
    }

    const key = `record_actions_${itemId}_${columnIndex}`;
    return (
      <EuiTableRowCell
        key={key}
        align="right"
        textOnly={false}
        hasActions={hasCustomActions ? 'custom' : true}
        append={this.renderCopyChar(columnIndex)}
      >
        <ExpandedItemActions
          actions={actualActions}
          actionsDisabled={allDisabled}
          itemId={itemId}
          item={item}
        />
      </EuiTableRowCell>
    );
  }

  renderItemFieldDataCell(
    itemId: ItemId<T>,
    item: T,
    column: EuiTableFieldDataColumnType<T>,
    columnIndex: number,
    setScopeRow: boolean
  ) {
    const { field, render, dataType } = column;

    const key = `_data_column_${String(field)}_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType(dataType);
    const value = get(item, field as string);
    const content = contentRenderer(value, item);

    return this.renderItemCell(
      item,
      column,
      columnIndex,
      key,
      content,
      setScopeRow
    );
  }

  renderItemComputedCell(
    itemId: ItemId<T>,
    item: T,
    column: EuiTableComputedColumnType<T>,
    columnIndex: number
  ) {
    const { render } = column;

    const key = `_computed_column_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType();
    const content = contentRenderer(item);

    return this.renderItemCell(item, column, columnIndex, key, content, false);
  }

  renderItemCell(
    item: T,
    column: EuiBasicTableColumn<T>,
    columnIndex: number,
    key: string | number,
    content: ReactNode,
    setScopeRow: boolean
  ) {
    const {
      align,
      render,
      dataType,
      isExpander,
      textOnly,
      name,
      field,
      description,
      sortable,
      footer,
      mobileOptions,
      nameTooltip,
      ...rest
    } = column as EuiTableFieldDataColumnType<T>;
    const columnAlign = align || this.getAlignForDataType(dataType);
    const { cellProps: cellPropsCallback } = this.props;
    const cellProps = getCellProps(
      item,
      column,
      cellPropsCallback as CellPropsCallback<T>
    );

    return (
      <EuiTableRowCell
        key={key}
        align={columnAlign}
        isExpander={isExpander}
        textOnly={textOnly || !render}
        setScopeRow={setScopeRow}
        mobileOptions={{
          ...mobileOptions,
          render: mobileOptions?.render?.(item),
          header: mobileOptions?.header ?? name,
        }}
        {...cellProps}
        {...rest}
        append={this.renderCopyChar(columnIndex)}
      >
        {content}
      </EuiTableRowCell>
    );
  }

  renderCopyChar = (columnIndex: number) => {
    const isLastColumn = columnIndex === this.props.columns.length - 1;

    return isLastColumn
      ? tabularCopyMarkers.hiddenNewline
      : tabularCopyMarkers.hiddenTab;
  };

  resolveColumnSortDirection = (column: EuiBasicTableColumn<T>) => {
    const { sorting } = this.props;
    const { sortable, field, name } = column as EuiTableFieldDataColumnType<T>;
    if (!sorting || !sorting.sort || !sortable) {
      return;
    }
    if (sorting.sort.field === field || sorting.sort.field === name) {
      return sorting.sort.direction;
    }
  };

  resolveColumnOnSort = (column: EuiBasicTableColumn<T>) => {
    const { sorting } = this.props;
    const { sortable, name } = column as EuiTableFieldDataColumnType<T>;
    if (!sorting || !sortable) {
      return;
    }
    if (!this.props.onChange) {
      throw new Error(`BasicTable is configured to be sortable on column [${name}] but
          [onChange] is not configured. This callback must be implemented to handle the sort requests`);
    }
    return () => this.onColumnSortChange(column);
  };

  getRendererForDataType(dataType: EuiTableDataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(
        `Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(
          ', '
        )}]`
      );
    }
    return profile.render;
  }

  getAlignForDataType(dataType: EuiTableDataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(
        `Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(
          ', '
        )}]`
      );
    }
    return profile.align;
  }

  renderPaginationBar() {
    const { error, pagination, tableCaption, onChange } = this.props;
    if (!error && pagination && pagination.totalItemCount > 0) {
      if (!onChange) {
        throw new Error(`The Basic Table is configured with pagination but [onChange] is
        not configured. This callback must be implemented to handle pagination changes`);
      }

      return (
        <EuiI18n
          token="euiBasicTable.tablePagination"
          default="Pagination for table: {tableCaption}"
          values={{ tableCaption }}
        >
          {(tablePagination: string) => (
            <PaginationBar
              pagination={pagination}
              onPageSizeChange={this.onPageSizeChange.bind(this)}
              onPageChange={this.onPageChange.bind(this)}
              aria-controls={this.tableId}
              aria-label={tablePagination}
            />
          )}
        </EuiI18n>
      );
    }
  }
}
