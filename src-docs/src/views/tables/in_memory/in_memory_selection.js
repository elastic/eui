import React, { useState, Fragment, useRef } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiInMemoryTable,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../../src/components';
import { Random } from '../../../../../src/services/random';

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

const random = new Random();

const store = createDataStore();

const noItemsFoundMsg = 'No users match search criteria';

export const Table = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(
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

  const [selection, setSelection] = useState([]);
  const [error, setError] = useState();
  const tableRef = useRef();

  const loadUsers = () => {
    setMessage('Loading users...');
    setLoading(true);
    setUsers([]);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      setMessage(noItemsFoundMsg);
      setError(undefined);
      setUsers(store.users);
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
      users: [];
    }, random.number({ min: 0, max: 3000 }));
  };

  const renderToolsLeft = () => {
    if (selection.length === 0) {
      return;
    }

    const onClick = () => {
      store.deleteUsers(...selection.map((user) => user.id));
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

  const search = {
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
        field: 'nationality',
        name: 'Nationality',
        multiSelect: false,
        options: store.countries.map((country) => ({
          value: country.code,
          name: country.name,
          view: `${country.flag} ${country.name}`,
        })),
      },
    ],
  };

  const pagination = {
    initialPageSize: 5,
    pageSizeOptions: [3, 5, 8],
  };

  const onlineUsers = store.users.filter((user) => user.online);

  const selectionValue = {
    selectable: (user) => user.online,
    selectableMessage: (selectable) =>
      !selectable ? 'User is currently offline' : undefined,
    onSelectionChange: (selection) => setSelection(selection),
    initialSelected: onlineUsers,
  };

  const onSelection = () => {
    tableRef.current.setSelection(onlineUsers);
  };

  return (
    <Fragment>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onSelection}>Select online users</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem />
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiInMemoryTable
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
    </Fragment>
  );
};
