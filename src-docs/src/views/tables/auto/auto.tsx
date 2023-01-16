import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { htmlIdGenerator, formatDate } from '../../../../../src/services';

import {
  EuiBasicTable,
  EuiButtonGroup,
  EuiCallOut,
  EuiLink,
  EuiSpacer,
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

const usersLength = 20;

for (let i = 0; i < usersLength; i++) {
  users.push({
    id: i + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    github: faker.internet.userName(),
    dateOfBirth: faker.date.past(),
    jobTitle: faker.name.jobTitle(),
    address: `${faker.address.streetAddress()} ${faker.address.cityName()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
  });
}

const columns: any = [
  {
    field: 'firstName',
    name: 'First Name',
    truncateText: true,
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
    field: 'jobTitle',
    name: 'Job title',
  },
  {
    field: 'address',
    name: 'Address',
    truncateText: true,
  },
];

const filteredUsers = users.filter((user, index) => index < 10);

const idPrefix = htmlIdGenerator()();

const toggleButtons: any[] = [
  {
    id: `${idPrefix}0`,
    label: 'Fixed',
    value: 'fixed',
  },
  {
    id: `${idPrefix}1`,
    label: 'Auto',
    value: 'auto',
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
    value: 'custom',
  },
];

const vAlignButtons: any[] = [
  {
    id: `${idPrefix}4`,
    label: 'Top',
    value: 'top',
  },
  {
    id: `${idPrefix}3`,
    label: 'Middle',
    value: 'middle',
  },
  {
    id: `${idPrefix}5`,
    label: 'Bottom',
    value: 'bottom',
  },
];

const alignButtons: any[] = [
  {
    id: `${idPrefix}6`,
    label: 'Left',
    value: 'left',
  },
  {
    id: `${idPrefix}7`,
    label: 'Center',
    value: 'center',
  },
  {
    id: `${idPrefix}8`,
    label: 'Right',
    value: 'right',
  },
];

export default () => {
  const [layout, setLayout] = useState('fixed');
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}0`);
  const [vAlignButtonsIdSelected, setVAlignButtonsIdSelected] = useState(
    `${idPrefix}3`
  );
  const [alignButtonsIdSelected, setAlignButtonsIdSelected] = useState(
    `${idPrefix}6`
  );

  const onChange = (optionId: string) => {
    const alignment = toggleButtons.find((x) => x.id === optionId).value;

    columns[5].width = alignment === 'custom' ? '20%' : undefined;

    setToggleIdSelected(optionId);
    setLayout(alignment);
  };

  const onVAlignChange = (optionId: string) => {
    setVAlignButtonsIdSelected(optionId);
    const alignment = vAlignButtons.find((x) => x.id === optionId).value;

    columns.forEach((column: any) => (column.valign = alignment));
  };

  const onAlignChange = (optionId: string) => {
    setAlignButtonsIdSelected(optionId);
    const alignment = alignButtons.find((x) => x.id === optionId).value;

    columns.forEach((column: any) => (column.align = alignment));
  };

  let callOutText;

  switch (layout) {
    case 'fixed':
      callOutText = 'Address has truncateText set to true';
      break;
    case 'auto':
      callOutText =
        'Address has truncateText set to true which is not applied since tableLayout is set to auto';
      break;
    case 'custom':
      callOutText = 'Address has truncateText set to true and width set to 20%';
      break;
  }

  return (
    <div>
      <EuiButtonGroup
        legend="Table layout options"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={onChange}
      />
      &emsp;
      <EuiButtonGroup
        legend="Vertical align options"
        options={vAlignButtons}
        idSelected={vAlignButtonsIdSelected}
        onChange={onVAlignChange}
      />
      &emsp;
      <EuiButtonGroup
        legend="Horizontal align options"
        options={alignButtons}
        idSelected={alignButtonsIdSelected}
        onChange={onAlignChange}
      />
      <EuiSpacer size="m" />
      <EuiCallOut
        size="s"
        color={layout === 'auto' ? 'warning' : 'primary'}
        title={callOutText}
      />
      <EuiSpacer size="m" />
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable's table layout options"
        items={filteredUsers}
        columns={columns}
        tableLayout={layout === 'auto' ? 'auto' : 'fixed'}
      />
    </div>
  );
};
