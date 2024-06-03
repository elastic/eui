import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../../src/services';

import {
  EuiBasicTable,
  EuiTableFieldDataColumnType,
  EuiButtonGroup,
  EuiButtonGroupOptionProps,
  EuiCallOut,
  EuiLink,
  EuiSpacer,
  EuiFlexGroup,
} from '../../../../../src/components';

type User = {
  id: number;
  firstName: string | null | undefined;
  lastName: string;
  github: string;
  dateOfBirth: Date;
  jobTitle: string;
  address: string;
};

const users: User[] = [];

for (let i = 0; i < 10; i++) {
  users.push({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    jobTitle: faker.person.jobTitle(),
    address: `${faker.location.streetAddress()} ${faker.location.city()} ${faker.location.state(
      { abbreviated: true }
    )} ${faker.location.zipCode()}`,
  });
}

const columns: Array<EuiTableFieldDataColumnType<User>> = [
  {
    field: 'firstName',
    name: 'First Name',
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
    field: 'jobTitle',
    name: 'Job title',
    truncateText: true,
  },
  {
    field: 'address',
    name: 'Address',
    truncateText: { lines: 2 },
  },
];

const tableLayoutButtons: EuiButtonGroupOptionProps[] = [
  {
    id: 'tableLayoutFixed',
    label: 'Fixed',
    value: 'fixed',
  },
  {
    id: 'tableLayoutAuto',
    label: 'Auto',
    value: 'auto',
  },
  {
    id: 'tableLayoutCustom',
    label: 'Custom',
    value: 'custom',
  },
];

const vAlignButtons: EuiButtonGroupOptionProps[] = [
  {
    id: 'columnVAlignTop',
    label: 'Top',
    value: 'top',
  },
  {
    id: 'columnVAlignMiddle',
    label: 'Middle',
    value: 'middle',
  },
  {
    id: 'columnVAlignBottom',
    label: 'Bottom',
    value: 'bottom',
  },
];

const alignButtons: EuiButtonGroupOptionProps[] = [
  {
    id: 'columnAlignLeft',
    label: 'Left',
    value: 'left',
  },
  {
    id: 'columnAlignCenter',
    label: 'Center',
    value: 'center',
  },
  {
    id: 'columnAlignRight',
    label: 'Right',
    value: 'right',
  },
];

export default () => {
  const [tableLayout, setTableLayout] = useState('tableLayoutFixed');
  const [vAlign, setVAlign] = useState('columnVAlignMiddle');
  const [align, setAlign] = useState('columnAlignLeft');

  const onTableLayoutChange = (id: string, value: string) => {
    setTableLayout(id);
    columns[4].width = value === 'custom' ? '100px' : undefined;
    columns[5].width = value === 'custom' ? '20%' : undefined;
  };

  const onVAlignChange = (id: string, value: 'top' | 'middle' | 'bottom') => {
    setVAlign(id);
    columns.forEach((column) => (column.valign = value));
  };

  const onAlignChange = (id: string, value: 'left' | 'center' | 'right') => {
    setAlign(id);
    columns.forEach((column) => (column.align = value));
  };

  let callOutText;

  switch (tableLayout) {
    case 'tableLayoutFixed':
      callOutText =
        'Job title has truncateText set to true. Address is set to { lines: 2 }';
      break;
    case 'tableLayoutAuto':
      callOutText =
        'Job title will not wrap or truncate since tableLayout is set to auto. Address will truncate if necessary';
      break;
    case 'tableLayoutCustom':
      callOutText =
        'Job title has a custom column width of 100px. Address has a custom column width of 20%';
      break;
  }

  return (
    <>
      <EuiFlexGroup alignItems="flexStart">
        <EuiButtonGroup
          legend="Table layout options"
          options={tableLayoutButtons}
          idSelected={tableLayout}
          onChange={onTableLayoutChange}
        />
        <EuiButtonGroup
          legend="Vertical align options"
          options={vAlignButtons}
          idSelected={vAlign}
          onChange={onVAlignChange}
        />
        <EuiButtonGroup
          legend="Horizontal align options"
          options={alignButtons}
          idSelected={align}
          onChange={onAlignChange}
        />
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiCallOut
        size="s"
        color={tableLayout === 'tableLayoutAuto' ? 'warning' : 'primary'}
        title={callOutText}
      />
      <EuiSpacer size="m" />
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable's table layout options"
        items={users}
        columns={columns}
        rowHeader="firstName"
        tableLayout={tableLayout === 'tableLayoutAuto' ? 'auto' : 'fixed'}
      />
    </>
  );
};
