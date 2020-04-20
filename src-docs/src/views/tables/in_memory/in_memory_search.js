import React, { Fragment, useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  EuiInMemoryTable,
  EuiLink,
  EuiHealth,
  EuiSpacer,
  EuiSwitch,
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

export const Table = () => {
  const [incremental, setIncremental] = useState(false);
  const [filters, setFilters] = useState(false);

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
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
  ];

  const search = {
    box: {
      incremental: incremental,
      schema: true,
    },
    filters: !filters
      ? undefined
      : [
          {
            type: 'is',
            field: 'online',
            name: 'Online',
            negatedName: 'Offline',
          },
          {
            type: 'field_value_selection',
            field: 'nationality',
            name: 'Nationality',
            multiSelect: false,
            options: store.countries.map(country => ({
              value: country.code,
              name: country.name,
              view: `${country.flag} ${country.name}`,
            })),
          },
        ],
  };

  return (
    <Fragment>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Incremental"
            checked={incremental}
            onChange={() => setIncremental(!incremental)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="With Filters"
            checked={filters}
            onChange={() => setFilters(!filters)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <EuiInMemoryTable
        items={store.users}
        columns={columns}
        search={search}
        pagination={true}
        sorting={true}
      />
    </Fragment>
  );
};
