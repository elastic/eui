import React, { Fragment, useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  EuiInMemoryTable,
  EuiLink,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFacetGroup,
  EuiFacetButton,
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
  const [query, setQuery] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState(undefined);

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
      render: (username) => (
        <EuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </EuiLink>
      ),
    },
    {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong'),
      sortable: true,
    },
    {
      field: 'nationality',
      name: 'Nationality',
      render: (countryCode) => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
  ];

  const handleOnChange = ({ queryText, error }) => {
    setSelectedOptionId(undefined);
    if (!error) {
      setQuery(queryText);
    }
  };

  const facets = [
    {
      id: 'eu',
      label: 'Europe',
      isSelected: selectedOptionId === 'eu',
      onClick: () => {
        setSelectedOptionId('eu');
        setQuery('nationality:(NL or CZ or NO or IT or GB or GR)');
      },
    },
    {
      id: 'na',
      label: 'North America',
      isSelected: selectedOptionId === 'na',
      onClick: () => {
        setSelectedOptionId('na');
        setQuery('nationality:(US or CA or MX or HT)');
      },
    },
    {
      id: 'oc',
      label: 'Oceania',
      isSelected: selectedOptionId === 'oc',
      onClick: () => {
        setSelectedOptionId('oc');
        setQuery('nationality:(AU or FJ)');
      },
    },
    {
      id: 'as',
      label: 'Asia',
      isSelected: selectedOptionId === 'as',
      onClick: () => {
        setSelectedOptionId('as');
        setQuery('nationality:(IL or LB)');
      },
    },
    {
      id: 'af',
      label: 'Africa',
      isSelected: selectedOptionId === 'af',
      onClick: () => {
        setSelectedOptionId('af');
        setQuery('nationality:(ZA or CG)');
      },
    },
    {
      id: 'sa',
      label: 'South America',
      isSelected: selectedOptionId === 'sa',
      onClick: () => {
        setSelectedOptionId('sa');
        setQuery('nationality:(CL)');
      },
    },
  ];

  const search = {
    query,
    onChange: handleOnChange,
    box: {
      schema: true,
    },
    filters: [
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
        multiSelect: 'or',
        options: store.countries.map((country) => ({
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
        <EuiFlexItem grow={1}>
          <EuiFacetGroup>
            {facets.map((facet) => {
              return (
                <EuiFacetButton
                  key={facet.id}
                  id={facet.id}
                  isSelected={facet.isSelected}
                  onClick={facet.onClick}
                >
                  {facet.label}
                </EuiFacetButton>
              );
            })}
          </EuiFacetGroup>
        </EuiFlexItem>
        <EuiFlexItem grow={3}>
          <EuiInMemoryTable
            items={store.users}
            columns={columns}
            search={search}
            pagination={true}
            sorting={true}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};
