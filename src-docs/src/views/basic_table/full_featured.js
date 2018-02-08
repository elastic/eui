import React, {
  Component,
} from 'react';
import uuid from 'uuid/v1';
import { times } from 'lodash';

import {
  EuiButton,
  EuiBasicTable,
  EuiHealth,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
} from '../../../../src/components';

import {
  formatDate,
  Random,
  Comparators
} from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    // In a real use-case, this data can either be stored remotely or locally.
    const random = new Random();
    this.rows = times(20, index => ({
      id: index,
      firstName: random.oneOf('Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan'),
      lastName: random.oneOf('van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Khan', 'Sissel'),
      nickname: random.oneOf('martijnvg', 'elissaw', 'clintongormley', 'imotov', 'karmi', 'drewr', 'HonzaKral', 'rashidkpc', 'whack'),
      dateOfBirth: random.date({ min: new Date(1971, 0, 0), max: new Date(1990, 0, 0) }),
      country: random.oneOf('us', 'nl', 'cz', 'za', 'au'),
      online: random.boolean(),
    }));

    this.state = {
      selectedIds: [],
      hasPagination: true,
      hasSorting: true,
      hasSelection: true,
      hasMultipleRecordActions: true,
      pagination: {
        index: 0,
        size: 5,
        pageSizeOptions: [3, 5, 8],
      },
      sorting: {
        direction: 'asc',
        field: 'firstName',
      },
      totalRowCount: this.rows.length,
    };

    this.state.visibleRows = this.getVisibleRows();
  }

  getVisibleRows() {
    const {
      sorting,
      pagination,
    } = this.state;

    let sortedRows = this.rows;

    if (sorting) {
      sortedRows = sortedRows.sort(Comparators.property(sorting.field, Comparators.default(sorting.direction)));
    }

    // Return all rows.
    if (!pagination) {
      return sortedRows;
    }

    // Return just the rows on the page.
    const firstItemIndex = pagination.index * pagination.size;
    return sortedRows.slice(firstItemIndex, Math.min(firstItemIndex + pagination.size, sortedRows.length));
  }

  onSelectionChanged = selection => {
    const selectedIds = selection.map(item => item.id);
    this.setState({
      selectedIds,
    });
  };

  onTableChange = ({ pagination, sorting }) => {
    // Overwrite old state with new state.
    this.setState(({ pagination: prevPagination, sorting: prevSorting }) => ({
      pagination: {
        ...prevPagination,
        ...pagination,
      },
      sorting: {
        ...prevSorting,
        ...sorting,
      },
    }));
  };

  deleteRow(rowToDelete) {
    const i = this.rows.findIndex((row) => row.id === rowToDelete.id);
    if (i !== -1) {
      this.rows.splice(i, 1);
    }

    this.setState({
      totalRowCount: this.rows.length,
    });
  }

  deleteSelectedRow = () => {
    this.state.selectedIds.forEach(id => {
      const i = this.rows.findIndex((row) => row.id === id);
      if (i !== -1) {
        this.rows.splice(i, 1);
      }
    });

    this.setState({
      totalRowCount: this.rows.length,
    });
  };

  cloneRow(rowToClone) {
    const i = this.rows.findIndex((row) => row.id === rowToClone.id);
    const clone = { ...rowToClone, id: uuid() };
    this.rows.splice(i, 0, clone);

    this.setState({
      totalRowCount: this.rows.length,
    });
  }

  changeRowOnlineStatus(rowToUpdate, online) {
    const row = this.rows.find((row) => row.id === rowToUpdate.id);
    if (row) {
      row.online = online;
    }

    // TODO: Just set rows instead?
    this.setState({
      totalRowCount: this.rows.length,
    });
  }

  toggleFeature(feature) {
    this.setState(prevState => ({
      [feature]: !prevState[feature],
    }));
  }

  renderControls() {
    const {
      hasPagination,
      hasSelection,
      hasSorting,
      hasMultipleRecordActions,
      selectedIds,
    } = this.state;

    let deleteButton;

    if (selectedIds.length) {
      const label = selectedIds.length > 1 ? `Delete ${selectedIds.length} people` : `Delete 1 row`;
      deleteButton = (
        <EuiFlexItem grow={false}>
          <EuiButton color="danger" onClick={this.deleteSelectedRow}>
            {label}
          </EuiButton>
        </EuiFlexItem>
      );
    }

    return (
      <EuiFlexGroup alignItems="center">
        { deleteButton }

        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Pagination"
            checked={hasPagination}
            onChange={this.toggleFeature.bind(this, 'hasPagination')}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Sorting"
            checked={hasSorting}
            onChange={this.toggleFeature.bind(this, 'hasSorting')}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Selection"
            checked={hasSelection}
            onChange={this.toggleFeature.bind(this, 'hasSelection')}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Multiple record actions"
            checked={hasMultipleRecordActions}
            onChange={this.toggleFeature.bind(this, 'hasMultipleRecordActions')}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  render() {
    const {
      totalRowCount,
      hasSelection,
      hasSorting,
      hasPagination,
      hasMultipleRecordActions,
    } = this.state;

    const columns = [{
      field: 'firstName',
      name: 'First Name',
      description: `Row's given name`,
      dataType: 'string',
      sortable: true,
    }, {
      field: 'lastName',
      name: 'Last Name',
      description: `Row's family name`,
      dataType: 'string',
    }, {
      field: 'nickname',
      name: 'Nickname',
      description: `Row's nickname / online handle`,
      render: value => (
        <EuiLink href={`http://www.github.com/${value}`} target="_blank">
          {value}
        </EuiLink>
      )
    }, {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      description: `Row's date of birth`,
      render: value => formatDate(value, 'D MMM YYYY'),
      sortable: true,
      dataType: 'date',
    }, {
      field: 'online',
      name: 'Online',
      description: `Is this row currently online?`,
      render: (value) => {
        const color = value ? 'success' : 'danger';
        const content = value ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{content}</EuiHealth>;
      },
      sortable: true,
    }, {
      name: '',
      // TODO: Move controls to their own example page.
      actions: hasMultipleRecordActions ? [
        {
          name: 'Clone',
          description: 'Clone this row',
          icon: 'copy',
          onClick: (row) => this.cloneRow(row)
        },
        {
          name: 'Delete',
          description: 'Delete this row',
          icon: 'trash',
          color: 'danger',
          onClick: (row) => this.deleteRow(row)
        },
      ] : [
        {
          name: 'Delete',
          description: 'Delete this row',
          icon: 'trash',
          type: 'icon',
          color: 'danger',
          onClick: (row) => this.deleteRow(row)
        }
      ]
    }];

    const selection = hasSelection ? {
      isSelectable: (record) => record.online,
      isSlectableMessage: row => !row.online ? `${row.firstName} is offline` : undefined,
      onSelectionChanged: this.onSelectionChanged,
    } : undefined;

    const pagination = hasPagination ? this.state.pagination : undefined;
    const sorting = hasSorting ? this.state.sorting : undefined;

    return (
      <div>
        {this.renderControls()}

        <EuiSpacer size="m" />

        <EuiBasicTable
          getRowId={row => row.id}
          columns={columns}
          rows={this.getVisibleRows()}
          totalRowCount={totalRowCount}
          selection={selection}
          pagination={pagination}
          sorting={sorting}
          onChange={this.onTableChange}
        />
      </div>
    );
  }
}
