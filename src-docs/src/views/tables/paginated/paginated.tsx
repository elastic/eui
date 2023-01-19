import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../../src/services/format';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  Criteria,
  EuiCode,
  EuiLink,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSwitch,
  EuiHorizontalRule,
  EuiText,
} from '../../../../../src/components';

const getEmojiFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

type User = {
  id: string;
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
    id: faker.datatype.uuid(),
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
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);

  const onTableChange = ({ page }: Criteria<User>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
  };

  const renderStatus = (online: User['online']) => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <EuiHealth color={color}>{label}</EuiHealth>;
  };

  const togglePerPageOptions = () => setShowPerPageOptions(!showPerPageOptions);

  const findUsers = (users: User[], pageIndex: number, pageSize: number) => {
    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = users;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = users.slice(
        startIndex,
        Math.min(startIndex + pageSize, users.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: users.length,
    };
  };

  const { pageOfItems, totalItemCount } = findUsers(users, pageIndex, pageSize);

  const columns: Array<EuiBasicTableColumn<User>> = [
    {
      field: 'firstName',
      name: 'First Name',
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
        enlarge: true,
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
        return `${getEmojiFlag(country.flag)} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online: User['online']) => renderStatus(online),
      mobileOptions: {
        show: false,
      },
    },
  ];

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 0],
    showPerPageOptions,
  };

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-{pageSize * pageIndex + pageSize}
        </strong>{' '}
        of {totalItemCount}
      </>
    );

  return (
    <div>
      <EuiSwitch
        checked={!showPerPageOptions}
        label={
          <span>
            Hide per page options with{' '}
            <EuiCode>pagination.showPerPageOptions = false</EuiCode>
          </span>
        }
        onChange={togglePerPageOptions}
      />
      <EuiSpacer size="xl" />
      <EuiText size="xs">
        Showing {resultsCount} <strong>Users</strong>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiHorizontalRule margin="none" style={{ height: 2 }} />
      <EuiBasicTable
        tableCaption="Demo for EuiBasicTable with pagination"
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
};
