/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable storybook/default-exports, storybook/prefer-pascal-case */

import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { faker } from '@faker-js/faker';

import { EuiLink } from '../link';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiButtonIcon } from '../button';
import { EuiCheckbox } from '../form';
import { EuiBadge } from '../badge';

import { MINIMUM_WIDTH_FOR_GRID_CONTROLS } from './controls/data_grid_toolbar';
import type {
  EuiDataGridCellValueElementProps,
  EuiDataGridColumnCellActionProps,
  EuiDataGridColumnSortingConfig,
  EuiDataGridProps,
} from './data_grid_types';
import { EuiDataGrid } from './data_grid';

faker.seed(42);

// NOTE: using faker.date.past() is not fully stable for VRT as the date is
// based on a years time distance (default 1 year) which updates with progressing time
// faker.seed() ensures the same date is output in the same time frame
// but after some time the time distance will generate a newer, closer date
// which then invalidates the VRT
const staticDates = [
  new Date('Tue Mar 19 2024 18:54:51 GMT+0100'),
  new Date('Mon Mar 25 2024 19:27:35 GMT+0100'),
  new Date('Sat Sep 09 2023 00:32:42 GMT+0200'),
  new Date('Wed Jun 14 2023 06:48:29 GMT+0200'),
  new Date('Mon Mar 04 2024 04:40:36 GMT+0100'),
  new Date('Mon Feb 05 2024 10:51:48 GMT+0100'),
  new Date('Mon Jun 19 2023 12:08:38 GMT+0200'),
  new Date('Wed Jul 26 2023 01:15:02 GMT+0200'),
  new Date('Wed Nov 08 2023 08:49:13 GMT+0100'),
  new Date('Sun Nov 19 2023 01:49:12 GMT+0100'),
];

const dataKeys = [
  'name',
  'email',
  'account',
  'location',
  'date',
  'version',
] as const;

export const raw_data = Array.from({ length: 10 }).map((_, i) => {
  const email = faker.internet.email();
  const name = `${faker.person.lastName()}, ${faker.person.firstName()}`;
  const date = staticDates[i].toDateString();
  const suffix = faker.person.suffix();
  return {
    name: {
      formatted: `${name} ${suffix}`,
      raw: name,
    },
    email: {
      formatted: <EuiLink href="">{email}</EuiLink>,
      raw: email,
    },
    location: (
      <>
        {`${faker.location.city()}, `}
        <EuiLink href="https://google.com">{faker.location.country()}</EuiLink>
      </>
    ),
    date,
    account: faker.finance.accountNumber(),
    version: (
      <EuiBadge
        // Tweak the badge's vertical centering
        css={css`
          vertical-align: text-bottom;
        `}
      >
        {faker.system.semver()}
      </EuiBadge>
    ),
  };
});

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc' as const,
    cellActions: [
      ({ rowIndex, Component }: EuiDataGridColumnCellActionProps) => {
        const data = raw_data;
        const value = data[rowIndex].name.raw;
        return (
          <Component
            onClick={() => alert(`Hi ${value}`)}
            iconType="heart"
            aria-label={`Say hi to ${value}!`}
          >
            Say hi
          </Component>
        );
      },
    ],
  },
  {
    id: 'email',
    displayAsText: 'Email address',
    initialWidth: 130,
    cellActions: [
      ({ rowIndex, Component }: EuiDataGridColumnCellActionProps) => {
        const data = raw_data;
        const value = data[rowIndex].email.raw;
        return (
          <Component
            onClick={() => alert(value)}
            iconType="email"
            aria-label={`Send email to ${value}`}
          >
            Send email
          </Component>
        );
      },
    ],
  },
  {
    id: 'account',
    displayAsText: 'Account',
    actions: {
      showHide: { label: 'Custom hide label' },
      showMoveLeft: false,
      showMoveRight: false,
      additional: [
        {
          label: 'Custom action',
          onClick: () => {},
          iconType: 'cheer',
          size: 'xs' as const,
          color: 'text' as const,
        },
      ],
    },
    cellActions: [
      ({
        rowIndex,
        Component,
        isExpanded,
      }: EuiDataGridColumnCellActionProps) => {
        const data = raw_data;
        const value = data[rowIndex].account;
        const onClick = isExpanded
          ? () => alert(`Sent money to ${value} when expanded`)
          : () => alert(`Sent money to ${value} when not expanded`);
        return (
          <Component
            onClick={onClick}
            iconType="faceHappy"
            aria-label={`Send money to ${value}`}
          >
            Send money
          </Component>
        );
      },
    ],
  },
  {
    id: 'location',
    displayAsText: 'Location',
  },
  {
    id: 'date',
    displayAsText: 'Date',
    defaultSortDirection: 'desc' as const,
  },
  {
    id: 'version',
    displayAsText: 'Version',
    defaultSortDirection: 'desc' as const,
    initialWidth: 70,
    isResizable: false,
    actions: false as const,
    schema: 'version', // Custom schema + CSS
  },
];

const RenderCellValue = ({
  rowIndex,
  columnId,
}: EuiDataGridCellValueElementProps) => {
  const data = raw_data;
  const row = data[rowIndex];
  const columnName = columnId as (typeof dataKeys)[number];
  const column = row[columnName];

  const getFormatted = () => {
    if (typeof column === 'object') {
      const hasFormatted = 'formatted' in column;

      return hasFormatted ? column.formatted : column;
    }

    return typeof column === 'string' ? column : null;
  };

  return data.hasOwnProperty(rowIndex) ? getFormatted() : null;
};

export const defaultStorybookArgs = {
  'aria-label': 'EuiDataGrid',
  css: css`
    .euiDataGridRowCell--version,
    .euiDataGridHeaderCell--version {
      text-align: center;
    }
  `,
  columns,
  rowCount: 10,
  renderCellValue: RenderCellValue,
  trailingControlColumns: [
    {
      id: 'trailing-actions',
      width: 64,
      headerCellRender: () => (
        <EuiScreenReaderOnly>
          <span>Row actions</span>
        </EuiScreenReaderOnly>
      ),
      rowCellRender: () => (
        <>
          <EuiButtonIcon iconType="indexEdit" aria-label="Edit row" />
          <EuiButtonIcon
            iconType="boxesHorizontal"
            aria-label="Open actions popover"
          />
        </>
      ),
    },
  ],
  leadingControlColumns: [
    {
      id: 'leading-actions',
      width: 32,
      headerCellRender: () => (
        <EuiCheckbox
          id="selectAll"
          aria-label="Select all rows"
          onChange={() => {}}
        />
      ),
      rowCellRender: ({ rowIndex }: EuiDataGridCellValueElementProps) => (
        <EuiCheckbox
          id={`selectRow${rowIndex}`}
          aria-label={`Select row ${rowIndex + 1}`}
          onChange={() => {}}
        />
      ),
    },
  ],
  // setup for easier testing/QA
  columnVisibility: {
    visibleColumns: [
      'name',
      'email',
      'account',
      'location',
      'date',
      'amount',
      'phone',
      'version',
    ],
    setVisibleColumns: () => {},
    canDragAndDropColumns: false,
  },
  inMemory: { level: 'sorting' } as const,
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    onChangeItemsPerPage: () => {},
    onChangePage: () => {},
  },
  gridStyle: {
    fontSize: 'm',
    cellPadding: 'm',
    border: 'all',
    stripes: false,
    header: 'shade',
    footer: 'overline',
    stickyFooter: true,
    rowHover: 'highlight',
    rowClasses: {},
  } as const,
  width: '',
  height: '',
  toolbarVisibility: {
    showColumnSelector: true,
    showDisplaySelector: true,
    showSortSelector: true,
    showKeyboardShortcuts: true,
    showFullScreenSelector: true,
    additionalControls: null,
  } as const,
  minSizeForControls: MINIMUM_WIDTH_FOR_GRID_CONTROLS,
  rowHeightsOptions: {
    defaultHeight: undefined,
    rowHeights: {},
    lineHeight: undefined,
    scrollAnchorRow: undefined,
  } as const,
};

export const StatefulDataGrid = (props: EuiDataGridProps) => {
  const { pagination, sorting, columnVisibility, ...rest } = props;

  // Pagination
  const [_pagination, setPagination] = useState({
    pageIndex: pagination?.pageIndex ?? 0,
    ...pagination,
  });
  const onChangeItemsPerPage = useCallback(
    (pageSize: number) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex: number) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  useEffect(() => {
    if (pagination) {
      setPagination((curentPagination) => ({
        ...curentPagination,
        ...pagination,
      }));
    }
  }, [pagination]);

  // Sorting
  const [sortingColumns, setSortingColumns] = useState<
    EuiDataGridColumnSortingConfig[]
  >(sorting?.columns ?? []);
  const onSort = useCallback(
    (sortingColumns: EuiDataGridColumnSortingConfig[]) => {
      setSortingColumns(sortingColumns);
      sorting?.onSort?.(sortingColumns);
    },
    [setSortingColumns, sorting]
  );

  useEffect(() => {
    if (sorting && Array.isArray(sorting.columns)) {
      setSortingColumns(sorting.columns);
    }
  }, [sorting]);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(
    columnVisibility?.visibleColumns ?? columns.map(({ id }) => id) // initialize to the full set of columns
  );

  useEffect(() => {
    if (columnVisibility?.visibleColumns != null) {
      setVisibleColumns(columnVisibility?.visibleColumns);
    }
  }, [columnVisibility]);

  return (
    <EuiDataGrid
      {...rest}
      columnVisibility={{
        visibleColumns,
        setVisibleColumns,
        canDragAndDropColumns: columnVisibility.canDragAndDropColumns,
      }}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ..._pagination,
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
    />
  );
};
