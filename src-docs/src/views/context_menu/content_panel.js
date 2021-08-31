import React, { useState } from 'react';

import {
  EuiButton,
  EuiContextMenuPanel,
  EuiPopover,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const popoverID = htmlIdGenerator('popover')();

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const button = (
    <EuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      Click to show some content
    </EuiButton>
  );

  return (
    <EuiPopover
      id={popoverID}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="s"
      anchorPosition="downLeft">
      <EuiContextMenuPanel>
        This context menu doesn&#39;t render items, it passes a child instead.
      </EuiContextMenuPanel>
    </EuiPopover>
  );
};
