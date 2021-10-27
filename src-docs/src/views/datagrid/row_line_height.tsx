import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
// @ts-ignore not configured to import json
import githubData from './row_auto_height_data.json';

import { formatDate } from '../../../../src/services';

import {
  EuiDataGrid,
  EuiDataGridProps,
} from '../../../../src/components/datagrid';

interface DataShape {
  html_url: string;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
  comments: number;
  created_at: string;
  body?: string;
}

// convert strings to Date objects
for (let i = 0; i < githubData.length; i++) {
  githubData[i].created_at = new Date(githubData[i].created_at);
}

type DataContextShape =
  | undefined
  | {
      data: DataShape[];
    };
const DataContext = createContext<DataContextShape>(undefined);

const columns = [
  {
    id: 'index',
    displayAsText: 'Index',
    isExpandable: false,
    initialWidth: 80,
  },
  {
    id: 'issue',
    displayAsText: 'Issue',
    isExpandable: false,
  },
  {
    id: 'body',
    displayAsText: 'Description',
  },
];

// it is expensive to compute 10000 rows of fake data
// instead of loading up front, generate entries on the fly
const raw_data: DataShape[] = githubData;

const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
  rowIndex,
  columnId,
  isDetails,
}) => {
  const { data } = useContext(DataContext)!;

  const item = data[rowIndex];
  let content: ReactNode = '';

  if (columnId === 'index') {
    content = <>{rowIndex}</>;
  } else if (columnId === 'issue') {
    content = (
      <>
        <strong>{item.title}</strong>
        <br />
        Opened by {item.user.login} on {formatDate(item.created_at, 'dobLong')}
        <br />
        {item.comments} comment{item.comments !== 1 ? 's' : ''}
      </>
    );
  } else if (columnId === 'body') {
    if (isDetails) {
      // expanded in a popover
      content = item.body;
    } else {
      // a full issue description is a *lot* to shove into a cell
      content = (item.body ?? '').slice(0, 300);
    }
  }

  return content;
};

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });

  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

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

  // matches the snippet example
  const rowHeightsOptions = useMemo(
    () => ({
      defaultHeight: {
        lineCount: 3,
      },
      lineHeight: '2em',
    }),
    []
  );

  const dataContext = useMemo<DataContextShape>(
    () => ({
      data: raw_data,
    }),
    []
  );

  return (
    <DataContext.Provider value={dataContext}>
      <EuiDataGrid
        aria-label="Row height options with auto demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={raw_data.length}
        height={400}
        renderCellValue={RenderCellValue}
        inMemory={{ level: 'sorting' }}
        sorting={{ columns: sortingColumns, onSort }}
        rowHeightsOptions={rowHeightsOptions}
        virtualizationOptions={{
          // rough average of the cell heights in the example
          // accurately setting this smooths out the scrolling experience
          estimatedRowHeight: 96,
        }}
        pagination={{
          ...pagination,
          pageSizeOptions: [50, 250, 1000],
          onChangeItemsPerPage: onChangeItemsPerPage,
          onChangePage: onChangePage,
        }}
      />
    </DataContext.Provider>
  );
};
