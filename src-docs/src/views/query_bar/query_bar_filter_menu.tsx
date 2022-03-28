import React, { useState } from 'react';

import {
  EuiButtonIcon,
  EuiPopover,
  EuiPopoverTitle,
  EuiText,
  EuiButtonIconProps,
} from '../../../../src/components';

export default ({
  buttonProps,
}: {
  buttonProps?: Partial<EuiButtonIconProps>;
}) => {
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
      {...buttonProps}
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
