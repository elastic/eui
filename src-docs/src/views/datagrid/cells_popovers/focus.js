/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiButtonIcon,
  EuiLink,
  EuiBadge,
  EuiToken,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextColor,
} from '../../../../../src/components';

const data = [];

for (let i = 0; i < 10; i++) {
  data.push([
    <span>{faker.name.firstName()}</span>,
    <span>{faker.name.firstName()}</span>,

    <span>
      <EuiLink href="#/tabular-content/data-grid-cells-popovers#focus">
        {faker.internet.email()}
      </EuiLink>
    </span>,
    <span>
      <EuiLink href="#/tabular-content/data-grid-cells-popovers#focus">
        {faker.internet.email()}
      </EuiLink>
    </span>,

    <EuiTextColor color="subdued">
      <EuiLink size="s" color="success" onClick={() => {}}>
        Yes
      </EuiLink>
      {' | '}
      <EuiLink size="s" color="danger" onClick={() => {}}>
        No
      </EuiLink>
    </EuiTextColor>,
    <EuiTextColor color="subdued">
      <EuiLink size="s" color="success" onClick={() => {}}>
        Yes
      </EuiLink>
      {' | '}
      <EuiLink size="s" color="danger" onClick={() => {}}>
        No
      </EuiLink>
    </EuiTextColor>,
  ]);
}

export default () => {
  const columns = [
    {
      id: 'no-interactives not expandable',
      display: (
        <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              aria-label="column settings"
              iconType="gear"
              onClick={() => {}}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiBadge>0 interactive</EuiBadge>
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
      isExpandable: false,
      actions: false,
    },
    {
      id: 'no-interactives is expandable',
      display: (
        <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiToken
              iconType="expandMini"
              color="euiColorVis0"
              shape="square"
              fill="dark"
              title="Expandable"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiBadge>0 interactive</EuiBadge>
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
      actions: false,
    },
    {
      id: 'one-interactive not expandable',
      display: <EuiBadge>1 interactive</EuiBadge>,
      isExpandable: false,
      actions: false,
    },
    {
      id: 'one-interactives is expandable',
      display: (
        <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              aria-label="column settings"
              iconType="gear"
              onClick={() => {}}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToken
              iconType="expandMini"
              color="euiColorVis0"
              shape="square"
              fill="dark"
              title="Expandable"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiBadge>1 interactive</EuiBadge>
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
      actions: false,
    },
    {
      id: 'two-interactives not expandable',
      display: <EuiBadge>2 interactive</EuiBadge>,
      isExpandable: false,
      actions: false,
    },
    {
      id: 'two-interactives is expandable',
      display: (
        <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiToken
              iconType="expandMini"
              color="euiColorVis0"
              shape="square"
              fill="dark"
              title="Expandable"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiBadge>2 interactive</EuiBadge>
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
      actions: false,
    },
  ];

  const columnIdToIndex = columns.reduce((acc, { id }, index) => {
    acc[id] = index;
    return acc;
  }, {});

  const renderCellValue = useCallback(
    ({ rowIndex, columnId }) => {
      const columnIndex = columnIdToIndex[columnId];
      return data[rowIndex][columnIndex];
    },
    [columnIdToIndex]
  );

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const [pagination, setPagination] = useState({
    pageSize: 4,
    pageIndex: 0,
    pageSizeOptions: [4],
  });
  const onChangeItemsPerPage = useCallback(
    (pageSize) => setPagination((pagination) => ({ ...pagination, pageSize })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  return (
    <EuiDataGrid
      aria-label="Focus"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      renderCellValue={renderCellValue}
      pagination={{
        ...pagination,
        onChangeItemsPerPage,
        onChangePage,
      }}
    />
  );
};
