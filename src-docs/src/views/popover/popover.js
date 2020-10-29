import React, { useState } from 'react';

import { EuiPopover, EuiButton } from '../../../../src/components';

export default () => {
  const [openPopover, setOpenPopover] = useState(null);

  return (
    <>
      {[0, 1, 2, 3, 4].map((idx) => (
        <div key={idx}>
          <EuiPopover
            anchorPosition="rightCenter"
            ownFocus
            button={
              <EuiButton
                data-idx={idx}
                iconType="arrowDown"
                iconSide="right"
                onClick={() => setOpenPopover(idx)}>
                Show popover
              </EuiButton>
            }
            isOpen={openPopover === idx}
            closePopover={() => setOpenPopover(null)}>
            <div style={{ width: '300px' }}>
              Popover content that&rsquo;s wider than the default width
            </div>
          </EuiPopover>
        </div>
      ))}
    </>
  );
};
