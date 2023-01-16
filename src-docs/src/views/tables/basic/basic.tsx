import React from 'react';
import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../../src/services/format';

import {
  EuiBasicTable,
  EuiTableFieldDataColumnType,
  EuiLink,
  EuiHealth,
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

const usersLength = 10;

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

const renderStatus = (online: User['online']) => {
  const color = online ? 'success' : 'danger';
  const label = online ? 'Online' : 'Offline';
  return <EuiHealth color={color}>{label}</EuiHealth>;
};

export default () => {
  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      'data-test-subj': 'firstNameCell',
      mobileOptions: {
        render: (user: User) => (
          <span>
            {user.firstName}{' '}
            <EuiLink href="#" target="_blank">
              {user.lastName}
            </EuiLink>
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
      render: (lastName: User['lastName']) => (
        <EuiLink href="#" target="_blank">
          {lastName}
        </EuiLink>
      ),
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'github',
      name: 'Github',
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
      render: (online: User['online']) => {
        return renderStatus(online);
      },
    },
  ];

  const getRowProps = (user: User) => {
    const { id } = user;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => {},
    };
  };

  const getCellProps = (
    user: User,
    column: EuiTableFieldDataColumnType<any>
  ) => {
    const { id } = user;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${String(field)}`,
      textOnly: true,
    };
  };

  const filteredUsers = users.filter((user, index) => index < 10);

  return (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable"
      items={filteredUsers}
      rowHeader="firstName"
      columns={columns as any}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};
