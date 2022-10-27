import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiBasicTable,
  EuiLink,
  EuiSpacer,
  EuiHorizontalRule,
  EuiText,
} from '../../../../src';
import { formatDate } from '../../../../src/services';

const PAGE_INDEX_KEY = 'paginationGuide_currentPage';
const PAGE_COUNT_KEY = 'paginationGuide_pageCount';

const raw_data = [];

for (let i = 1; i < 25; i++) {
  const name = `${faker.name.lastName()}, ${faker.name.firstName()}`;
  const suffix = faker.name.suffix();
  raw_data.push({
    name: {
      formatted: `${name} ${suffix}`,
      raw: name,
    },
    location: (
      <span>
        {`${faker.address.city()}, `}
        <EuiLink href="https://google.com">{faker.address.country()}</EuiLink>
      </span>
    ),
    date: `${faker.date.past()}`,
    amount: faker.commerce.price(),
  });
}

export default () => {
  const [pageIndex, setPageIndex] = useState(
    Number(localStorage.getItem(PAGE_INDEX_KEY) || 0)
  );
  const [pageSize, setPageSize] = useState(
    Number(localStorage.getItem(PAGE_COUNT_KEY) || 10)
  );

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    localStorage.setItem(PAGE_INDEX_KEY, String(pageIndex));
    localStorage.setItem(PAGE_COUNT_KEY, String(pageSize));
  };

  const totalItemCount = raw_data.length;
  const startIndex = pageIndex * pageSize;
  const pageOfItems =
    pageSize > 0
      ? raw_data.slice(
          startIndex,
          Math.min(startIndex + pageSize, totalItemCount)
        )
      : raw_data;

  const columns = [
    {
      field: 'name',
      name: 'Name',
      truncateText: true,
      render: (Name) => Name.formatted,
    },
    {
      field: 'location',
      name: 'Location',
      render: (location) => location,
    },
    {
      field: 'date',
      name: 'Date',
      dataType: 'date',
      render: (date) => formatDate(date, 'dobLong'),
    },
    {
      field: 'amount',
      name: 'Amount',
      dataType: 'number',
      width: '100px',
    },
  ];

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 0],
  };

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-
          {Math.min(pageSize * pageIndex + pageSize, totalItemCount)}
        </strong>{' '}
        of {totalItemCount}
      </>
    );

  return (
    <div>
      <EuiText size="xs">
        Showing {resultsCount} <strong>Users</strong>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiHorizontalRule margin="none" style={{ height: 2 }} />
      <EuiBasicTable
        tableCaption="Demo for EuiBasicTable with pagination"
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
};
