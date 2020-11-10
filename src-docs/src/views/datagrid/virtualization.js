import React, {
  Fragment,
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { fake } from 'faker';

import { EuiDataGrid, EuiLink, EuiText } from '../../../../src/components/';

const DataContext = createContext();

const raw_data = [];

for (let i = 1; i < 10000; i++) {
  const email = fake('{{internet.email}}');
  const name = fake('{{name.lastName}}, {{name.firstName}}');
  const suffix = fake('{{name.suffix}}');
  raw_data.push({
    name: `${name} ${suffix}`,
    email: <EuiLink href="">{email}</EuiLink>,
    location: (
      <Fragment>
        {`${fake('{{address.city}}')}, `}
        <EuiLink href="https://google.com">
          {fake('{{address.country}}')}
        </EuiLink>
      </Fragment>
    ),
    date: fake('{{date.past}}'),
    account: fake('{{finance.account}}'),
    amount: fake('${{commerce.price}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
  });
}

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

function RenderCellValue({ rowIndex, columnId }) {
  const { data, adjustMountedCellCount } = useContext(DataContext);

  useEffect(() => {
    adjustMountedCellCount(1);
    return () => adjustMountedCellCount(-1);
  }, [adjustMountedCellCount]);

  return data.hasOwnProperty(rowIndex) ? data[rowIndex][columnId] : null;
}

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 250 });
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
      adjustMountedCellCount: (adjustment) =>
        setMountedCellCount(
          (mountedCellCount) => mountedCellCount + adjustment
        ),
    }),
    []
  );

  return (
    <>
      <EuiText>
        <p>There are {mountedCellCount} mounted cells</p>
      </EuiText>
      <DataContext.Provider value={dataContext}>
        <EuiDataGrid
          aria-label="Virtualized data grid demo"
          height={300}
          width={600}
          columns={columns}
          columnVisibility={{ visibleColumns, setVisibleColumns }}
          rowCount={raw_data.length}
          renderCellValue={RenderCellValue}
          pagination={{
            ...pagination,
            pageSizeOptions: [50, 250, 1000],
            onChangeItemsPerPage: onChangeItemsPerPage,
            onChangePage: onChangePage,
          }}
        />
      </DataContext.Provider>
    </>
  );
};
