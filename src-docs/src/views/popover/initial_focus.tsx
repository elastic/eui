import React, { useState } from 'react';

import {
  EuiButton,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
  EuiFieldText,
} from '../../../../src';

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
      initialFocus="#name"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
    >
      <EuiFormRow label="Enter name" id="name">
        <EuiFieldText compressed name="input" />
      </EuiFormRow>

      <EuiSpacer />

      <EuiButton size="s" fill>
        Submit
      </EuiButton>
    </EuiPopover>
  );
};
