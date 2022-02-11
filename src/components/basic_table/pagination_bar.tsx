/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';
import { EuiSpacer } from '../spacer';
import { EuiTablePagination } from '../table';
import {
  ItemsPerPageChangeHandler,
  PageChangeHandler,
} from '../table/table_pagination/table_pagination';

export interface Pagination {
  /**
   * The current page (zero-based) index
   */
  pageIndex: number;
  /**
   * The maximum number of items that can be shown in a single page.
   * Pass `'all'` to display the selected "Show all" option and hide the pagination.
   */
  pageSize: number | 'all';
  /**
   * The total number of items the page is "sliced" of
   */
  totalItemCount: number;
  /**
   * Configures the page size dropdown options.
   * Pass `'all'` as one of the options to create a "Show all" option.
   */
  pageSizeOptions?: Array<number | 'all'>;
  /**
   * Hides the page size dropdown
   */
  showPerPageOptions?: boolean;
}

export interface PaginationBarProps {
  pagination: Pagination;
  onPageSizeChange: ItemsPerPageChangeHandler;
  onPageChange: PageChangeHandler;
  /**
   * id of the table being controlled
   */
  'aria-controls'?: string;
  'aria-label'?: string;
}

export const defaults = {
  pageSizeOptions: [10, 25, 50],
};

export const PaginationBar = ({
  pagination,
  onPageSizeChange,
  onPageChange,
  'aria-controls': ariaControls,
  'aria-label': ariaLabel,
}: PaginationBarProps) => {
  const pageSizeOptions = pagination.pageSizeOptions
    ? pagination.pageSizeOptions
    : defaults.pageSizeOptions;
  const pageCount =
    pagination.pageSize === 'all'
      ? 1
      : Math.ceil(pagination.totalItemCount / pagination.pageSize);

  useEffect(() => {
    if (pageCount < pagination.pageIndex + 1) {
      onPageChange!(pageCount - 1);
    }
  }, [pageCount, onPageChange, pagination]);

  return (
    <div>
      <EuiSpacer size="m" />
      <EuiTablePagination
        activePage={pagination.pageIndex}
        showPerPageOptions={pagination.showPerPageOptions}
        itemsPerPage={pagination.pageSize}
        itemsPerPageOptions={pageSizeOptions}
        pageCount={pageCount}
        onChangeItemsPerPage={onPageSizeChange}
        onChangePage={onPageChange}
        aria-controls={ariaControls}
        aria-label={ariaLabel}
      />
    </div>
  );
};
