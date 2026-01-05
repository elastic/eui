/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { faker } from '@faker-js/faker';
import { moveStorybookControlsToCategory } from '../../../.storybook/utils';

import { useEuiTheme } from '../../services';
import { EuiLink } from '../link';
import { EuiHealth } from '../health';

import type {
  CriteriaWithPagination,
  EuiBasicTableColumn,
} from './basic_table';
import { EuiBasicTable, EuiBasicTableProps } from './basic_table';
import { EuiIcon } from '../icon';
import { Pagination } from './pagination_bar';

// Set static seed so that the generated faker data is consistent between page loads
faker.seed(8_02_2010);

const meta: Meta<EuiBasicTableProps<User>> = {
  title: 'Tabular Content/EuiBasicTable',
  // @ts-ignore complex
  component: EuiBasicTable,
  argTypes: {
    noItemsMessage: { control: 'text' },
  },
  args: {
    error: '',
    loading: false,
    // Inherited from EuiTable
    responsiveBreakpoint: 'm',
    tableLayout: 'fixed',
    hasBackground: true,
    // set up for easier testing/QA
    cellProps: {
      'data-test-subj': `basic-table-cell`,
    },
    rowProps: {
      'data-test-subj': `basic-table-row`,
    },
    noItemsMessage: '',
  },
};
moveStorybookControlsToCategory(
  meta,
  ['responsiveBreakpoint', 'tableLayout', 'hasBackground'],
  'EuiTable props'
);

export default meta;
type Story = StoryObj<EuiBasicTableProps<User>>;

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

for (let i = 0; i < 5; i++) {
  users.push({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    online: i === 0 ? true : faker.datatype.boolean(),
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
    nameTooltip: {
      content: 'Current online status',
    },
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
        name: 'Clone',
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

const initialPageSize = 3;

export const Playground: Story = {
  args: {
    tableCaption: 'EuiBasicTable playground',
    items: users,
    itemId: 'id',
    rowHeader: 'firstName',
    columns,
    itemIdToExpandedRowMap: {},
    pagination: {
      pageIndex: 0,
      totalItemCount: 5,
      pageSize: initialPageSize,
      pageSizeOptions: [3, 5],
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
      onSelectionChange: action('onSelectionChange'),
    },
    onChange: (criteria: CriteriaWithPagination<User>) =>
      action('onChange')(criteria),
  },
  render: (args: EuiBasicTableProps<User>) => <StatefulPlayground {...args} />,
};

export const MarkedRow: Story = {
  ...Playground,
  parameters: {
    codeSnippet: {
      snippet: `
      <EuiBasicTable rowProps={(user: User) => ({
        className: user.online ? 'euiTableRow--marked' : '',
      })}  />`,
    },
    controls: {
      include: ['rowProps', 'columns', 'items', 'hasBackground'],
    },
  },
  args: {
    ...Playground.args,
    rowProps: (user: User) => ({
      className: user.online ? 'euiTableRow--marked' : '',
      onClick: () => {},
    }),
  },
  render: (args: EuiBasicTableProps<User>) => <StatefulPlayground {...args} />,
};

export const ExpandedRow: Story = {
  parameters: {
    controls: {
      include: ['columns', 'items', 'itemIdToExpandedRowMap', 'hasBackground'],
    },
  },
  args: {
    tableCaption: 'EuiBasicTable playground',
    items: users,
    itemId: 'id',
    rowHeader: 'firstName',
    columns,
    itemIdToExpandedRowMap: {
      1: (
        <div>
          <strong>Expanded row 1</strong>
          <p>lorem ipsum dolor sit</p>
        </div>
      ),
    },
  },
};

type NestedTableProps = {
  hasLeadingIcon?: boolean;
  hasBackground?: boolean;
};

const NestedTable = ({
  hasLeadingIcon = false,
  hasBackground = true,
}: NestedTableProps) => {
  const { euiTheme } = useEuiTheme();

  const _items = users.slice(0, 3);
  const _columns = hasLeadingIcon
    ? [
        {
          name: '',
          render: () => <EuiIcon type="warning" />,
          width: euiTheme.size.xl,
        },
        ...columns,
      ]
    : columns;

  return (
    <EuiBasicTable
      tableCaption="EuiBasicTable playground"
      items={_items}
      itemId="id"
      rowHeader="firstName"
      columns={_columns}
      hasBackground={hasBackground}
    />
  );
};

export const ExpandedNestedTable: Story = {
  parameters: {
    controls: {
      include: ['columns', 'items', 'itemIdToExpandedRowMap', 'hasBackground'],
    },
  },
  args: {
    tableCaption: 'EuiBasicTable playground',
    items: users,
    itemId: 'id',
    rowHeader: 'firstName',
    columns,
    itemIdToExpandedRowMap: {
      1: <NestedTable />,
      3: <NestedTable hasLeadingIcon />,
    },
    selection: {
      selectable: (user) => user.online,
      selectableMessage: (selectable) =>
        !selectable ? 'User is currently offline' : '',
      onSelectionChange: action('onSelectionChange'),
    },
  },
  render: function Render({
    itemIdToExpandedRowMap,
    hasBackground,
    ...rest
  }: EuiBasicTableProps<User>) {
    // story-only logic to inject hasBackground into nested tables
    // do not use in consumer code, set hasBackground directly on the nested table instead
    const _itemIdToExpandedRowMap = Object.fromEntries(
      Object.entries(itemIdToExpandedRowMap || {}).map(([key, value]) => [
        key,
        React.isValidElement(value)
          ? React.cloneElement(value, { hasBackground } as NestedTableProps)
          : value,
      ])
    );

    return (
      <StatefulPlayground
        // only passed to ensure same base size, casting to prevent showing the pagination controls
        pagination={{ pageSize: 5 } as Pagination}
        hasBackground={hasBackground}
        itemIdToExpandedRowMap={_itemIdToExpandedRowMap}
        {...rest}
      />
    );
  },
};

export const EmptyTable: Story = {
  args: {
    ...Playground.args,
    items: [],
    noItemsMessage: 'No users found',
  },
};

export const DarkMode: Story = {
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
  args: {
    ...ExpandedRow.args,
    responsiveBreakpoint: true,
  },
};

export const HighContrastMobile: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    ...ExpandedRow.args,
    responsiveBreakpoint: true,
  },
};

export const LargeExpandedRow: Story = {
  tags: ['vrt-only'],
  args: {
    tableCaption: 'EuiBasicTable playground',
    items: users,
    itemId: 'id',
    rowHeader: 'firstName',
    columns,
    css: css`
      margin-block-start: -300px;
    `,
    itemIdToExpandedRowMap: {
      1: (
        <div
          css={css`
            block-size: 100vh;
          `}
        >
          <strong>Expanded row 1</strong>
          <p>lorem ipsum dolor sit</p>
        </div>
      ),
    },
  },
};

export const ExpandedNestedTableWithoutBackground: Story = {
  tags: ['vrt-only'],
  args: {
    ...ExpandedNestedTable.args,
    hasBackground: false,
    itemIdToExpandedRowMap: {
      1: <NestedTable hasBackground={false} />,
      3: <NestedTable hasBackground={false} hasLeadingIcon />,
    },
  },
};

const StatefulPlayground = ({
  items,
  pagination,
  sorting,
  ...rest
}: EuiBasicTableProps<User>) => {
  const [_items, setItems] = useState<User[]>([]);

  const updateItems = useCallback(() => {
    let sortedItems = [...items];

    if (sorting?.sort) {
      const { field, direction } = sorting?.sort;
      const directionIndex = direction === 'desc' ? -1 : 1;

      sortedItems = sortedItems.sort((a, b) =>
        a[field]! > b[field]! ? directionIndex : -directionIndex
      );
    }

    setItems(() => {
      return [...sortedItems].splice(
        0,
        pagination?.pageSize ?? initialPageSize
      );
    });
  }, [items, pagination, sorting]);

  useEffect(() => {
    updateItems();
  }, [items, pagination, sorting, updateItems]);

  return (
    <EuiBasicTable
      items={_items}
      pagination={pagination!}
      sorting={sorting}
      {...rest}
    />
  );
};
