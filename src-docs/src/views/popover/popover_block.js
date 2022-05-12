import React, { useState } from 'react';

import { EuiButton, EuiPopover } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton onClick={onButtonClick} fullWidth>
      This button is expanded
    </EuiButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      display="block"
    >
      <div>This is a popover</div>
    </EuiPopover>
  );
};
