/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useCallback, useMemo } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiLink,
  EuiSwitch,
  EuiSpacer,
  EuiBadge,
  EuiToken,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

const data = [];

for (let i = 0; i < 10; i++) {
  data.push([
    <span>{fake('{{name.firstName}}')}</span>,
    <span>{fake('{{name.firstName}}')}</span>,

    <span>
      <EuiLink href="#/tabular-content/data-grid-focus">
        {fake('{{internet.email}}')}
      </EuiLink>
    </span>,
    <span>
      <EuiLink href="#/tabular-content/data-grid-focus">
        {fake('{{internet.email}}')}
      </EuiLink>
    </span>,

    <span>
      <EuiButtonEmpty size="xs" onClick={() => console.log('clicked Yes')}>
        Yes
      </EuiButtonEmpty>
      <EuiButtonEmpty
        size="xs"
        color="danger"
        onClick={() => console.log('clicked No')}>
        No
      </EuiButtonEmpty>
    </span>,
    <span>
      <EuiButtonEmpty size="xs" onClick={() => console.log('clicked Yes')}>
        Yes
      </EuiButtonEmpty>
      <EuiButtonEmpty
        size="xs"
        color="danger"
        onClick={() => console.log('clicked No')}>
        No
      </EuiButtonEmpty>
    </span>,
  ]);
}

const renderHeaderIcon = areHeadersInteractive =>
  areHeadersInteractive ? (
    <EuiFlexItem grow={false}>
      <EuiButtonIcon
        aria-label="column settings"
        iconType="gear"
        onClick={() => console.log('gear icon clicked')}
      />
    </EuiFlexItem>
  ) : null;

export default () => {
  const [areHeadersInteractive, setAreHeadersInteractive] = useState(false);
  const switchInteractiveHeaders = useCallback(
    e => setAreHeadersInteractive(e.target.checked),
    [setAreHeadersInteractive]
  );

  const columns = useMemo(
    () => [
      {
        id: 'no-interactives not expandable',
        display: (
          <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            {renderHeaderIcon(areHeadersInteractive)}
            <EuiFlexItem grow={false}>
              <EuiToken
                iconType="expandMini"
                color="euiColorVis2"
                shape="square"
                fill="dark"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>0 interactive</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
        isExpandable: false,
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
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>0 interactive</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
      },
      {
        id: 'one-interactive not expandable',
        display: (
          <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiToken
                iconType="expandMini"
                color="euiColorVis2"
                shape="square"
                fill="dark"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>1 interactive</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
        isExpandable: false,
      },
      {
        id: 'one-interactives is expandable',
        display: (
          <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            {renderHeaderIcon(areHeadersInteractive)}
            <EuiFlexItem grow={false}>
              <EuiToken
                iconType="expandMini"
                color="euiColorVis0"
                shape="square"
                fill="dark"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>1 interactive</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
      },
      {
        id: 'two-interactives not expandable',

        display: (
          <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiToken
                iconType="expandMini"
                color="euiColorVis2"
                shape="square"
                fill="dark"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>2 interactive</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
        isExpandable: false,
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
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>2 interactive</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
      },
    ],
    [areHeadersInteractive]
  );
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
    pageSize => setPagination(pagination => ({ ...pagination, pageSize })),
    [setPagination]
  );
  const onChangePage = useCallback(
    pageIndex => setPagination(pagination => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  return (
    <>
      <EuiSwitch
        label="Use interactive headers - toggling will reset the datagrid and any internal states"
        checked={areHeadersInteractive}
        onChange={switchInteractiveHeaders}
      />

      <EuiSpacer />

      <EuiDataGrid
        key={areHeadersInteractive ? 'interactive-headers' : 'static-headers'}
        aria-label="Top EUI contributors"
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
    </>
  );
};
