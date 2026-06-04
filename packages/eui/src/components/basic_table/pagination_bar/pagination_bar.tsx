/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';

import { EuiBreakpointSize, useEuiMemoizedStyles } from '../../../services';
import {
  EuiTablePagination,
  useEuiTablePaginationDefaults,
} from '../../table/table_pagination';
import type {
  ItemsPerPageChangeHandler,
  PageChangeHandler,
} from '../../table/table_pagination/table_pagination';
import { useIsEuiTableResponsive } from '../../table/mobile/responsive_context';
import { euiBasicTablePaginationBarStyles } from './pagination_bar.styles';

export interface EuiBasicTablePaginationBarPagination {
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

/**
 * @internal
 */
interface EuiBasicTablePaginationBarProps {
  pagination: EuiBasicTablePaginationBarPagination;
  /**
   * Enable the panelled style.
   *
   * Panelled style adds contrast between the table navigation controls
   * and table content itself. It should be used in tables rendered outside
   * EUI containers like `<EuiPanel>` or `<EuiFlyout>`.
   * @default false
   */
  panelled?: boolean;
  responsiveBreakpoint?: EuiBreakpointSize | boolean;
  onPageSizeChange: ItemsPerPageChangeHandler;
  onPageChange: PageChangeHandler;
  /**
   * id of the table being controlled
   */
  'aria-controls'?: string;
  'aria-label'?: string;
}

/**
 * An internal utility component that renders EuiTablePagination with
 * proper configuration and handles the `panelled` styles.
 * @internal
 */
export const EuiBasicTablePaginationBar = ({
  pagination,
  panelled,
  responsiveBreakpoint,
  onPageSizeChange,
  onPageChange,
  'aria-controls': ariaControls,
  'aria-label': ariaLabel,
}: EuiBasicTablePaginationBarProps) => {
  const defaults = useEuiTablePaginationDefaults();
  const {
    pageIndex,
    totalItemCount,
    pageSize = defaults.itemsPerPage,
    pageSizeOptions = defaults.itemsPerPageOptions,
    showPerPageOptions = defaults.showPerPageOptions,
  } = pagination;

  const pageCount = pageSize ? Math.ceil(totalItemCount / pageSize) : 1;

  const styles = useEuiMemoizedStyles(euiBasicTablePaginationBarStyles);
  const isResponsive = useIsEuiTableResponsive(responsiveBreakpoint);

  useEffect(() => {
    if (pageCount < pageIndex + 1) {
      onPageChange?.(pageCount - 1);
    }
  }, [pageCount, onPageChange, pageIndex]);

  return (
    <div css={[styles.root, !isResponsive && panelled && styles.panelled]}>
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
