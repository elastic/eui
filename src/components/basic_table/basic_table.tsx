import React, { Component, Fragment, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  SortDirection,
  Direction,
  PropertySort,
} from '../../services';
import { CommonProps } from '../common';
import { isFunction } from '../../services/predicate';
import { get } from '../../services/objects';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiTable } from '../table/table';
import { EuiTableHeaderCellCheckbox } from '../table/table_header_cell_checkbox';
// @ts-ignore
import { EuiCheckbox } from '../form/checkbox/checkbox';
import { EuiTableHeaderCell } from '../table/table_header_cell';
import { EuiTableHeader } from '../table/table_header';
import { EuiTableBody } from '../table/table_body';
import { EuiTableFooterCell } from '../table/table_footer_cell';
import { EuiTableFooter } from '../table/table_footer';
import { EuiTableRowCellCheckbox } from '../table/table_row_cell_checkbox';
import { CollapsedItemActions } from './collapsed_item_actions';
import { ExpandedItemActions } from './expanded_item_actions';
import { EuiTableRowCell } from '../table/table_row_cell';
import { EuiTableRow } from '../table/table_row';
import { PaginationBar, Pagination } from './pagination_bar';
import { EuiIcon } from '../icon/icon';
import { LoadingTableBody } from './loading_table_body';
import { EuiTableHeaderMobile } from '../table/mobile/table_header_mobile';
import { EuiTableSortMobile } from '../table/mobile/table_sort_mobile';
import { EuiScreenReaderOnly, EuiKeyboardAccessible } from '../accessibility';
import { EuiI18n } from '../i18n';
import { EuiDelayRender } from '../delay_render';
import makeId from '../form/form_row/make_id';
import { Action } from './action_types';
import {
  Item,
  ItemId,
  DataType,
  FooterProps,
  ActionsColumnType,
  ComputedColumnType,
  FieldDataColumnType,
  SelectionType,
  SortingType,
} from './table_types';

type DataTypeProfiles = Record<
  DataType,
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

type ItemIdToExpandedRowMap = any;

export function getItemId(item: Item, itemId?: ItemId) {
  if (itemId) {
    if (isFunction(itemId)) {
      return itemId(item);
    }
    return item[itemId];
  }
}

function getRowProps(item: Item, rowProps: RowPropsCallback) {
  if (rowProps) {
    if (isFunction(rowProps)) {
      return rowProps(item);
    }
    return rowProps;
  }

  return {};
}

function getCellProps(
  item: Item,
  column: Column,
  cellProps: CellPropsCallback
) {
  if (cellProps) {
    if (isFunction(cellProps)) {
      return cellProps(item, column);
    }
    return cellProps;
  }

  return {};
}

function getColumnFooter(column: Column, { items, pagination }: FooterProps) {
  const { footer } = column as FieldDataColumnType;
  if (footer) {
    if (isFunction(footer)) {
      return footer({ items, pagination });
    }
    return footer;
  }

  return undefined;
}

export type Column =
  | FieldDataColumnType
  | ComputedColumnType
  | ActionsColumnType;

interface Criteria {
  page?: {
    index: number;
    size: number;
  };
  sort?: PropertySort;
}

type CellPropsCallback = (item: Item, column: Column) => object;
type RowPropsCallback = (item: Item) => object;

interface BasicTableProps {
  itemId?: ItemId;
  itemIdToExpandedRowMap?: ItemIdToExpandedRowMap;
  items: Item[];
  cellProps?: object | CellPropsCallback;
  columns: Column[];
  compressed?: boolean;
  error?: string;
  hasActions?: boolean;
  isExpandable?: boolean;
  isSelectable?: boolean;
  loading?: boolean;
  noItemsMessage?: ReactNode;
  onChange?: (criteria: Criteria) => void;
  pagination?: Pagination;
  responsive?: boolean;
  rowProps?: object | RowPropsCallback;
  selection?: SelectionType;
  sorting?: SortingType;
}

export type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  BasicTableProps;

interface State {
  selection: Item[];
}

interface SortOptions {
  isSorted?: boolean;
  isSortAscending?: boolean;
  onSort?: () => void;
  allowNeutralSort?: boolean;
}

export class EuiBasicTable extends Component<Props, State> {
  static defaultProps = {
    responsive: true,
    noItemsMessage: 'No items found',
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!nextProps.selection) {
      // next props doesn't have a selection, reset our state
      return { selection: [] };
    }

    const { itemId } = nextProps;
    const selection = prevState.selection.filter(
      (selectedItem: Item) =>
        nextProps.items.findIndex(
          (item: Item) =>
            getItemId(item, itemId) === getItemId(selectedItem, itemId)
        ) !== -1
    );

    if (selection.length !== prevState.selection.length) {
      if (nextProps.selection.onSelectionChange) {
        nextProps.selection.onSelectionChange(selection);
      }

      return { selection };
    }

    return null;
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      selection: [],
    };
  }

  static buildCriteria(props: Props): Criteria {
    const criteria: Criteria = {};
    if (props.pagination) {
      criteria.page = {
        index: props.pagination.pageIndex,
        size: props.pagination.pageSize,
      };
    }
    if (props.sorting) {
      criteria.sort = props.sorting.sort;
    }
    return criteria;
  }

  changeSelection(selection: Item[]) {
    if (!this.props.selection) {
      return;
    }
    this.setState({ selection });
    if (this.props.selection.onSelectionChange) {
      this.props.selection.onSelectionChange(selection);
    }
  }

  clearSelection() {
    this.changeSelection([]);
  }

  onPageSizeChange(size: number) {
    this.clearSelection();
    const currentCriteria = EuiBasicTable.buildCriteria(this.props);
    const criteria: Criteria = {
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
    const currentCriteria = EuiBasicTable.buildCriteria(this.props);
    const criteria: Criteria = {
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

  onColumnSortChange(column: Column) {
    this.clearSelection();
    const currentCriteria = EuiBasicTable.buildCriteria(this.props);
    let direction: Direction = SortDirection.ASC;
    if (
      currentCriteria &&
      currentCriteria.sort &&
      (currentCriteria.sort.field === (column as FieldDataColumnType).field ||
        currentCriteria.sort.field === column.name)
    ) {
      direction = SortDirection.reverse(currentCriteria.sort.direction);
    }
    const criteria: Criteria = {
      ...currentCriteria,
      // resetting the page if the criteria has one
      page: !currentCriteria.page
        ? undefined
        : {
            index: 0,
            size: currentCriteria.page.size,
          },
      sort: {
        field: (column as FieldDataColumnType).field || (column.name as string),
        direction,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(criteria);
    }
  }

  render() {
    const {
      className,
      loading,
      items, // eslint-disable-line no-unused-vars
      itemId, // eslint-disable-line no-unused-vars
      columns, // eslint-disable-line no-unused-vars
      pagination, // eslint-disable-line no-unused-vars
      sorting, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      error, // eslint-disable-line no-unused-vars
      noItemsMessage, // eslint-disable-line no-unused-vars
      compressed, // eslint-disable-line no-unused-vars
      itemIdToExpandedRowMap, // eslint-disable-line no-unused-vars
      responsive, // eslint-disable-line no-unused-vars
      isSelectable, // eslint-disable-line no-unused-vars
      isExpandable, // eslint-disable-line no-unused-vars
      hasActions, // eslint-disable-line no-unused-vars
      rowProps, // eslint-disable-line no-unused-vars
      cellProps, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames(
      'euiBasicTable',
      {
        'euiBasicTable-loading': loading,
      },
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
    const { compressed, responsive } = this.props;

    const mobileHeader = responsive ? (
      <EuiTableHeaderMobile>
        <EuiFlexGroup
          responsive={false}
          justifyContent="spaceBetween"
          alignItems="baseline">
          <EuiFlexItem grow={false}>{this.renderSelectAll(true)}</EuiFlexItem>
          <EuiFlexItem grow={false}>{this.renderTableMobileSort()}</EuiFlexItem>
        </EuiFlexGroup>
      </EuiTableHeaderMobile>
    ) : (
      undefined
    );
    const caption = this.renderTableCaption();
    const head = this.renderTableHead();
    const body = this.renderTableBody();
    const footer = this.renderTableFooter();
    return (
      <div>
        {mobileHeader}
        <EuiTable responsive={responsive} compressed={compressed}>
          {caption}
          {head}
          {body}
          {footer}
        </EuiTable>
      </div>
    );
  }

  renderTableMobileSort() {
    const { columns, sorting } = this.props;
    const items: Item[] = [];

    if (!sorting) {
      return null;
    }

    columns.forEach((column: Column, index: number) => {
      if (
        !(column as FieldDataColumnType).sortable ||
        (column as FieldDataColumnType).hideForMobile
      ) {
        return;
      }

      const sortDirection = this.resolveColumnSortDirection(column);

      items.push({
        name: column.name,
        key: `_data_s_${(column as FieldDataColumnType).field}_${index}`,
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
    const { items } = this.props;

    return (
      <EuiScreenReaderOnly>
        <caption
          className="euiTableCaption"
          role="status"
          aria-relevant="text"
          aria-live="polite">
          <EuiDelayRender>
            <EuiI18n
              token="euiBasicTable.tableDescription"
              default="Below is a table of {itemCount} items."
              values={{ itemCount: items.length }}
            />
          </EuiDelayRender>
        </caption>
      </EuiScreenReaderOnly>
    );
  }

  renderSelectAll = (isMobile: boolean) => {
    const { items, selection } = this.props;

    if (!selection) {
      return;
    }

    const selectableItems = items.filter(
      (item: Item) => !selection.selectable || selection.selectable(item)
    );

    const checked =
      this.state.selection &&
      selectableItems.length > 0 &&
      this.state.selection.length === selectableItems.length;

    const disabled = selectableItems.length === 0;

    const onChange = (event: any) => {
      if (event.target.checked) {
        this.changeSelection(selectableItems);
      } else {
        this.changeSelection([]);
      }
    };

    return (
      <EuiI18n token="euiBasicTable.selectAllRows" default="Select all rows">
        {(selectAllRows: string) => (
          <EuiCheckbox
            id={`_selection_column-checkbox_${makeId()}`}
            type={isMobile ? null : 'inList'}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            // Only add data-test-subj to one of the checkboxes
            data-test-subj={isMobile ? null : 'checkboxSelectAll'}
            aria-label={selectAllRows}
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
        <EuiTableHeaderCellCheckbox key="_selection_column_h" width="24px">
          {this.renderSelectAll(false)}
        </EuiTableHeaderCellCheckbox>
      );
    }

    columns.forEach((column: Column, index: number) => {
      const {
        field,
        width,
        name,
        align,
        dataType,
        sortable,
        mobileOptions,
        isMobileHeader,
        hideForMobile,
      } = column as FieldDataColumnType;

      const columnAlign = align || this.getAlignForDataType(dataType);

      // actions column
      if ((column as ActionsColumnType).actions) {
        headers.push(
          <EuiTableHeaderCell
            key={`_actions_h_${index}`}
            align="right"
            width={width}
            mobileOptions={mobileOptions}>
            {name}
          </EuiTableHeaderCell>
        );
        return;
      }

      // computed column
      if (!(column as FieldDataColumnType).field) {
        const sorting: SortOptions = {};
        // computed columns are only sortable if their `sortable` is a function
        if (this.props.sorting && typeof sortable === 'function') {
          const sortDirection = this.resolveColumnSortDirection(column);
          sorting.isSorted = !!sortDirection;
          sorting.isSortAscending = sortDirection
            ? SortDirection.isAsc(sortDirection)
            : undefined;
          sorting.onSort = this.resolveColumnOnSort(column);
          sorting.allowNeutralSort = this.props.sorting.allowNeutralSort;
        }
        headers.push(
          <EuiTableHeaderCell
            key={`_computed_column_h_${index}`}
            align={columnAlign}
            width={width}
            mobileOptions={mobileOptions}
            data-test-subj={`tableHeaderCell_${name}_${index}`}
            {...sorting}>
            {name}
          </EuiTableHeaderCell>
        );
        return;
      }

      // field data column
      const sorting: SortOptions = {};
      if (this.props.sorting && sortable) {
        const sortDirection = this.resolveColumnSortDirection(column);
        sorting.isSorted = !!sortDirection;
        sorting.isSortAscending = sortDirection
          ? SortDirection.isAsc(sortDirection)
          : undefined;
        sorting.onSort = this.resolveColumnOnSort(column);
        sorting.allowNeutralSort = this.props.sorting.allowNeutralSort;
      }
      headers.push(
        <EuiTableHeaderCell
          key={`_data_h_${field}_${index}`}
          align={columnAlign}
          width={width}
          isMobileHeader={isMobileHeader}
          hideForMobile={hideForMobile}
          mobileOptions={mobileOptions}
          data-test-subj={`tableHeaderCell_${field}_${index}`}
          {...sorting}>
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

    columns.forEach((column: Column) => {
      const footer = getColumnFooter(column, { items, pagination });
      const {
        mobileOptions,
        isMobileHeader,
        field,
        align,
      } = column as FieldDataColumnType;

      if ((mobileOptions && mobileOptions!.only) || isMobileHeader) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <EuiTableFooterCell key={`footer_${field}`} align={align}>
            {footer}
          </EuiTableFooterCell>
        );
        hasDefinedFooter = true;
      } else {
        // Footer is undefined, so create an empty cell to preserve layout
        footers.push(
          <EuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={align}>
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
    if (this.props.error) {
      return this.renderErrorBody(this.props.error);
    }
    const { items } = this.props;
    if (items.length === 0) {
      return this.renderEmptyBody();
    }

    const rows = items.map((item: Item, index: number) => {
      // if there's pagination the item's index must be adjusted to the where it is in the whole dataset
      const tableItemIndex = this.props.pagination
        ? this.props.pagination.pageIndex * this.props.pagination.pageSize +
          index
        : index;
      return this.renderItemRow(item, tableItemIndex);
    });
    if (this.props.loading) {
      return <LoadingTableBody>{rows}</LoadingTableBody>;
    }
    return <EuiTableBody>{rows}</EuiTableBody>;
  }

  renderErrorBody(error: string) {
    const colSpan = this.props.columns.length + (this.props.selection ? 1 : 0);
    return (
      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell
            align="center"
            colSpan={colSpan}
            isMobileFullWidth={true}>
            <EuiIcon type="minusInCircle" color="danger" /> {error}
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    );
  }

  renderEmptyBody() {
    const { columns, selection, noItemsMessage } = this.props;
    const colSpan = columns.length + (selection ? 1 : 0);
    return (
      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell
            align="center"
            colSpan={colSpan}
            isMobileFullWidth={true}>
            {noItemsMessage}
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    );
  }

  renderItemRow(item: Item, rowIndex: number) {
    const {
      columns,
      selection,
      isSelectable,
      hasActions,
      itemIdToExpandedRowMap = {},
      isExpandable,
    } = this.props;

    const cells = [];

    const { itemId: itemIdCallback } = this.props;
    const itemId = getItemId(item, itemIdCallback) || rowIndex;
    const selected = !selection
      ? false
      : this.state.selection &&
        !!this.state.selection.find(
          (selectedItem: Item) =>
            getItemId(selectedItem, itemIdCallback) === itemId
        );

    let calculatedHasSelection;
    if (selection) {
      cells.push(this.renderItemSelectionCell(itemId, item, selected));
      calculatedHasSelection = true;
    }

    let calculatedHasActions;
    columns.forEach((column: Column, columnIndex: number) => {
      if ((column as ActionsColumnType).actions) {
        cells.push(
          this.renderItemActionsCell(
            itemId,
            item,
            column as ActionsColumnType,
            columnIndex
          )
        );
        calculatedHasActions = true;
      } else if ((column as FieldDataColumnType).field) {
        cells.push(
          this.renderItemFieldDataCell(
            itemId,
            item,
            column as FieldDataColumnType,
            columnIndex
          )
        );
      } else {
        cells.push(
          this.renderItemComputedCell(
            itemId,
            item,
            column as ComputedColumnType,
            columnIndex
          )
        );
      }
    });

    // Occupy full width of table, taking checkbox & mobile only columns into account.
    let expandedRowColSpan = selection ? columns.length + 1 : columns.length;

    const mobileOnlyCols = columns.reduce((num: number, column: Column) => {
      if (
        (column as FieldDataColumnType).mobileOptions &&
        (column as FieldDataColumnType).mobileOptions!.only
      ) {
        return num + 1;
      }

      return (column as FieldDataColumnType).isMobileHeader ? num + 1 : num + 0; // BWC only
    }, 0);

    expandedRowColSpan = expandedRowColSpan - mobileOnlyCols;

    // We'll use the ID to associate the expanded row with the original.
    const hasExpandedRow = itemIdToExpandedRowMap.hasOwnProperty(itemId);
    const expandedRowId = hasExpandedRow
      ? `row_${itemId}_expansion`
      : undefined;
    const expandedRow = hasExpandedRow ? (
      <EuiTableRow
        id={expandedRowId}
        isExpandedRow={true}
        isSelectable={isSelectable}>
        <EuiTableRowCell colSpan={expandedRowColSpan} textOnly={false}>
          {itemIdToExpandedRowMap[itemId]}
        </EuiTableRowCell>
      </EuiTableRow>
    ) : (
      undefined
    );

    const { rowProps: rowPropsCallback } = this.props;
    const rowProps = getRowProps(item, rowPropsCallback as RowPropsCallback);
    const row = (
      <EuiTableRow
        aria-owns={expandedRowId}
        isSelectable={
          isSelectable == null ? calculatedHasSelection : isSelectable
        }
        isSelected={selected}
        hasActions={hasActions == null ? calculatedHasActions : hasActions}
        isExpandable={isExpandable}
        {...rowProps}>
        {cells}
      </EuiTableRow>
    );

    return (
      <Fragment key={`row_${itemId}`}>
        {(rowProps as any).onClick ? (
          <EuiKeyboardAccessible>{row}</EuiKeyboardAccessible>
        ) : (
          row
        )}
        {expandedRow}
      </Fragment>
    );
  }

  renderItemSelectionCell(itemId: ItemId, item: Item, selected: boolean) {
    const { selection } = this.props;
    const key = `_selection_column_${itemId}`;
    const checked = selected;
    const disabled = selection!.selectable && !selection!.selectable(item);
    const title =
      selection!.selectableMessage &&
      selection!.selectableMessage(!disabled, item);
    const onChange = (event: any) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selection, item]);
      } else {
        const { itemId: itemIdCallback } = this.props;
        this.changeSelection(
          this.state.selection.reduce(
            (selection: Item[], selectedItem: Item) => {
              if (getItemId(selectedItem, itemIdCallback) !== itemId) {
                selection.push(selectedItem);
              }
              return selection;
            },
            []
          )
        );
      }
    };
    return (
      <EuiTableRowCellCheckbox key={key}>
        <EuiI18n token="euiBasicTable.selectThisRow" default="Select this row">
          {(selectThisRow: string) => (
            <EuiCheckbox
              id={`${key}-checkbox`}
              type="inList"
              disabled={disabled}
              checked={checked}
              onChange={onChange}
              title={title || selectThisRow}
              aria-label={title || selectThisRow}
              data-test-subj={`checkboxSelectRow-${itemId}`}
            />
          )}
        </EuiI18n>
      </EuiTableRowCellCheckbox>
    );
  }

  renderItemActionsCell(
    itemId: ItemId,
    item: Item,
    column: ActionsColumnType,
    columnIndex: number
  ) {
    const actionEnabled = (action: Action) =>
      this.state.selection.length === 0 &&
      (!action.enabled || action.enabled(item));

    let actualActions = column.actions;
    if (column.actions.length > 2) {
      // if any of the actions `isPrimary`, add them inline as well, but only the first 2
      const primaryActions = column.actions.filter((o: Action) => o.isPrimary);
      actualActions = primaryActions.slice(0, 2);

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the configured actions

      actualActions.push({
        name: 'All actions',
        render: (item: Item) => {
          return (
            <CollapsedItemActions
              actions={column.actions}
              itemId={itemId}
              item={item}
              actionEnabled={actionEnabled}
            />
          );
        },
      });
    }

    const tools = (
      <ExpandedItemActions
        actions={actualActions}
        itemId={itemId}
        item={item}
        actionEnabled={actionEnabled}
      />
    );

    const key = `record_actions_${itemId}_${columnIndex}`;
    return (
      <EuiTableRowCell
        showOnHover={true}
        key={key}
        align="right"
        textOnly={false}
        hasActions={true}>
        {tools}
      </EuiTableRowCell>
    );
  }

  renderItemFieldDataCell(
    itemId: ItemId,
    item: Item,
    column: FieldDataColumnType,
    columnIndex: number
  ) {
    const { field, render, dataType } = column;

    const key = `_data_column_${field}_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType(dataType);
    const value = get(item, field);
    const content = contentRenderer(value, item);

    return this.renderItemCell(item, column, key, content);
  }

  renderItemComputedCell(
    itemId: ItemId,
    item: Item,
    column: ComputedColumnType,
    columnIndex: number
  ) {
    const { render } = column;

    const key = `_computed_column_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType();
    const content = contentRenderer(item);

    return this.renderItemCell(item, column, key, content);
  }

  renderItemCell(
    item: Item,
    column: Column,
    key: string | number,
    content: ReactNode
  ) {
    const {
      align,
      render,
      dataType,
      isExpander,
      textOnly,
      name,
      field, // eslint-disable-line no-unused-vars
      description, // eslint-disable-line no-unused-vars
      sortable, // eslint-disable-line no-unused-vars
      footer, // eslint-disable-line no-unused-vars
      mobileOptions,
      ...rest
    } = column as FieldDataColumnType;
    const columnAlign = align || this.getAlignForDataType(dataType);
    const { cellProps: cellPropsCallback } = this.props;
    const cellProps = getCellProps(
      item,
      column,
      cellPropsCallback as CellPropsCallback
    );

    return (
      <EuiTableRowCell
        key={key}
        align={columnAlign}
        isExpander={isExpander}
        textOnly={textOnly || !render}
        mobileOptions={{
          ...mobileOptions,
          render:
            mobileOptions && mobileOptions.render && mobileOptions.render(item),
          header:
            mobileOptions && mobileOptions.header === false ? false : name,
        }}
        {...cellProps}
        {...rest}>
        {content}
      </EuiTableRowCell>
    );
  }

  resolveColumnSortDirection = (column: Column) => {
    const { sorting } = this.props;
    const { sortable, field, name } = column as FieldDataColumnType;
    if (!sorting || !sorting.sort || !sortable) {
      return;
    }
    if (sorting.sort.field === field || sorting.sort.field === name) {
      return sorting.sort.direction;
    }
  };

  resolveColumnOnSort = (column: Column) => {
    const { sorting } = this.props;
    const { sortable, name } = column as FieldDataColumnType;
    if (!sorting || !sortable) {
      return;
    }
    if (!this.props.onChange) {
      throw new Error(`BasicTable is configured to be sortable on column [${name}] but
          [onChange] is not configured. This callback must be implemented to handle the sort requests`);
    }
    return () => this.onColumnSortChange(column);
  };

  getRendererForDataType(dataType: DataType = 'auto') {
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

  getAlignForDataType(dataType: DataType = 'auto') {
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
    const { error, pagination, onChange } = this.props;
    if (!error && pagination) {
      if (!onChange) {
        throw new Error(`The Basic Table is configured with pagination but [onChange] is
        not configured. This callback must be implemented to handle pagination changes`);
      }
      return (
        <PaginationBar
          pagination={pagination}
          onPageSizeChange={this.onPageSizeChange.bind(this)}
          onPageChange={this.onPageChange.bind(this)}
        />
      );
    }
  }
}
