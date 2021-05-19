import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { fake } from 'faker';

import { EuiDataGrid, EuiText } from '../../../../src/components/';
import { useRowMeasurementCache } from '../../../../src/components/datagrid';

const DataContext = createContext();

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'text',
    isTruncated: false,
  },
];

// it is expensive to compute 10000 rows of fake data
// instead of loading up front, generate entries on the fly
const raw_data = [];

function RenderCellValue({ rowIndex, columnId }) {
  const { data, adjustMountedCellCount, rowMeasurementCache } = useContext(
    DataContext
  );

  useEffect(() => {
    rowMeasurementCache.set(rowIndex.toString(), 25 + rowIndex * 5);
    return () => adjustMountedCellCount(-1);
  }, [adjustMountedCellCount, rowMeasurementCache, rowIndex]);

  if (data[rowIndex] == null) {
    data[rowIndex] = {
      name: fake('{{lorem.text}}'),
      text: fake('{{lorem.text}}'),
    };
  }

  return data[rowIndex][columnId];
}

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const rowMeasurementCache = useRowMeasurementCache({
    defaultHeight: 10,
    initialValues: {
      '1': 200,
    },
  });

  const onChangeItemsPerPage = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );

  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const [mountedCellCount, setMountedCellCount] = useState(0);

  const dataContext = useMemo(
    () => ({
      data: raw_data,
      rowMeasurementCache,
      adjustMountedCellCount: (adjustment) =>
        setMountedCellCount(
          (mountedCellCount) => mountedCellCount + adjustment
        ),
    }),
    [rowMeasurementCache]
  );

  rowMeasurementCache.set('2', 2);

  const grid = (
    <EuiDataGrid
      aria-label="Virtualized data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={10000}
      renderCellValue={RenderCellValue}
      rowMeasurementCache={rowMeasurementCache}
      pagination={{
        ...pagination,
        pageSizeOptions: [50, 250, 1000],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
    />
  );

  return (
    <DataContext.Provider value={dataContext}>
      <EuiText>
        <p>There are {mountedCellCount} rendered cells</p>
      </EuiText>
      {grid}
    </DataContext.Provider>
  );
};
