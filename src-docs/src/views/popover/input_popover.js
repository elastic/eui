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

  const input = <EuiFieldText onFocus={() => toggleIsPopoverOpen()} />;

  const inputTwo = (
    <EuiFieldText
      onFocus={() => {
        setInputWidth(400);
        toggleIsPopoverOpenTwo();
      }}
      style={{ width: inputWidth }}
    />
  );

  return (
    <React.Fragment>
      <EuiInputPopover
        id="popover"
        input={input}
        isOpen={isPopoverOpen}
        closePopover={() => {
          toggleIsPopoverOpen(false);
        }}>
        Popover content
      </EuiInputPopover>

      <EuiSpacer />

      <EuiInputPopover
        id="popover"
        input={inputTwo}
        isOpen={isPopoverOpenTwo}
        closePopover={() => {
          toggleIsPopoverOpenTwo(false);
          setInputWidth(200);
        }}>
        Popover will adjust in size as the input does
      </EuiInputPopover>

      <EuiSpacer size="xxl" />
    </React.Fragment>
  );
};
