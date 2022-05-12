import React, { useState } from 'react';

import { EuiPopover, EuiButton, EuiText } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <EuiPopover
      button={
        <EuiButton
          iconType="arrowDown"
          iconSide="right"
          onClick={onButtonClick}
        >
          Text scaling
        </EuiButton>
      }
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelClassName="guideDemo__textLines"
    >
      <EuiText style={{ width: 100 }}>
        <p>This has a custom class that applies some grid lines.</p>
      </EuiText>
    </EuiPopover>
  );
};
