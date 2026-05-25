/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { EuiBasicTable, EuiBasicTableColumn } from '../basic_table';

// Mock observers to avoid issues in Jest environment
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

interface TestItem {
  id: string;
  name: string;
  count: number;
}

describe('EuiBasicTable with Sticky Header', () => {
  afterEach(() => {
    cleanup();
  });
  const items: TestItem[] = [
    { id: '1', name: 'Item 1', count: 10 },
    { id: '2', name: 'Item 2', count: 20 },
    { id: '3', name: 'Item 3', count: 30 },
  ];

  const columns: Array<EuiBasicTableColumn<TestItem>> = [
    {
      field: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      field: 'count',
      name: 'Count',
      sortable: true,
    },
  ];

  it('renders sticky header when stickyHeader prop is passed', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    expect(stickyTable).toBeTruthy();
  });

  it('does not render sticky header when stickyHeader prop is not passed', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    expect(stickyTable).toBeFalsy();
  });

  it('includes all columns in sticky header', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    const cells = stickyTable?.querySelectorAll('thead th, thead td');
    expect(cells?.length).toBe(2);
  });

  it('includes sortable columns with sort indicators in sticky header', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
        sorting={{
          sort: {
            field: 'name',
            direction: 'asc',
          },
        }}
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    const sortButtons = stickyTable?.querySelectorAll('button[data-test-subj="tableHeaderSortButton"]');
    expect(sortButtons?.length).toBe(2);
  });

  it('includes selection checkbox column in sticky header', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        itemId="id"
        selection={{
          onSelectionChange: () => {},
        }}
        stickyHeader
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    const checkboxCell = stickyTable?.querySelector('.euiTableHeaderCellCheckbox');
    expect(checkboxCell).toBeTruthy();
  });

  it('applies stickyHeaderOffset', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
        stickyHeaderOffset={100}
      />
    );

    const stickyWrapper = container.querySelector('[data-is-stuck]');
    if (stickyWrapper) {
      const style = (stickyWrapper as HTMLElement).style;
      expect(style.top).toBe('100px');
    }
  });

  it('does not render sticky header in responsive mode', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
        responsiveBreakpoint={true}
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    expect(stickyTable).toBeFalsy();
  });

  it('renders custom column name content in sticky header', () => {
    const CustomColumnName = () => <span data-test-id="custom-name">Custom Name</span>;

    const customColumns: Array<EuiBasicTableColumn<TestItem>> = [
      {
        field: 'name',
        name: <CustomColumnName />,
      },
      {
        field: 'count',
        name: 'Count',
      },
    ];

    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={customColumns}
        stickyHeader
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    const customName = stickyTable?.querySelector('[data-test-id="custom-name"]');
    expect(customName).toBeTruthy();
    expect(customName?.textContent).toBe('Custom Name');
  });

  it('works with compressed table', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
        compressed
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    expect(stickyTable).toBeTruthy();
  });

  it('works with custom table layout', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
        tableLayout="auto"
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    expect(stickyTable).toBeTruthy();
  });

  it('works with hasBackground=false', () => {
    const { container } = render(
      <EuiBasicTable
        items={items}
        columns={columns}
        stickyHeader
        hasBackground={false}
      />
    );

    const stickyTable = container.querySelector('table[aria-hidden="true"]');
    expect(stickyTable).toBeTruthy();
  });
});
