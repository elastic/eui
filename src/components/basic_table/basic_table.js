import React, {
  Component,
} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
} from '../table';

import { EuiCheckbox } from '../form/checkbox';

import {
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  SortDirection,
} from '../../services';

import { PaginationBar } from './pagination_bar';
import { CollapsedRowActions } from './collapsed_row_actions';
import { ExpandedRowActions } from './expanded_row_actions';

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

export class EuiBasicTable extends Component {
  static propTypes = {
    getRowId: PropTypes.func,
    columns: PropTypes.array,
    rows: PropTypes.array,
    totalRowCount: PropTypes.number,
    selection: PropTypes.shape({
      onSelectionChanged: PropTypes.func,
      isSelectable: PropTypes.func,
      isSelectableMessage: PropTypes.func,
    }),
    pagination: PropTypes.shape({
      size: PropTypes.number,
      index: PropTypes.number,
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    }),
    sorting: PropTypes.shape({
      direction: PropTypes.string,
      field: PropTypes.string,
    }),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    getRowId: row => row.id,
  };

  constructor(props) {
    super(props);

    this.state = {
      hoverRowId: null,
      selectedRows: []
    };
  }

  changeSelection(selectedRows) {
    const { selection } = this.props;

    if (!selection) {
      return;
    }

    this.setState({ selectedRows });

    if (selection.onSelectionChanged) {
      selection.onSelectionChanged(selectedRows);
    }
  }

  clearSelection() {
    this.changeSelection([]);
  }

  onPageSizeChange = size => {
    this.clearSelection();

    this.props.onChange({
      pagination: {
        // When page size changes, we take the user back to the first page.
        index: 0,
        size,
      },
    });
  };

  onPageChange = (index) => {
    const {
      pagination,
    } = this.props;

    this.clearSelection();

    this.props.onChange({
      pagination: {
        index,
        size: pagination.size,
      },
    });
  };

  onColumnSortChange(column) {
    const {
      pagination,
      sorting,
    } = this.props;

    this.clearSelection();

    let direction = SortDirection.ASC;

    if (sorting && sorting.field === column.field) {
      direction = SortDirection.reverse(sorting.direction);
    }

    this.props.onChange({
      // Reset the page.
      pagination: !pagination ? undefined : {
        index: 0,
        size: pagination.size,
      },
      sorting: {
        field: column.field,
        direction,
      },
    });
  }

  onRowHover(rowId) {
    this.setState({ hoverRowId: rowId });
  }

  clearRowHover() {
    this.setState({ hoverRowId: null });
  }

  componentWillReceiveProps(nextProps) {
    const {
      selection,
      getRowId,
    } = this.props;

    // Don't call changeSelection here or else we can get into an infinite loop:
    // changeSelection calls props.onSelectionChanged on owner ->
    // owner sets its state -> we receive new props, calling componentWillReceiveProps -> ad infinitum
    if (!selection) {
      return;
    }

    this.setState(prevState => {
      // Remove any rows which don't exist any more.
      const newSelection = prevState.selectedRows.filter(selectedRow => (
        nextProps.rows.findIndex(row => getRowId(row) === getRowId(selectedRow)) !== -1
      ));

      return {
        selection: newSelection,
      };
    });
  }

  render() {
    const {
      className,
      getRowId, // eslint-disable-line no-unused-vars
      columns, // eslint-disable-line no-unused-vars
      rows, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      pagination, // eslint-disable-line no-unused-vars
      sorting, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      totalRowCount, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const table = this.renderTable();
    const paginationBar = this.renderPaginationBar();

    return (
      <div className={className} {...rest}>
        {table}
        {paginationBar}
      </div>
    );
  }

  renderTable() {
    const {
      rows,
    } = this.props;

    const head = this.renderTableHead();

    const renderedRows = rows.map((row, index) => {
      return this.renderTableRowRow(row, index);
    });

    return (
      <EuiTable>
        {head}
        <EuiTableBody>{renderedRows}</EuiTableBody>
      </EuiTable>
    );
  }

  renderTableHead() {
    const {
      columns,
      rows,
      selection,
      sorting,
    } = this.props;

    const headers = [];

    if (selection) {
      const selectableRows = rows.filter(row => !selection.isSelectable || selection.isSelectable(row));

      const checked =
        this.state.selectedRows
        && (selectableRows.length !== 0)
        && (this.state.selectedRows.length === selectableRows.length);

      const onChange = (event) => {
        if (event.target.checked) {
          this.changeSelection(selectableRows);
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
      const sortDirection = this.resolveColumnSortDirection(column, sorting);
      const onSort = this.resolveColumnOnSort(column);
      const isSorted = !!sortDirection;
      const isSortAscending = SortDirection.isAsc(sortDirection);

      headers.push(
        <EuiTableHeaderCell
          key={`_data_h_${column.field}_${index}`}
          align={align}
          isSorted={isSorted}
          isSortAscending={isSortAscending}
          onSort={onSort}
          width={column.width}
        >
          {column.name}
        </EuiTableHeaderCell>
      );
    });

    return <EuiTableHeader>{headers}</EuiTableHeader>;
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

  resolveColumnSortDirection(column, sorting) {
    if (!sorting) {
      return;
    }

    if (!column.sortable) {
      return;
    }

    if (sorting.field === column.field) {
      return sorting.direction;
    }
  }

  resolveColumnOnSort(column) {
    if (column.sortable) {
      if (!this.props.onChange) {
        throw new Error(`
          The table is sortable on column [${column.field}] but
          [onChange] wasn't provided. This callback must be provided to enable sorting.
        `);
      }
      return () => this.onColumnSortChange(column);
    }
  }

  renderTableRowRow(row, rowIndex) {
    const {
      getRowId,
      selection,
      columns,
    } = this.props;

    const rowId = getRowId(row);
    const isSelected = this.state.selectedRows && !!this.state.selectedRows.find(selectedRow => {
      return this.props.getRowId(selectedRow) === rowId;
    });

    const cells = [];

    if (selection) {
      cells.push(this.renderTableRowSelectionCell(rowId, row, isSelected));
    }

    columns.forEach((column, columnIndex) => {
      if (column.actions) {
        cells.push(this.renderTableRowActionsCell(rowId, row, column.actions, columnIndex));
      } else if (column.field) {
        cells.push(this.renderTableRowFieldDataCell(rowId, row, column, columnIndex));
      } else {
        cells.push(this.renderTableRowComputedCell(rowId, row, column, columnIndex));
      }
    });

    const onMouseOver = () => this.onRowHover(rowId);
    const onMouseOut = () => this.clearRowHover();
    return (
      <EuiTableRow
        key={`row_${rowId}_${rowIndex}`}
        isSelected={isSelected}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {cells}
      </EuiTableRow>
    );
  }

  renderTableRowFieldDataCell(rowId, row, column, index) {
    const key = `_data_column_${column.field}_${rowId}_${index}`;
    const align = this.resolveColumnAlign(column);
    const textOnly = !column.render;
    const value = _.get(row, column.field);
    const contentRenderer = this.resolveContentRenderer(column);
    const content = contentRenderer(value, row);
    return (
      <EuiTableRowCell key={key} align={align} truncateText={column.truncateText} textOnly={textOnly}>
        {content}
      </EuiTableRowCell>
    );
  }

  renderTableRowComputedCell(rowId, row, column, index) {
    const key = `_computed_column_${rowId}_${index}`;
    const align = this.resolveColumnAlign(column);
    const renderContent = this.resolveContentRenderer(column);
    const content = renderContent(row);
    return (
      <EuiTableRowCell key={key} align={align} truncateText={column.truncateText} textOnly={false}>
        {content}
      </EuiTableRowCell>
    );
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

  renderTableRowSelectionCell(rowId, row, isSelected) {
    const {
      getRowId,
      selection,
    } = this.props;

    const key = `_selection_column_${rowId}`;
    const disabled = selection.isSelectable && !selection.isSelectable(row);
    const title = selection.isSelectableMessage && selection.isSelectableMessage(row);
    const onChange = (event) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selectedRows, row]);
      } else {
        this.changeSelection(this.state.selectedRows.reduce((selectedRows, selectedRow) => {
          if (getRowId(selectedRow) !== rowId) {
            selectedRows.push(selectedRow);
          }
          return selectedRows;
        }, []));
      }
    };

    return (
      <EuiTableRowCellCheckbox key={key}>
        <EuiCheckbox
          id={`${key}-checkbox`}
          type="inList"
          disabled={disabled}
          checked={isSelected}
          onChange={onChange}
          title={title}
          data-test-subj={`checkboxSelectRow-${rowId}`}
        />
      </EuiTableRowCellCheckbox>
    );
  }

  renderTableRowActionsCell(rowId, row, actions, columnIndex) {
    const visible = this.state.hoverRowId === rowId;

    const actionEnabled = (action) =>
      this.state.selectedRows.length === 0 && (!action.isEnabled || action.isEnabled(row));

    let actualActions = actions;
    if (actions.length > 1) {

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the actions

      actualActions = [
        {
          name: 'Actions',
          render: (row) => {
            return (
              <CollapsedRowActions
                actions={actions}
                visible={visible}
                rowId={rowId}
                row={row}
                actionEnabled={actionEnabled}
              />
            );
          }
        }
      ];
    }

    const tools = (
      <ExpandedRowActions
        actions={actualActions}
        visible={visible}
        rowId={rowId}
        row={row}
        actionEnabled={actionEnabled}
      />
    );

    const key = `row_actions_${rowId}_${columnIndex}`;
    return (
      <EuiTableRowCell key={key} align="right" textOnly={false}>
        {tools}
      </EuiTableRowCell>
    );
  }

  renderPaginationBar() {
    const {
      pagination,
      rows,
      totalRowCount,
    } = this.props;

    if (pagination) {
      return (
        <PaginationBar
          pagination={pagination}
          rows={rows}
          totalRowCount={totalRowCount}
          onPageSizeChange={this.onPageSizeChange}
          onPageChange={this.onPageChange}
        />
      );
    }
  }

}
