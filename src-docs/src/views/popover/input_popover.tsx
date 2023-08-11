import React, { useState } from 'react';

import {
  EuiInputPopover,
  EuiFieldText,
  EuiTextArea,
  EuiSpacer,
} from '../../../../src';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isResizablePopoverOpen, setIsResizablePopoverOpen] = useState(false);

  return (
    <>
      <EuiInputPopover
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        input={
          <EuiFieldText
            onFocus={() => setIsPopoverOpen(true)}
            placeholder="Click me to toggle an input popover"
            aria-label="Popover attached to input element"
          />
        }
      >
        Popover content
      </EuiInputPopover>

      <EuiSpacer />

      <EuiInputPopover
        display="inline-block"
        isOpen={isResizablePopoverOpen}
        closePopover={() => setIsResizablePopoverOpen(false)}
        input={
          <EuiTextArea
            onFocus={() => setIsResizablePopoverOpen(true)}
            placeholder="Click me and drag the resize handle"
            aria-label="Popover attached to a resizable textarea element"
            rows={1}
            resize="horizontal"
          />
        }
        panelMinWidth={200}
        anchorPosition="downRight"
      >
        The popover will adjust in size as the input does.
        <br />
        It has a minimum width of 200px.
      </EuiInputPopover>
    </>
  );
};
