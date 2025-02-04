import React from 'react';
import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../../src/services';

import {
  EuiInMemoryTable,
  EuiBasicTableColumn,
  EuiLink,
  EuiHealth,
} from '../../../../../src/components';

type User = {
  id: number;
  firstName: string | null | undefined;
  lastName: string;
  github: string;
  dateOfBirth: Date;
  online: boolean;
  location: {
    city: string;
    country: string;
  };
};

const users: User[] = [];

for (let i = 0; i < 20; i++) {
  users.push({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    online: faker.datatype.boolean(),
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
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
        <>
          {user.firstName} {user.lastName}
        </>
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
    nameTooltip: {
      content: 'The city and country in which this person resides',
    },
    truncateText: true,
    textOnly: true,
    render: (location: User['location']) => {
      return `${location.city}, ${location.country}`;
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
  const sorting = {
    sort: {
      field: 'dateOfBirth',
      direction: 'desc' as const,
    },
  };

  return (
    <EuiInMemoryTable
      tableCaption="Demo of EuiInMemoryTable"
      items={users}
      columns={columns}
      pagination={true}
      sorting={sorting}
    />
  );
};
