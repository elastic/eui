import React, { Component } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonEmpty,
  EuiLink,
} from '../../../../src/components/';

const columns = [
  {
    id: '⓪ interactives, ⛔️ expandable',
    isExpandable: false,
  },
  {
    id: '⓪ interactives, ✅ expandable',
  },
  {
    id: '① interactive, ⛔️ expandable',
    isExpandable: false,
  },
  {
    id: '①️ interactive, ✅ expandable',
  },
  {
    id: '⓶ interactives, ⛔️ expandable',
    isExpandable: false,
  },
  {
    id: '⓶ interactives, ✅ expandable',
  },
];

const columnIdToIndex = columns.reduce((acc, { id }, index) => {
  acc[id] = index;
  return acc;
}, {});
const data = [];

for (let i = 1; i < 5; i++) {
  data.push([
    <span>{fake('{{name.firstName}}')}</span>,
    <span>{fake('{{name.firstName}}')}</span>,

    <span>
      <EuiLink href="#/tabular-content/data-grid-focus">{fake('{{internet.email}}')}</EuiLink>
    </span>,
    <span>
      <EuiLink href="#/tabular-content/data-grid-focus">{fake('{{internet.email}}')}</EuiLink>
    </span>,

    <span>
      <EuiButtonEmpty size="s" onClick={() => console.log('clickerooed')}>Yes</EuiButtonEmpty>
      <EuiButtonEmpty size="s" onClick={() => console.log('clickerooed')}>No</EuiButtonEmpty>
    </span>,
    <span>
      <EuiButtonEmpty size="s" onClick={() => console.log('clickerooed')}>Yes</EuiButtonEmpty>
      <EuiButtonEmpty size="s" onClick={() => console.log('clickerooed')}>No</EuiButtonEmpty>
    </span>,
  ]);
}

export default class DataGridSchema extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      sortingColumns: [{ id: 'contributions', direction: 'asc' }],

      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },

      visibleColumns: columns.map(({ id }) => id),
    };
  }

  setSorting = sortingColumns => {
    const data = [...this.state.data].sort((a, b) => {
      for (let i = 0; i < sortingColumns.length; i++) {
        const column = sortingColumns[i];
        const aValue = a[column.id];
        const bValue = b[column.id];

        if (aValue < bValue) return column.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return column.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });

    this.setState({ data, sortingColumns });
  };

  setPageIndex = pageIndex =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageIndex },
    }));

  setPageSize = pageSize =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageSize, pageIndex: 0 },
    }));

  setVisibleColumns = visibleColumns => this.setState({ visibleColumns });

  render() {
    const { data, pagination, sortingColumns } = this.state;

    return (
      <EuiDataGrid
        aria-label="Top EUI contributors"
        columns={columns}
        columnVisibility={{
          visibleColumns: this.state.visibleColumns,
          setVisibleColumns: this.setVisibleColumns,
        }}
        rowCount={data.length}
        inMemory={{ level: 'sorting' }}
        renderCellValue={({ rowIndex, columnId }) => {
          const columnIndex = columnIdToIndex[columnId];
          return data[rowIndex][columnIndex];
        }}
        sorting={{ columns: sortingColumns, onSort: this.setSorting }}
        pagination={{
          ...pagination,
          pageSizeOptions: [5, 10, 25],
          onChangeItemsPerPage: this.setPageSize,
          onChangePage: this.setPageIndex,
        }}
        schemaDetectors={[
          {
            type: 'favoriteFranchise',
            detector(value) {
              return value.toLowerCase() === 'star wars' ||
                value.toLowerCase() === 'star trek'
                ? 1
                : 0;
            },
            comparator(a, b, direction) {
              const aValue = a.toLowerCase() === 'star wars';
              const bValue = b.toLowerCase() === 'star wars';
              if (aValue < bValue) return direction === 'asc' ? 1 : -1;
              if (aValue > bValue) return direction === 'asc' ? -1 : 1;
              return 0;
            },
            sortTextAsc: 'Star wars-Star trek',
            sortTextDesc: 'Star trek-Star wars',
            icon: 'starFilled',
            color: '#800080',
          },
        ]}
        popoverContents={{
          numeric: ({ cellContentsElement }) => {
            // want to process the already-rendered cell value
            const stringContents = cellContentsElement.textContent;

            // extract the groups-of-three digits that are right-aligned
            return stringContents.replace(/((\d{3})+)$/, match =>
              // then replace each group of xyz digits with ,xyz
              match.replace(/(\d{3})/g, ',$1')
            );
          },
        }}
      />
    );
  }
}
