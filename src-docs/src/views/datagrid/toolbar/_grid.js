import React, { useState, useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiAvatar,
  EuiFormRow,
  EuiRange,
} from '../../../../../src/components';

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
        name={`${faker.person.lastName()}, ${faker.person.firstName()}`}
      />
    ),
    name: `${faker.person.lastName()}, ${faker.person.firstName()} ${faker.person.suffix()}`,
    email: faker.internet.email(),
    city: faker.location.city(),
    country: faker.location.country(),
    account: faker.finance.accountNumber(),
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
  allowResetButton,
  additionalDisplaySettings,
  allowHideColumns,
  allowOrderingColumns,
}) => {
  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback((pageIndex) => {
    setPagination((pagination) => ({ ...pagination, pageIndex }));
  }, []);

  const setPageSize = useCallback((pageSize) => {
    setPagination((pagination) => ({
      ...pagination,
      pageSize,
      pageIndex: 0,
    }));
  }, []);

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
      (allowDensity === false ||
        allowRowHeight === false ||
        allowResetButton === false ||
        additionalDisplaySettings)
    ) {
      const customDisplaySetting = additionalDisplaySettings && (
        <EuiFormRow label="Random Sample Size" display="columnCompressed">
          <EuiRange
            compressed
            fullWidth
            showInput
            min={1}
            max={100}
            step={1}
            value={10}
            data-test-subj="randomSampleSize"
          />
        </EuiFormRow>
      );
      return {
        allowDensity,
        allowRowHeight,
        allowResetButton,
        additionalDisplaySettings: customDisplaySetting,
      };
    } else {
      return showDisplaySelector;
    }
  }, [
    showDisplaySelector,
    allowDensity,
    allowRowHeight,
    allowResetButton,
    additionalDisplaySettings,
  ]);

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
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};

export default DataGridStyle;
