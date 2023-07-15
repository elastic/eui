/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';

import { DataGridFocusContext } from './focus';
import { mockFocusContext } from './__mocks__/focus_context';
import { EuiDataGridPaginationRenderer } from './data_grid_pagination';

describe('EuiDataGridPaginationRenderer', () => {
  const props = {
    pageIndex: 0,
    pageSize: 25,
    pageSizeOptions: [25],
    onChangePage: jest.fn(),
    onChangeItemsPerPage: jest.fn(),
    rowCount: 100,
    controls: 'data-grid-id',
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders', () => {
    const { container, getByText } = render(
      <EuiDataGridPaginationRenderer {...props} />
    );
    expect(container.firstChild).toHaveClass('euiDataGrid__pagination');
    fireEvent.click(getByText('Rows per page: 25'));
    expect(getByText('25 rows')).toBeTruthy();
    expect(getByText('Page 1 of 4')).toBeTruthy();
  });

  it('renders a detailed aria-label', () => {
    const { getAllByLabelText } = render(
      <EuiDataGridPaginationRenderer {...props} aria-label="Test Grid" />
    );
    expect(
      getAllByLabelText('Pagination for preceding grid: Test Grid')
    ).toBeTruthy();
  });

  it('hides the page size selection if pageSizeOptions is empty', () => {
    const { queryByTestSubject, queryByText } = render(
      <EuiDataGridPaginationRenderer {...props} pageSizeOptions={[]} />
    );
    expect(queryByTestSubject('tablePaginationPopoverButton')).toBeFalsy();
    expect(queryByText('Rows per page:')).toBeFalsy();
  });

  it('handles the "show all" page size option', () => {
    const { getByText } = render(
      <EuiDataGridPaginationRenderer
        {...props}
        pageSize={0}
        pageSizeOptions={[10, 25, 0]}
      />
    );
    expect(getByText('Showing all rows')).toBeTruthy();
  });

  it('does not render if there are fewer rows than the smallest page size option', () => {
    const { container } = render(
      <EuiDataGridPaginationRenderer
        {...props}
        rowCount={1}
        pageSizeOptions={[10, 25]}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('focuses the first data cell on page change', () => {
    const { getByTestSubject } = render(
      <DataGridFocusContext.Provider value={mockFocusContext}>
        <EuiDataGridPaginationRenderer {...props} />
      </DataGridFocusContext.Provider>
    );
    fireEvent.click(getByTestSubject('pagination-button-2'));
    expect(mockFocusContext.setFocusedCell).toHaveBeenCalledWith([0, 0]);
  });

  describe('EuiProvider component defaults', () => {
    it('falls back to EuiTablePagination defaults if pageSize and pageSizeOptions are undefined', () => {
      const { getByText } = render(
        <EuiDataGridPaginationRenderer
          {...props}
          pageSize={undefined}
          pageSizeOptions={undefined}
        />
      );
      fireEvent.click(getByText('Rows per page: 10'));
      expect(getByText('10 rows')).toBeTruthy();
      expect(getByText('25 rows')).toBeTruthy();
      expect(getByText('50 rows')).toBeTruthy();
    });
  });
});
