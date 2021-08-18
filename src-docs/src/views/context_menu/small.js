import React, { useState } from 'react';

import {
  EuiButton,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const items = [
    <EuiContextMenuItem key="copy" icon="copy" onClick={closePopover}>
      Copy
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="edit" icon="pencil" onClick={closePopover}>
      Edit
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="share" icon="share" onClick={closePopover}>
      Share
    </EuiContextMenuItem>,
  ];

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Click to show a single panel
    </EuiButton>
  );

  return (
    <EuiPopover
      id="smallContextMenuExample"
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
