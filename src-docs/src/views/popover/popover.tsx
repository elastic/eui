import React, { useState } from 'react';

import { EuiPopover, EuiButtonEmpty, EuiText } from '../../../../src';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconType="documentation"
      iconSide="right"
      onClick={onButtonClick}
    >
      How it works
    </EuiButtonEmpty>
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
