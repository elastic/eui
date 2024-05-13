/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiDataGridProps, EuiDataGridVisibleRows } from '../data_grid_types';

export const computeVisibleRows = ({
  pagination,
  rowCount,
}: {
  pagination: Required<EuiDataGridProps['pagination']>;
  rowCount: EuiDataGridProps['rowCount'];
}): EuiDataGridVisibleRows => {
  const startRow =
    pagination && pagination.pageSize > 0
      ? pagination.pageIndex * pagination.pageSize
      : 0;

  let endRow =
    pagination && pagination.pageSize > 0
      ? (pagination.pageIndex + 1) * pagination.pageSize
      : rowCount;
  endRow = Math.min(endRow, rowCount);

  const visibleRowCount = endRow - startRow;

  return { startRow, endRow, visibleRowCount };
};
