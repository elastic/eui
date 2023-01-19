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
} from '../../../../../src/components';

import uniqBy from 'lodash/uniqBy';

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

  const renderStatus = (online: User['online']) => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <EuiHealth color={color}>{label}</EuiHealth>;
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
      footer: <em>Page totals:</em>,
      sortable: true,
      truncateText: true,
      mobileOptions: {
        show: false,
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
      field: 'firstName',
      name: 'Full Name',
      mobileOptions: {
        header: false,
        only: true,
        width: '100%',
      },
      render: (user: User) => (
        <EuiFlexGroup responsive={false} alignItems="center">
          <EuiFlexItem>
            {user.firstName} {user.lastName}
          </EuiFlexItem>
          <EuiFlexItem grow={false}>{renderStatus(user.online)}</EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
    {
      field: 'github',
      name: 'Github',
      footer: ({ items }: { items: User[] }) => (
        <span>{uniqBy(items, 'github').length} users</span>
      ),
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
      footer: ({ items }: { items: User[] }) => (
        <span>{uniqBy(items, 'country').length} countries</span>
      ),
      render: (country: User['country']) => {
        return `${getEmojiFlag(country.flag)} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      footer: ({ items }: { items: User[] }) => {
        return (
          <span>
            {items.filter((user: User) => !!user.online).length} online
          </span>
        );
      },
      dataType: 'boolean',
      render: (online: User['online']) => renderStatus(online),
      sortable: true,
      mobileOptions: { show: false },
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
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable with footer"
      items={pageOfItems}
      itemId="id"
      columns={columns}
      pagination={pagination}
      sorting={sorting}
      isSelectable={true}
      selection={selection}
      onChange={onTableChange}
    />
  );
};
