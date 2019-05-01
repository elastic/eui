import React, { Component, Fragment } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../../src/components';

import uniqBy from 'lodash/uniqBy';

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
    };

    this.renderStatus = this.renderStatus.bind(this);
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

  renderStatus(online) {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <EuiHealth color={color}>{label}</EuiHealth>;
  }

  render() {
    const { pageIndex, pageSize, sortField, sortDirection } = this.state;

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
        footer: <em>Page totals:</em>,
        sortable: true,
        truncateText: true,
        mobileOptions: {
          show: false,
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
        field: 'firstName',
        name: 'Full Name',
        mobileOptions: {
          only: true,
          fullWidth: true,
        },
        render: (name, item) => (
          <EuiFlexGroup responsive={false} alignItems="center">
            <EuiFlexItem>
              {item.firstName} {item.lastName}
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              {this.renderStatus(item.online)}
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
      },
      {
        field: 'github',
        name: 'Github',
        footer: ({ items }) => (
          <span>{uniqBy(items, 'github').length} users</span>
        ),
        render: username => (
          <EuiLink href={`https://github.com/${username}`} target="_blank">
            {username}
          </EuiLink>
        ),
      },
      {
        field: 'dateOfBirth',
        name: 'Date of Birth',
        dataType: 'date',
        render: date => formatDate(date, 'dobLong'),
        sortable: true,
      },
      {
        field: 'nationality',
        name: 'Nationality',
        footer: ({ items }) => (
          <span>{uniqBy(items, 'nationality').length} countries</span>
        ),
        render: countryCode => {
          const country = store.getCountry(countryCode);
          return `${country.flag} ${country.name}`;
        },
      },
      {
        field: 'online',
        name: 'Online',
        footer: ({ items }) => (
          <span>{items.filter(i => !!i.online).length} online</span>
        ),
        dataType: 'boolean',
        render: online => this.renderStatus(online),
        sortable: true,
        hideForMobile: true,
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
