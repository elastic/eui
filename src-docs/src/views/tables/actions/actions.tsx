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
  country: {
    code: string;
    name: string;
  };
};

const users: User[] = [];

const usersLength = 20;

for (let i = 0; i < usersLength; i++) {
  users.push({
    id: i + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    online: faker.datatype.boolean(),
    country: {
      code: faker.address.countryCode(),
      name: faker.address.country(),
    },
  });
}

export default () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<keyof User>('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedItems, setSelectedItems] = useState<User[]>([]);
  const [multiAction, setMultiAction] = useState(false);
  const [customAction, setCustomAction] = useState(false);

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

  const deleteSelectedUsers = () => {
    deleteUsersByIds(...selectedItems.map((user: User) => user.id));
    setSelectedItems([]);
  };

  const onSelectionChange = (selectedItems: User[]) => {
    setSelectedItems(selectedItems);
  };

  const deleteButton =
    selectedItems.length > 0 ? (
      <EuiButton color="danger" iconType="trash" onClick={deleteSelectedUsers}>
        Delete {selectedItems.length} Users
      </EuiButton>
    ) : null;

  const toggleMultiAction = () => {
    setMultiAction(!multiAction);
  };

  const toggleCustomAction = () => {
    setCustomAction(!customAction);
  };

  const deleteUser = (user: User) => {
    deleteUsersByIds(user.id);
    setSelectedItems([]);
  };

  const cloneUser = (user: User) => {
    cloneUserbyId(user.id);
    setSelectedItems([]);
  };

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
            render: (user: User) => {
              return (
                <EuiLink color="success" onClick={() => cloneUser(user)}>
                  Clone
                </EuiLink>
              );
            },
          },
          ...actions,
        ];
      }
      return actions;
    } else {
      let actions: Array<DefaultItemAction<User>> = [
        {
          name: 'Elastic.co',
          description: 'Go to elastic.co',
          icon: 'editorLink',
          color: 'primary',
          type: 'icon',
          href: 'https://elastic.co',
          target: '_blank',
          'data-test-subj': 'action-outboundlink',
        },
      ];
      if (multiAction) {
        actions = [
          {
            name: <span>Clone</span>,
            description: 'Clone this user',
            icon: 'copy',
            type: 'icon',
            onClick: cloneUser,
            'data-test-subj': 'action-clone',
          },
          {
            name: (user: User) => (user.id ? 'Delete' : 'Remove'),
            description: 'Delete this user',
            icon: 'trash',
            color: 'danger',
            type: 'icon',
            onClick: deleteUser,
            isPrimary: true,
            'data-test-subj': 'action-delete',
          },
          {
            name: 'Edit',
            isPrimary: true,
            available: ({ online }: { online: boolean }) => !online,
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
  }, [customAction, multiAction]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns: Array<EuiBasicTableColumn<User>> = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true,
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
        <EuiLink href={`https://github.com/${username}`} target="_blank">
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
      field: 'country',
      name: 'Nationality',
      render: (country: User['country']) => {
        return `${getEmojiFlag(country.code)} ${country.name}`;
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
    {
      name: 'Actions',
      actions,
    },
  ];

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

  const selection: EuiTableSelectionType<User> = {
    selectable: (user: User) => user.online,
    selectableMessage: (selectable: boolean) =>
      !selectable ? 'User is currently offline' : '',
    onSelectionChange,
  };

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Multiple Actions"
            checked={multiAction}
            onChange={toggleMultiAction}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Custom Actions"
            checked={customAction}
            onChange={toggleCustomAction}
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
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        hasActions={customAction ? false : true}
        onChange={onTableChange}
      />
    </>
  );
};

const getEmojiFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
