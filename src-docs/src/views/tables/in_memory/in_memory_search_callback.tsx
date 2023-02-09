import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../../src/services/format';

import {
  EuiInMemoryTable,
  EuiBasicTableColumn,
  EuiSearchBarProps,
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
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    online: faker.datatype.boolean(),
    location: {
      city: faker.address.city(),
      country: faker.address.country(),
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

let debounceTimeoutId: ReturnType<typeof setTimeout>;
let requestTimeoutId: ReturnType<typeof setTimeout>;

export default () => {
  const [items, setItems] = useState(users);
  const [isLoading, setIsLoading] = useState(false);

  const onQueryChange: EuiSearchBarProps['onChange'] = ({ query }) => {
    clearTimeout(debounceTimeoutId);
    clearTimeout(requestTimeoutId);

    debounceTimeoutId = setTimeout(() => {
      setIsLoading(true);

      requestTimeoutId = setTimeout(() => {
        const items = users.filter((user) => {
          const normalizedName = `${user.firstName} ${user.lastName}`.toLowerCase();
          const normalizedQuery = query?.text.toLowerCase() || '';
          return normalizedName.indexOf(normalizedQuery) !== -1;
        });

        setIsLoading(false);
        setItems(items);
      }, 1000);
    }, 300);
  };

  const search: EuiSearchBarProps = {
    onChange: onQueryChange,
    box: {
      incremental: true,
    },
  };

  return (
    <EuiInMemoryTable
      tableCaption="Demo of EuiInMemoryTable with search callback"
      items={items}
      loading={isLoading}
      columns={columns}
      search={search}
      pagination={true}
      sorting={true}
    />
  );
};
