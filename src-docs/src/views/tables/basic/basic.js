import React from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
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

export const Table = () => {
  const columns = [{
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    hideForMobile: true,
    'data-test-subj': 'firstNameCell',
  }, {
    field: 'lastName',
    name: 'Last Name',
    truncateText: true,
    hideForMobile: true,
    render: (name) => (
      <EuiLink href="#" target="_blank">{name}</EuiLink>
    ),
  }, {
    field: 'firstName',
    name: 'Full Name',
    isMobileHeader: true,
    render: (name, item) => (
      <span>{item.firstName} <EuiLink href="#" target="_blank">{item.lastName}</EuiLink></span>
    ),
  }, {
    field: 'github',
    name: 'Github',
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
    render: (online) => {
      const color = online ? 'success' : 'danger';
      const label = online ? 'Online' : 'Offline';
      return <EuiHealth color={color}>{label}</EuiHealth>;
    }
  }];

  return (
    <EuiBasicTable
      items={store.users.filter((user, index) => index < 10)}
      columns={columns}
    />
  );
};
