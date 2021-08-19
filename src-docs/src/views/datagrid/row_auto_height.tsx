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

import {
  EuiDataGrid,
  EuiDataGridProps,
} from '../../../../src/components/datagrid';
import { EuiLink } from '../../../../src/components/link';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiToolTip } from '../../../../src/components/tool_tip';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiMarkdownFormat } from '../../../../src/components/markdown_editor';

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
    id: 'created',
    displayAsText: 'Created',
    schema: 'datetime',
    isExpandable: false,
  },
  {
    id: 'title',
    displayAsText: 'Title',
    isExpandable: false,
  },
  {
    id: 'user',
    displayAsText: 'User',
    isExpandable: false,
  },
  {
    id: 'body',
    displayAsText: 'Description',
  },
  {
    id: 'labels',
    displayAsText: 'Labels',
    isExpandable: false,
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

  if (columnId === 'title') {
    content = (
      <>
        {item.comments >= 1 && (
          <EuiToolTip content={`${item.comments} comments`}>
            <EuiIcon type="editorComment" />
          </EuiToolTip>
        )}
        <EuiLink href={item.html_url} target="blank" external>
          {item.title}
        </EuiLink>
      </>
    );
  } else if (columnId === 'user') {
    content = (
      <>
        <EuiAvatar
          name={item.user.login}
          imageUrl={item.user.avatar_url}
          size="l"
        />
        &nbsp;{item.user.login}
      </>
    );
  } else if (columnId === 'labels') {
    content = (
      <>
        {item.labels.map(({ name, color }) => (
          <EuiBadge color={`#${color}`}>{name}</EuiBadge>
        ))}
      </>
    );
  } else if (columnId === 'created') {
    content = item.created_at.toString();
  } else if (columnId === 'body') {
    if (isDetails) {
      // expanded in a popover
      content = <EuiMarkdownFormat>{item.body ?? ''}</EuiMarkdownFormat>;
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

  const rowHeightsOptions = useMemo(
    () => ({
      defaultHeight: 'auto' as const,
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
