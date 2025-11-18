/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { moveStorybookControlsToCategory } from '../../../.storybook/utils';

import { EuiLink } from '../link';
import { EuiHealth } from '../health';
import type { EuiBasicTableColumn } from './basic_table';

import { EuiInMemoryTable, EuiInMemoryTableProps } from './in_memory_table';

// Set static seed so that the generated faker data is consistent between page loads
faker.seed(8_02_2010);

const meta: Meta<EuiInMemoryTableProps> = {
  title: 'Tabular Content/EuiInMemoryTable',
  // @ts-ignore complex
  component: EuiInMemoryTable,
  args: {
    allowNeutralSort: true,
    searchFormat: 'eql',
    error: '',
    loading: false,
    // Set to strings for easier testing
    noItemsMessage: '',
    childrenBetween: '',
    // Inherited from EuiTable
    responsiveBreakpoint: 'm',
    tableLayout: 'fixed',
    hasBackground: true,
  },
};
moveStorybookControlsToCategory(
  meta,
  ['responsiveBreakpoint', 'tableLayout', 'hasBackground'],
  'EuiTable props'
);

export default meta;
type Story = StoryObj<EuiInMemoryTableProps<User>>;

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

const columns: Array<EuiBasicTableColumn<User>> = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    truncateText: true,
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
    sortable: true,
    mobileOptions: {
      show: false,
    },
  },
  {
    field: 'location',
    name: 'Location',
    nameTooltip: {
      content: 'The city and country in which this person resides',
    },
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
  {
    name: 'Actions',
    actions: [
      {
        name: 'User profile',
        description: ({ firstName, lastName }) =>
          `Visit ${firstName} ${lastName}'s profile`,
        icon: 'editorLink',
        color: 'primary',
        type: 'icon',
        enabled: ({ online }) => !!online,
        href: ({ id }) => `${window.location.href}?id=${id}`,
        target: '_self',
        'data-test-subj': 'action-outboundlink',
      },
      {
        name: <>Clone</>,
        description: 'Clone this user',
        icon: 'copy',
        type: 'icon',
        onClick: () => {},
        'data-test-subj': 'action-clone',
      },
      {
        name: (user: User) => (user.id ? 'Delete' : 'Remove'),
        description: ({ firstName, lastName }) =>
          `Delete ${firstName} ${lastName}`,
        icon: 'trash',
        color: 'danger',
        type: 'icon',
        onClick: () => {},
        isPrimary: true,
        'data-test-subj': ({ id }) => `action-delete-${id}`,
      },
      {
        name: 'Edit',
        isPrimary: true,
        available: ({ online }) => !online,
        enabled: ({ online }) => !!online,
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
    ],
  },
  {
    name: 'Custom actions',
    actions: [
      {
        render: () => (
          <EuiLink onClick={() => {}} color="danger">
            Delete
          </EuiLink>
        ),
        showOnHover: true,
      },
      {
        render: () => <EuiLink onClick={() => {}}>Edit</EuiLink>,
      },
    ],
  },
];

export const KitchenSink: Story = {
  args: {
    tableCaption: 'Kitchen sink story',
    items: users,
    itemId: 'id',
    rowHeader: 'firstName',
    columns,
    pagination: {
      initialPageSize: 5,
      pageSizeOptions: [3, 5, 8],
    },
    sorting: {
      sort: {
        field: 'lastName',
        direction: 'asc' as const,
      },
    },
    selection: {
      selectable: (user) => user.online,
      selectableMessage: (selectable) =>
        !selectable ? 'User is currently offline' : '',
    },
    search: {
      box: {
        incremental: true,
      },
      filters: [
        {
          type: 'is',
          field: 'online',
          name: 'Online',
          negatedName: 'Offline',
        },
        {
          type: 'field_value_selection',
          field: 'location.country',
          name: 'Country',
          multiSelect: false,
          options: users.map(({ location: { country } }) => ({
            value: country,
          })),
        },
      ],
    },
  },
  // Don't pass the default Storybook action listener for `onChange`,
  // or the automatic uncontrolled pagination & sorting won't work
  render: ({ onChange, ...args }: EuiInMemoryTableProps<User>) => (
    <EuiInMemoryTable {...args} />
  ),
};
