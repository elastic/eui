import React, { Component } from 'react';
import { fake } from 'faker';

import { EuiDataGrid } from '../../../../src/components/';

const columns = [
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 100; i++) {
  data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: fake('{{address.city}}'),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

export default class DataGridContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },
    };
  }

  setPageIndex = pageIndex =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageIndex },
    }));

  setPageSize = pageSize =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageSize },
    }));

  render() {
    const { pagination } = this.state;

    return (
      <EuiDataGrid
        aria-label="Top EUI contributors"
        columns={columns}
        rowCount={data.length}
        gridStyle={{
          border: 'horizontal',
          stripes: true,
        }}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
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
