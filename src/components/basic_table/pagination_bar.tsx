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
   * The maximum number of items that can be shown in a single page
   */
  pageSize: number;
  /**
   * The total number of items the page is "sliced" of
   */
  totalItemCount: number;
  /**
   * Configures the page size dropdown options
   */
  pageSizeOptions?: number[];
  /**
   * Hides the page size dropdown
   */
  hidePerPageOptions?: boolean;
}

export interface PaginationBarProps {
  pagination: Pagination;
  /**
   * id of the table being controlled
   */
  'aria-controls'?: string;
  onPageSizeChange: ItemsPerPageChangeHandler;
  onPageChange: PageChangeHandler;
}

export const defaults = {
  pageSizeOptions: [10, 25, 50],
};

export const PaginationBar = ({
  pagination,
  'aria-controls': ariaControls,
  onPageSizeChange,
  onPageChange,
}: PaginationBarProps) => {
  const pageSizeOptions = pagination.pageSizeOptions
    ? pagination.pageSizeOptions
    : defaults.pageSizeOptions;
  const pageCount = Math.ceil(pagination.totalItemCount / pagination.pageSize);

  useEffect(() => {
    if (pageCount < pagination.pageIndex + 1) {
      onPageChange(pageCount - 1);
    }
  }, [pageCount, onPageChange, pagination]);

  return (
    <div>
      <EuiSpacer size="m" />
      <EuiTablePagination
        activePage={pagination.pageIndex}
        hidePerPageOptions={pagination.hidePerPageOptions}
        itemsPerPage={pagination.pageSize}
        itemsPerPageOptions={pageSizeOptions}
        pageCount={pageCount}
        onChangeItemsPerPage={onPageSizeChange}
        onChangePage={onPageChange}
        aria-controls={ariaControls}
      />
    </div>
  );
};
