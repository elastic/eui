import React, { useState } from 'react';

import {
  EuiInputPopover,
  EuiInputPopoverProps,
  EuiFieldText,
  EuiTextArea,
  EuiButtonGroup,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isResizablePopoverOpen, setIsResizablePopoverOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] =
    useState<EuiInputPopoverProps['anchorPosition']>('downLeft');

  return (
    <>
      <EuiInputPopover
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        input={
          <EuiFieldText
            onFocus={() => setIsPopoverOpen(true)}
            placeholder="Focus me to toggle an input popover"
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
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIsResizablePopoverOpen(true);
              }
            }}
            placeholder="Focus me, press the down arrow key, then drag the resize handle"
            aria-label="Press the down arrow key to toggle the popover attached to this textarea element."
            rows={2}
            resize="horizontal"
          />
        }
        panelMinWidth={300}
        anchorPosition={anchorPosition}
      >
        This popover has a minimum width of 300px, and will adjust in size as
        the textarea does.
        <EuiSpacer size="s" />
        <EuiFormRow label="Anchor position" display="columnCompressed">
          <EuiButtonGroup
            buttonSize="compressed"
            legend="Anchor position"
            name="anchorPosition"
            idSelected={anchorPosition!}
            onChange={(id) =>
              setAnchorPosition(id as EuiInputPopoverProps['anchorPosition'])
            }
            options={[
              { id: 'downLeft', label: 'Left' },
              { id: 'downCenter', label: 'Center' },
              { id: 'downRight', label: 'Right' },
            ]}
          />
        </EuiFormRow>
      </EuiInputPopover>
    </>
  );
};
