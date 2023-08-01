import React, { useState, useEffect } from 'react';

import {
  EuiButtonEmpty,
  EuiButton,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty iconType="help" iconSide="right" onClick={onButtonClick}>
      Show popover
    </EuiButtonEmpty>
  );

  // Since `hasFocus={false}` disables popover auto focus, we need to manually set it ourselves
  const focusId = useGeneratedHtmlId();
  useEffect(() => {
    if (isPopoverOpen) {
      // Wait a tick for element to finish rendering
      setTimeout(() => {
        document.getElementById(focusId)!.focus({ preventScroll: true });
      });
    }
  }, [isPopoverOpen, focusId]);

  return (
    <EuiPopover
      ownFocus={false}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
    >
      <EuiFormRow
        label="Generate a public snapshot?"
        id={focusId}
        hasChildLabel={false}
      >
        <EuiSwitch
          name="switch"
          label="Snapshot data"
          checked={true}
          onChange={() => {}}
        />
      </EuiFormRow>

      <EuiFormRow label="Include the following in the embed">
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
