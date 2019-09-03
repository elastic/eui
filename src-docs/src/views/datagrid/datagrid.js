import React, { Component, Fragment } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonIcon,
  EuiLink,
} from '../../../../src/components/';
import { iconTypes } from '../../../../src-docs/src/views/icon/icons';

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
    id: 'phone',
  },
  {
    id: 'version',
  },
  {
    id: 'actions',
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
    amount: fake('{{finance.currencySymbol}}{{finance.amount}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
    actions: (
      <Fragment>
        <EuiButtonIcon
          aria-label="dummy icon"
          iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
        />
        <EuiButtonIcon
          aria-label="dummy icon"
          iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
        />
      </Fragment>
    ),
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

  dummyIcon = () => (
    <EuiButtonIcon
      aria-label="dummy icon"
      iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
    />
  );

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
