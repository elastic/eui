import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  EuiInMemoryTable,
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
      sortable: true,
    },
  ];

  const sorting = {
    sort: {
      field: 'dateOfBirth',
      direction: 'desc',
    },
  };

  const [users, setUsers] = useState(store.users);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setUsers((users) =>
        // randomly toggle some of the online statuses
        users.map(({ online, ...user }) => ({
          ...user,
          online: Math.random() > 0.7 ? !online : online,
        }))
      );
    }, 1000);
    return () => clearInterval(updateInterval);
  }, []);

  const [pagination, setPagination] = useState({ pageIndex: 0 });

  return (
    <EuiInMemoryTable
      tableCaption="Demo of EuiInMemoryTable with controlled pagination"
      onTableChange={({ page: { index } }) =>
        setPagination({ pageIndex: index })
      }
      items={users}
      columns={columns}
      pagination={pagination}
      sorting={sorting}
    />
  );
};
