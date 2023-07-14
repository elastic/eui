/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';

import { EuiSpacer } from '../spacer';
import {
  EuiTablePagination,
  useEuiTablePaginationDefaults,
} from '../table/table_pagination';
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
   * Pass `0` to display the selected "Show all" option and hide the pagination.
   *
   * @default 10
   */
  pageSize?: number;
  /**
   * The total number of items the page is "sliced" of
   */
  totalItemCount: number;
  /**
   * Configures the page size dropdown options.
   * Pass `0` as one of the options to create a "Show all" option.
   *
   * @default [10, 25, 50]
   */
  pageSizeOptions?: number[];
  /**
   * Set to false to hide the page size dropdown
   *
   * @default true
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

export const PaginationBar = ({
  pagination,
  onPageSizeChange,
  onPageChange,
  'aria-controls': ariaControls,
  'aria-label': ariaLabel,
}: PaginationBarProps) => {
  const defaults = useEuiTablePaginationDefaults();
  const {
    pageIndex,
    totalItemCount,
    pageSize = defaults.itemsPerPage,
    pageSizeOptions = defaults.itemsPerPageOptions,
    showPerPageOptions = defaults.showPerPageOptions,
  } = pagination;

  const pageCount = pageSize ? Math.ceil(totalItemCount / pageSize) : 1;

  useEffect(() => {
    if (pageCount < pageIndex + 1) {
      onPageChange?.(pageCount - 1);
    }
  }, [pageCount, onPageChange, pageIndex]);

  return (
    <div>
      <EuiSpacer size="m" />
      <EuiTablePagination
        activePage={pageIndex}
        showPerPageOptions={showPerPageOptions}
        itemsPerPage={pageSize}
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
