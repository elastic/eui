import React, { useState } from 'react';

import { EuiPopover, EuiButtonEmpty, EuiText } from '../../../../src';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <EuiPopover
      button={
        <EuiButtonEmpty
          iconType="help"
          iconSide="right"
          onClick={onButtonClick}
        >
          Text scaling
        </EuiButtonEmpty>
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
