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
      multiAction: false,
      customAction: false,
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

  onClickDelete = () => {
    const { selectedItems } = this.state;
    store.deleteUsers(...selectedItems.map(user => user.id));

    this.setState({
      selectedItems: [],
    });
  };

  onSelectionChange = selectedItems => {
    this.setState({ selectedItems });
  };

  renderDeleteButton() {
    const { selectedItems } = this.state;

    if (selectedItems.length === 0) {
      return;
    }

    return (
      <EuiFlexItem grow={false}>
        <EuiButton color="danger" iconType="trash" onClick={this.onClickDelete}>
          Delete {selectedItems.length} Users
        </EuiButton>
      </EuiFlexItem>
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

    const { pageOfItems, totalItemCount } = store.findUsers(
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    );

    const deleteButton = this.renderDeleteButton();

    let actions = null;

    if (multiAction) {
      actions = customAction
        ? [
            {
              render: item => {
                return (
                  <EuiLink
                    color="secondary"
                    onClick={() => this.cloneUser(item)}>
                    Clone
                  </EuiLink>
                );
              },
            },
            {
              render: item => {
                return (
                  <EuiLink color="danger" onClick={() => this.deleteUser(item)}>
                    Delete
                  </EuiLink>
                );
              },
            },
          ]
        : [
            {
              name: 'Clone',
              description: 'Clone this user',
              icon: 'copy',
              onClick: this.cloneUser,
              'data-test-subj': 'action-clone',
            },
            {
              name: 'Delete',
              description: 'Delete this user',
              icon: 'trash',
              color: 'danger',
              type: 'icon',
              onClick: this.deleteUser,
              isPrimary: true,
              'data-test-subj': 'action-delete',
            },
            {
              name: 'Edit',
              isPrimary: true,
              description: 'Edit this user',
              icon: 'pencil',
              type: 'icon',
              onClick: () => {},
              'data-test-subj': 'action-edit',
            },
            {
              name: 'Share',
              isPrimary: true,
              description: 'Share this user',
              icon: 'share',
              type: 'icon',
              onClick: () => {},
              'data-test-subj': 'action-share',
            },
          ];
    } else {
      actions = customAction
        ? [
            {
              render: item => {
                return (
                  <EuiLink onClick={() => this.deleteUser(item)} color="danger">
                    Delete
                  </EuiLink>
                );
              },
            },
          ]
        : [
            {
              name: 'Elastic.co',
              description: 'Go to elastic.co',
              icon: 'editorLink',
              color: 'primary',
              type: 'icon',
              href: 'https://elastic.co',
              target: '_blank',
              'data-test-subj': 'action-outboundlink',
            },
          ];
    }

    const columns = [
      {
        field: 'firstName',
        name: 'First Name',
        truncateText: true,
        sortable: true,
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
        field: 'github',
        name: 'Github',
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
        render: countryCode => {
          const country = store.getCountry(countryCode);
          return `${country.flag} ${country.name}`;
        },
      },
      {
        field: 'online',
        name: 'Online',
        dataType: 'boolean',
        render: online => {
          const color = online ? 'success' : 'danger';
          const label = online ? 'Online' : 'Offline';
          return <EuiHealth color={color}>{label}</EuiHealth>;
        },
        sortable: true,
      },
      {
        name: 'Actions',
        actions,
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
        <EuiFlexGroup alignItems="center">
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
          <EuiFlexItem />
          {deleteButton}
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiBasicTable
          items={pageOfItems}
          itemId="id"
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          selection={selection}
          hasActions={customAction ? false : true}
          onChange={this.onTableChange}
        />
      </Fragment>
    );
  }
}
