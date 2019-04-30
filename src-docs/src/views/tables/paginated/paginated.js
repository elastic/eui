import React, { Component } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiCode,
  EuiLink,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSwitch,
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
      showPerPageOptions: true,
    };
  }

  onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    this.setState({
      pageIndex,
      pageSize,
    });
  };

  renderStatus = online => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <EuiHealth color={color}>{label}</EuiHealth>;
  };

  togglePerPageOptions = () =>
    this.setState(state => ({ showPerPageOptions: !state.showPerPageOptions }));

  render() {
    const { pageIndex, pageSize, showPerPageOptions } = this.state;

    const { pageOfItems, totalItemCount } = store.findUsers(
      pageIndex,
      pageSize
    );

    const columns = [
      {
        field: 'firstName',
        name: 'First Name',
        truncateText: true,
        hideForMobile: true,
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
          header: false,
          only: true,
          enlarge: true,
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
        render: online => this.renderStatus(online),
      },
    ];

    const pagination = {
      pageIndex,
      pageSize,
      totalItemCount,
      pageSizeOptions: [3, 5, 8],
      hidePerPageOptions: !showPerPageOptions,
    };

    return (
      <div>
        <EuiSwitch
          label={
            <span>
              Hide per page options with{' '}
              <EuiCode>pagination.hidePerPageOptions = true</EuiCode>
            </span>
          }
          onChange={this.togglePerPageOptions}
        />
        <EuiSpacer size="xl" />
        <EuiBasicTable
          items={pageOfItems}
          columns={columns}
          pagination={pagination}
          onChange={this.onTableChange}
        />
      </div>
    );
  }
}
