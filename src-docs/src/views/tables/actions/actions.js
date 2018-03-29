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
  EuiText,
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
      multiAction: false,
      customAction: false,
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

  onSelectionChange = (selectedItems) => {
    this.setState({ selectedItems });
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

  toggleCustomAction = () => {
    this.setState(prevState => ({ customAction: !prevState.customAction }));
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
      multiAction,
      customAction,
    } = this.state;

    const {
      pageOfItems,
      totalItemCount,
    } = store.findUsers(pageIndex, pageSize, sortField, sortDirection);

    const deleteButton = this.renderDeleteButton();

    let actions = null;

    if(multiAction) {
      actions = customAction
        ? [{
          render: (item) => {
            return (
              <EuiText color="secondary" onClick={() => this.cloneUser(item)}>
                Clone
              </EuiText>
            );
          }
        }, {
          render: (item) => {
            return (
              <EuiText color="danger" onClick={() => this.deleteUser(item)}>
                Delete
              </EuiText>
            );
          }
        }]
        : [{
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
        }];
    } else {
      actions = customAction
        ? [{
          render: (item) => {
            return (
              <EuiLink
                onClick={() => this.deleteUser(item)}
                color="danger"
              >
                Delete
              </EuiLink>
            );
          }
        }]
        : [{
          name: 'Delete',
          description: 'Delete this person',
          icon: 'trash',
          color: 'danger',
          type: 'icon',
          onClick: this.deleteUser
        }];
    }

    const columns = [{
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true,
      hideForMobile: true,
    }, {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
      hideForMobile: true,
    }, {
      field: 'firstName',
      name: 'Full Name',
      isMobileHeader: true,
      render: (name, item) => (
        <span>{item.firstName} {item.lastName}</span>
      ),
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
      actions
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
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Custom Actions"
              checked={this.state.customAction}
              onChange={this.toggleCustomAction}
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
          isSelectable={true}
          hasActions={true}
          onChange={this.onTableChange}
        />
      </Fragment>
    );
  }
}
