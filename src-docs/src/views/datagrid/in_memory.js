import React, { Component, Fragment } from 'react';
import { fake } from 'faker';

import { EuiDataGrid, EuiLink } from '../../../../src/components/';

const columns = [
  {
    id: 'name',
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
  },
  {
    id: 'amount',
  },
  {
    id: 'boolean',
  },
  {
    id: 'version',
  },
];

const data = [];

for (let i = 1; i < 100; i++) {
  data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: <EuiLink href="">{fake('{{internet.email}}')}</EuiLink>,
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
    amount: fake('${{finance.amount}}'),
    boolean: fake('{{random.boolean}}'),
    version: fake('{{system.semver}}'),
  });
}

export default class InMemoryDataGrid extends Component {
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

  setSorting = sortingColumns => this.setState({ sortingColumns });

  setPageIndex = pageIndex =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageIndex },
    }));

  setPageSize = pageSize =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageSize },
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
        renderCellValue={({ rowIndex, columnId }) => {
          const value = data[rowIndex][columnId];
          return value;
        }}
        inMemory={{ level: 'sorting' }}
        sorting={{ columns: sortingColumns, onSort: this.setSorting }}
        pagination={{
          ...pagination,
          pageSizeOptions: [5, 10, 25],
          onChangeItemsPerPage: this.setPageSize,
          onChangePage: this.setPageIndex,
        }}
      />
    );
  }
}
