import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate, Comparators } from '../../../../../src/services';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiTableSortingType,
  Criteria,
  EuiLink,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiSpacer,
} from '../../../../../src/components';

const getEmojiFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

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
    flag: string;
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
      flag: faker.address.countryCode(),
    },
  });
}

export default () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<keyof User>('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [, setSelectedItems] = useState<User[]>([]);
  const [customHeader, setCustomHeader] = useState(true);
  const [isResponsive, setIsResponsive] = useState(true);

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

  const onSelectionChange = (selectedItems: User[]) => {
    setSelectedItems(selectedItems);
  };

  const toggleHeader = () => {
    setCustomHeader(!customHeader);
  };

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  const deleteUsersByIds = (...ids: number[]) => {
    ids.forEach((id) => {
      const index = users.findIndex((user) => user.id === id);
      if (index >= 0) {
        users.splice(index, 1);
      }
    });
  };

  const deleteUser = (user: User) => {
    deleteUsersByIds(user.id);
    setSelectedItems([]);
  };

  const cloneUserbyId = (id: number) => {
    const index = users.findIndex((user) => user.id === id);
    if (index >= 0) {
      const user = users[index];
      users.splice(index, 0, { ...user, id: users.length });
    }
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

  const columns: Array<EuiBasicTableColumn<User>> = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true,
      mobileOptions: {
        render: customHeader
          ? (user: User) => (
              <span>
                {user.firstName} {user.lastName}
              </span>
            )
          : undefined,
        header: customHeader ? false : true,
        width: customHeader ? '100%' : undefined,
        enlarge: customHeader ? true : false,
        truncateText: customHeader ? false : true,
      },
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
      mobileOptions: {
        show: !isResponsive || !customHeader,
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
      sortable: true,
    },
    {
      field: 'country',
      name: 'Nationality',
      render: (country: User['country']) => {
        return `${getEmojiFlag(country.flag)} ${country.name}`;
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
      actions: [
        {
          name: 'Clone',
          description: 'Clone this person',
          icon: 'copy',
          type: 'icon',
          onClick: cloneUser,
        },
        {
          name: 'Delete',
          description: 'Delete this person',
          icon: 'trash',
          type: 'icon',
          color: 'danger',
          onClick: deleteUser,
        },
      ],
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
      <EuiFlexGroup alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Responsive"
            checked={isResponsive}
            onChange={toggleResponsive}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Custom header"
            disabled={!isResponsive}
            checked={isResponsive && customHeader}
            onChange={toggleHeader}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiBasicTable
        tableCaption="Demo for responsive EuiBasicTable with mobile options"
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        isSelectable={true}
        hasActions={true}
        responsive={isResponsive}
        onChange={onTableChange}
      />
    </>
  );
};
