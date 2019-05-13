import React, { Component, Fragment } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiButton,
  EuiDescriptionList,
} from '../../../../../src/components';

import { RIGHT_ALIGNMENT } from '../../../../../src/services';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

const store = createDataStore();

export class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: 0,
      pageSize: 5,
      sortField: 'firstName',
      sortDirection: 'asc',
      selectedItems: [],
      itemIdToExpandedRowMap: {},
    };
  }

  onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
  };

  onSelectionChange = selectedItems => {
    this.setState({ selectedItems });
  };

  onClickDelete = () => {
    const { selectedItems } = this.state;
    store.deleteUsers(...selectedItems.map(user => user.id));

    this.setState({
      selectedItems: [],
    });
  };

  renderDeleteButton() {
    const { selectedItems } = this.state;

    if (selectedItems.length === 0) {
      return;
    }

    return (
      <EuiButton color="danger" iconType="trash" onClick={this.onClickDelete}>
        Delete {selectedItems.length} Users
      </EuiButton>
    );
  }

  toggleDetails = item => {
    const itemIdToExpandedRowMap = { ...this.state.itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMap[item.id]) {
      delete itemIdToExpandedRowMap[item.id];
    } else {
      const { nationality, online } = item;
      const country = store.getCountry(nationality);
      const color = online ? 'success' : 'danger';
      const label = online ? 'Online' : 'Offline';
      const listItems = [
        {
          title: 'Nationality',
          description: `${country.flag} ${country.name}`,
        },
        {
          title: 'Online',
          description: <EuiHealth color={color}>{label}</EuiHealth>,
        },
      ];
      itemIdToExpandedRowMap[item.id] = (
        <EuiDescriptionList listItems={listItems} />
      );
    }
    this.setState({ itemIdToExpandedRowMap });
  };

  render() {
    const {
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
      itemIdToExpandedRowMap,
    } = this.state;

    const { pageOfItems, totalItemCount } = store.findUsers(
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    );

    const deleteButton = this.renderDeleteButton();

    const columns = [
      {
        field: 'firstName',
        name: 'First Name',
        sortable: true,
        truncateText: true,
        mobileOptions: {
          render: item => (
            <span>
              {item.firstName} {item.lastName}
            </span>
          ),
          header: false,
          truncateText: false,
          enlarge: true,
          fullWidth: true,
        },
      },
      {
        field: 'lastName',
        name: 'Last Name',
        truncateText: true,
        mobileOptions: {
          show: false,
        },
      },
      {
        field: 'dateOfBirth',
        name: 'Date of Birth',
        dataType: 'date',
        render: date => formatDate(date, 'dobLong'),
        sortable: true,
      },
      {
        name: 'Actions',
        actions: [
          {
            name: 'Clone',
            description: 'Clone this person',
            type: 'icon',
            icon: 'copy',
            onClick: () => '',
          },
        ],
      },
      {
        align: RIGHT_ALIGNMENT,
        width: '40px',
        isExpander: true,
        render: item => (
          <EuiButtonIcon
            onClick={() => this.toggleDetails(item)}
            aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
            iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
          />
        ),
      },
    ];

    const pagination = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItemCount: totalItemCount,
      pageSizeOptions: [3, 5, 8],
    };

    const sorting = {
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    };

    const selection = {
      selectable: user => user.online,
      selectableMessage: selectable =>
        !selectable ? 'User is currently offline' : undefined,
      onSelectionChange: this.onSelectionChange,
    };

    return (
      <Fragment>
        {deleteButton}
        <EuiBasicTable
          items={pageOfItems}
          itemId="id"
          itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
          isExpandable={true}
          hasActions={true}
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          isSelectable={true}
          selection={selection}
          onChange={this.onTableChange}
        />
      </Fragment>
    );
  }
}
