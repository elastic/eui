import React, {
  Component,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  formatAuto, formatBoolean, formatDate, formatNumber, formatText, LEFT_ALIGNMENT, PropertySortType,
  RIGHT_ALIGNMENT, SortDirection
} from '../../services';
import { isFunction } from '../../services/predicate';
import { get } from '../../services/objects';
import { EuiTable } from '../table/table';
import { EuiTableHeaderCellCheckbox } from '../table/table_header_cell_checkbox';
import { EuiCheckbox } from '../form/checkbox/checkbox';
import { EuiTableHeaderCell } from '../table/table_header_cell';
import { EuiTableHeader } from '../table/table_header';
import { EuiTableBody } from '../table/table_body';
import { EuiTableRowCellCheckbox } from '../table/table_row_cell_checkbox';
import { COLORS as BUTTON_ICON_COLORS } from '../button/button_icon/button_icon';
import { ICON_TYPES } from '../icon';
import { CollapsedItemActions } from './collapsed_item_actions';
import { ExpandedItemActions } from './expanded_item_actions';
import { EuiTableRowCell } from '../table/table_row_cell';
import { EuiTableRow } from '../table/table_row';
import { PaginationBar, PaginationType } from './pagination_bar';
import { EuiIcon } from '../icon/icon';
import { LoadingTableBody } from './loading_table_body';

const dataTypesProfiles = {
  auto: {
    align: LEFT_ALIGNMENT,
    render: value => formatAuto(value)
  },
  string: {
    align: LEFT_ALIGNMENT,
    render: value => formatText(value)
  },
  number: {
    align: RIGHT_ALIGNMENT,
    render: value => formatNumber(value),
  },
  boolean: {
    align: LEFT_ALIGNMENT,
    render: value => formatBoolean(value),
  },
  date: {
    align: LEFT_ALIGNMENT,
    render: value => formatDate(value),
  }
};

const DATA_TYPES = Object.keys(dataTypesProfiles);

const DefaultItemActionType = PropTypes.shape({
  type: PropTypes.oneOf([ 'icon', 'button' ]), // default is 'button'
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // (item) => void,
  available: PropTypes.func, // (item) => boolean;
  enabled: PropTypes.func, // (item) => boolean;
  icon: PropTypes.oneOfType([ // required when type is 'icon'
    PropTypes.oneOf(ICON_TYPES),
    PropTypes.func // (item) => oneOf(ICON_TYPES)
  ]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_ICON_COLORS),
    PropTypes.func // (item) => oneOf(ICON_BUTTON_COLORS)
  ])
});

const CustomItemActionType = PropTypes.shape({
  render: PropTypes.func.isRequired,  // (item, enabled) => PropTypes.node;
  available: PropTypes.func, // (item) => boolean;
  enabled: PropTypes.func // (item) => boolean;
});

const SupportedItemActionType = PropTypes.oneOfType([
  DefaultItemActionType,
  CustomItemActionType
]);

const ActionsColumnType = PropTypes.shape({
  actions: PropTypes.arrayOf(SupportedItemActionType).isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  width: PropTypes.string
});

export const FieldDataColumnType = PropTypes.shape({
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataType: PropTypes.oneOf(DATA_TYPES),
  width: PropTypes.string,
  sortable: PropTypes.bool,
  align: PropTypes.oneOf([LEFT_ALIGNMENT, RIGHT_ALIGNMENT]),
  truncateText: PropTypes.bool,
  render: PropTypes.func // ((value, record) => PropTypes.node (also see [services/value_renderer] for basic implementations)
});

export const ComputedColumnType = PropTypes.shape({
  render: PropTypes.func.isRequired, // (record) => PropTypes.node
  name: PropTypes.string,
  description: PropTypes.string,
  width: PropTypes.string,
  truncateText: PropTypes.bool
});

export const ColumnType = PropTypes.oneOfType([FieldDataColumnType, ComputedColumnType, ActionsColumnType]);

const ItemIdType = PropTypes.oneOfType([
  PropTypes.string, // the name of the item id property
  PropTypes.func    // (item) => string
]);

export const SelectionType = PropTypes.shape({
  itemId: ItemIdType.isRequired,
  onSelectionChange: PropTypes.func, // (selection: Record[]) => void;,
  selectable: PropTypes.func, // (item) => boolean;
  selectableMessage: PropTypes.func // (selectable, item) => boolean;
});

const SortingType = PropTypes.shape({
  sort: PropertySortType
});

const BasicTablePropTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  pagination: PaginationType,
  sorting: SortingType,
  selection: SelectionType,
  onChange: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  noItemsMessage: PropTypes.node,
  className: PropTypes.string
};

export class EuiBasicTable extends Component {

  static propTypes = BasicTablePropTypes;
  static defaultProps = {
    noItemsMessage: 'No items found',
    itemIdToExpandedRowMap: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      hoverRow: null,
      selection: []
    };
  }

  static buildCriteria(props) {
    const criteria = {};
    if (props.pagination) {
      criteria.page = {
        index: props.pagination.pageIndex,
        size: props.pagination.pageSize
      };
    }
    if (props.sorting) {
      criteria.sort = props.sorting.sort;
    }
    return criteria;
  }

  itemId(item) {
    const { selection } = this.props;
    if (selection) {
      if (isFunction(selection.itemId)) {
        return selection.itemId(item);
      }
      return item[selection.itemId];
    }
  }

  changeSelection(selection) {
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

  onPageSizeChange(size) {
    this.clearSelection();
    const currentCriteria = EuiBasicTable.buildCriteria(this.props);
    const criteria = {
      ...currentCriteria,
      page: {
        index: 0, // when page size changes, we take the user back to the first page
        size
      }
    };
    this.props.onChange(criteria);
  }

  onPageChange(index) {
    this.clearSelection();
    const currentCriteria = EuiBasicTable.buildCriteria(this.props);
    const criteria = {
      ...currentCriteria,
      page: {
        ...currentCriteria.page,
        index
      }
    };
    this.props.onChange(criteria);
  }

  onColumnSortChange(column) {
    this.clearSelection();
    const currentCriteria = EuiBasicTable.buildCriteria(this.props);
    let direction = SortDirection.ASC;
    if (currentCriteria && currentCriteria.sort && currentCriteria.sort.field === column.field) {
      direction = SortDirection.reverse(currentCriteria.sort.direction);
    }
    const criteria = {
      ...currentCriteria,
      // resetting the page if the criteria has one
      page: !currentCriteria.page ? undefined : {
        index: 0,
        size: currentCriteria.page.size
      },
      sort: {
        field: column.field,
        direction
      }
    };
    this.props.onChange(criteria);
  }

  onRowHover(row) {
    this.setState({ hoverRow: row });
  }

  clearRowHover() {
    this.setState({ hoverRow: null });
  }

  componentWillReceiveProps(nextProps) {
    // Don't call changeSelection here or else we can get into an infinite loop:
    // changeSelection calls props.onSelectionChanged on owner ->
    // owner may react by changing props ->
    // we receive new props, calling componentWillReceiveProps ->
    // and we're in an infinite loop
    if (!this.props.selection) {
      return;
    }

    if (!nextProps.selection) {
      this.setState({ selection: [] });
      return;
    }

    this.setState(prevState => {
      const selection = prevState.selection.filter(selectedItem => (
        nextProps.items.findIndex(item => this.itemId(item) === this.itemId(selectedItem)) !== -1
      ));
      return { selection };
    });
  }

  render() {
    const { className, loading } = this.props;

    const classes = classNames(
      'euiBasicTable',
      {
        'euiBasicTable-loading': loading
      },
      className
    );

    const table = this.renderTable();
    const paginationBar = this.renderPaginationBar();

    return (
      <div className={classes}>
        {table}
        {paginationBar}
      </div>
    );
  }

  renderTable() {
    const head = this.renderTableHead();
    const body = this.renderTableBody();
    return <EuiTable>{head}{body}</EuiTable>;
  }

  renderTableHead() {

    const { items, columns, selection } = this.props;

    const headers = [];

    if (selection) {
      const selectableItems = items.filter(item => (
        !selection.selectable || selection.selectable(item)
      ));

      const checked = this.state.selection &&
        selectableItems.length > 0 &&
        this.state.selection.length === selectableItems.length;

      const disabled = selectableItems.length === 0;

      const onChange = (event) => {
        if (event.target.checked) {
          this.changeSelection(selectableItems);
        } else {
          this.changeSelection([]);
        }
      };

      headers.push(
        <EuiTableHeaderCellCheckbox key="_selection_column_h" width="24px">
          <EuiCheckbox
            id="_selection_column-checkbox"
            type="inList"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            data-test-subj="checkboxSelectAll"
          />
        </EuiTableHeaderCellCheckbox>
      );
    }

    columns.forEach((column, index) => {
      // actions column
      if (column.actions) {
        headers.push(
          <EuiTableHeaderCell
            key={`_actions_h_${index}`}
            align="right"
            width={column.width}
          >
            {column.name}
          </EuiTableHeaderCell>
        );
        return;
      }

      const align = this.resolveColumnAlign(column);

      // computed column
      if (!column.field) {
        headers.push(
          <EuiTableHeaderCell
            key={`_computed_column_h_${index}`}
            align={align}
            width={column.width}
          >
            {column.name}
          </EuiTableHeaderCell>
        );
        return;
      }

      // field data column
      const sorting = {};
      if (this.props.sorting && column.sortable) {
        const sortDirection = this.resolveColumnSortDirection(column);
        sorting.isSorted = !!sortDirection;
        sorting.isSortAscending = sortDirection ? SortDirection.isAsc(sortDirection) : undefined;
        sorting.onSort = this.resolveColumnOnSort(column);
      }
      headers.push(
        <EuiTableHeaderCell
          key={`_data_h_${column.field}_${index}`}
          align={align}
          width={column.width}
          {...sorting}
        >
          {column.name}
        </EuiTableHeaderCell>
      );
    });

    return <EuiTableHeader>{headers}</EuiTableHeader>;
  }

  renderTableBody() {
    if (this.props.error) {
      return this.renderErrorBody(this.props.error);
    }
    const { items } = this.props;
    if (items.length === 0) {
      return this.renderEmptyBody();
    }
    const rows = items.map((item, index) => {
      return this.renderItemRow(item, index);
    });
    if (this.props.loading) {
      return <LoadingTableBody>{rows}</LoadingTableBody>;
    }
    return <EuiTableBody>{rows}</EuiTableBody>;
  }

  renderErrorBody(error) {
    const colSpan = this.props.columns.length + (this.props.selection ? 1 : 0);
    return (
      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell align="center" colSpan={colSpan}>
            <EuiIcon type="minusInCircle" color="danger"/> {error}
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
          <EuiTableRowCell align="center" colSpan={colSpan}>
            {noItemsMessage}
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    );
  }

  renderItemRow(item, rowIndex) {
    const { columns, selection, itemIdToExpandedRowMap } = this.props;

    const cells = [];

    const itemId = selection ? this.itemId(item) : rowIndex;
    const selected = !selection ? false : this.state.selection && !!this.state.selection.find(selectedRecord => (
      this.itemId(selectedRecord) === itemId
    ));

    if (selection) {
      cells.push(this.renderItemSelectionCell(itemId, item, selected));
    }

    columns.forEach((column, columnIndex) => {
      if (column.actions) {
        cells.push(this.renderItemActionsCell(itemId, item, column, columnIndex, rowIndex));
      } else if (column.field) {
        cells.push(this.renderItemFieldDataCell(itemId, item, column, columnIndex));
      } else {
        cells.push(this.renderItemComputedCell(itemId, item, column, columnIndex));
      }
    });

    const onMouseOver = () => this.onRowHover(rowIndex);
    const onMouseOut = () => this.clearRowHover();

    // Occupy full width of table, taking checkbox column into account.
    const expandedRowColSpan = selection ? columns.length + 1 : columns.length;
    // We'll use the ID to associate the expanded row with the original.
    const expandedRowId = `row_${itemId}_expansion`;
    const expandedRow = itemIdToExpandedRowMap[itemId] ? (
      <EuiTableRow id={expandedRowId} key={expandedRowId}>
        <EuiTableRowCell colSpan={expandedRowColSpan}>
          {itemIdToExpandedRowMap[itemId]}
        </EuiTableRowCell>
      </EuiTableRow>
    ) : undefined;

    return (
      <Fragment key={`row_${itemId}`}>
        <EuiTableRow
          aria-owns={expandedRowId}
          isSelected={selected}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          {cells}
        </EuiTableRow>
        {expandedRow}
      </Fragment>
    );
  }

  renderItemSelectionCell(itemId, item, selected) {
    const { selection } = this.props;
    const key = `_selection_column_${itemId}`;
    const checked = selected;
    const disabled = selection.selectable && !selection.selectable(item);
    const title = selection.selectableMessage && selection.selectableMessage(!disabled, item);
    const onChange = (event) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selection, item]);
      } else {
        this.changeSelection(this.state.selection.reduce((selection, selectedItem) => {
          if (this.itemId(selectedItem) !== itemId) {
            selection.push(selectedItem);
          }
          return selection;
        }, []));
      }
    };
    return (
      <EuiTableRowCellCheckbox key={key}>
        <EuiCheckbox
          id={`${key}-checkbox`}
          type="inList"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          title={title}
          data-test-subj={`checkboxSelectRow-${itemId}`}
        />
      </EuiTableRowCellCheckbox>
    );
  }

  renderItemActionsCell(itemId, item, column, columnIndex, rowIndex) {
    const visible = this.state.hoverRow === rowIndex;

    const actionEnabled = (action) =>
      this.state.selection.length === 0 && (!action.enabled || action.enabled(item));

    let actualActions = column.actions;
    if (column.actions.length > 1) {

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the configured actions

      actualActions = [
        {
          name: 'Actions',
          render: (item) => {
            return (
              <CollapsedItemActions
                actions={column.actions}
                visible={visible}
                itemId={itemId}
                item={item}
                actionEnabled={actionEnabled}
              />
            );
          }
        }
      ];
    }

    const tools = (
      <ExpandedItemActions
        actions={actualActions}
        visible={visible}
        itemId={itemId}
        item={item}
        actionEnabled={actionEnabled}
      />
    );

    const key = `record_actions_${itemId}_${columnIndex}`;
    return (
      <EuiTableRowCell key={key} align="right" textOnly={false}>
        {tools}
      </EuiTableRowCell>
    );
  }

  renderItemFieldDataCell(itemId, item, column, columnIndex) {
    const {
      field,
      render,
      textOnly,
      name, // eslint-disable-line no-unused-vars
      description, // eslint-disable-line no-unused-vars
      dataType, // eslint-disable-line no-unused-vars
      sortable, // eslint-disable-line no-unused-vars
      ...rest
    } = column;

    const key = `_data_column_${field}_${itemId}_${columnIndex}`;
    const align = this.resolveColumnAlign(column);
    const value = get(item, field);
    const contentRenderer = this.resolveContentRenderer(column);
    const content = contentRenderer(value, item);
    return (
      <EuiTableRowCell
        key={key}
        align={align}
        // If there's no render function defined then we're only going to render text.
        textOnly={textOnly || !render}
        {...rest}
      >
        {content}
      </EuiTableRowCell>
    );
  }

  renderItemComputedCell(itemId, item, column, columnIndex) {
    const {
      field, // eslint-disable-line no-unused-vars
      render, // eslint-disable-line no-unused-vars
      name, // eslint-disable-line no-unused-vars
      description, // eslint-disable-line no-unused-vars
      dataType, // eslint-disable-line no-unused-vars
      sortable, // eslint-disable-line no-unused-vars
      ...rest
    } = column;

    const key = `_computed_column_${itemId}_${columnIndex}`;
    const align = this.resolveColumnAlign(column);
    const contentRenderer = this.resolveContentRenderer(column);
    const content = contentRenderer(item);
    return (
      <EuiTableRowCell
        key={key}
        align={align}
        {...rest}
      >
        {content}
      </EuiTableRowCell>
    );
  }

  resolveColumnAlign(column) {
    if (column.align) {
      return column.align;
    }
    const dataType = column.dataType || 'auto';
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(`Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(', ')}]`);
    }
    return profile.align;
  }

  resolveColumnSortDirection(column) {
    const { sorting } = this.props;
    if (!sorting || !sorting.sort || !column.sortable) {
      return;
    }
    if (sorting.sort.field === column.field) {
      return sorting.sort.direction;
    }
  }

  resolveColumnOnSort(column) {
    const { sorting } = this.props;
    if (!sorting || !column.sortable) {
      return;
    }
    if (!this.props.onChange) {
      throw new Error(`BasicTable is configured to be sortable on column [${column.field}] but
          [onChange] is not configured. This callback must be implemented to handle the sort requests`);
    }
    return () => this.onColumnSortChange(column);
  }

  resolveContentRenderer(column) {
    if (column.render) {
      return column.render;
    }
    const dataType = column.dataType || 'auto';
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(`Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(', ')}]`);
    }
    return profile.render;
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
