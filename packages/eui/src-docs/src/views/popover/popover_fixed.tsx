import React, { useState } from 'react';

import { EuiButtonEmpty, EuiPopover, EuiButton } from '../../../../src';

export default () => {
  const [isExampleShown, setIsExampleShown] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const toggleExample = () =>
    setIsExampleShown((isExampleShown) => !isExampleShown);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty iconType="help" iconSide="right" onClick={onButtonClick}>
      Show fixed popover
    </EuiButtonEmpty>
  );

  return (
    <React.Fragment>
      <EuiButton onClick={toggleExample}>Toggle example</EuiButton>
      {isExampleShown && (
        <EuiPopover
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          style={{ position: 'fixed', bottom: 50, right: 50, zIndex: 10 }}
          repositionOnScroll={true}
        >
          <div>This popover scrolls with the button element!</div>
        </EuiPopover>
      )}
    </React.Fragment>
  );
};
