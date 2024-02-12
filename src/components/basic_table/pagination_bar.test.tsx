/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiProvider } from '../provider';

import { PaginationBar } from './pagination_bar';

describe('PaginationBar', () => {
  const props = {
    ...requiredProps,
    pagination: {
      pageIndex: 0,
      pageSize: 5,
      totalItemCount: 0,
    },
    onPageSizeChange: () => {},
    onPageChange: () => {},
  };

  it('renders', () => {
    const { container } = render(<PaginationBar {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onPageChange with the correct off-by-one offset', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <PaginationBar
        {...props}
        pagination={{
          ...props.pagination,
          totalItemCount: 10,
        }}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(getByLabelText('Page 2 of 2'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  describe('EuiTablePagination component defaults', () => {
    it('falls back to EuiTablePagination defaults', () => {
      const { getByText, getByTestSubject } = render(
        <PaginationBar
          {...props}
          pagination={{ pageIndex: 1, totalItemCount: 100 }}
        />
      );

      expect(getByText('Rows per page: 10')).toBeTruthy();
      fireEvent.click(getByTestSubject('tablePaginationPopoverButton'));
      expect(getByTestSubject('tablePagination-10-rows')).toBeTruthy();
      expect(getByTestSubject('tablePagination-25-rows')).toBeTruthy();
      expect(getByTestSubject('tablePagination-50-rows')).toBeTruthy();
    });

    it('correctly uses configured EuiTablePagination defaults', () => {
      const { getByText, getByTestSubject } = render(
        <EuiProvider
          componentDefaults={{
            EuiTablePagination: {
              itemsPerPage: 5,
              itemsPerPageOptions: [5, 15],
            },
          }}
        >
          <PaginationBar
            {...props}
            pagination={{ pageIndex: 1, totalItemCount: 100 }}
          />
        </EuiProvider>,
        { wrapper: undefined }
      );

      expect(getByText('Rows per page: 5')).toBeTruthy();
      fireEvent.click(getByTestSubject('tablePaginationPopoverButton'));
      expect(getByTestSubject('tablePagination-5-rows')).toBeTruthy();
      expect(getByTestSubject('tablePagination-15-rows')).toBeTruthy();
    });

    it('correctly overrides all defaults', () => {
      const { getByText, getByTestSubject } = render(
        <PaginationBar
          {...props}
          pagination={{
            pageIndex: 3,
            totalItemCount: 20,
            pageSize: 4,
            pageSizeOptions: [2, 4],
          }}
        />
      );

      expect(getByText('Rows per page: 4')).toBeTruthy();
      fireEvent.click(getByTestSubject('tablePaginationPopoverButton'));
      expect(getByTestSubject('tablePagination-2-rows')).toBeTruthy();
      expect(getByTestSubject('tablePagination-4-rows')).toBeTruthy();
    });
  });
});
