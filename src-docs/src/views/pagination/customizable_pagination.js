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

  const PAGE_COUNT = 10;

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const goToPage = pageNumber => setActivePage(pageNumber);

  const button = (
    <EuiButtonEmpty
      size="s"
      color="text"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      Rows per page: 50
    </EuiButtonEmpty>
  );

  const items = [
    <EuiContextMenuItem
      key="10 rows"
      icon="empty"
      onClick={() => {
        closePopover();
        window.alert('10 rows');
      }}>
      10 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="20 rows"
      icon="empty"
      onClick={() => {
        closePopover();
        window.alert('20 rows');
      }}>
      20 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="50 rows"
      icon="check"
      onClick={() => {
        closePopover();
        window.alert('50 rows');
      }}>
      50 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="100 rows"
      icon="empty"
      onClick={() => {
        closePopover();
        window.alert('100 rows');
      }}>
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
          panelPaddingSize="none">
          <EuiContextMenuPanel items={items} />
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPagination
          pageCount={PAGE_COUNT}
          activePage={activePage}
          onPageClick={goToPage}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
