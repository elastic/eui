import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPagination,
  EuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [rowSize, setRowSize] = useState(50);

  const PAGE_COUNT = 10;

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const goToPage = (pageNumber) => setActivePage(pageNumber);

  const getIconType = (size) => {
    return size === rowSize ? 'check' : 'empty';
  };

  const button = (
    <EuiButtonEmpty
      size="s"
      color="text"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
    >
      Rows per page: {rowSize}
    </EuiButtonEmpty>
  );

  const items = [
    <EuiContextMenuItem
      key="10 rows"
      icon={getIconType(10)}
      onClick={() => {
        closePopover();
        setRowSize(10);
      }}
    >
      10 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="20 rows"
      icon={getIconType(20)}
      onClick={() => {
        closePopover();
        setRowSize(20);
      }}
    >
      20 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="50 rows"
      icon={getIconType(50)}
      onClick={() => {
        closePopover();
        setRowSize(50);
      }}
    >
      50 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="100 rows"
      icon={getIconType(100)}
      onClick={() => {
        closePopover();
        setRowSize(100);
      }}
    >
      100 rows
    </EuiContextMenuItem>,
  ];

  return (
    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiPopover
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none"
        >
          <EuiContextMenuPanel items={items} />
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPagination
          aria-label="Custom pagination example"
          pageCount={PAGE_COUNT}
          activePage={activePage}
          onPageClick={goToPage}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
