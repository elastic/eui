import React, { useState, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate, Comparators } from '../../../../../src/services';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiTableSortingType,
  Criteria,
  DefaultItemAction,
  CustomItemAction,
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
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

const cloneUserbyId = (id: number) => {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    const user = users[index];
    users.splice(index, 0, { ...user, id: users.length });
  }
};

const deleteUsersByIds = (...ids: number[]) => {
  ids.forEach((id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index >= 0) {
      users.splice(index, 1);
    }
  });
};

const columns: Array<EuiBasicTableColumn<User>> = [
  {
    field: 'firstName',
    name: 'First Name',
    truncateText: true,
    sortable: true,
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
  },
];

export default () => {
  /**
   * Actions
   */
  const [multiAction, setMultiAction] = useState(false);
  const [customAction, setCustomAction] = useState(false);

  const deleteUser = (user: User) => {
    deleteUsersByIds(user.id);
    setSelectedItems([]);
  };

  const cloneUser = (user: User) => {
    cloneUserbyId(user.id);
    setSelectedItems([]);
  };

  const actions = useMemo(() => {
    if (customAction) {
      let actions: Array<CustomItemAction<User>> = [
        {
          render: (user: User) => {
            return (
              <EuiLink onClick={() => deleteUser(user)} color="danger">
                Delete
              </EuiLink>
            );
          },
        },
      ];
      if (multiAction) {
        actions = [
          {
            ...actions[0],
            isPrimary: true,
            showOnHover: true,
          },
          {
            render: (user: User) => {
              return (
                <EuiLink color="success" onClick={() => cloneUser(user)}>
                  Clone
                </EuiLink>
              );
            },
          },
          {
            render: () => {
              return <EuiLink onClick={() => {}}>Edit</EuiLink>;
            },
          },
        ];
      }
      return actions;
    } else {
      let actions: Array<DefaultItemAction<User>> = [
        {
          name: 'User profile',
          description: ({ firstName, lastName }) =>
            `Visit ${firstName} ${lastName}'s profile`,
          icon: 'editorLink',
          color: 'primary',
          type: 'icon',
          enabled: ({ online }) => !!online,
          href: ({ id }) => `${window.location.href}?id=${id}`,
          target: '_self',
          'data-test-subj': 'action-outboundlink',
        },
      ];
      if (multiAction) {
        actions = [
          {
            name: <>Clone</>,
            description: 'Clone this user',
            icon: 'copy',
            type: 'icon',
            onClick: cloneUser,
            'data-test-subj': 'action-clone',
          },
          {
            name: (user: User) => (user.id ? 'Delete' : 'Remove'),
            description: ({ firstName, lastName }) =>
              `Delete ${firstName} ${lastName}`,
            icon: 'trash',
            color: 'danger',
            type: 'icon',
            onClick: deleteUser,
            isPrimary: true,
            'data-test-subj': ({ id }) => `action-delete-${id}`,
          },
          {
            name: 'Edit',
            isPrimary: true,
            available: ({ online }) => !online,
            enabled: ({ online }) => !!online,
            description: 'Edit this user',
            icon: 'pencil',
            type: 'icon',
            onClick: () => {},
            'data-test-subj': 'action-edit',
          },
          {
            name: 'Share',
            isPrimary: true,
            description: 'Share this user',
            icon: 'share',
            type: 'icon',
            onClick: () => {},
            'data-test-subj': 'action-share',
          },
          ...actions,
        ];
      }
      return actions;
    }
  }, [customAction, multiAction]);

  const columnsWithActions = [
    ...columns,
    {
      name: 'Actions',
      actions,
    },
  ];

  /**
   * Selection
   */
  const [selectedItems, setSelectedItems] = useState<User[]>([]);

  const onSelectionChange = (selectedItems: User[]) => {
    setSelectedItems(selectedItems);
  };

  const selection: EuiTableSelectionType<User> = {
    selectable: (user: User) => user.online,
    selectableMessage: (selectable: boolean, user: User) =>
      !selectable
        ? `${user.firstName} ${user.lastName} is currently offline`
        : `Select ${user.firstName} ${user.lastName}`,
    onSelectionChange,
  };

  const deleteSelectedUsers = () => {
    deleteUsersByIds(...selectedItems.map((user: User) => user.id));
    setSelectedItems([]);
  };

  const deleteButton =
    selectedItems.length > 0 ? (
      <EuiButton color="danger" iconType="trash" onClick={deleteSelectedUsers}>
        Delete {selectedItems.length} Users
      </EuiButton>
    ) : null;

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
      <EuiFlexGroup
        alignItems="center"
        css={({ euiTheme }) => ({ minHeight: euiTheme.size.xxl })}
      >
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Multiple Actions"
            checked={multiAction}
            onChange={() => setMultiAction(!multiAction)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Custom Actions"
            checked={customAction}
            onChange={() => setCustomAction(!customAction)}
          />
        </EuiFlexItem>
        <EuiFlexItem />
        {deleteButton}
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable with actions"
        items={pageOfItems}
        itemId="id"
        columns={columnsWithActions}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        onChange={onTableChange}
      />
    </>
  );
};
