import React, { useState } from 'react';
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

let debounceTimeoutId;
let requestTimeoutId;
const store = createDataStore();

export const Table = () => {
  const [items, setItems] = useState(store.users);
  const [isLoading, setIsLoading] = useState(false);

  const onQueryChange = ({ query }) => {
    clearTimeout(debounceTimeoutId);
    clearTimeout(requestTimeoutId);

    debounceTimeoutId = setTimeout(() => {
      setIsLoading(true);

      requestTimeoutId = setTimeout(() => {
        const items = store.users.filter(user => {
          const normalizedName = `${user.firstName} ${
            user.lastName
          }`.toLowerCase();
          const normalizedQuery = query.text.toLowerCase();
          return normalizedName.indexOf(normalizedQuery) !== -1;
        });

        setIsLoading(false);
        setItems(items);
      }, 1000);
    }, 300);
  };

  const search = {
    onChange: onQueryChange,
    box: {
      incremental: true,
    },
  };

  return (
    <EuiInMemoryTable
      items={items}
      loading={isLoading}
      columns={[
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
          sortable: true,
        },
      ]}
      search={search}
      pagination={true}
      sorting={true}
    />
  );
};
