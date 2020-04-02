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
      <EuiButtonEmpty size="s" onClick={() => console.log('clicked Yes')}>
        Yes
      </EuiButtonEmpty>
      <EuiButtonEmpty size="s" onClick={() => console.log('clicked No')}>
        No
      </EuiButtonEmpty>
    </span>,
    <span>
      <EuiButtonEmpty size="s" onClick={() => console.log('clicked Yes')}>
        Yes
      </EuiButtonEmpty>
      <EuiButtonEmpty size="s" onClick={() => console.log('clicked No')}>
        No
      </EuiButtonEmpty>
    </span>,
  ]);
}

const renderHeaderIcon = areHeadersInteractive =>
  areHeadersInteractive ? (
    <EuiButtonIcon
      aria-label="column settings"
      iconType="gear"
      onClick={() => console.log('gear icon clicked')}
    />
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
          <>
            {renderHeaderIcon(areHeadersInteractive)}⓪ interactives, ⛔️
            expandable
          </>
        ),
        isExpandable: false,
      },
      {
        id: 'no-interactives is expandable',
        display: '⓪ interactives, ✅ expandable',
      },
      {
        id: 'one-interactive not expandable',
        display: '① interactive, ⛔️ expandable',
        isExpandable: false,
      },
      {
        id: 'one-interactives is expandable',
        display: (
          <>
            {renderHeaderIcon(areHeadersInteractive)}①️ interactive, ✅
            expandable
          </>
        ),
      },
      {
        id: 'two-interactives not expandable',
        display: '⓶ interactives, ⛔️ expandable',
        isExpandable: false,
      },
      {
        id: 'two-interactives is expandable',
        display: '⓶ interactives, ✅ expandable',
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
