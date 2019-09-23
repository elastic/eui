import React, { Component, Fragment } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonIcon,
  EuiLink,
} from '../../../../src/components/';
import { iconTypes } from '../icon/icons';

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
    dataType: 'numeric',
  },
  {
    id: 'date',
  },
  {
    id: 'amount',
    dataType: 'currency',
  },
  {
    id: 'json',
  },
  {
    id: 'version',
  },
];

const data = [];

for (let i = 1; i < 5; i++) {
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
    json: JSON.stringify(
      [
        {
          name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
          email: fake('{{internet.email}}'),
          date: fake('{{date.past}}'),
          account: fake('{{finance.account}}'),
          amount: fake('${{finance.amount}}'),
          version: fake('{{system.semver}}'),
          friends: [
            {
              name: fake(
                '{{name.lastName}}, {{name.firstName}} {{name.suffix}}'
              ),
              email: fake('{{internet.email}}'),
              date: fake('{{date.past}}'),
              account: fake('{{finance.account}}'),
              amount: fake('${{finance.amount}}'),
              version: fake('{{system.semver}}'),
            },
          ],
        },
      ],
      null,
      2
    ),
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

  dummyIcon = () => (
    <EuiButtonIcon
      aria-label="dummy icon"
      iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
    />
  );

  render() {
    const { data, pagination, sortingColumns } = this.state;

    return (
      <EuiDataGrid
        aria-label="Top EUI contributors"
        columns={columns}
        rowCount={data.length}
        inMemory="sorting"
        renderCellValue={({ rowIndex, columnId }) => {
          const value = data[rowIndex][columnId];
          return value;
        }}
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
