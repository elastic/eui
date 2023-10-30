import React, { useState, ReactNode } from 'react';
import { faker } from '@faker-js/faker';
import { Random } from '../../../../../src/services';

import {
  EuiInMemoryTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiSearchBarProps,
  EuiHealth,
  EuiButton,
  EuiEmptyPrompt,
} from '../../../../../src/components';

type User = {
  id: number;
  firstName: string | null | undefined;
  lastName: string;
  online: boolean;
  location: {
    city: string;
    country: string;
  };
};

const userData: User[] = [];

for (let i = 0; i < 20; i++) {
  userData.push({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    online: faker.datatype.boolean(),
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
  });
}

const onlineUsers = userData.filter((user) => user.online);

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

const random = new Random();

const noItemsFoundMsg = 'No users match search criteria';

export default () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<ReactNode>(
    <EuiEmptyPrompt
      title={<h3>No users</h3>}
      titleSize="xs"
      body="Looks like you don&rsquo;t have any users. Let&rsquo;s create some!"
      actions={
        <EuiButton
          size="s"
          key="loadUsers"
          onClick={() => {
            loadUsers();
          }}
        >
          Load Users
        </EuiButton>
      }
    />
  );

  const [selection, setSelection] = useState<User[]>([]);
  const [error, setError] = useState<string | undefined>();

  const loadUsers = () => {
    setMessage('Loading users...');
    setLoading(true);
    setUsers([]);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      setMessage(noItemsFoundMsg);
      setError(undefined);
      setUsers(userData);
    }, random.number({ min: 0, max: 3000 }));
  };

  const loadUsersWithError = () => {
    setMessage('Loading users...');
    setLoading(true);
    setUsers([]);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      setMessage(noItemsFoundMsg);
      setError('ouch!... again... ');
      setUsers([]);
    }, random.number({ min: 0, max: 3000 }));
  };

  const renderToolsLeft = () => {
    if (selection.length === 0) {
      return;
    }

    const onClick = () => {
      const deleteUsersByIds = (users: User[], ids: number[]) => {
        const updatedUsers = [...users];
        ids.forEach((id) => {
          const index = updatedUsers.findIndex((user) => user.id === id);
          if (index >= 0) {
            updatedUsers.splice(index, 1);
          }
        });
        return updatedUsers;
      };

      setUsers((users) =>
        deleteUsersByIds(
          users,
          selection.map((user) => user.id)
        )
      );
      setSelection([]);
    };

    return (
      <EuiButton color="danger" iconType="trash" onClick={onClick}>
        Delete {selection.length} Users
      </EuiButton>
    );
  };

  const renderToolsRight = () => {
    return [
      <EuiButton
        key="loadUsers"
        onClick={() => {
          loadUsers();
        }}
        isDisabled={loading}
      >
        Load Users
      </EuiButton>,
      <EuiButton
        key="loadUsersError"
        onClick={() => {
          loadUsersWithError();
        }}
        isDisabled={loading}
      >
        Load Users (Error)
      </EuiButton>,
    ];
  };

  const search: EuiSearchBarProps = {
    toolsLeft: renderToolsLeft(),
    toolsRight: renderToolsRight(),
    box: {
      incremental: true,
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
        field: 'location.country',
        name: 'Country',
        multiSelect: false,
        options: userData.map(({ location: { country } }) => ({
          value: country,
        })),
      },
    ],
  };

  const pagination = {
    initialPageSize: 5,
    pageSizeOptions: [3, 5, 8],
  };

  const selectionValue: EuiTableSelectionType<User> = {
    selectable: (user) => user.online,
    selectableMessage: (selectable) =>
      !selectable ? 'User is currently offline' : '',
    onSelectionChange: (selection) => setSelection(selection),
    initialSelected: onlineUsers,
  };

  return (
    <EuiInMemoryTable
      tableCaption="Demo of EuiInMemoryTable with uncontrolled selection"
      items={users}
      itemId="id"
      error={error}
      loading={loading}
      message={message}
      columns={columns}
      search={search}
      pagination={pagination}
      sorting={true}
      selection={selectionValue}
      isSelectable={true}
    />
  );
};
