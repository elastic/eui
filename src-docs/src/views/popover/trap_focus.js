import React, { useState } from 'react';

import {
  EuiButton,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

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
      ownFocus={false}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      initialFocus="[id=asdf2]"
    >
      <EuiFormRow
        label="Generate a public snapshot?"
        id="asdf"
        hasChildLabel={false}
      >
        <EuiSwitch
          name="switch"
          label="Snapshot data"
          checked={true}
          onChange={() => {}}
        />
      </EuiFormRow>

      <EuiFormRow label="Include the following in the embed" id="asdf2">
        <EuiSwitch
          name="switch"
          label="Current time range"
          checked={true}
          onChange={() => {}}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiButton fill>Copy IFRAME code</EuiButton>
    </EuiPopover>
  );
};
