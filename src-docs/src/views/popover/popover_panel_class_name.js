import React, { useState } from 'react';

import { EuiPopover, EuiButton } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <EuiPopover
      ownFocus
      button={
        <EuiButton
          iconType="arrowDown"
          iconSide="right"
          onClick={onButtonClick}>
          Turn padding off and apply a custom class
        </EuiButton>
      }
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelClassName="yourClassNameHere"
      panelPaddingSize="none">
      This should have no padding, and if you inspect, also a custom class.
    </EuiPopover>
  );
};
