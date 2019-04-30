import React from 'react';
import { EuiSpacer } from '../spacer';
import { EuiTablePagination } from '../table';
import PropTypes from 'prop-types';

export const PaginationType = PropTypes.shape({
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItemCount: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
});

export const defaults = {
  pageSizeOptions: [10, 25, 50],
};

export const PaginationBar = ({
  pagination,
  onPageSizeChange,
  onPageChange,
}) => {
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

PaginationBar.propTypes = {
  pagination: PaginationType.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
