import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Comparators } from '../../../../../src/services';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiTableSortingType,
  Criteria,
  EuiHealth,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
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

const users: User[] = [];

for (let i = 0; i < 20; i++) {
  users.push({
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

const getOnlineUsers = () => users.filter((user) => user.online);

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

export default () => {
  /**
   * Selection
   */
  const [selectedItems, setSelectedItems] = useState<User[]>([]);
  const onSelectionChange = (selectedItems: User[]) => {
    setSelectedItems(selectedItems);
  };
  const selectOnlineUsers = () => {
    setSelectedItems(getOnlineUsers());
  };

  const selection: EuiTableSelectionType<User> = {
    selectable: (user: User) => user.online,
    selectableMessage: (selectable: boolean, user: User) =>
      !selectable
        ? `${user.firstName} ${user.lastName} is currently offline`
        : `Select ${user.firstName} ${user.lastName}`,
    onSelectionChange,
    selected: selectedItems,
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
      <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={selectOnlineUsers}>Select online users</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{deleteButton}</EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiBasicTable
        tableCaption="Demo for EuiBasicTable with selection"
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        onChange={onTableChange}
        rowHeader="firstName"
      />
    </>
  );
};
