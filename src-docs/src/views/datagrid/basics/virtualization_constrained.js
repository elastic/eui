import React, {
  Fragment,
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiLink,
  EuiText,
  EuiResizableContainer,
} from '../../../../../src/components';

const DataContext = createContext();

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'email',
  },
  {
    id: 'location',
  },
  {
    id: 'account',
  },
  {
    id: 'date',
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
    isSortable: false,
  },
  {
    id: 'version',
    defaultSortDirection: 'desc',
    initialWidth: 65,
    isResizable: false,
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
    const email = faker.internet.email();
    const name = `${faker.name.lastName()}, ${faker.name.firstName()}`;
    const suffix = faker.name.suffix();
    data[rowIndex] = {
      name: `${name} ${suffix}`,
      email: <EuiLink href="">{email}</EuiLink>,
      location: (
        <Fragment>
          {`${faker.address.city()}, `}
          <EuiLink href="https://google.com">{faker.address.country()}</EuiLink>
        </Fragment>
      ),
      date: `${faker.date.past()}`,
      account: faker.finance.account(),
      amount: faker.commerce.price(),
      phone: faker.phone.number(),
      version: faker.system.semver(),
    };
  }

  return data[rowIndex][columnId];
}

export default () => {
  // Pagination
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
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const [mountedCellCount, setMountedCellCount] = useState(0);

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
      aria-label="Virtualized and constrained data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={10000}
      renderCellValue={RenderCellValue}
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

      <EuiResizableContainer style={{ height: '400px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50} minSize="30%">
              {grid}
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel initialSize={50} minSize="200px">
              <EuiText>
                <p>
                  This panel is constraining the datagrid. You can resize it
                  using the drag handle and <strong>EuiDataGrid</strong>{' '}
                  automatically detects the changes to its container size.
                </p>
              </EuiText>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    </DataContext.Provider>
  );
};
