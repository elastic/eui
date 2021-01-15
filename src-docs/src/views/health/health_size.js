import React from 'react';

import {
  EuiHealth,
  EuiSpacer,
  EuiBasicTable,
  EuiTitle,
  EuiCode,
} from '../../../../src/components';

import { formatDate } from '../../../../src/services/format';

const users = [
  {
    id: '1',
    firstName: 'Nick',
    lastName: 'Keller',
    github: 'nickkeller',
    dateOfBirth: Date.now(),
    online: true,
  },
  {
    id: '2',
    firstName: 'Doris',
    lastName: 'Greer',
    github: 'dorisgreer',
    dateOfBirth: Date.now(),
    online: false,
  },
  {
    id: '3',
    firstName: 'Jasmine',
    lastName: 'Reese',
    github: 'jasminereese',
    dateOfBirth: Date.now(),
    online: true,
  },
];

export default () => {
  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
    },
    {
      field: 'lastName',
      name: 'Last Name',
    },
    {
      field: 'github',
      name: 'Github',
    },
    {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong'),
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return (
          <EuiHealth color={color} textSize="inherit">
            {label}
          </EuiHealth>
        );
      },
    },
  ];

  return (
    <div>
      <EuiTitle size="xs">
        <h3>
          Pass <EuiCode>xs / s / m</EuiCode> to change the text size
        </h3>
      </EuiTitle>

      <EuiSpacer size="m" />

      <EuiHealth textSize="xs" color="success">
        Extra small
      </EuiHealth>

      <EuiSpacer />

      <EuiHealth textSize="s" color="success">
        Small (Default)
      </EuiHealth>

      <EuiSpacer />

      <EuiHealth textSize="m" color="success">
        Medium
      </EuiHealth>

      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>
          Pass <EuiCode>inherit</EuiCode> to inherit the text size value from
          the parent element
        </h3>
      </EuiTitle>

      <EuiSpacer size="m" />

      <EuiBasicTable
        compressed
        items={users}
        rowHeader="firstName"
        columns={columns}
      />
    </div>
  );
};
