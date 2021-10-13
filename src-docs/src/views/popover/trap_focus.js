import React, { useState } from 'react';

import {
  EuiButton,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const trapFocusFormRowId__1 = useGeneratedHtmlId({
    prefix: 'trapFocusFormRow',
    suffix: 'first',
  });
  const trapFocusFormRowId__2 = useGeneratedHtmlId({
    prefix: 'trapFocusFormRow',
    suffix: 'second',
  });

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
      initialFocus={`[id=${trapFocusFormRowId__1}]`}
    >
      <EuiFormRow
        label="Generate a public snapshot?"
        id={trapFocusFormRowId__1}
        hasChildLabel={false}
      >
        <EuiSwitch
          name="switch"
          label="Snapshot data"
          checked={true}
          onChange={() => {}}
        />
      </EuiFormRow>

      <EuiFormRow
        label="Include the following in the embed"
        id={trapFocusFormRowId__2}
      >
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
