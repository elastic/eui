import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../../src/services/format';

import {
  EuiInMemoryTable,
  EuiBasicTableColumn,
  EuiSearchBarProps,
  EuiLink,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFacetGroup,
  EuiFacetButton,
} from '../../../../../src/components';

const countries = [
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'US', name: 'United States', flag: '🇺🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
];

type User = {
  id: number;
  firstName: string | null | undefined;
  lastName: string;
  github: string;
  dateOfBirth: Date;
  online: boolean;
  location: string;
  locationData: typeof countries[number];
};

const users: User[] = [];

for (let i = 0; i < 20; i++) {
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  users.push({
    id: i + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    online: faker.datatype.boolean(),
    location: randomCountry.code,
    locationData: randomCountry,
  });
}

const columns: Array<EuiBasicTableColumn<User>> = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    truncateText: true,
    mobileOptions: {
      render: (user: User) => (
        <span>
          {user.firstName} {user.lastName}
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
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
    render: (username: User['github']) => (
      <EuiLink href="#" target="_blank">
        {username}
      </EuiLink>
    ),
  },
  {
    field: 'dateOfBirth',
    name: 'Date of Birth',
    dataType: 'date',
    render: (dateOfBirth: User['dateOfBirth']) =>
      formatDate(dateOfBirth, 'dobLong'),
    sortable: true,
  },
  {
    field: 'location',
    name: 'Location',
    render: (_, user) => {
      return `${user.locationData.flag} ${user.locationData.name}`;
    },
  },
  {
    field: 'online',
    name: 'Online',
    dataType: 'boolean',
    render: (online: User['online']) => {
      const color = online ? 'success' : 'danger';
      const label = online ? 'Online' : 'Offline';
      return <EuiHealth color={color}>{label}</EuiHealth>;
    },
    sortable: true,
    mobileOptions: {
      show: false,
    },
  },
];

export default () => {
  const [query, setQuery] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');

  const handleOnChange: EuiSearchBarProps['onChange'] = ({
    queryText,
    error,
  }) => {
    setSelectedOptionId('');
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
        setQuery('location:(NL or CZ or NO or IT or GB or GR)');
      },
    },
    {
      id: 'na',
      label: 'North America',
      isSelected: selectedOptionId === 'na',
      onClick: () => {
        setSelectedOptionId('na');
        setQuery('location:(US or CA or MX or HT)');
      },
    },
    {
      id: 'oc',
      label: 'Oceania',
      isSelected: selectedOptionId === 'oc',
      onClick: () => {
        setSelectedOptionId('oc');
        setQuery('location:(AU or FJ)');
      },
    },
    {
      id: 'as',
      label: 'Asia',
      isSelected: selectedOptionId === 'as',
      onClick: () => {
        setSelectedOptionId('as');
        setQuery('location:(IL or LB)');
      },
    },
    {
      id: 'af',
      label: 'Africa',
      isSelected: selectedOptionId === 'af',
      onClick: () => {
        setSelectedOptionId('af');
        setQuery('location:(ZA or CG)');
      },
    },
    {
      id: 'sa',
      label: 'South America',
      isSelected: selectedOptionId === 'sa',
      onClick: () => {
        setSelectedOptionId('sa');
        setQuery('location:(CL)');
      },
    },
  ];

  const search: EuiSearchBarProps = {
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
        field: 'location',
        name: 'Location',
        multiSelect: 'or',
        options: countries.map((country) => ({
          value: country.code,
          name: country.name,
          label: `${country.flag} ${country.name}`,
        })),
      },
    ],
  };

  return (
    <>
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
            tableCaption="Demo of EuiInMemoryTable with search and external state"
            items={users}
            columns={columns}
            search={search}
            pagination={true}
            sorting={true}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
