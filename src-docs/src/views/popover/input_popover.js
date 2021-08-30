import React, { useState } from 'react';

import {
  EuiInputPopover,
  EuiFieldText,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [inputWidth, setInputWidth] = useState(200);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopoverOpenTwo, setIsPopoverOpenTwo] = useState(false);
  const toggleIsPopoverOpen = (shouldBeOpen = !isPopoverOpen) => {
    setIsPopoverOpen(shouldBeOpen);
  };
  const toggleIsPopoverOpenTwo = (shouldBeOpen = !isPopoverOpenTwo) => {
    setIsPopoverOpenTwo(shouldBeOpen);
  };

  const input = (
    <EuiFieldText
      onFocus={() => toggleIsPopoverOpen()}
      aria-label="Popover attached to input element"
    />
  );

  const inputTwo = (
    <EuiFieldText
      onFocus={() => {
        setInputWidth(400);
        toggleIsPopoverOpenTwo();
      }}
      style={{ width: inputWidth }}
      aria-label="Popover attached to an adjustable sized input element"
    />
  );

  return (
    <React.Fragment>
      <EuiInputPopover
        input={input}
        isOpen={isPopoverOpen}
        closePopover={() => {
          toggleIsPopoverOpen(false);
        }}
      >
        Popover content
      </EuiInputPopover>

      <EuiSpacer />

      <EuiInputPopover
        input={inputTwo}
        isOpen={isPopoverOpenTwo}
        closePopover={() => {
          toggleIsPopoverOpenTwo(false);
          setInputWidth(200);
        }}
      >
        Popover will adjust in size as the input does
      </EuiInputPopover>
    </React.Fragment>
  );
};
