import React, { useCallback, useState } from 'react';

import {
  EuiDataGrid,
  EuiDataGridProps,
  EuiDataGridPaginationProps,
  EuiDataGridSorting,
  EuiDataGridColumnSortingConfig,
} from '../../../../../../src';

import {
  raw_data,
  columns,
  leadingControlColumns,
  trailingControlColumns,
  RenderCellValue,
  RenderFooterCellValue,
} from './data_columns_cells';

export default (props: Partial<Omit<EuiDataGridProps, 'aria-labelledby'>>) => {
  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  // Pagination
  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const onChangePage = useCallback<EuiDataGridPaginationProps['onChangePage']>(
    (pageIndex) => {
      setPagination((pagination) => ({ ...pagination, pageIndex }));
    },
    []
  );
  const onChangePageSize = useCallback<
    EuiDataGridPaginationProps['onChangeItemsPerPage']
  >((pageSize) => {
    setPagination((pagination) => ({ ...pagination, pageSize }));
  }, []);

  // Sorting
  const [sortingColumns, setSortingColumns] = useState<
    EuiDataGridColumnSortingConfig[]
  >([]);
  const onSort = useCallback<EuiDataGridSorting['onSort']>((sortingColumns) => {
    setSortingColumns(sortingColumns);
  }, []);

  return (
    <EuiDataGrid
      aria-label="Data grid custom body renderer demo"
      columns={columns}
      leadingControlColumns={leadingControlColumns}
      trailingControlColumns={trailingControlColumns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      sorting={{ columns: sortingColumns, onSort }}
      inMemory={{ level: 'sorting' }}
      pagination={{
        ...pagination,
        onChangePage: onChangePage,
        onChangeItemsPerPage: onChangePageSize,
      }}
      rowCount={raw_data.length}
      renderCellValue={RenderCellValue}
      renderFooterCellValue={RenderFooterCellValue}
      gridStyle={{ border: 'none', header: 'underline' }}
      {...props}
    />
  );
};
