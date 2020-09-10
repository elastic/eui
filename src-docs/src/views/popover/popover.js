import React, { useState } from 'react';

import { EuiPopover, EuiButton, EuiText } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <>
      {
        [0, 1, 2, 3, 4].map(idx => (
          <div key={idx}>
            <EuiPopover
              ownFocus
              button={(
                <EuiButton data-idx={idx} iconType="arrowDown" iconSide="right" onClick={() => setOpenPopover(idx)}>
                  Show popover
                </EuiButton>
              )}
              isOpen={openPopover === idx}
              closePopover={closePopover}>
              <div style={{ width: '300px' }}>
                Popover content that&rsquo;s wider than the default width
              </div>
            </EuiPopover>
          </div>
        ))
      }
    </>
  );
};
