/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, useContext, AriaAttributes } from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { useEuiI18n } from '../../i18n';
import { EuiTablePagination } from '../../table/table_pagination';
import { EuiDataGridPaginationProps } from '../data_grid_types';
import { DataGridFocusContext } from '../utils/focus';

import { euiDataGridPaginationStyles } from './data_grid_pagination.styles';

type _EuiDataGridPaginationProps = Required<EuiDataGridPaginationProps> & {
  // Internal EUI props
  rowCount: number;
  controls: string;
  'aria-label'?: AriaAttributes['aria-label'];
};

/**
 * Do not render the pagination when:
 * 1. Rows count is less than min pagination option (rows per page)
 * 2. Rows count is less than pageSize (the case when there are no pageSizeOptions provided)
 */
export const shouldRenderPagination = (
  rowCount: number,
  { pageSize, pageSizeOptions }: Required<EuiDataGridPaginationProps>
) => {
  const minSizeOption = [...pageSizeOptions].sort((a, b) => a - b)[0];
  return !(rowCount < (minSizeOption || pageSize));
};

export const EuiDataGridPagination = ({
  pageIndex,
  pageSize,
  pageSizeOptions,
  onChangePage: _onChangePage,
  onChangeItemsPerPage,
  rowCount,
  controls,
  'aria-label': ariaLabel,
}: _EuiDataGridPaginationProps) => {
  const styles = useEuiMemoizedStyles(euiDataGridPaginationStyles);

  const detailedPaginationLabel = useEuiI18n(
    'euiDataGridPagination.detailedPaginationLabel',
    'Pagination for preceding grid: {label}',
    { label: ariaLabel ?? '' }
  );
  const paginationLabel = useEuiI18n(
    'euiDataGridPagination.paginationLabel',
    'Pagination for preceding grid'
  );

  // Focus the first data cell & scroll back to the top of the grid whenever paginating to a new page
  const { setFocusedCell } = useContext(DataGridFocusContext);
  const onChangePage = useCallback<EuiDataGridPaginationProps['onChangePage']>(
    (pageIndex) => {
      _onChangePage(pageIndex);
      setFocusedCell([0, 0]);
    },
    [setFocusedCell, _onChangePage]
  );

  const pageCount = pageSize ? Math.ceil(rowCount / pageSize) : 1;

  return (
    <div
      css={styles.euiDataGrid__pagination}
      className="euiDataGrid__pagination"
    >
      <EuiTablePagination
        aria-controls={controls}
        activePage={pageIndex}
        itemsPerPage={pageSize}
        itemsPerPageOptions={pageSizeOptions}
        showPerPageOptions={pageSizeOptions.length > 0}
        pageCount={pageCount}
        onChangePage={onChangePage}
        onChangeItemsPerPage={onChangeItemsPerPage}
        aria-label={ariaLabel ? detailedPaginationLabel : paginationLabel}
      />
    </div>
  );
};
