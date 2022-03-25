import React, { useState } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiButtonIcon,
  EuiText,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      button={
        <EuiButtonIcon
          display="base"
          size="m"
          iconType="plusInCircleFilled"
          onClick={togglePopover}
        />
      }
      anchorPosition="downCenter"
    >
      <EuiPopoverTitle>Add a filter</EuiPopoverTitle>

      <EuiText size="s">
        <p>Global query bar add filter form goes here.</p>
      </EuiText>
    </EuiPopover>
  );
};
