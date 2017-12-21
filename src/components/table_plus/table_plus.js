import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import {
  EuiButton,
} from '../button';

import {
  EuiCheckbox,
  EuiFieldSearch,
} from '../form';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../flex';

import {
  EuiSpacer,
} from '../spacer';

import {
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTablePagination,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
} from '../table';

import {
  Pager,
  SortableProperties,
} from '../../services';

export class EuiTablePlus extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    searchFilterer: PropTypes.func,
    initialSortedColumn: PropTypes.string,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    rowCellRenderer: PropTypes.func.isRequired,
    sortablePropertiesConfig: PropTypes.array,
  }

  constructor(props) {
    super(props);

    const {
      initialSortedColumn,
      sortablePropertiesConfig,
      rows,
    } = props;

    this.state = {
      rowIdToSelectedMap: {},
      sortedColumn: initialSortedColumn || props.columns[0].id,
      rowsPerPage: 20,
      filteredRows: rows
    };

    this.sortableProperties = sortablePropertiesConfig
      ? new SortableProperties(sortablePropertiesConfig, this.state.sortedColumn)
      : undefined;

    this.pager = new Pager(rows.length, this.state.rowsPerPage);
    this.state.firstRowIndex = this.pager.getFirstItemIndex();
    this.state.lastRowIndex = this.pager.getLastItemIndex();
  }

  onChangeRowsPerPage = rowsPerPage => {
    this.pager.setItemsPerPage(rowsPerPage);
    this.setState({
      rowsPerPage,
      firstRowIndex: this.pager.getFirstItemIndex(),
      lastRowIndex: this.pager.getLastItemIndex(),
    });
  }

  onChangePage = pageIndex => {
    this.pager.goToPageIndex(pageIndex);
    this.setState({
      firstRowIndex: this.pager.getFirstItemIndex(),
      lastRowIndex: this.pager.getLastItemIndex(),
    });
  };

  onSort = prop => {
    this.sortableProperties.sortOn(prop);

    this.setState({
      sortedColumn: prop,
    });
  }

  getVisibleRowIds = () => {
    // If there are no rows.
    if (this.state.firstRowIndex === -1) {
      return [];
    }

    const { rows } = this.props;
    const rowIds = [];

    for (let rowIndex = this.state.firstRowIndex; rowIndex <= this.state.lastRowIndex; rowIndex++) {
      const row = rows[rowIndex];
      rowIds.push(row.id);
    }

    return rowIds;
  }

  toggleRow = rowId => {
    this.setState(previousState => {
      const newRowIdToSelectedMap = {
        ...previousState.rowIdToSelectedMap,
        [rowId]: !previousState.rowIdToSelectedMap[rowId],
      };

      return {
        rowIdToSelectedMap: newRowIdToSelectedMap,
      };
    });
  }

  toggleAll = () => {
    const rowIds = this.getVisibleRowIds();
    const allSelected = this.areAllRowsSelected();
    const newRowIdToSelectedMap = {};
    rowIds.forEach(rowId => newRowIdToSelectedMap[rowId] = !allSelected);

    this.setState({
      rowIdToSelectedMap: newRowIdToSelectedMap,
    });
  }

  isRowSelected = rowId => {
    return this.state.rowIdToSelectedMap[rowId];
  }

  areAllRowsSelected = () => {
    const rowIds = this.getVisibleRowIds();
    const indexOfUnselectedRow = rowIds.findIndex(rowId => !this.isRowSelected(rowId));
    return indexOfUnselectedRow === -1;
  }

  areAnyRowsSelected = () => {
    return Object.keys(this.state.rowIdToSelectedMap).findIndex(id => {
      return this.state.rowIdToSelectedMap[id];
    }) !== -1;
  }

  onSearch = e => {
    const filteredRows = this.props.rows.filter(row => this.props.searchFilterer(row, e.target.value));
    this.pager.setTotalItems(filteredRows.length);
    this.setState({
      filteredRows,
      firstRowIndex: this.pager.getFirstItemIndex(),
      lastRowIndex: this.pager.getLastItemIndex(),
    });
  }

  renderHeaderCells(columns) {
    const customColumns = columns.map((column, columnIndex) => {
      const {
        id,
        width,
        isSortable,
        content,
        align,
        ...rest
      } = column;

      return (
        <EuiTableHeaderCell
          key={id}
          data-test-subj={`${this.props.id}-${id}-column`}
          align={align}
          width={width}
          onSort={isSortable ? this.onSort.bind(this, id) : undefined}
          isSorted={this.state.sortedColumn === id}
          isSortAscending={this.sortableProperties ? this.sortableProperties.isAscendingByName(id) : false}
          {...rest}
        >
          {typeof content === 'function' ? content(column, columnIndex) : content}
        </EuiTableHeaderCell>
      );
    });

    return [(
      <EuiTableHeaderCellCheckbox
        key="selectAllCheckBox"
      >
        <EuiCheckbox
          id={`${this.props.id}-selectAllCheckbox`}
          data-test-subj={`${this.props.id}-selectAllCheckbox`}
          checked={this.areAllRowsSelected()}
          onChange={this.toggleAll}
          type="inList"
        />
      </EuiTableHeaderCellCheckbox>
    )].concat(customColumns);
  }

  renderRows(rows, columns, rowCellRenderer) {
    const renderRow = row => {
      const customCells = columns.map(column => {
        const cell = row[column.id];
        return rowCellRenderer(EuiTableRowCell, cell, column, row);
      });

      const cells = [(
        <EuiTableRowCellCheckbox
          key="selectRowCheckBox"
        >
          <EuiCheckbox
            id={`${this.props.id}-${row.id}-checkbox`}
            data-test-subj={`${this.props.id}-${row.id}-checkbox`}
            checked={this.isRowSelected(row.id)}
            onChange={this.toggleRow.bind(this, row.id)}
            type="inList"
          />
        </EuiTableRowCellCheckbox>
      )].concat(customCells);

      return (
        <EuiTableRow
          key={row.id}
          isSelected={this.isRowSelected(row.id)}
          data-test-subj={`${this.props.id}-${row.id}`}
        >
          {cells}
        </EuiTableRow>
      );
    };

    const renderedRows = [];

    // If we have rows.
    if (this.state.firstRowIndex !== -1) {
      for (let rowIndex = this.state.firstRowIndex; rowIndex <= this.state.lastRowIndex; rowIndex++) {
        const item = rows[rowIndex];
        renderedRows.push(renderRow(item));
      }
    }

    return renderedRows;
  }

  render() {
    const {
      id, // eslint-disable-line no-unused-vars
      className,
      searchFilterer,
      columns,
      rows, // eslint-disable-line no-unused-vars
      rowCellRenderer,
      initialSortedColumn, // eslint-disable-line no-unused-vars
      sortablePropertiesConfig, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    let bulkActions;

    if (this.areAnyRowsSelected() > 0) {
      bulkActions = (
        <EuiFlexItem grow={false}>
          <EuiButton color="danger">Delete selected</EuiButton>
        </EuiFlexItem>
      );
    }

    let search;

    if (searchFilterer) {
      search = (
        <EuiFlexItem>
          <EuiFieldSearch
            fullWidth
            placeholder="Search"
            data-test-subj="tableSearch"
            onChange={this.onSearch}
          />
        </EuiFlexItem>
      );
    }

    return (
      <div
        className={className}
        {...rest}
      >
        <EuiFlexGroup gutterSize="m">
          {bulkActions}
          {search}
        </EuiFlexGroup>

        <EuiSpacer size="m" />

        <EuiTable data-test-subj="table">
          <EuiTableHeader>
            {this.renderHeaderCells(columns)}
          </EuiTableHeader>

          <EuiTableBody>
            {this.renderRows(this.state.filteredRows, columns, rowCellRenderer)}
          </EuiTableBody>
        </EuiTable>

        <EuiSpacer size="m" />

        <EuiTablePagination
          data-test-subj="tablePagination"
          activePage={this.pager.getCurrentPageIndex()}
          itemsPerPage={this.state.rowsPerPage}
          itemsPerPageOptions={[5, 10, 20]}
          pageCount={this.pager.getTotalPages()}
          onChangeItemsPerPage={this.onChangeRowsPerPage}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}
