import React, { Component, Fragment } from 'react';
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

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incremental: false,
      filters: false,
    };
  }

  render() {
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
        incremental: this.state.incremental,
        schema: true,
      },
      filters: !this.state.filters
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
              checked={this.state.incremental}
              onChange={() =>
                this.setState(prevState => ({
                  incremental: !prevState.incremental,
                }))
              }
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="With Filters"
              checked={this.state.filters}
              onChange={() =>
                this.setState(prevState => ({ filters: !prevState.filters }))
              }
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
  }
}
