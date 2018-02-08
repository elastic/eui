import React from 'react';
import { EuiSpacer } from '../spacer';
import { EuiTablePagination } from '../table';

const defaults = {
  pageSizeOptions: [5, 10, 20]
};

export const PaginationBar = ({
  pagination,
  rows,
  totalRowCount,
  onPageSizeChange,
  onPageChange,
}) => {
  if (!pagination) {
    throw new Error('Missing pagination');
  }

  // if (!onDataCriteriaChange) {
  //   throw new Error(`
  //     The table of rows is provided with a paginated model but [onDataCriteriaChange] is
  //     not configured. This callback must be implemented to handle pagination changes
  //   `);
  // }

  const pageSizeOptions = pagination.pageSizeOptions ?
    pagination.pageSizeOptions :
    defaults.pageSizeOptions;

  const pageCount = Math.ceil((totalRowCount || rows.length) / pagination.size);

  return (
    <div>
      <EuiSpacer size="m"/>
      <EuiTablePagination
        activePage={pagination.index}
        itemsPerPage={pagination.size}
        itemsPerPageOptions={pageSizeOptions}
        pageCount={pageCount}
        onChangeItemsPerPage={onPageSizeChange}
        onChangePage={onPageChange}
      />
    </div>
  );
};
