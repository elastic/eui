import React, { useState, useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';

import { EuiDataGrid, EuiAvatar } from '../../../../../src/components';

const columns = [
  {
    id: 'avatar',
    initialWidth: 40,
  },
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 6; i++) {
  data.push({
    avatar: (
      <EuiAvatar
        size="s"
        name={`${faker.name.lastName()}, ${faker.name.firstName()}`}
      />
    ),
    name: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    email: faker.internet.email(),
    city: faker.address.city(),
    country: faker.address.country(),
    account: faker.finance.account(),
  });
}

const DataGridStyle = ({
  toolbarType,
  showColumnSelector,
  showSortSelector,
  showDisplaySelector,
  showKeyboardShortcuts,
  showFullScreenSelector,
  allowDensity,
  allowRowHeight,
  allowHideColumns,
  allowOrderingColumns,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback(
    (pageIndex) => {
      setPagination({ ...pagination, pageIndex });
    },
    [pagination, setPagination]
  );

  const setPageSize = useCallback(
    (pageSize) => {
      setPagination({ ...pagination, pageSize, pageIndex: 0 });
    },
    [pagination, setPagination]
  );

  const handleVisibleColumns = (visibleColumns) =>
    setVisibleColumns(visibleColumns);

  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => setSortingColumns(sortingColumns),
    [setSortingColumns]
  );

  const toggleColumnSelector = useMemo(() => {
    if (
      showColumnSelector === true &&
      (allowHideColumns === false || allowOrderingColumns === false)
    ) {
      return {
        allowHide: allowHideColumns,
        allowReorder: allowOrderingColumns,
      };
    } else {
      return showColumnSelector;
    }
  }, [showColumnSelector, allowHideColumns, allowOrderingColumns]);

  const toggleDisplaySelector = useMemo(() => {
    if (
      showDisplaySelector === true &&
      (allowDensity === false || allowRowHeight === false)
    ) {
      return { allowDensity, allowRowHeight };
    } else {
      return showDisplaySelector;
    }
  }, [showDisplaySelector, allowDensity, allowRowHeight]);

  const toolbarVisibilityOptions = {
    showColumnSelector: toggleColumnSelector,
    showSortSelector: showSortSelector,
    showDisplaySelector: toggleDisplaySelector,
    showKeyboardShortcuts: showKeyboardShortcuts,
    showFullScreenSelector: showFullScreenSelector,
  };

  let toolbarConfig;

  if (toolbarType === 'object') {
    toolbarConfig = toolbarVisibilityOptions;
  } else {
    toolbarConfig = toolbarType === 'true';
  }

  return (
    <EuiDataGrid
      aria-label="Top contributors"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: handleVisibleColumns,
      }}
      sorting={{ columns: sortingColumns, onSort }}
      rowCount={data.length}
      toolbarVisibility={toolbarConfig}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      pagination={{
        ...pagination,
        pageSizeOptions: [5, 10, 25],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};

export default DataGridStyle;
