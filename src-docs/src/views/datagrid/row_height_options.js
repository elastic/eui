import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiTitle,
  EuiSpacer,
  EuiDescriptionList,
} from '../../../../src/components/';

const DataContext = createContext();

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'text',
    cellActions: [
      ({ Component }) => {
        return (
          <Component iconType="heart" aria-label={'Heart'}>
            Heart
          </Component>
        );
      },
    ],
  },
];

const favoriteVideoGames = [
  {
    title: 'The Elder Scrolls: Morrowind',
    description: 'The opening music alone evokes such strong memories.',
  },
  {
    title: 'TIE Fighter',
    description:
      'The sequel to XWING, join the dark side and fly for the Emporer.',
  },
  {
    title: 'Quake 1',
    description: 'The game that made me drop out of college.',
  },
  {
    title: 'Quake 2',
    description: 'The game that made me drop out of college.',
  },
  {
    title: 'Quake 3',
    description: 'The game that made me drop out of college.',
  },
  {
    title: 'Quake 4',
    description: 'The game that made me drop out of college.',
  },
];

// it is expensive to compute 10000 rows of fake data
// instead of loading up front, generate entries on the fly
const raw_data = [];

function RenderCellValue({ rowIndex, columnId }) {
  const { data, adjustMountedCellCount } = useContext(DataContext);

  useEffect(() => {
    adjustMountedCellCount(1);
    return () => adjustMountedCellCount(-1);
  }, [adjustMountedCellCount]);

  if (data[rowIndex] == null) {
    data[rowIndex] = {
      // name: fake('{{lorem.text}}'),
      name: (
        <EuiDescriptionList
          type="inline"
          compressed
          listItems={favoriteVideoGames}
        />
      ),
      text: fake('{{lorem.text}}'),
    };
  }

  return data[rowIndex][columnId];
}

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });

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

  const rowHeightsOptions = useMemo(
    () => ({
      defaultHeight: {
        lineCount: 2,
      },
      rowHeights: {
        1: {
          lineCount: 3,
        },
        4: 140,
        5: 80,
      },
    }),
    []
  );

  const dataContext = useMemo(
    () => ({
      data: raw_data,
      adjustMountedCellCount: (adjustment) =>
        setMountedCellCount(
          (mountedCellCount) => mountedCellCount + adjustment
        ),
    }),
    []
  );

  const grid = (
    <EuiDataGrid
      aria-label="Row height options demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={10000}
      height={400}
      gridStyle={{
        header: 'shade',
        cellPadding: 's',
        fontSize: 's',
        lineHeight: 'extra',
      }}
      renderCellValue={RenderCellValue}
      rowHeightsOptions={rowHeightsOptions}
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
      <EuiTitle size="xxs">
        <h2>There are {mountedCellCount} rendered cells</h2>
      </EuiTitle>
      <EuiSpacer />
      {grid}
    </DataContext.Provider>
  );
};
