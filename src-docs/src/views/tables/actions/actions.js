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
  EuiSwitch,
  EuiSpacer,
} from '../../../../../src/components';

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
      multiAction: false
    };
  }

  onTableChange = ({ page = {}, sort = {} }) => {
    const {
      index: pageIndex,
      size: pageSize,
    } = page;

    const {
      field: sortField,
      direction: sortDirection,
    } = sort;

    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
  };

  onClickDelete = () => {
    const { selectedItems } = this.state;
    store.deleteUsers(...selectedItems.map(user => user.id));

    this.setState({
      selectedItems: []
    });
  };

  renderDeleteButton() {
    const { selectedItems } = this.state;

    if (selectedItems.length === 0) {
      return;
    }

    return (
      <EuiButton
        color="danger"
        iconType="trash"
        onClick={this.onClickDelete}
      >
        Delete {selectedItems.length} Users
      </EuiButton>
    );
  }

  toggleMultiAction = () => {
    this.setState(prevState => ({ multiAction: !prevState.multiAction }));
  };

  deleteUser = user => {
    store.deleteUsers(user.id);
    this.setState({ selectedItems: [] });
  };

  cloneUser = user => {
    store.cloneUser(user.id);
    this.setState({ selectedItems: [] });
  };

  render() {
    const {
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    } = this.state;

    const {
      pageOfItems,
      totalItemCount,
    } = store.findUsers(pageIndex, pageSize, sortField, sortDirection);

    const deleteButton = this.renderDeleteButton();

    const columns = [{
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true
    }, {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
    }, {
      field: 'github',
      name: 'Github',
      render: (username) => (
        <EuiLink href={`https://github.com/${username}`} target="_blank">{username}</EuiLink>
      )
    }, {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong'),
      sortable: true
    }, {
      field: 'nationality',
      name: 'Nationality',
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      }
    }, {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true
    }, {
      name: 'Actions',
      actions: this.state.multiAction ? [{
        name: 'Clone',
        description: 'Clone this person',
        icon: 'copy',
        onClick: this.cloneUser
      }, {
        name: 'Delete',
        description: 'Delete this person',
        icon: 'trash',
        color: 'danger',
        onClick: this.deleteUser
      }] : [{
        name: 'Delete',
        type: 'icon',
        description: 'Delete this person',
        icon: 'trash',
        color: 'danger',
        onClick: this.deleteUser
      }]
    }];

    const pagination = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItemCount: totalItemCount,
      pageSizeOptions: [3, 5, 8]
    };

    const sorting = {
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    };

    const selection = {
      itemId: 'id',
      selectable: (user) => user.online,
      selectableMessage: (selectable) => !selectable ? 'User is currently offline' : undefined,
      onSelectionChange: this.onSelectionChange
    };

    return (
      <Fragment>
        <EuiFlexGroup alignItems="center">
          {deleteButton}
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Multiple Actions"
              checked={this.state.multiAction}
              onChange={this.toggleMultiAction}
            />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiBasicTable
          items={pageOfItems}
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          selection={selection}
          onChange={this.onTableChange}
        />
      </Fragment>
    );
  }
}
