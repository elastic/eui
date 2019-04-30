import React, { Component, Fragment } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
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
      customHeader: true,
      isResponsive: true,
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

  toggleHeader = () => {
    this.setState(prevState => ({ customHeader: !prevState.customHeader }));
  };

  toggleResponsive = () => {
    this.setState(prevState => ({ isResponsive: !prevState.isResponsive }));
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
      customHeader,
      isResponsive,
    } = this.state;

    const { pageOfItems, totalItemCount } = store.findUsers(
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    );

    const actions = [
      {
        name: 'Clone',
        description: 'Clone this person',
        icon: 'copy',
        type: 'icon',
        onClick: this.cloneUser,
      },
      {
        name: 'Delete',
        description: 'Delete this person',
        icon: 'trash',
        type: 'icon',
        color: 'danger',
        onClick: this.deleteUser,
      },
    ];

    const columns = [
      {
        field: 'firstName',
        name: 'First Name',
        truncateText: true,
        sortable: true,
        mobileOptions: {
          render: customHeader
            ? item => (
                <span>
                  {item.firstName} {item.lastName}
                </span>
              )
            : undefined,
          header: customHeader ? false : true,
          fullWidth: customHeader ? true : false,
          enlarge: customHeader ? true : false,
          truncateText: customHeader ? false : true,
        },
      },
      {
        field: 'lastName',
        name: 'Last Name',
        truncateText: true,
        mobileOptions: {
          show: !isResponsive || !customHeader,
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
        <EuiFlexGroup alignItems="center" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Responsive"
              checked={isResponsive}
              onChange={this.toggleResponsive}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Custom header"
              disabled={!isResponsive}
              checked={isResponsive && customHeader}
              onChange={this.toggleHeader}
            />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiBasicTable
          items={pageOfItems}
          itemId="id"
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          selection={selection}
          isSelectable={true}
          hasActions={true}
          responsive={isResponsive}
          onChange={this.onTableChange}
        />
      </Fragment>
    );
  }
}
