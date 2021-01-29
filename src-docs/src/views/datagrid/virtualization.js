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

import {
  EuiDataGrid,
  EuiLink,
  EuiText,
  EuiSpacer,
  EuiButtonGroup,
} from '../../../../src/components/';
import { EuiFormRow } from '../../../../src/components/form/form_row';

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

const dimensionSizes = {
  'height-300px': 300,
  'height-600px': 600,

  'width-200px': 200,
  'width-50%': '50%',
  'width-unconstrained': undefined,
};

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

  const [height, setHeight] = useState('height-300px');
  const [width, setWidth] = useState('width-50%');

  return (
    <>
      <EuiFormRow label="Height">
        <EuiButtonGroup
          legend="Set a height for the following grid"
          options={[
            { id: 'height-300px', label: '300px' },
            { id: 'height-600px', label: '600px' },
            { id: 'height-unconstrained', label: 'Unconstrained' },
          ]}
          idSelected={height}
          onChange={setHeight}
        />
      </EuiFormRow>

      <EuiFormRow label="Width">
        <EuiButtonGroup
          legend="Set a width for the following grid"
          options={[
            { id: 'width-200px', label: '200px' },
            { id: 'width-50%', label: '50%' },
            { id: 'width-unconstrained', label: 'Unconstrained' },
          ]}
          idSelected={width}
          onChange={setWidth}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiText>
        <p>There are {mountedCellCount} rendered cells</p>
      </EuiText>

      <DataContext.Provider value={dataContext}>
        <EuiDataGrid
          // completely reset the grid when switching between controlled & uncontrolled heights
          // otherwise, going from constrained->unconstrained is ignored.
          // this is for example only, don't switch between controlled & uncontrolled heights
          key={
            height === 'height-unconstrained' ? 'unconstrained' : 'constrained'
          }
          aria-label="Virtualized data grid demo"
          height={dimensionSizes[height]}
          width={dimensionSizes[width]}
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
