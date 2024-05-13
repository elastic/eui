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

  const isSelectedProps = (size: number) => {
    return size === rowSize
      ? { icon: 'check', 'aria-current': 'true' }
      : { icon: 'empty', 'aria-current': undefined };
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
      {...isSelectedProps(10)}
      key="10 rows"
      onClick={() => {
        closePopover();
        setRowSize(10);
      }}
    >
      10 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      {...isSelectedProps(20)}
      key="20 rows"
      onClick={() => {
        closePopover();
        setRowSize(20);
      }}
    >
      20 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      {...isSelectedProps(50)}
      key="50 rows"
      onClick={() => {
        closePopover();
        setRowSize(50);
      }}
    >
      50 rows
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      {...isSelectedProps(100)}
      key="100 rows"
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
