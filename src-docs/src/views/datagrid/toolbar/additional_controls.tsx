import React, { useState, useCallback, Fragment } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiLink,
  EuiToolTip,
  useGeneratedHtmlId,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiText,
  EuiTitle,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPopover,
  EuiDataGridPaginationProps,
} from '../../../../../src';

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

const data: any[] = [];

for (let i = 1; i < 20; i++) {
  data.push({
    name: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    email: faker.internet.email(),
    city: <EuiLink href="http://google.com">{faker.address.city()}</EuiLink>,
    country: faker.address.country(),
    account: faker.finance.account(),
  });
}

export default () => {
  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const flyoutTitleId = useGeneratedHtmlId({
    prefix: 'dataGridAdditionalControlsFlyout',
  });

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby={flyoutTitleId}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={flyoutTitleId}>Inspect</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This is not a real control, just an example of how to trigger a
              flyout from a custom data grid control.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  const [isPopoverOpen, setPopover] = useState(false);
  const popoverId = useGeneratedHtmlId({
    prefix: 'dataGridAdditionalControlsPopover',
  });
  const alertAndClosePopover = (position?: string) => {
    setPopover(false);
    window.alert(
      `This is not a real control. It was passed into the \`${position}\` position.`
    );
  };

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback<EuiDataGridPaginationProps['onChangePage']>(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    []
  );
  const setPageSize = useCallback<
    EuiDataGridPaginationProps['onChangeItemsPerPage']
  >(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    []
  );

  return (
    <>
      <EuiDataGrid
        aria-label="Data grid demo with additional controls"
        columns={columns}
        columnVisibility={{
          visibleColumns: visibleColumns,
          setVisibleColumns: setVisibleColumns,
        }}
        rowCount={data.length}
        gridStyle={{
          border: 'horizontal',
          header: 'underline',
        }}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
        pagination={{
          ...pagination,
          onChangeItemsPerPage: setPageSize,
          onChangePage: setPageIndex,
        }}
        toolbarVisibility={{
          additionalControls: {
            left: {
              prepend: (
                <EuiButtonEmpty
                  size="xs"
                  iconType="document"
                  color="text"
                  onClick={() => alertAndClosePopover('left.prepend')}
                >
                  {data.length} results
                </EuiButtonEmpty>
              ),
              append: (
                <EuiPopover
                  id={popoverId}
                  button={
                    <EuiButtonEmpty
                      size="xs"
                      iconType="download"
                      onClick={() => setPopover((open) => !open)}
                    >
                      Download
                    </EuiButtonEmpty>
                  }
                  isOpen={isPopoverOpen}
                  closePopover={() => setPopover(false)}
                  panelPaddingSize="none"
                >
                  <EuiContextMenuPanel
                    size="s"
                    items={[
                      <EuiContextMenuItem
                        key="csv"
                        onClick={() => alertAndClosePopover('left.append')}
                      >
                        CSV
                      </EuiContextMenuItem>,
                      <EuiContextMenuItem
                        key="jsonedit"
                        onClick={() => alertAndClosePopover('left.append')}
                      >
                        JSON
                      </EuiContextMenuItem>,
                    ]}
                  />
                </EuiPopover>
              ),
            },
            right: (
              <Fragment>
                <EuiToolTip
                  title="Updated 3 min ago"
                  content="Click to refresh"
                >
                  <EuiButtonIcon
                    aria-label="Refresh grid data"
                    size="xs"
                    iconType="refresh"
                    onClick={() => alertAndClosePopover('right')}
                  />
                </EuiToolTip>
                <EuiToolTip content="Inspect grid data">
                  <EuiButtonIcon
                    aria-label="Inspect grid data"
                    size="xs"
                    iconType="inspect"
                    onClick={() => setIsFlyoutVisible(true)}
                  />
                </EuiToolTip>
              </Fragment>
            ),
          },
        }}
      />
      {flyout}
    </>
  );
};
