import React, { Component, Fragment, ReactNode } from 'react';
import PropTypes from 'prop-types';
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
  CENTER_ALIGNMENT,
  HorizontalAlignment,
  SortDirection,
  Direction,
  PropertySort,
} from '../../services';
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
import { COLORS as BUTTON_ICON_COLORS } from '../button/button_icon/button_icon';
import { ICON_TYPES } from '../icon';
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

type DataType = 'auto' | 'string' | 'number' | 'boolean' | 'date';
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

type Item = Record<string, any>;
type ItemIdToExpandedRowMap = Record<string, any>;

const DefaultItemActionType = PropTypes.shape({
  type: PropTypes.oneOf(['icon', 'button']), // default is 'button'
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func, // (item) => void,
  href: PropTypes.string,
  target: PropTypes.string,
  available: PropTypes.func, // (item) => boolean;
  enabled: PropTypes.func, // (item) => boolean;
  isPrimary: PropTypes.bool,
  icon: PropTypes.oneOfType([
    // required when type is 'icon'
    PropTypes.oneOf(ICON_TYPES),
    PropTypes.func, // (item) => oneOf(ICON_TYPES)
  ]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_ICON_COLORS),
    PropTypes.func, // (item) => oneOf(ICON_BUTTON_COLORS)
  ]),
  'data-test-subj': PropTypes.string,
});

const CustomItemActionType = PropTypes.shape({
  render: PropTypes.func.isRequired, // (item, enabled) => PropTypes.node;
  available: PropTypes.func, // (item) => boolean;
  enabled: PropTypes.func, // (item) => boolean;
  isPrimary: PropTypes.bool,
});

const SupportedItemActionType = PropTypes.oneOfType([
  DefaultItemActionType,
  CustomItemActionType,
]);

export const ActionsColumnType = PropTypes.shape({
  actions: PropTypes.arrayOf(SupportedItemActionType).isRequired,
  name: PropTypes.node,
  description: PropTypes.string,
  width: PropTypes.string,
});

export const FieldDataColumnTypeShape = {
  field: PropTypes.string.isRequired,
  name: PropTypes.node.isRequired,
  description: PropTypes.string,
  dataType: PropTypes.oneOf(DATA_TYPES),
  width: PropTypes.string,
  sortable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  align: PropTypes.oneOf([LEFT_ALIGNMENT, CENTER_ALIGNMENT, RIGHT_ALIGNMENT]),
  truncateText: PropTypes.bool,
  render: PropTypes.func, // ((value, record) => PropTypes.node (also see [services/value_renderer] for basic implementations)
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func, // ({ items, pagination }) => PropTypes.node
  ]),
};
export const FieldDataColumnType = PropTypes.shape(FieldDataColumnTypeShape);

export const ComputedColumnType = PropTypes.shape({
  render: PropTypes.func.isRequired, // (record) => PropTypes.node
  name: PropTypes.node,
  description: PropTypes.string,
  sortable: PropTypes.func,
  width: PropTypes.string,
  truncateText: PropTypes.bool,
});

export const ColumnType = PropTypes.oneOfType([
  FieldDataColumnType,
  ComputedColumnType,
  ActionsColumnType,
]);

export const ItemIdType = PropTypes.oneOfType([
  PropTypes.string, // the name of the item id property
  PropTypes.func, // (item) => string
]);

export const SelectionType = PropTypes.shape({
  onSelectionChange: PropTypes.func, // (selection: item[]) => void;,
  selectable: PropTypes.func, // (item) => boolean;
  selectableMessage: PropTypes.func, // (selectable, item) => string;
});

export function getItemId(item: any, itemId?: any) {
  if (itemId) {
    if (isFunction(itemId)) {
      return itemId(item);
    }
    return item[itemId];
  }
}

function getRowProps(item: Item, rowProps: any) {
  if (rowProps) {
    if (isFunction(rowProps)) {
      return rowProps(item);
    }
    return rowProps;
  }

  return {};
}

function getCellProps(item: Item, column: any, cellProps: any) {
  if (cellProps) {
    if (isFunction(cellProps)) {
      return cellProps(item, column);
    }
    return cellProps;
  }

  return {};
}

function getColumnFooter(column: any, { items, pagination }: any) {
  if (column.footer) {
    if (isFunction(column.footer)) {
      return column.footer({ items, pagination });
    }
    return column.footer;
  }

  return undefined;
}

interface FooterProps {
  items: Item[];
  pagination: Pagination;
}

export interface FieldDataColumnType {
  field: string;
  name: ReactNode;
  description?: string;
  dataType?: DataType;
  width?: string;
  sortable?: boolean | ((...args: any) => any);
  align?: HorizontalAlignment;
  truncateText?: boolean;
  render?: (value: any, record: any) => ReactNode;
  footer?: string | React.ReactElement | ((props: FooterProps) => ReactNode);
}

export interface ComputedColumnType {
  render: (record: any) => ReactNode;
  name?: ReactNode;
  description?: string;
  sortable?: (...args: any) => any;
  width?: string;
  truncateText?: boolean;
}

export interface ActionsColumnType {
  actions: Action[];
  name?: ReactNode;
  description?: string;
  width?: string;
}

export type Column =
  | FieldDataColumnType
  | ComputedColumnType
  | ActionsColumnType;

interface SelectionType {
  onSelectionChange?: (selection: any) => void;
  selectable?: (item: Item) => boolean;
  selectableMessage?: (selectable: any, item: Item) => string;
}

interface SortingType {
  sort?: PropertySort;
  allowNeutralSort?: boolean;
}

export interface Props {
  itemId?: string | ((item: Item) => string);
  itemIdToExpandedRowMap?: ItemIdToExpandedRowMap;
  items: Item[];
  cellProps?: object | ((...args: any) => any);
  className?: string;
  columns: Column[];
  compressed?: boolean;
  error?: string;
  hasActions?: boolean;
  isExpandable?: boolean;
  isSelectable?: boolean;
  loading?: boolean;
  noItemsMessage?: ReactNode;
  onChange?: (...args: any) => any;
  pagination?: Pagination;
  responsive?: boolean;
  rowProps?: object | ((...args: any) => any);
  selection?: SelectionType;
  sorting?: SortingType;
}

interface State {
  selection: any;
}

interface Criteria {
  page?: {
    index: number;
    size: number;
  };
  sort?: PropertySort;
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

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (!nextProps.selection) {
      // next props doesn't have a selection, reset our state
      return { selection: [] };
    }

    const { itemId } = nextProps;
    const selection = prevState.selection.filter(
      (selectedItem: any) =>
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

  changeSelection(selection: any) {
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

  onColumnSortChange(column: any) {
    this.clearSelection();
    const currentCriteria = EuiBasicTable.buildCriteria(this.props);
    let direction: Direction = SortDirection.ASC;
    if (
      currentCriteria &&
      currentCriteria.sort &&
      (currentCriteria.sort.field === column.field ||
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
        field: column.field || column.name,
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

    columns.forEach((column: any, index: number) => {
      if (!column.sortable || column.hideForMobile) {
        return;
      }

      const sortDirection = this.resolveColumnSortDirection(column);

      items.push({
        name: column.name,
        key: `_data_s_${column.field}_${index}`,
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
        <caption role="status" aria-relevant="text" aria-live="polite">
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

    columns.forEach((column: any, index: number) => {
      const {
        actions,
        width,
        name,
        field,
        align,
        dataType,
        sortable,
        mobileOptions,
        isMobileHeader,
        hideForMobile,
      } = column;

      const columnAlign = align || this.getAlignForDataType(dataType);

      // actions column
      if (actions) {
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
      if (!field) {
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

    columns.forEach((column: any) => {
      const footer = getColumnFooter(column, { items, pagination });
      if (
        (column.mobileOptions && column.mobileOptions.only) ||
        column.isMobileHeader
      ) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <EuiTableFooterCell
            key={`footer_${column.field}`}
            align={column.align}>
            {footer}
          </EuiTableFooterCell>
        );
        hasDefinedFooter = true;
      } else {
        // Footer is undefined, so create an empty cell to preserve layout
        footers.push(
          <EuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={column.align}>
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
          (selectedItem: any) =>
            getItemId(selectedItem, itemIdCallback) === itemId
        );

    let calculatedHasSelection;
    if (selection) {
      cells.push(this.renderItemSelectionCell(itemId, item, selected));
      calculatedHasSelection = true;
    }

    let calculatedHasActions;
    columns.forEach((column: any, columnIndex: number) => {
      if (column.actions) {
        cells.push(
          this.renderItemActionsCell(itemId, item, column, columnIndex)
        );
        calculatedHasActions = true;
      } else if (column.field) {
        cells.push(
          this.renderItemFieldDataCell(itemId, item, column, columnIndex)
        );
      } else {
        cells.push(
          this.renderItemComputedCell(itemId, item, column, columnIndex)
        );
      }
    });

    // Occupy full width of table, taking checkbox & mobile only columns into account.
    let expandedRowColSpan = selection ? columns.length + 1 : columns.length;

    const mobileOnlyCols = columns.reduce((num: number, column: any) => {
      if (column.mobileOptions && column.mobileOptions.only) {
        return num + 1;
      }

      return column.isMobileHeader ? num + 1 : num + 0; // BWC only
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
    const rowProps = getRowProps(item, rowPropsCallback);
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
        {rowProps.onClick ? (
          <EuiKeyboardAccessible>{row}</EuiKeyboardAccessible>
        ) : (
          row
        )}
        {expandedRow}
      </Fragment>
    );
  }

  renderItemSelectionCell(itemId: any, item: Item, selected: any) {
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
          this.state.selection.reduce((selection: any, selectedItem: any) => {
            if (getItemId(selectedItem, itemIdCallback) !== itemId) {
              selection.push(selectedItem);
            }
            return selection;
          }, [])
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
    itemId: any,
    item: Item,
    column: any,
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
    itemId: any,
    item: Item,
    column: any,
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
    itemId: any,
    item: Item,
    column: any,
    columnIndex: number
  ) {
    const { render, dataType } = column;

    const key = `_computed_column_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType(dataType);
    const content = contentRenderer(item);

    return this.renderItemCell(item, column, key, content);
  }

  renderItemCell(item: Item, column: any, key: string | number, content: any) {
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
    } = column;
    const columnAlign = align || this.getAlignForDataType(dataType);
    const { cellProps: cellPropsCallback } = this.props;
    const cellProps = getCellProps(item, column, cellPropsCallback);

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

  resolveColumnSortDirection = (column: any) => {
    const { sorting } = this.props;
    if (!sorting || !sorting.sort || !column.sortable) {
      return;
    }
    if (
      sorting.sort.field === column.field ||
      sorting.sort.field === column.name
    ) {
      return sorting.sort.direction;
    }
  };

  resolveColumnOnSort = (column: any) => {
    const { sorting } = this.props;
    if (!sorting || !column.sortable) {
      return;
    }
    if (!this.props.onChange) {
      throw new Error(`BasicTable is configured to be sortable on column [${
        column.name
      }] but
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
