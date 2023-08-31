import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiPopover,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [rowSize, setRowSize] = useState(50);

  const singleContextMenuPopoverId = useGeneratedHtmlId({
    prefix: 'singleContextMenuPopover',
  });

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const getCurrentItem = (size, attr) => {
    if (attr === 'icon') {
      return size === rowSize ? 'check' : 'empty';
    }

    if (attr === 'aria-current') {
      return size === rowSize ? 'true' : undefined;
    }

    return undefined;
  };

  const button = (
    <EuiButtonEmpty
      size="s"
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
      icon={getCurrentItem(10, 'icon')}
      onClick={() => {
        closePopover();
        setRowSize(10);
      }}
      aria-current={getCurrentItem(10, 'aria-current')}
    >
      10 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="20 rows"
      icon={getCurrentItem(20, 'icon')}
      onClick={() => {
        closePopover();
        setRowSize(20);
      }}
      aria-current={getCurrentItem(20, 'aria-current')}
    >
      20 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="50 rows"
      icon={getCurrentItem(50, 'icon')}
      onClick={() => {
        closePopover();
        setRowSize(50);
      }}
      aria-current={getCurrentItem(50, 'aria-current')}
    >
      50 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="100 rows"
      icon={getCurrentItem(100, 'icon')}
      onClick={() => {
        closePopover();
        setRowSize(100);
      }}
      aria-current={getCurrentItem(100, 'aria-current')}
    >
      100 rows
    </EuiContextMenuItem>,
  ];

  return (
    <EuiPopover
      id={singleContextMenuPopoverId}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel size="s" items={items} />
    </EuiPopover>
  );
};
