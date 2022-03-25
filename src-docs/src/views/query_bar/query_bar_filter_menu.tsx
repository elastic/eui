import React, { useState } from 'react';

import {
  EuiButtonIcon,
  EuiPopover,
  EuiPopoverTitle,
  EuiText,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const hashtagButton = (
    <EuiButtonIcon
      display="base"
      size="m"
      iconType="filter"
      aria-label="Saved Queries popover"
      onClick={togglePopover}
    />
  );

  return (
    <EuiPopover
      id="popover"
      button={hashtagButton}
      isOpen={isPopoverOpen}
      anchorPosition="downLeft"
      panelPaddingSize="s"
      closePopover={closePopover}
    >
      <EuiPopoverTitle>Filter set</EuiPopoverTitle>

      <EuiText size="s">
        <p>Saved queries and other filter set actions go here.</p>
      </EuiText>
    </EuiPopover>
  );
};
