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
  EuiDataGridProps,
} from '../../../../src/components/datagrid';
import { EuiText } from '../../../../src/components/text';
import { EuiImage } from '../../../../src/components/image';
import { EuiButtonGroup } from '../../../../src/components/button';
import { EuiSpacer } from '../../../../src/components/spacer';

interface DataShape {
  name: string;
  text: string;
}

type DataContextShape =
  | undefined
  | {
      data: DataShape[];
      contentTypeSelected: 'text' | 'images';
      adjustMountedCellCount: (adjustment: number) => void;
    };
const DataContext = createContext<DataContextShape>(undefined);

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'text',
  },
] as EuiDataGridProps['columns'];

// it is expensive to compute 10000 rows of fake data
// instead of loading up front, generate entries on the fly
const raw_data: DataShape[] = [];

const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
  rowIndex,
  columnId,
}) => {
  const { data, adjustMountedCellCount, contentTypeSelected } = useContext(
    DataContext
  )!;

  useEffect(() => {
    adjustMountedCellCount(1);
    return () => adjustMountedCellCount(-1);
  }, [adjustMountedCellCount]);

  if (data[rowIndex] == null) {
    data[rowIndex] = {
      name: fake('{{lorem.text}}'),
      text: fake('{{lorem.text}}'),
    };
  }

  const firstNumberSize = rowIndex < 7 && rowIndex > 0 ? rowIndex : 5;

  return contentTypeSelected === 'images' ? (
    <EuiImage
      size={'original'}
      alt="Fake img"
      url={`https://source.unsplash.com/${firstNumberSize}00x${firstNumberSize}00/?starwars`}
    />
  ) : (
    data[rowIndex][columnId as 'text' | 'name']
  );
};

const contentTypeOptions = [
  {
    id: 'text',
    label: 'Text',
  },
  {
    id: 'images',
    label: 'Images',
  },
];

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const [contentTypeSelected, setContentTypeSelected] = useState<
    'text' | 'images'
  >('text');

  const onChangeItemsPerPage = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );

  const onContentTypeChange = useCallback(
    (optionId) => setContentTypeSelected(optionId),
    [setContentTypeSelected]
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
      defaultHeight: 'auto' as const,
      rowHeights: {
        1: {
          lineCount: 5,
        },
        4: contentTypeSelected === 'images' ? 240 : 140,
      },
    }),
    [contentTypeSelected]
  );

  const dataContext = useMemo<DataContextShape>(
    () => ({
      data: raw_data,
      contentTypeSelected,
      adjustMountedCellCount: (adjustment: number) =>
        setMountedCellCount(
          (mountedCellCount) => mountedCellCount + adjustment
        ),
    }),
    [contentTypeSelected]
  );

  const grid = (
    <EuiDataGrid
      aria-label="Row height options with auto demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={10000}
      height={400}
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
      <EuiText>
        <p>There are {mountedCellCount} rendered cells</p>
      </EuiText>
      <EuiSpacer />
      <EuiText style={{ textAlign: 'center' }}>
        <p>Type of content</p>
      </EuiText>
      <EuiSpacer />
      <EuiButtonGroup
        isFullWidth
        buttonSize="compressed"
        legend="Content type"
        options={contentTypeOptions}
        idSelected={contentTypeSelected}
        onChange={onContentTypeChange}
      />
      <EuiSpacer />
      {grid}
    </DataContext.Provider>
  );
};
