import React from 'react';
import { faker } from '@faker-js/faker';
import {
  EuiThemeProvider,
  EuiBasicTable,
  EuiBasicTableColumn,
} from '../../../../../src';

type User = {
  firstName: string;
  lastName: string;
};

const users: User[] = [];
for (let i = 0; i < 5; i++) {
  users.push({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  });
}

const columns: Array<EuiBasicTableColumn<User>> = [
  {
    field: 'firstName',
    name: 'First name',
  },
  {
    field: 'lastName',
    name: 'Last name',
  },
];

export default () => {
  return (
    <EuiThemeProvider highContrastMode={true}>
      <EuiBasicTable
        columns={columns}
        items={users}
        compressed
        responsiveBreakpoint={false}
      />
    </EuiThemeProvider>
  );
};
