import React, { useState } from 'react';

import {
  EuiButton,
  EuiCode,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen(isPopoverOpen1 => !isPopoverOpen1);
  const closePopover = () => setIsPopoverOpen(false);

  let panel;
  const setPanelRef = node => {
    panel = node;
  };

  const button = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
      style={{ position: 'relative', left: 50 }}>
      Show constrained popover
    </EuiButton>
  );

  return (
    <EuiPanel panelRef={setPanelRef}>
      <EuiPopover
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        container={panel}>
        <div>
          Popover is positioned <EuiCode>downCenter</EuiCode> but constrained to
          fit within the panel.
        </div>
      </EuiPopover>

      {/* create adequate room for the popover */}
      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />
    </EuiPanel>
  );
};
