import React from 'react';
import { EuiSpacer } from '../spacer';
import { EuiTablePagination } from '../table';

const defaults = {
  pageSizeOptions: [5, 10, 20]
};

export const PaginationBar = ({ config, model, onPageSizeChange, onPageChange }) => {
  if (!model.criteria || !model.criteria.page) {
    throw new Error(`The table of records is configured to show pagination but the provided
        model is missing page criteria. Make sure the page criteria (index and size) is specified
        under model.criteria.page`);
  }
  if (!config.onDataCriteriaChange) {
    throw new Error(`The table of records is provided with a paginated model but [onDataCriteriaChange] is
        not configured. This callback must be implemented to handle pagination changes`);
  }
  const pageSizeOptions = config.pagination.pageSizeOptions ?
    config.pagination.pageSizeOptions :
    defaults.pageSizeOptions;
  const totalRecordCount = model.data.totalRecordCount || model.data.records.length;
  const pageCount = Math.ceil(totalRecordCount / model.criteria.page.size);
  return (
    <div>
      <EuiSpacer size="m"/>
      <EuiTablePagination
        activePage={model.criteria.page.index}
        itemsPerPage={model.criteria.page.size}
        itemsPerPageOptions={pageSizeOptions}
        pageCount={pageCount}
        onChangeItemsPerPage={onPageSizeChange}
        onChangePage={onPageChange}
      />
    </div>
  );
};
