import React, { Component, Fragment } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonEmpty,
  EuiLink,
} from '../../../../src/components/';

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

for (let i = 1; i < 20; i++) {
  data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: (
      <EuiLink href="http://google.com">{fake('{{address.city}}')}</EuiLink>
    ),
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
        pageSize: 10,
      },
      visibleColumns: columns.map(({ id }) => id),
    };
  }

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
    const { pagination } = this.state;

    return (
      <EuiDataGrid
        aria-label="Top EUI contributors"
        columns={columns}
        columnVisibility={{
          visibleColumns: this.state.visibleColumns,
          setVisibleColumns: this.setVisibleColumns,
        }}
        rowCount={data.length}
        gridStyle={{
          border: 'horizontal',
          header: 'underline',
        }}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
        pagination={{
          ...pagination,
          pageSizeOptions: [5, 10, 25],
          onChangeItemsPerPage: this.setPageSize,
          onChangePage: this.setPageIndex,
        }}
        toolbarVisibility={{
          additionalControls: (
            <Fragment>
              <EuiButtonEmpty
                size="xs"
                iconType="bell"
                color="primary"
                className="euiDataGrid__controlBtn"
                onClick={() => alert('You clicked me! Hugs.')}>
                New button
              </EuiButtonEmpty>
              <EuiButtonEmpty
                size="xs"
                iconType="branch"
                color="danger"
                className="euiDataGrid__controlBtn"
                onClick={() => alert('You clicked me! Hugs.')}>
                Another button
              </EuiButtonEmpty>
            </Fragment>
          ),
        }}
      />
    );
  }
}
