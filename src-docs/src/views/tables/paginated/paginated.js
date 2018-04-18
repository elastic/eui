import React, {
  Component
} from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
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
    };
  }

  onTableChange = ({ page = {} }) => {
    const {
      index: pageIndex,
      size: pageSize,
    } = page;

    this.setState({
      pageIndex,
      pageSize,
    });
  };

  renderStatus = (online) => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <EuiHealth color={color}>{label}</EuiHealth>;
  }

  render() {
    const {
      pageIndex,
      pageSize,
    } = this.state;

    const {
      pageOfItems,
      totalItemCount,
    } = store.findUsers(pageIndex, pageSize);

    const columns = [{
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
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
        <EuiFlexGroup responsive={false} alignItems="center">
          <EuiFlexItem>{item.firstName} {item.lastName}</EuiFlexItem>
          <EuiFlexItem grow={false}>{this.renderStatus(item.online)}</EuiFlexItem>
        </EuiFlexGroup>
      ),
    }, {
      field: 'github',
      name: 'Github',
      render: (username) => (
        <EuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </EuiLink>
      )
    }, {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong')
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
      render: (online) => (
        this.renderStatus(online)
      )
    }];

    const pagination = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItemCount: totalItemCount,
      pageSizeOptions: [3, 5, 8]
    };

    return (
      <EuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={this.onTableChange}
      />
    );
  }
}
