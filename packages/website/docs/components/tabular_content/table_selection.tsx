import React, { useState } from 'react';

import { EuiSwitch } from '@elastic/eui';

// @ts-expect-error Docusaurus theme is missing types for this component
import { Demo } from '@elastic/eui-docusaurus-theme/lib/components/demo';

const userDataSetup = (varName: string = 'users', isControlled: boolean) => `
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

const ${varName}: User[] = [];

for (let i = 0; i < 20; i++) {
  ${varName}.push({
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
${
  !isControlled
    ? `const onlineUsers = ${varName}.filter((user) => user.online);\n`
    : ''
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
    field: 'location',
    name: 'Location',
    truncateText: true,
    textOnly: true,
    render: (location: User['location']) => {
      return \`\${location.city}, \${location.country}\`;
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
`;

const selectionSetup = (isControlled: boolean) => {
  const selectionConfig = isControlled
    ? 'selected: selectedItems'
    : 'initialSelected: onlineUsers';

  const selectOnlineUsersCallback = isControlled
    ? `
  const selectOnlineUsers = () => {
    const onlineUsers = () => users.filter((user) => user.online);
    setSelectedItems(onlineUsers);
  };
`
    : '';

  return `
  const [selectedItems, setSelectedItems] = useState<User[]>([]);
  const onSelectionChange = (selectedItems: User[]) => {
    setSelectedItems(selectedItems);
  };
  ${selectOnlineUsersCallback}
  const selection: EuiTableSelectionType<User> = {
    selectable: (user: User) => user.online,
    selectableMessage: (selectable: boolean, user: User) =>
      !selectable
        ? \`\${user.firstName} \${user.lastName} is currently offline\`
        : \`Select \${user.firstName} \${user.lastName}\`,
    onSelectionChange,
    ${selectionConfig},
  };
`.trim();
};

const basicTableCode = (isControlled: boolean) => `
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiTableSortingType,
  Criteria,
  Comparators,
  EuiFlexGroup,
  EuiSpacer,
  EuiHealth,
  EuiButton,
} from '@elastic/eui';

${userDataSetup('users', isControlled)}

export default () => {
  /**
   * Selection
   */
  ${selectionSetup(isControlled)}

  const deleteSelectedUsers = () => {
    selectedItems.forEach(({ id }) => {
      const index = users.findIndex((user) => user.id === id);
      if (index >= 0) {
        users.splice(index, 1);
      }
    });
    setSelectedItems([]);
  }

  /**
   * Pagination & sorting
   */
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<keyof User>('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const onTableChange = ({ page, sort }: Criteria<User>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }
  };

  // Manually handle sorting and pagination of data
  const findUsers = (
    users: User[],
    pageIndex: number,
    pageSize: number,
    sortField: keyof User,
    sortDirection: 'asc' | 'desc'
  ) => {
    let items;

    if (sortField) {
      items = users
        .slice(0)
        .sort(
          Comparators.property(sortField, Comparators.default(sortDirection))
        );
    } else {
      items = users;
    }

    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(
        startIndex,
        Math.min(startIndex + pageSize, users.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: users.length,
    };
  };

  const { pageOfItems, totalItemCount } = findUsers(
    users,
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting: EuiTableSortingType<User> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  return (
    <>
      <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
        ${
          isControlled
            ? `
        <EuiButton onClick={selectOnlineUsers}>
          Select online users
        </EuiButton>`
            : ''
        }
        <EuiButton
          color="danger"
          iconType="trash"
          onClick={deleteSelectedUsers}
          isDisabled={selectedItems.length === 0}
        >
          Delete {selectedItems.length || 'selected'} users
        </EuiButton>
      </EuiFlexGroup>
      <EuiSpacer />

      <EuiBasicTable
        tableCaption="Demo for an EuiBasicTable with ${
          isControlled ? 'controlled' : 'uncontrolled'
        } selection"
        responsiveBreakpoint={false}
        items={pageOfItems}
        itemId="id"
        rowHeader="firstName"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
        selection={selection}
      />
    </>
  );
};
`;

const inMemoryTableCode = (isControlled: boolean) => `
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiInMemoryTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiSearchBarProps,
  EuiEmptyPrompt,
  EuiHealth,
  EuiButton,
} from '@elastic/eui';

${userDataSetup('userData', isControlled)}

export default () => {
  ${selectionSetup(isControlled)}

  const [users, setUsers] = useState<User[]>([]);
  const noItemsFoundMsg = 'No users match search criteria';
  const [message, setMessage] = useState<React.ReactNode>(
    <EuiEmptyPrompt
      title={<h3>No users</h3>}
      titleSize="xs"
      body="Looks like you don&rsquo;t have any users. Let&rsquo;s create some!"
      actions={
        <EuiButton
          size="s"
          key="loadUsers"
          onClick={() => loadUsers()}
        >
          Load users
        </EuiButton>
      }
    />
  );
  const [error, setError] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);
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
    }, faker.number.int({ min: 0, max: 3000 }));
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
    }, faker.number.int({ min: 0, max: 3000 }));
  };

  const renderToolsLeft = () => {
    const deleteUsers = () => {
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
          selectedItems.map((user) => user.id)
        )
      );
      setSelectedItems([]);
    };

    return [${
      isControlled
        ? `
      <EuiButton
        key="selectUsers"
        onClick={selectOnlineUsers}
        isDisabled={loading || users.length === 0}
      >
        Select online users
      </EuiButton>,`
        : ''
    }
      <EuiButton
        key="deleteUsers"
        color="danger"
        iconType="trash"
        onClick={deleteUsers}
        isDisabled={selectedItems.length === 0}
      >
        Delete {selectedItems.length} users
      </EuiButton>,
    ];
  };

  const renderToolsRight = () => {
    return [
      <EuiButton
        key="loadUsers"
        onClick={() => loadUsers()}
        isDisabled={loading}
      >
        Load users
      </EuiButton>,
      <EuiButton
        key="loadUsersError"
        onClick={() => loadUsersWithError()}
        isDisabled={loading}
      >
        Load users (Error)
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

  return (
    <EuiInMemoryTable
      tableCaption="Demo for an EuiInMemoryTable with ${
        isControlled ? 'controlled' : 'uncontrolled'
      } selection"
      responsiveBreakpoint={false}
      items={users}
      itemId="id"
      rowHeader="firstName"
      error={error}
      loading={loading}
      message={message}
      search={search}
      sorting={true}
      pagination={pagination}
      columns={columns}
      selection={selection}
    />
  );
};
`;

export default ({ type }) => {
  const [isControlled, setIsControlled] = useState(false);

  const generateCode = type === 'inMemory' ? inMemoryTableCode : basicTableCode;

  return (
    <>
      <EuiSwitch
        label="Controlled selection"
        checked={isControlled}
        onChange={() => setIsControlled(!isControlled)}
      />

      <div hidden={isControlled}>
        <Demo>{generateCode(isControlled)}</Demo>
      </div>
      <div hidden={!isControlled}>
        <Demo>{generateCode(!isControlled)}</Demo>
      </div>
    </>
  );
};
