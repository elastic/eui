import React, { useState, useRef, ReactNode } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate, Random } from '../../../../../src/services';

import {
  EuiInMemoryTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiSearchBarProps,
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
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

const userData: User[] = [];

for (let i = 0; i < 20; i++) {
  userData.push({
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

const onlineUsers = userData.filter((user) => user.online);

const deleteUsersByIds = (...ids: number[]) => {
  ids.forEach((id) => {
    const index = userData.findIndex((user) => user.id === id);
    if (index >= 0) {
      userData.splice(index, 1);
    }
  });
};

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
  const tableRef = useRef<EuiInMemoryTable<User> | null>(null);

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
      deleteUsersByIds(...selection.map((user) => user.id));
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

  const onSelection = () => {
    tableRef.current?.setSelection(onlineUsers);
  };

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onSelection}>Select online users</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem />
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiInMemoryTable
        tableCaption="Demo of EuiInMemoryTable with selection"
        ref={tableRef}
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
    </>
  );
};
