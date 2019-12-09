import React from 'react';
import { EuiSpacer } from '../spacer';
import { EuiTablePagination } from '../table';
import {
  ItemsPerPageChangeHandler,
  PageChangeHandler,
} from '../table/table_pagination/table_pagination';

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalItemCount: number;
  pageSizeOptions?: number[];
  hidePerPageOptions?: boolean;
}

export interface PaginationBarProps {
  pagination: Pagination;
  onPageSizeChange: ItemsPerPageChangeHandler;
  onPageChange: PageChangeHandler;
}

export const defaults = {
  pageSizeOptions: [10, 25, 50],
};

export const PaginationBar = ({
  pagination,
  onPageSizeChange,
  onPageChange,
}: PaginationBarProps) => {
  const pageSizeOptions = pagination.pageSizeOptions
    ? pagination.pageSizeOptions
    : defaults.pageSizeOptions;
  const pageCount = Math.ceil(pagination.totalItemCount / pagination.pageSize);
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
      />
    </div>
  );
};
