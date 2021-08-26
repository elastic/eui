import React, { useState } from 'react';

import { EuiPopover, EuiButton, EuiText } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Show popover
    </EuiButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
    >
      <EuiText style={{ width: 300 }}>
        <p>Popover content that&rsquo;s wider than the default width</p>
      </EuiText>
    </EuiPopover>
  );
};
