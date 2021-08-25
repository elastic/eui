import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [rowSize, setRowSize] = useState(50);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const getIconType = (size) => {
    return size === rowSize ? 'check' : 'empty';
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
    <EuiPopover
      id="singlePanel"
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
