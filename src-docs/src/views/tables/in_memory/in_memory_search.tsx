import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../../src/services/format';

import {
  EuiInMemoryTable,
  EuiBasicTableColumn,
  EuiSearchBarProps,
  EuiLink,
  EuiHealth,
  EuiSpacer,
  EuiSwitch,
  EuiFlexGroup,
  EuiCallOut,
  EuiCode,
} from '../../../../../src/components';

type User = {
  id: number;
  firstName: string | null | undefined;
  lastName: string;
  github: string;
  dateOfBirth: Date;
  online: boolean;
  location: string;
};

const users: User[] = [];
const usersWithSpecialCharacters: User[] = [];

for (let i = 0; i < 20; i++) {
  const userData = {
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    online: faker.datatype.boolean(),
    location: faker.location.country(),
  };
  users.push(userData);
  usersWithSpecialCharacters.push({
    ...userData,
    firstName: `${userData.firstName} "${faker.string.symbol(10)}"`,
    lastName: `${userData.lastName} ${faker.internet.emoji()}`,
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
    truncateText: true,
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
  const [incremental, setIncremental] = useState(false);
  const [filters, setFilters] = useState(false);
  const [contentBetween, setContentBetween] = useState(false);
  const [textSearchFormat, setTextSearchFormat] = useState(false);

  const search: EuiSearchBarProps = {
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
            field: 'location',
            name: 'Location',
            multiSelect: false,
            options: users.map(({ location }) => ({
              value: location,
            })),
          },
        ],
  };

  return (
    <>
      <EuiFlexGroup>
        <EuiSwitch
          label="Incremental"
          checked={incremental}
          onChange={() => setIncremental(!incremental)}
        />
        <EuiSwitch
          label="With Filters"
          checked={filters}
          onChange={() => setFilters(!filters)}
        />
        <EuiSwitch
          label="Content between"
          checked={contentBetween}
          onChange={() => setContentBetween(!contentBetween)}
        />
        <EuiSwitch
          label="Plain text search"
          checked={textSearchFormat}
          onChange={() => setTextSearchFormat(!textSearchFormat)}
        />
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <EuiInMemoryTable
        tableCaption="Demo of EuiInMemoryTable with search"
        items={textSearchFormat ? usersWithSpecialCharacters : users}
        columns={columns}
        search={search}
        searchFormat={textSearchFormat ? 'text' : 'eql'}
        pagination={true}
        sorting={true}
        childrenBetween={
          contentBetween && (
            <EuiCallOut
              size="s"
              title={
                <>
                  You can inject custom content between the search bar and the
                  table using <EuiCode>childrenBetween</EuiCode>.
                </>
              }
            />
          )
        }
      />
    </>
  );
};
